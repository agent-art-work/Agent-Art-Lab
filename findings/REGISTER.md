# Findings and provisional practices

This is a revisable register, not a universal theory of Agent Art.
No replicated comparative findings or explanatory theories are established in
this edition. A successful tool call or preferred artistic pattern does not
automatically promote a claim.

## Observations

| ID | Bounded observation | Evidence and limits |
| --- | --- | --- |
| O-01 | First Claude CLI pilot reached fixture acceptance but ended abnormally. | [THOUGHT collection](../projects/thought/README.md); preserved analysis, private raw report unavailable. No clean completion. |
| O-02 | Second Claude CLI pilot completed a stricter synthetic exchange cleanly. | Same collection; one fixture observation, not Desktop/product success or causal comparison. |
| O-03 | Inspected Codex command looked for host model in App claim data. | [Diagnostic](../projects/thought/studies/2026-09-20-model-acquisition.md); attributed OPS inspection, exact canary build identity unknown. |
| O-04 | A result-side hash correction left an incoming `/start` representation ambiguity. | [2026-09-24 follow-up](../projects/thought/studies/2026-09-24-boundaries-and-canary-follow-up.md); OPS source inspection and synthetic reproduction, missing historical response. |
| O-05 | Parent-shell no-echo proof did not cover an interactive child; generic failure output did not establish the failing operation. | Same follow-up; attributed OPS inspection and fake-only regression. Private-transcript exposure reported; external disclosure and HTTP cause unestablished. |
| O-06 | Fresh Codex-49 and Claude-49 both returned; Codex-49 retained proof/check omissions after a preclaim failure. | Same follow-up; OPS/operator-reported manual staging canaries, one per cell. Functional success, not full compliance, privacy attestation or provider reliability. |
| O-07 | Pulse's ten public document exports were acquired and verified, then replayed from saved files without site execution or RPC. | [Pulse study](../projects/pulse/studies/2026-09-28-document-access.md); one direct client check, source inspection and separate session reports. Reader failure cause and comparative reliability unresolved; reported task-following failure survived retrieval. |

## Provisional practices

### P-01: preserve the evidence layer

Record actual action and observation separately from summaries and
interpretation. Fixture success, process exit, product acceptance and artwork
judgment do not substitute for each other.

- Support: O-01–O-03 expose different outcomes hidden by a single pass label.
- Scope: evidence reporting across project studies.
- Limits: a convention for honest reporting, not an empirically validated
  improvement to agent acceptance or art quality.
- Review: revise categories if a new artwork's mechanism needs another
  meaningful observation; do not force THOUGHT receipts on it.

### P-02: test acquisition, not only a supplied value

A capability supplied by a fixture does not establish that a real agent can
acquire its equivalent. Record the acquisition path separately when material.

- Support: O-03; the fixture supplied a model while the inspected run searched
  the wrong owner for it.
- Scope: capability-dependent technical studies, not an artistic requirement.
- Limits: one diagnosis; host records did contain metadata. No universal
  incapability, policy cause, or guaranteed fix follows.
- Review: original evidence of real host acquisition could revise the diagnosis;
  a later shared fixture/product mechanism could close the gap. Neither makes
  fixture-supplied values alone sufficient.
- Status (clarified 2026-10-24): provisional practice; the product defect was
  unresolved in the September 20 record. Current repair status belongs to
  Inshell and has not been revalidated here. This is not a release waiver.

### P-03: evaluate the method without self-certification

Record what the Lab method helped reveal and what it failed to capture.
Distinguish qualitative usefulness from measured time savings or causal effects.

- Support: the first diagnostic separated evidence but originally omitted a
  study record and method review; operator feedback prompted this correction.
- Scope: study completion and handoff.
- Limits: no controlled efficiency comparison or proven generalized benefit.
- Review: streamline or remove record fields that demonstrably add cost without
  helping interpretation or handoff. Preserve necessary evidence boundaries.

### P-04: audit representations across boundaries

After finding a representation error, inspect other producers and consumers
of the same value. State the bytes, encoding and envelope precisely; test
plausible wrong interpretations as well as a correct reference helper.

- Support: O-04; THOUGHT's result correction did not settle incoming text hashes.
- Scope: protocols that bind text or artifacts to exact representations.
- Limits: decoded UTF-8 and `sha256:` are this contract's rules, not a universal
  hash recipe. Passing negative vectors does not establish Agent compliance.
- Review: revisit when serialization changes or a new representation error appears.

### P-05: prove protections in the final execution context

Exercise the actual process/channel transition with fake input. Bind the proof
to the worker that will receive protected data; inspect whether a later process
or terminal change invalidates it.

- Support: O-05; Codex-48's child shell invalidated the parent-shell proof.
- Scope: worker handoffs and controls that depend on execution context.
- Limits: the fake regression supports its tested path. O-06 shows successful
  completion can coexist with skipped proof; neither outcome is a privacy attestation.
- Review: recheck on worker/channel changes or evidence of divergent implementation.

### P-06: retain safe operation evidence and preserve uncertainty

Record bounded, secret-free operation and failure-class markers. Keep parsing,
transport, schema and HTTP outcomes separate. Attribute conclusions to actual
output; do not infer a no-commit state or replay permission from a generic error
or a valid error envelope. Apply the operation's existing recovery contract.

- Support: O-05's shared catch erased attribution; O-06 separates functional
  completion from instruction compliance. This extends P-01's evidence discipline.
- Scope: diagnosing and recovering multi-step, state-changing operations.
- Limits: safe diagnostics improve inspectability, not proof of a particular
  historical cause, complete compliance or first-attempt reliability.
- Review: revise when evidence establishes the operation/commit state or a
  diagnostic exposes secrets, loses distinctions or contradicts observed output.

### P-07: simplify acquisition and make the data contract explicit

For static project knowledge, prefer known URLs, a small discovery index and
complete sources that agents can inspect with permitted ordinary HTTP and local
reading tools. State revisions, provenance, integrity checks and failure behavior.
Keep optional interactive or live services outside documentation readiness.

- Support: O-07 demonstrates one such path and documents its test coverage.
- Scope: static documents for agents with permitted HTTP and local storage;
  source format and storage requirements remain project choices.
- Limits: no comparative reliability, efficiency or comprehension gain is
  established. Hashes do not establish truth; simpler operations do not remove
  permissions, server failures, missing host capabilities or task-following errors.
- Review: revisit for rich media, live-state questions, hosts without storage,
  metadata drift, or a declared comparison that contradicts the expected benefit.

## Hypotheses and prior research

The THOUGHT initiation-reliability comparison is **draft, unfrozen and unrun**.
It is not a completed preregistration or a result. See
[research notes](../research/README.md) and the [project collection](../projects/thought/README.md).

## History

2026-09-20: portable derivative register created from the internal Agent Lab
documents. It preserves observation limits and corrects the earlier loose use
of “preregistered” for an unfrozen draft. It does not overwrite the source record.

2026-09-24: added O-04–O-06 and P-04–P-06 from the sanitized OPS follow-up.
Successful staging returns and compliance gaps are both retained. This
update is not a new theory, production Agent trial or additional release gate.

2026-09-28: added the Pulse study, O-07 and scoped P-07. This is a retrospective
technical case with a bounded read-only check, not a controlled reliability result.
