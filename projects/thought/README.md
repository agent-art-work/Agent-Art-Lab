# THOUGHT: an annotated worked case

An exact human prompt and one Agent response become the candidate THOUGHT work.
The current [Agent Art definition](../../docs/AGENT_ART.md) requires an Agent's
intention to enter as an artistic contribution alongside human intention,
with equal artistic standing. A response or protocol pass alone does not
establish that participation. The dated records below retain their original
claims and evidence limits.

This collection examines technical initiation and completion. It neither grades
artworks nor proves intentional participation. Read [Guidance](../../GUIDANCE.md).
THOUGHT implementation, runners, protocols and product repairs remain owned by
Applications; they are not the central Lab's next priority.

## Collection index

| Record | Status/evidence class | Retained here | Missing or private evidence |
| --- | --- | --- | --- |
| Claude CLI pilot, 2026-09-17 | Completed observation with conflicting outcomes | Reviewed summary below and reported artifact identity | Raw JSON/report and transcript unavailable here. |
| Claude CLI pilot, 2026-09-18 | Completed strict-fixture observation | Reviewed summary below and reported artifact identity | Raw report unavailable; not a real-App canary. |
| [Codex diagnostic](studies/2026-09-20-model-acquisition.md) | Completed retrospective diagnosis | Sanitized analysis, excerpt, method review | Original run privately retained; exact canary build/handoff identity unknown. |
| [Boundary corrections and canary follow-up](studies/2026-09-24-boundaries-and-canary-follow-up.md) | Retrospective update; OPS reports production delivered | Sanitized observations, scoped lessons and source references | Raw evidence excluded; Lab did not independently rerun or verify canaries/deployments. |
| [Native tools and explicit execution prerequisites](studies/2026-10-01-native-explicit-execution.md) | Retrospective contribution authorized by the operator on 2026-10-01 | Sanitized OPS account and provisional connection to P-04–P-07 | Private runtime evidence unavailable here; no Lab rerun or controlled reliability/timing comparison. |
| Initiation-reliability comparison | Proposed, unfrozen, unrun | Scope/status note below | No comparison results. |
| [Practice-led artwork study](studies/2026-09-20-intentional-participation-proposal.md) | Proposal prepared; study unrun | Question, evidence inventory and proposed reading method | No candidate selected or artwork exported for interpretation. |

## Provenance and access

These are portable derivatives of Applications research notes. The operator
authorized publication of this reviewed Lab edition on 2026-09-21; private
originals remain outside the published file set.
The source checkout contained uncommitted documents; its Git HEAD alone does
not identify them or the tested implementation. [Provenance](../../PROVENANCE.json)
records the observed source-document hashes.

The 2026-09-24 follow-up was initially a local-only addition from sanitized OPS
reports. The operator subsequently authorized its commit and push that day.

The 2026-10-01 native/explicit execution study was initially prepared locally
without publication authority. The operator subsequently authorized publication
of this sanitized contribution that day; the connecting guidance stays provisional.

Raw reports and run evidence are privately retained and unavailable here.
Their recorded hashes do not make the evidence independently inspectable.
Private identifiers, machine paths, credentials and raw handoffs are omitted.
No exact deployed commit/handoff hash was established for the failed Codex
canary; current source correspondence must not be labeled immutable build proof.

## Claude CLI pilot, 2026-09-17

One trial used configured `claude-sonnet-5`, Medium effort and Auto permissions
against a permissive local synthetic fixture. The configured CLI was
`2.1.269`. Limits included one trial, two minutes, eight turns and a $1 client
budget setting—not a hard provider billing cap.

The child exited `1` with `error_max_turns` and `isError: true`.
Separately, the fixture reached `returned` with receipt acceptance.
That acceptance did not establish clean completion or protocol correctness.
The original runner's batch-success label/exit `0` were reporting defects,
preserved by the original analysis. Later corrections do not change this result.

Reported original artifact: JSON 16,915 bytes,
SHA-256 `6bc6fe2f4c6643b660f62682413a59459211b6fa10e1f33dad1adfe5bf8babed`,
runner `agent-lab-runner-v1`.

The retained report omitted tool arguments/results; the complete handshake
cannot be reconstructed from that report. This is not Desktop, real-App,
art-quality or acceptance-rate evidence.

## Claude CLI strict-fixture pilot, 2026-09-18

A separately authorized trial used `2.1.269 (Claude Code)`, configured
`claude-sonnet-5`, Medium/Auto, two minutes, eight turns, a $1 client-budget
setting and 256 KiB child output. No repeat trial occurred.

The recorded outcomes were separate:

1. Runner ended without a batch stop condition.
2. Child exited `0`, with `isError: false`.
3. Independent synthetic observer accepted ordered claim → ready → start →
   result, reached returned state and issued a fixture receipt.

Only the observer evidence established the strict synthetic protocol pass;
assistant prose and exit code did not.

Reported original artifact: JSON 21,162 bytes,
SHA-256 `799c89b2773ef952760125cb356744e94bfb67ef4f1f57b1224fc4a08ea7b921`,
runner `agent-lab-runner-v3`.

The runtime reported `claude-sonnet-5`; it was not provider attestation.
Runtime-reported effort/permission remained unknown. Runner and fixture changed,
so this was not a controlled comparison with pilot 1.

## Codex failure and retrospective diagnosis

One real run reportedly claimed successfully then failed with
`AGENT_START_FAILED` / `Model unavailable`, without creative start or receipt.
OPS inspected commands that searched App claim data for a host model, with no
observed host-metadata lookup. Stored host values existed, but agent access was
not established.

The [diagnostic](studies/2026-09-20-model-acquisition.md) explains why a synthetic
failure-handling PASS did not contradict that observation. Supported acquisition
and product repair were unresolved in the September 20 record.

Editorial clarification, 2026-10-24: this historical diagnosis does not establish
today's product status. Current implementation and repair status remain with
Inshell; they were not revalidated in this editorial review.

## Follow-up, 2026-09-24

The [later boundary study](studies/2026-09-24-boundaries-and-canary-follow-up.md)
records hash/worker corrections, two successful fresh manual staging canaries,
remaining Codex compliance gaps and completed production delivery as reported by
OPS. Production delivery checks included no production Agent run. These later
observations preserve the earlier failed cases; they do not establish the cause
of the historical HTTP failure, complete compliance or general reliability.

## Draft comparison and artistic gap

The proposed initiation-reliability comparison remains **unfrozen and unrun**.
No treatment effect, replicated finding or general acceptance rate is claimed.
The original draft remains project-owned; its live settings are not copied here.

No artwork is retained here for curatorial assessment. Fixture output and
receipt acceptance cannot establish Agent intention or artistic quality.
The [practice-led proposal](studies/2026-09-20-intentional-participation-proposal.md)
sets out how to examine documented choices and interpretations once an existing
candidate and permitted material are identified. It contains no artistic findings.

## Follow-up ownership

Applications owns the product investigation and any authorized regression or
canary. Agent-Art-Lab has prepared the practice-led proposal; its next study step
needs operator-selected material and review scope. This collection grants no
live execution, spending,
private-source access, deployment or policy-change authority.
