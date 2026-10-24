## Question or purpose

Article purpose, intended readers and author/byline, or the purpose of another site change.
For a study, include its bounded question; omit fields that do not apply.

## Evidence and limits

Attribution and support appropriate to the claims. For research/technical reports,
include evidence classes, source versions and unavailable/private inputs. An essay
or artist account does not require a technical study:

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
- [ ] Attribution and claim limits are clear; research evidence is labelled where applicable.
- [ ] Contents are authorized for public repository exposure, including draft PRs.
- [ ] No new runtime, publication or spending authority is implied.
- [ ] Handoff/current status is updated if it changed.

## Review handoff

Requested next action and reviewer/owner, if known:

Submission requests maintainer review. Merge/publication remains a separate
decision within the operator's authorization; a push to `main` deploys the site.
