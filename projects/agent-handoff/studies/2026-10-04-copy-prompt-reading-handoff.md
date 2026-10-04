# From copy prompt to agent handoff: lessons from four websites

- Record date: 2026-10-04; working note, revision 1.
- Project: Agent handoff; technical infrastructure for public knowledge access.
- Method: four-site source inspection, live prompt-panel observations and local
  reference-prototype preparation. No comparative agent trial.
- Status: working note; local reference prototype and two isolated pilots
  completed, with publication and package distribution still pending.

## The question behind the button

[Signatures Gallery](https://signatures.gallery/about),
[Pulse](https://pulse.inshell.art/), [Inshell](https://inshell.art/docs) and
[Agent-Art-Lab](https://agentart.work/) each invite a visitor to copy a prompt
into their own agent. The visible action is small. Its useful work continues
after the paste: give the agent enough context to find relevant public sources,
understand their scope, answer the visitor's question and report a failed or
incomplete read honestly.

The question is whether these repeated parts justify a small shared component
or library. The proposed scope is a reading handoff: an authored invitation,
accessible copy controls, discoverable public documents and explicit access and
evidence rules. Artistic interpretation, account access and authenticated actions
remain each project's responsibility. This infrastructure does not establish
that an agent participated at the level of intention in an artwork.

## What was inspected

The source review used the following local Git snapshots. These links pin
inspectable source; they do not establish that every live response matched the
commit. Live browser observations covered the public prompt panels, not a
complete served-byte comparison or an agent's subsequent behavior.

| Site and inspected snapshot | Relevant public source | What it shows |
| --- | --- | --- |
| Signatures Gallery, `ee48505b02cbe30f7ed0e86c6750e16988f297f2` | [Reading invitation][signatures-prompt], [public index][signatures-index], [copy behavior][signatures-copy] | A reading invitation distinguishes documented drawing rules, interpretation and Provenance. The index separately identifies reading, preview and assessment instruction texts. Copy failure opens and selects the prompt. |
| Pulse, `32adfe39e1bf775f387ddab698780f256ed0cc81` | [Prompt][pulse-prompt], [download contract][pulse-format], [browser controls][pulse-client] | A prompt loaded on disclosure asks for complete saved sources through a known index. It separates static reading from the playground, RPC and wallet actions, and gives explicit recovery and citation rules. |
| Inshell, `2cc042d51d4d0c88d9b4823485fcceac0c885ec1` | [Prompt authoring][inshell-prompt], [Docs component][inshell-client], [public index][inshell-index] | A React interface points to an index with complete and focused reading modes, source locks and fact-specific evidence classes. The prompt asks the agent to report unavailable sources. |
| Agent-Art-Lab, `baa848b83c8ebeda0112aed200bec2515f28f735` | [Access guide][lab-guide], [static packaging][lab-documents], [copy behavior][lab-copy] | Canonical Markdown supplies both the human pages and complete JSON documents. A native disclosure contains the full prompt without JavaScript; clipboard failure selects it for manual copying. |

These implementations are different contracts, not four interchangeable
schemas. Signatures offers artistic orientation with explicit exclusions; Pulse
packages complete individual sources; Inshell supplies corpus and topic modes
with fact-specific authority; the Lab preserves complete records and their
evidence limits. Sharing presentation should not flatten those differences.

## Lessons already recorded by the Lab

The [Pulse document-access study](../../pulse/studies/2026-09-28-document-access.md)
supports known URLs, a small index and complete inputs as a demonstrated
acquisition path. One client acquired and verified the sources, then replayed
saved files. A reported answer still missed the user's question after relevant
retrieval. Transport success therefore does not establish comprehension or task
completion; the study measured no comparative reliability or efficiency gain.

The [model-acquisition diagnostic](../../thought/studies/2026-09-20-model-acquisition.md)
shows why supplying a value in a fixture does not test how an agent obtains it
on the real surface. For this handoff, a unit test with an already loaded prompt
or parsed index cannot establish discovery, network access or successful reading
by a visitor's agent.

The [representation and worker-boundary follow-up](../../thought/studies/2026-09-24-boundaries-and-canary-follow-up.md)
supports specifying exact representations and distinguishing failure stages.
Its observations concern a particular protocol and are attributed to OPS reports;
they are not a universal hash recipe or proof that arbitrary agent-generated
workers comply. The [native-tools and execution-prerequisites note](../../thought/studies/2026-10-01-native-explicit-execution.md)
also keeps tool compatibility separate from permission for the command that
actually executes. Pulse's successful Python path prevents turning that lesson
into a universal requirement to use one named shell or HTTP client.

Together, the scoped practices [P-02, P-04, P-06 and P-07](../../../findings/REGISTER.md)
suggest a small explicit handoff. They do not justify an agent runtime, a
universal execution workflow or a claim that simpler prompts always perform
better.

## A reading contract worth making reusable

The reusable unit is the contract around the invitation, not one universal
prompt. A site should make six things visible:

1. **Intent:** what the visitor is asking the agent to do, such as understand an
   artwork or answer a question from documentation. Reading does not imply a
   request to execute embedded examples or perform an account action.
2. **Context:** the project, the user's actual question and relevant distinctions.
   A copied setup prompt should not displace the user's question with a task
   about validating the prompt itself.
3. **Sources:** a known index or explicit source URLs, formats, roles, revisions
   and provenance where available. Select relevant complete content; a link is
   not evidence already fetched, and repeated corpus/topic content is not
   independent corroboration.
4. **Access:** the supported read path and its real prerequisites. Use existing
   permitted tools. State whether local storage is required, optional or absent;
   report unavailable capabilities without pretending a download succeeded.
5. **Evidence:** the distinction between source statements, historical records,
   live observations and interpretation. Cite what was actually fetched and
   identify checks that remain unverified.
6. **Failure:** what to do for denied access, an unavailable URL, missing content,
   malformed data or an integrity mismatch. Preserve uncertainty and use the
   project's bounded recovery policy.

Two details resist careless standardization. Pulse's inspected prompt requires
an authorized workspace and saved index/download files; the Lab permits immediate
reading with local storage optional, requiring it for saved-file replay. A shared
helper must not silently impose one storage requirement on both.

Link resolution also has two layers. Relative download URLs use the fetched
index's origin in Pulse and the Lab. References inside Pulse source documents
use the original `source.url`; Lab Markdown references use the directory of
`source.path` and an index lookup. The envelope's download URL is not an
automatic link base for its content. Both policies should remain declared by
the publisher.

Integrity is similarly explicit. Pulse and the Lab distinguish the serialized
download's bytes from the decoded source string re-encoded as UTF-8. A helper
must not trim, normalize line endings, strip a BOM or reserialize a JSON source
while claiming byte identity. A matching digest identifies bytes relative to
the index; it does not establish truth, freshness or independent authenticity.

## The component boundary

The local reference implementation separates core handoff rendering, DOM copy
controls, a React component and hook, and optional build helpers. It supplies
copy-state handling, selectable fallback text, native disclosure markup and
status announcements. The two pilots exercise the DOM adapter and React hook
while keeping existing document schemas and generators in place. Host websites
retain their elements, typography and layout.

The publisher owns the full prompt. A library may help assemble declared fields
or display an authored prompt, but it should not invent project permissions,
evidence policy or an artistic role. Copy the displayed field's text and offer
manual copying when clipboard access fails. HTML textarea line endings follow
the browser's normalization rules; exact source-byte preservation belongs to the
separate export contract. Server-rendered text and ordinary links
provide a useful baseline; a successful local clipboard operation says nothing
about the destination agent's capabilities.

Static reading must remain separate from authenticated or state-changing work.
Signatures' published assessment instructions are documentary; they do not
authorize a paid assessment, wallet connection, signature or mint. Pulse's
historical contract records do not require live RPC or a transaction to read.
Inshell's index may point to separately scoped live read-only evidence, but its
reading invitation does not approve a wallet action. A reference helper should
carry these declared boundaries without implementing an agent executor.

## Proposed form and current result

The operator requested a small original reference implementation, isolated local
pilot integrations and this Lab working note. The proposed implementation owner
is a separate `agent-art-work/agent-handoff` repository. At this point no remote
repository, package release or live-site migration has been created. Existing
website repositories remain their owners; the Lab receives the reviewed record.

The four implementations establish a recurring need to investigate extraction.
They do not yet establish the size of maintenance savings or a stable general
API. The article records the design and evidence; the reference implementation
makes the proposal inspectable. A maintained package release remains a later
decision after pilot review.

The contributing implementation agent completed and reported the following local
checks on 2026-10-04. The local reference Git snapshot is
`6da94aa3c3f5daf6dd207b75dcb63181e0f25ca3`; its `docs/VERIFICATION.md` records
the results and limits. Article preparation separately ran the Lab publication
checks. These results describe the local reference bundle and isolated candidates;
they do not identify a deployed website or a published library version.

| Checked artifact or surface | Recorded result | Practical limit |
| --- | --- | --- |
| Reference implementation, `npm test` | 37 tests passed, with zero failures or skips. Coverage includes pure core/DOM behavior, source exports, React server rendering and hook tests with Node 22.16.0, React 19.2.8 and jsdom 20.0.3. | Test coverage establishes the exercised paths, not arbitrary agent compliance or a complete accessibility audit. |
| Pulse isolated pilot | All 12 existing knowledge/gateway tests passed, including source/download integrity and the public document path; the build passed. | No live RPC, transaction or production migration was part of this pilot. |
| Inshell isolated pilot | All 67 focused DocsPage tests passed, including three added checks for successful copy with preserved collapse, denied-copy expansion/selection and a single pending request. Source typecheck, documentation regeneration/drift check, offline PUB-boundary check and preview build passed. | The PUB check used a local snapshot, not a fresh live contract read. A clean lockfile dependency installation was not checked. |
| Pilot review patches | Both patches passed fresh-apply checks. Ten runtime files in each pilot matched the reference implementation exactly; the local bundle records file and patch hashes in `pilots/runtime-snapshot.json`. | Vendoring is the unpublished prototype's distribution method; it does not establish a stable dependency release or deployment identity. |
| Native and hydrated React demo | An explicit clipboard fixture exercised accepted and denied copies; denial selected the full prompt. Keyboard operation of the native disclosure and a 390px viewport without horizontal overflow passed. | Fixture behavior is declared; it is not evidence of the browser's default clipboard permission behavior. |
| Actual Pulse and Inshell pilot pages | Successful clipboard content matched the displayed prompts, and preview URLs used the local origin. Inshell retained its collapsed prompt after successful copying. Both pages had no horizontal overflow at 390px. | Default browser clipboard denial was not tried in these pilots; denial was covered by the demo fixture and regression tests. |

Review found two material gaps before the final checks: a stale clipboard
completion could race a changed React prompt, and verification needed stronger
identity and representation checks. The implementation was corrected and
regressions were added before the reported passing run. This review experience
supports retaining asynchronous-state and wrong-representation cases alongside
ordinary successful copying.

There was no browser trial with JavaScript disabled. Server-rendering tests
covered readable initial HTML, which is a narrower observation. No real agent
performance trial, maintenance-savings measurement, full accessibility audit,
live-site migration, remote library publication or npm release was performed.
Repository visibility and licensing remain undecided. The prototype source and
pilot patches are retained in the local review bundle; no immutable remote
prototype snapshot or raw browser evidence is published with this note.

## Method evaluation and next action

The Lab's evidence distinctions helped separate an observed prompt panel, an
inspected source contract, successful copying, complete acquisition and an
answer that actually addresses the question. The existing Pulse record kept a
task-following counterexample visible; the boundary records prevented a reading
helper from quietly becoming an execution framework.

This preparation has not measured time, token use, support cost, accessibility
across all browsers or improvement in agent answer quality. Public source
inspection does not reconstruct private historical failures. The proposed
implementation also introduces maintenance for its API, fixtures and adapters;
duplication alone does not prove that a package costs less.

The local prototype and pilot checks are complete within the scope above. Next,
review the reference bundle and choose its repository visibility, license and
distribution path before publication or a live-site migration. A package release
also needs a clean-install and consumer-distribution check. Retain incompatibilities
and revise the seam as other sites adopt it. Further agent-performance claims
would need a separately defined evaluation with declared tasks, surfaces,
measures and scope. No new live trial follows from this working note.

[signatures-prompt]: https://github.com/agent-art-work/Agent-Art-signatures.gallery/blob/ee48505b02cbe30f7ed0e86c6750e16988f297f2/src/openMint/aboutReadingPrompt.ts
[signatures-index]: https://github.com/agent-art-work/Agent-Art-signatures.gallery/blob/ee48505b02cbe30f7ed0e86c6750e16988f297f2/src/openMint/agentDocuments.ts
[signatures-copy]: https://github.com/agent-art-work/Agent-Art-signatures.gallery/blob/ee48505b02cbe30f7ed0e86c6750e16988f297f2/src/openMint/promptCopy.ts
[pulse-prompt]: https://github.com/inshell-art/pulse/blob/32adfe39e1bf775f387ddab698780f256ed0cc81/evm/playground/docs/agent-prompt.txt
[pulse-format]: https://github.com/inshell-art/pulse/blob/32adfe39e1bf775f387ddab698780f256ed0cc81/evm/playground/docs/document-format.md
[pulse-client]: https://github.com/inshell-art/pulse/blob/32adfe39e1bf775f387ddab698780f256ed0cc81/evm/playground/agent.js
[inshell-prompt]: https://github.com/inshell-art/inshell.art/blob/2cc042d51d4d0c88d9b4823485fcceac0c885ec1/apps/h%6fme/src/content/docs.ts
[inshell-client]: https://github.com/inshell-art/inshell.art/blob/2cc042d51d4d0c88d9b4823485fcceac0c885ec1/apps/h%6fme/src/components/DocsPage.tsx
[inshell-index]: https://github.com/inshell-art/inshell.art/blob/2cc042d51d4d0c88d9b4823485fcceac0c885ec1/apps/h%6fme/public/docs/agent-index.json
[lab-guide]: https://github.com/agent-art-work/Agent-Art-Lab/blob/baa848b83c8ebeda0112aed200bec2515f28f735/docs/AGENT_ACCESS.md
[lab-documents]: https://github.com/agent-art-work/Agent-Art-Lab/blob/baa848b83c8ebeda0112aed200bec2515f28f735/scripts/agent-documents.mjs
[lab-copy]: https://github.com/agent-art-work/Agent-Art-Lab/blob/baa848b83c8ebeda0112aed200bec2515f28f735/site/assets/copy-prompt.js
