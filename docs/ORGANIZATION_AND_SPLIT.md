# Organization context and task split

Recorded 2026-09-20 following the operator's correction.

## Current work lanes and Lab status, 2026-10-24

The operator approved separating website maintenance, Blog publishing and
optional research. Agent Art Lab remains the historical foundation and an
inherited research practice; it is not a separate public identity or standing
programme in the current website work. Preserve its records, attribution,
article URLs, document IDs and schema identifiers.

- **Website maintenance:** maintain this site's pages, design, integration and
  source exports, using [site maintenance](../site/README.md). Routine changes
  require relevant checks, not a research intake.
- **Blog publishing:** develop an article with an agent/maintainer or submit a
  PR directly under [Contribute](../CONTRIBUTING.md). The maintainer handles
  publishing mechanics for assisted drafts; essays and artists' accounts need
  no study template. Blog is the publication, not a research programme.
- **Optional research:** investigate a concrete question with a named owner and
  appropriate scope, drawing on [Research guidance](../GUIDANCE.md) where useful. Its
  records may support an article, but research and publication are separate
  activities. Unrun historical proposals are not an automatic work queue.

These lanes do not move SDK implementation, artist work or release authority.
The older dated decisions below remain historical records; use this section
and the current [handoff](../HANDOFF.md#current-position) for task routing.
This cleanup and the v2 preview remain local only.

## Source of truth and builder artists, 2026-10-23

The operator clarified that Agent Art Work is the root of the Agent Art
initiative. `agentart.work` is the authoritative home for its definition,
manifesto, Protocol, shared tools and Works showroom. Inshell is the first
builder artist: it applies Agent Art in its own practice and owns its three
movements, THOUGHT, WILL and AWA.

| Responsibility | Owner |
| --- | --- |
| Agent Art definition, manifesto and field-level explanations | Agent Art Work; current approved sources in this repository |
| Protocol specification, SDK and shared component releases | Agent Art Work, implemented and released by the separate `agent-art-protocol` repository |
| Works showroom | `agentart.work`: attributed presentations linking to the artists' works; implemented in the local v2 preview |
| Blog | `agentart.work`: articles, studies and working notes, distinct from the showroom |
| Inshell identity and "inspect self" direction | Inshell |
| THOUGHT, WILL, AWA and their artistic aims, implementations and releases | Inshell and the respective owning projects |

General Agent Art explanations on Inshell should defer to and link to Agent
Art Work's approved position. They are not parallel sources of truth. Older
Inshell wording that leaves equality unspecified must be reconciled with the
approved commitment to equal artistic standing. Equal standing does not impose
identical roles, equal operational control or one creative workflow.

Inshell's practices, material choices and technical systems can be presented
as attributed examples. Its inward direction, movement sequence, wallets,
contracts and live product behavior remain Inshell-specific. Showing a work
here does not transfer its ownership or turn the showroom into its runtime.
Participation by other artists does not require transferring repositories.

Historical Lab records and their Inshell source attribution remain intact.
They document where earlier accounts came from; they do not make Inshell the
current authority for Agent Art. This decision also does not publish the local
v2 website: cross-site links to new pages must be coordinated with release.

## Documentation placement and reconciliation, 2026-10-23

Further operator clarification: Agent Art concerns the Agent's intention as
an artistic contribution alongside human intention. Generative methods, SVG,
onchain preservation and community arrangements are practices, not elements
of its definition or manifesto. A painter can make Agent Art through painting.
Protocol serves optional digital/software interactions; it does not encompass
all artistic practice, certify Agent Art or decide whether evidence is needed.
Artists choose whether and how to present evidence, and audiences judge.
Documentation integrity and technical verification still apply to specific
research and software claims; they are not universal requirements for artworks.

The operator requested a coordinated documentation revision across both sites.
The unit of ownership is the claim or topic, not whichever repository first
published a paragraph. Maintain the full shared explanation here and concise,
attributed context on an artist's site. Preserve useful artist-specific detail
where it is maintained; do not copy a second set of operating instructions.

The Inshell audit baseline is commit
`1a44454d4904fdc330f83ec3d86236783302411f`, whose public topic exports were
inspected alongside this site's local v2 sources. Its 24 topic routes divide
as follows:

| Inshell topic(s) | Maintained home and treatment |
| --- | --- |
| `agent-art` | Shared definition and implications: [Agent Art](AGENT_ART.md). Inshell retains a stable contextual bridge, the approved definition, attribution and its own practice context. |
| `agents-and-ai` | Shared participation/execution distinction belongs in Agent Art. Inshell retains its reason for working with Agents and attributed lineage; no competing technical test for Agent Art. |
| `glossary` | Shared Agent Art terms follow the canonical explanation here. Inshell keeps concise attributed entries alongside its own product and artistic vocabulary. |
| `inshell`, `movements`, `thought`, `will`, `awa` | Inshell owns identity, inspect self and movement accounts. [Works](WORKS.md) introduces them with attribution, availability limits and owning-site links. |
| `lineage`, `generative-art` | Inshell's attributed artistic route and contextual essays stay there. The shared definition here explains method/medium independence without importing an unverified history or hierarchy of art forms. |
| `design-principles`, `svg`, `fully-onchain`, `mono-76` | Inshell's chosen architecture, material, preservation and glyph system stay there. None becomes a universal Agent Art requirement. |
| `path`, `pulse` | Inshell-specific permission, participation and auction systems stay there; do not relabel them as shared Protocol components. |
| `contracts`, `artwork-metadata-chain`, `verification`, `wallet-local-data`, `source-release-boundaries` | Inshell owns runtime, contract, consent, record authority and release instructions. Shared evidence principles here link to the owning practice for particulars. |
| `ethereum`, `tokens-and-nfts`, `onchain-art` | Context for Inshell's material choices stays there. It is not required background for all Agent Art. |

### Conflicts resolved by the shared position

- Equal artistic standing is required; equal operational control, identical
  roles and equal contribution size are not. Remove current claims that the
  field prescribes no equality while preserving work-specific role choices.
- A runtime, model label, generated asset, tool call or attestation alone does
  not establish intentional artistic participation. An attestation supports
  its exact claim, not a certificate of artistic quality or private thought.
- Constrained or prompted contributions can still carry intention. Randomness
  or unpredictability alone does not establish it; intentional contribution
  does not require claiming that generation contains no stochastic process.
- Generative methods and Agent participation can coexist. Do not imply that
  instruction-based art or human execution lacks interpretation, or that one
  architecture, medium or historical era establishes artistic standing.
- Inshell's inspect self, retained aesthetic architecture and movement sequence
  are choices of that artist. They neither define nor exhaust the field.
- Agent Art Protocol's shared SDK and Inshell's artwork-specific protocols
  have separate implementation and release owners. A shared artistic position
  does not establish compatibility between their technical systems.

### Integrity and release

Keep the locked manifesto unchanged. Revise current guidance, overview pages,
templates and glossary usage; preserve dated studies, their original evidence
and stable identities. A correction to current framing must not rewrite an
old observation into a new result.

On Inshell, edit authored sources and regenerate Markdown/JSON, indexes and
source locks through its maintained generator. Keep existing topic URLs and
useful fragments, with explicit compatibility handling if an anchor changes.
Here, HTML and complete Agent downloads derive from the same Markdown source.

The shared v2 destinations are `/`, `/agent-art/`, `/protocol/`,
`/ask-your-agent/` and `/works/`. These changes are local candidates. Publish
and verify those destinations before releasing Inshell's new cross-site links;
a planned URL is not evidence of a live page. No deployment is authorized by
this editorial reconciliation.

Both local editorial candidates are reconciled. Inshell's candidate branch is
`codex/docs-agent-art-work-reconciliation`; it preserves all 24 topic routes
and 133 section IDs. Its generated exports and local checks pass using an
existing toolchain, but a clean build with the exact pinned dependencies is
still required before release. Existing historical references were retained
as attributed context, not independently reverified for this revision.

## Website scope and repository rename, 2026-10-21

The operator authorized renaming the existing `Agent-Art-Lab` repository to
[`agentart.work`](https://github.com/agent-art-work/agentart.work) and building a
local v2 preview for the whole website. **Blog** replaces Lab as its public
publication section. This continues the same repository and article history;
it does not create a new organization or transfer Protocol implementation here.
GitHub inspection confirmed the new full name `agent-art-work/agentart.work`
with the same repository identity (`1379267983`, `R_kgDOUjX1jw`), public visibility
and `main` default branch. The Pages custom domain remains `agentart.work`, and
the existing live website responds successfully. This does not publish the v2
redesign. See [HANDOFF](../HANDOFF.md) for preview and release status.

| Layer | Current identity and responsibility |
| --- | --- |
| Umbrella | Agent Art Work |
| Website and repository | `agentart.work`, under the `agent-art-work` organization |
| Declaration | Manifesto: the approved text on home (`/`), locked for the local v2 preview; `/manifesto/` redirects home |
| Definition | Agent Art: the definition and conceptual explanation at `/agent-art/`, separate from the declaration |
| Publication | Blog: one chronological feed at `/blog/`; existing article URLs and source records retained |
| Protocol | Developing infrastructure, owned by the separate `agent-art-protocol` repository |
| Ask your Agent | Protocol's reading component; this site owns its explanation and integration |

The site has an umbrella homepage, Blog, a public Protocol overview and the
Ask your Agent explanation. Its agent index includes the reviewed public
overview sources; private protocol files are not published automatically.
Existing document IDs and `agent-art-lab.*` schema identifiers stay stable.
No SDK release, private-repository visibility change or new reuse license is
implied by this website rename. The v2 redesign remains a local preview until
separately released.

Use `agent-art-work/agentart.work` for current website links and contributions.
The dated records below preserve earlier names, ownership observations and
decisions. They are historical observations, not a current inventory of other
repositories or authority to resume their transfers.

## Organization rename, 2026-10-03 (historical)

The operator authorized renaming the existing organization from
`agent-art-collective` to [agent-art-work](https://github.com/agent-art-work)
to align the umbrella **Agent Art Work** with [agentart.work](https://agentart.work/).
GitHub confirmed the rename, display name and website. Organization and
repository identities are unchanged; this is a rename, not a new organization.

| Layer | Current identity |
| --- | --- |
| Umbrella | Agent Art Work |
| Website | agentart.work |
| GitHub organization | agent-art-work |
| Research and publication component | Agent Art Lab |
| Lab repository | [agent-art-work/Agent-Art-Lab](https://github.com/agent-art-work/Agent-Art-Lab) |
| Signature prototype | [agent-art-work/agent-art-Signature-prototype](https://github.com/agent-art-work/agent-art-Signature-prototype) |

Both repositories remain public. Their local remotes now use the new owner;
no prototype files or commits were changed. The signatures.gallery transfer
remains on hold. Participation still does not require repository transfer.
Use the new owner for current repository links, API calls and contributions.
The dated records below preserve earlier names and decisions as history.

## Repository status, 2026-09-21 (historical)

The operator put `signatures.gallery` transfer on hold while work continues
there and requested the separate Signature prototype transfer instead.

| Repository | Current owner and state |
| --- | --- |
| [Agent-Art-Lab](https://github.com/agent-art-collective/Agent-Art-Lab) | Public under `agent-art-collective`; published. |
| [agent-art-Signature-prototype](https://github.com/agent-art-collective/agent-art-Signature-prototype) | Transfer to `agent-art-collective` complete; public, same repository identity and remote `main` commit as before transfer. Local `origin` updated. |
| `Agent-Art-signatures.gallery` | Remains under `inshell-art`; transfer explicitly on hold. Leave its repository and deployment untouched until the operator resumes it. |

The prototype's local checkout remains at its existing commit, behind remote
`main`; only its remote URL and fetched tracking refs changed. This transfer
does not move application code into the Lab or establish a new artistic study.
Earlier grouping and registration records below are retained as dated history.

## Public Lab publication completed, 2026-09-21

The operator selected public visibility and explicitly confirmed
`agent-art-collective` as the owner of `Agent-Art-Lab`. The reviewed 19-file
edition was pushed to `main`; GitHub verified the repository as public and
nonempty with `main` as its default branch. The repository is
[Agent-Art-Lab](https://github.com/agent-art-collective/Agent-Art-Lab).
No reuse license was added. The registration notes below retain the earlier state.
The gallery transfer remains a separate pending operation.

## Registration update, 2026-09-21

The operator completed registration. GitHub API inspection verified the actual
organization as [agent-art-collective](https://github.com/agent-art-collective)
and confirmed active owner membership (`role: admin`) for `inshell-art`.
Use `agent-art-collective` for future GitHub destinations. The `agent-art`
namespace in the earlier 2026-09-20 record below is historical planning language.
Requests for that earlier name returned 404; availability is not established.

The intended repository destinations are now:

- `agent-art-collective/Agent-Art-Lab`: local candidate; visibility and reuse
  licensing remain undecided, and no remote is configured.
- `agent-art-collective/Agent-Art-signatures.gallery`: intended transfer;
  GitHub currently reports `inshell-art/Agent-Art-signatures.gallery`, public.

Registration is complete; repository setup and transfer are not. The two
repositories remain separate, with project implementation and deployment
ownership unchanged. No repository was created, moved or published by this check.

## Context to preserve

- `agent-art` is the intended shared organization context suggested in the
  side discussion. Do not default the Lab to `inshell-art` merely because
  its first documents and worked case came from Inshell.
- Agent-Art-Lab is the shared Guidance, research and annotated-archive project.
  The operator selected `Agent-Art-Lab` as the project and repository name on
  2026-09-20; this updates the preparation-stage record that left the name open.
- Participating artwork/practice repositories may keep their own owners and
  locations. A shared place to discover and learn is not compulsory ownership
  of every participating project.
- `inshell.art` and THOUGHT remain practice/application contexts. Their
  participation and evidence do not make them owners of the shared Lab.

This is organizational direction, not verified GitHub account state.
Availability/control of the `agent-art` namespace, visibility and licensing
remain for the Lab task to resolve with the operator under
the relevant authority. No organization, repository, remote or membership was
created or verified in this preparation. No repo was transferred or published.

## Repository grouping direction, 2026-09-20

The operator explicitly identified `signatures.gallery` as another repository
that should belong under `agent-art`, alongside Agent-Art-Lab. This is a
project-specific ownership direction; other participating practices are still
not required to transfer ownership.

| Repository | Intended GitHub owner | Observed state |
| --- | --- | --- |
| `Agent-Art-Lab` | `agent-art` | Local unpublished candidate. |
| `Agent-Art-signatures.gallery` | `agent-art` | Existing local checkout's configured origin is `inshell-art/Agent-Art-signatures.gallery`; remote ownership was not independently verified. |

Keep these as separate repositories. The Lab's `projects/` directory holds
study collections and references; this direction does not move gallery source
code into the Lab. The gallery's current repository name is retained in this
plan; no repository rename was requested.

A public lookup did not establish whether the `agent-art` GitHub namespace is
available or controlled by the operator. Next establish that account state and
organization ownership, then prepare Lab publication and the gallery transfer
with their respective visibility and project dependencies reviewed. No
organization creation, remote change, repository transfer or publication was
performed during this planning update.

## Retrieval and attribution limits

The operator explicitly corrected the organization context to `agent-art`.
A related side-chat titled **Compulsory Organization Structure** explained the
non-compulsory ownership principle. The full organization proposal was not
available through the retrieved task-history view. This recap therefore does
not reconstruct the missing proposal, claim a completed organization setup or
treat an assistant suggestion as a prior authorization. The repository name
above comes from the operator's subsequent explicit naming request.

The existing Inshell definition links and the source repository in
[provenance](../PROVENANCE.json) stay unchanged as source attribution.
They are not the Lab's governance or publication destination.

## Division of work

| Owner/task | Continues | Does not take over |
| --- | --- | --- |
| Website maintainer, formerly the Agent-Art-Lab task | This repository; whole website, Blog, Guidance, archive, public overviews and site integration | Inshell deployment, Protocol SDK releases or artwork fixes by default. |
| Protocol maintainer | `agent-art-protocol`; specifications, SDK, component behavior and release qualification | Website content and release, or an artwork's aims and renderer. |
| Inshell release maintainer (DEPLOY-SUPERVISOR in the split record) | Inshell Studio Preview release coordination and concrete release blockers | This website's maintenance or an automatic shared research programme. |
| Inshell development maintainer (Applications in the split record) | `inshell.art` implementation, fixes and project-specific tooling | Shared definition ownership or all Agent Art practice. |
| Each practice repository | Its artistic aims, implementation, evidence and release decisions | A requirement to transfer ownership to participate. |

The September 20 split created the dedicated Lab-maintenance responsibility;
its recorded task labels remain in [the completed handoff](../HANDOFF.md).
That website maintainer now owns Agent Art Work's site and Blog publishing.
Research is undertaken when a question warrants it, with its own scope and owner.
Existing source artifacts remain in their original repositories. There is no
automatic cross-repository sync.

## Collaboration after the split

A practice can raise a question and choose an appropriate inquiry with its
owner. Relevant Lab records may inform it. The owning project performs any
authorized project-specific investigation; selected accounts can be proposed
for Blog publication. Use identified records and revisions, not copied secrets
or an implicit shared runtime. Neither a study nor its publication is required
for ordinary site maintenance or for an artist to make Agent Art.

The historical Codex acquisition diagnosis remains in the archive. Present
product status and any repair belong to Inshell's maintainers and have not been
revalidated by this instruction cleanup. Research completion is not an extra
deployment gate; a website release does not establish a research finding.

Start from [HANDOFF](../HANDOFF.md). Preserve the existing authority boundaries;
documentation is not permission for live trials, paid usage or publication.
