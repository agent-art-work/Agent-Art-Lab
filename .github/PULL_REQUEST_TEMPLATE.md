## Question or purpose

Project/work and bounded question; adapt or omit fields that do not apply.

## Evidence and limits

Evidence classes, source versions, unavailable/private inputs and claim limits:

## Changed records and preserved history

Canonical article and project index; `site/studies.json` entry; any justified
findings/Guidance change; dated corrections retained:

For a new collection, identify the build routes, collection scan and agent-document
checker routes/allowlist updated under the
[contribution guide](https://github.com/agent-art-work/agentart.work/blob/main/CONTRIBUTING.md).

## Checks

Record pass/fail or unavailable with a reason for each check. Use the prerequisites
and commands in the contribution guide; do not claim unrun checks passed.

| Check | Result / limitation |
| --- | --- |
| `python3 -B scripts/check.py` | |
| `python3 -B -m unittest discover -s tests` | |
| `git diff --check` | |
| `npm test` | |
| `npm run build` | |
| `npm run check:site` | |

Desktop/narrow layout inspection when templates, styles or wide content changed:

- [ ] No credentials, private raw handoffs, personal paths or private source IDs.
- [ ] Evidence classes and missing/private artifacts are explicit.
- [ ] No new runtime, publication or spending authority is implied.
- [ ] Handoff/current status is updated if it changed.

## Review handoff

Requested next action and reviewer/owner, if known:

Submission requests maintainer review. Merge/publication remains a separate
decision within the operator's authorization; a push to `main` deploys the site.
