"""Run the actual notification workflow script against an in-memory GitHub API."""

from contextlib import redirect_stdout
from copy import deepcopy
import io
import json
import os
from pathlib import Path
import tempfile
import textwrap
from types import SimpleNamespace
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError


ROOT = Path(__file__).resolve().parent.parent
WORKFLOW = (ROOT / ".github/workflows/pr-notifications.yml").read_text()
SCRIPT = textwrap.dedent(WORKFLOW.split("          python3 - <<'PY'\n", 1)[1].rsplit("          PY", 1)[0])
REPOSITORY = "agent-art-work/Agent-Art-Lab"


class NotificationWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.event = {
            "repository": {"full_name": REPOSITORY, "default_branch": "main"},
            "action": "opened",
            "number": 7,
            "pull_request": {"number": 7},
        }
        self.pull = {
            "number": 7,
            "state": "open",
            "base": {"repo": {"full_name": REPOSITORY}},
            "head": {"repo": {"full_name": REPOSITORY}},
            "user": {"login": "inshell-art"},
            "draft": False,
            "assignees": [],
        }

    def run_workflow(self, *, event_name="pull_request_target", event=None, pull=None,
                     result=None, failure=None, failure_method="GET", env=None):
        calls = []
        current = deepcopy(self.pull if pull is None else pull)

        def request(request, timeout):
            calls.append((request.get_method(), request.full_url, request.data))
            self.assertEqual(timeout, 20)
            self.assertEqual(request.get_header("Authorization"), "Bearer offline-fixture")
            if failure and request.get_method() == failure_method:
                raise failure
            if request.get_method() == "GET":
                response = current
            else:
                self.assertEqual(json.loads(request.data), {"assignees": ["inshell-art"]})
                response = result if result is not None else {
                    **current, "assignees": current["assignees"] + [{"login": "inshell-art"}]
                }
            return io.BytesIO(json.dumps(response).encode())

        environment = {
            "GITHUB_REPOSITORY": REPOSITORY,
            "GITHUB_REF": "refs/heads/main",
            "GITHUB_EVENT_NAME": event_name,
            "GH_TOKEN": "offline-fixture",
            **(env or {}),
        }
        output = io.StringIO()
        code = 0
        with tempfile.TemporaryDirectory() as directory:
            event_path = Path(directory) / "event.json"
            event_path.write_text(json.dumps(self.event if event is None else event))
            environment["GITHUB_EVENT_PATH"] = str(event_path)
            with patch.dict(os.environ, environment, clear=True), redirect_stdout(output), \
                    patch("urllib.request.build_opener", return_value=SimpleNamespace(open=request)):
                try:
                    exec(compile(SCRIPT, "pr-notifications.yml", "exec"), {})
                except SystemExit as error:
                    code = error.code
        return code, output.getvalue(), calls

    def test_owner_authored_fork_and_draft_prs_are_assigned(self):
        for fork, draft in [(False, False), (True, False), (True, True)]:
            with self.subTest(fork=fork, draft=draft):
                pull = deepcopy(self.pull)
                pull["draft"] = draft
                if fork:
                    pull["head"]["repo"]["full_name"] = "contributor/untrusted"
                code, output, calls = self.run_workflow(pull=pull)
                self.assertEqual(code, 0)
                self.assertIn("Assignment is confirmed; phone delivery is not verified", output)
                self.assertEqual([call[:2] for call in calls], [
                    ("GET", f"https://api.github.com/repos/{REPOSITORY}/pulls/7"),
                    ("POST", f"https://api.github.com/repos/{REPOSITORY}/issues/7/assignees"),
                ])

    def test_existing_assignment_does_not_send_again(self):
        self.pull["assignees"] = [{"login": "Inshell-Art"}]
        code, output, calls = self.run_workflow()
        self.assertEqual(code, 0)
        self.assertIn("no new notification generated", output)
        self.assertEqual(len(calls), 1)

    def test_addition_preserves_other_assignees(self):
        self.pull["assignees"] = [{"login": "existing-maintainer"}]
        code, _, calls = self.run_workflow()
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(calls[-1][2]), {"assignees": ["inshell-art"]})

    def test_ignored_assignment_or_removed_existing_assignment_fails(self):
        self.pull["assignees"] = [{"login": "existing-maintainer"}]
        for users in [self.pull["assignees"], [{"login": "inshell-art"}]]:
            with self.subTest(users=users):
                code, _, calls = self.run_workflow(result={**self.pull, "assignees": users})
                self.assertIn("Assignment was not confirmed", code)
                self.assertEqual(len(calls), 2)

    def test_manual_dispatch_can_target_merged_pr(self):
        self.event["inputs"] = {"pull_request": "7"}
        self.pull.update(state="closed", merged=True)
        code, _, calls = self.run_workflow(event_name="workflow_dispatch")
        self.assertEqual(code, 0)
        self.assertEqual(len(calls), 2)

    def test_automatic_event_skips_closed_pr(self):
        self.pull["state"] = "closed"
        code, output, calls = self.run_workflow()
        self.assertEqual(code, 0)
        self.assertIn("already closed", output)
        self.assertEqual(len(calls), 1)

    def test_invalid_manual_input_never_calls_api(self):
        for value in [None, "", "0", "-1", "7.0", " 7", "7; echo injected", 7, True]:
            with self.subTest(value=value):
                self.event["inputs"] = {"pull_request": value}
                code, _, calls = self.run_workflow(event_name="workflow_dispatch")
                self.assertIn("positive integer", code)
                self.assertEqual(calls, [])

    def test_invalid_event_number_or_action_never_calls_api(self):
        for value in [0, -1, "7", True, None]:
            with self.subTest(value=value):
                self.event["number"] = value
                code, _, calls = self.run_workflow()
                self.assertIn("valid pull request number", code)
                self.assertEqual(calls, [])
        self.event["action"] = "edited"
        code, _, calls = self.run_workflow()
        self.assertIn("Unsupported", code)
        self.assertEqual(calls, [])

    def test_wrong_repository_or_nondefault_branch_never_calls_api(self):
        for environment in [{"GITHUB_REPOSITORY": "other/repo"}, {"GITHUB_REF": "refs/heads/feature"}]:
            with self.subTest(environment=environment):
                code, _, calls = self.run_workflow(env=environment)
                self.assertIn("default branch", code)
                self.assertEqual(calls, [])
        self.event["repository"]["full_name"] = "other/repo"
        code, _, calls = self.run_workflow()
        self.assertIn("default branch", code)
        self.assertEqual(calls, [])

    def test_wrong_fetched_identity_never_assigns(self):
        for key in ["number", "repository"]:
            with self.subTest(key=key):
                pull = deepcopy(self.pull)
                if key == "number":
                    pull["number"] = 8
                else:
                    pull["base"]["repo"]["full_name"] = "other/repo"
                code, _, calls = self.run_workflow(pull=pull)
                self.assertIn("identity", code)
                self.assertEqual(len(calls), 1)

    def test_api_failures_are_not_retried(self):
        for method in ["GET", "POST"]:
            for failure in [HTTPError("https://api.github.com", 403, "denied", {}, None), URLError("offline")]:
                with self.subTest(method=method, failure=failure):
                    code, _, calls = self.run_workflow(failure=failure, failure_method=method)
                    self.assertIn("no automatic retry", code)
                    self.assertNotIn("offline-fixture", code)
                    self.assertEqual(len(calls), 1 if method == "GET" else 2)

    def test_full_assignment_list_is_preserved(self):
        self.pull["assignees"] = [{"login": f"maintainer-{number}"} for number in range(10)]
        code, _, calls = self.run_workflow()
        self.assertIn("ten assignees", code)
        self.assertEqual(len(calls), 1)


if __name__ == "__main__":
    unittest.main()
