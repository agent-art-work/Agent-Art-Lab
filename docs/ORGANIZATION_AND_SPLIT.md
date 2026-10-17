# Organization context and task split

Recorded 2026-09-20 following the operator's correction.

## Protocol repository split, 2026-10-17

The operator selected a separate, initially private repository:
[agent-art-work/agent-art-protocol](https://github.com/agent-art-work/agent-art-protocol).
It owns the candidate participation protocol and is the intended home for
future shared reference infrastructure, client integrations and conformance.
The current rollout is documentation only; it establishes no implemented or
qualified client path. Access requires repository permission.

Agent-Art-Lab continues research, studies, Guidance and publication. It does not
become the protocol runtime or its implementation repository. Participating
artworks retain their artistic conditions, experience, adapters and releases in
their own repositories. No transfer of artwork ownership is required.

The reusable architecture originated in WILL; its complete historical research
stays there, with the protocol repository recording a pinned source revision.
No private protocol text or WILL material is republished in this Lab pointer.
The earlier dated organization records below retain their historical scope.

## Current organization and repositories, 2026-10-03

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
| Operator-created Agent-Art-Lab task | This repository; shared Guidance, archive, study practice and publication preparation | Inshell deployment or project fixes by default. |
| DEPLOY-SUPERVISOR | Inshell Studio Preview release coordination and concrete release blockers | Ongoing central Lab establishment. |
| Applications | `inshell.art` candidate implementation, fixes and project-specific tooling | Shared Lab ownership or all Agent Art practice. |
| Each practice repository | Its artistic aims, implementation, evidence and release decisions | A requirement to transfer ownership to participate. |

The original preparation called for the operator to create a dedicated Lab
task. On 2026-09-20, OPS relayed the operator's explicit transfer direction and
this dedicated Agent-Art-Lab task accepted Lab ownership; see
[the completed handoff](../HANDOFF.md). DEPLOY-SUPERVISOR now focuses on
Inshell Studio Preview. Existing source artifacts remain
in their original repositories. There is no automatic cross-repository sync.

## Collaboration after the split

A practice can raise a question; the Lab can frame research or a study; the
practice can run its authorized project-specific investigation; the Lab can
record reviewed findings; the practice can apply useful lessons. Use identified
records and revisions, not copied secrets or an implicit shared runtime.

The current Codex acquisition diagnosis belongs in the archive. Its unresolved
product fix belongs to Applications and release coordination. Neither making
the Lab more general nor completing a practice-led study is an extra deployment
gate. Conversely, shipping the website does not complete the Lab.

Start from [HANDOFF](../HANDOFF.md). Preserve the existing authority boundaries;
documentation is not permission for live trials, paid usage or publication.
