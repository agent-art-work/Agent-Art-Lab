# Agent Art Work

Art, tools and research with Agents.

This repository owns [agentart.work](https://agentart.work/): the Agent Art Work
website, its Manifesto, definition, Works showroom, Blog, and public explanations of Protocol
and Ask your Agent.
**Agent Art is art in which an Agent’s intention enters the work as an artistic
contribution alongside human intention.**
A tool call, generated asset or successful reading handoff does not establish
that participation alone. Each artwork keeps its own aims and implementation.

**Source of truth:** Agent Art Work is the root of this initiative and the
authoritative home for its definition, manifesto, Protocol and shared tools.
Inshell is the first builder artist, with its own "inspect self" direction and
three movements: THOUGHT, WILL and AWA. The [Works showroom](docs/WORKS.md) presents
these and other artists' works with attribution; Blog remains the publication
for articles and studies. Artwork ownership and operation stay with the artists.
See the [ownership boundary](docs/ORGANIZATION_AND_SPLIT.md#source-of-truth-and-builder-artists-2026-10-23).

**The v2 direction:** Agent Art Work is the umbrella; **Blog** replaces the Lab
as the public publication section. The existing repository is renamed from
`Agent-Art-Lab` to `agentart.work`, retaining its contribution history, articles
and evidence records. Historical Lab names and stable document identities stay
intact. See [handoff](HANDOFF.md) for implementation and deployment status;
v2 is approved for a production release candidate; see GitHub releases for
the deployed revision.

The website presents these Markdown sources as readable pages and complete,
verifiable agent downloads. See [site maintenance](site/README.md) for its build
and publication path. Agents start with the
[document index](https://agentart.work/agent-index.json) and
[access guide](docs/AGENT_ACCESS.md).

**Contribute an article:** start with notes or a draft and work with an agent
and the website maintainer, or submit a PR directly. The
[contribution guide](CONTRIBUTING.md) explains both paths, local review and
publication. Git registration and checks belong to the publishing maintainer
or contributing agent, not every author.

## Start here

Read [agent instructions](AGENTS.md), [current status](HANDOFF.md#current-position)
and the current [ownership context](docs/ORGANIZATION_AND_SPLIT.md), then follow
the requested work:

| Work | Start here |
| --- | --- |
| Website maintenance | [Site maintenance](site/README.md): pages, design, integration, local preview and checks. |
| Blog publishing | [Contribute](CONTRIBUTING.md): develop a draft with an agent/maintainer or submit directly by PR. |
| Optional research | [Research guidance](GUIDANCE.md) and the collection relevant to a concrete question. Use the [intake](templates/PROJECT.md) and [study template](templates/STUDY.md) only where helpful. |

THOUGHT, Pulse and Agent handoff are retained case collections, not prerequisites
for every task. Earlier handoff instructions describe their recorded work and
must not silently become the next website task.

**Repository:** [agent-art-work/agentart.work](https://github.com/agent-art-work/agentart.work),
under the [agent-art-work organization](https://github.com/agent-art-work).
The original Lab edition was first published on 2026-09-21. Its shared practice
and reviewed derivative records remain available; they are not a validated
universal method, portable runtime or complete artwork archive. The organization
was registered as `agent-art-collective` on 2026-09-21 and renamed on 2026-10-03.
Repository visibility is public. No reuse license has been selected. See the
[organization context and task split](docs/ORGANIZATION_AND_SPLIT.md).

## What lives here

| Component | Purpose |
| --- | --- |
| [Agent Art Work](docs/AGENT_ART_WORK.md) | The umbrella website and the relationship between its activities. |
| [Manifesto](docs/MANIFESTO.md) | The declaration and invitation: face Agent intention and make work from the encounter. |
| [Agent Art](docs/AGENT_ART.md) | The definition and its implications for contribution, artistic standing and evidence. |
| [Works](docs/WORKS.md) | A showroom for THOUGHT and other works, with artist attribution and links to their owning sites. |
| Blog | One dated article feed at `/blog/`, retaining the slogan “Articles, studies and working notes on Agent Art.” |
| [Protocol](docs/PROTOCOL.md) | Public overview of the developing infrastructure; specifications, SDK and implementation stay with `agent-art-protocol`. |
| [Ask your Agent](docs/ASK_YOUR_AGENT.md) | The Protocol reading component and how visitors take public context into their chosen Agent. |
| [Research guidance](GUIDANCE.md) | Optional research guidance inherited from Lab; not a website or publication workflow. |
| [Research notes](research/README.md) | Sources, what they suggest, and where transfer is unsupported. |
| Project collections: [THOUGHT](projects/thought/README.md), [Pulse](projects/pulse/README.md), [Agent handoff](projects/agent-handoff/README.md) | Project-specific studies, observations and evidence limits. |
| [Findings register](findings/REGISTER.md) | Observations and scoped provisional practices; no automatic promotion to theory. |
| [Templates](templates/STUDY.md) | Lightweight records adapted to the work, including retrospective diagnosis. |
| [Boundaries](docs/BOUNDARIES.md) | The inherited Lab method, project tooling, live trials, canaries and releases have different aims. |
| [Provenance](PROVENANCE.json) | Source-document identities and changes made for this portable edition. |

## Lab history and optional research

Agent Art Lab is the historical foundation of this repository and an inherited
research practice. It has no separate standing programme in the current website
work. Its dated records, attribution, URLs and document identities remain intact.
Blog publishes essays, artists' accounts, working notes and selected studies;
publishing an article does not require undertaking a study.

Research begins when a concrete question warrants investigation. Its owner
chooses an appropriate method and scope, using [Research guidance](GUIDANCE.md) if useful.
THOUGHT's technical cases do not establish a universal artistic method or require
other works to use its tools. Artists choose whether and how to present evidence;
audiences judge. Technical and research claims still need appropriate support.

Current definitions and tool instructions live on their maintained pages.
Preserve historical observations and add dated corrections when context changes.
A record date is not a freshness guarantee or authority to resume an old trial.

## Check this repository

Requires Python 3.10+ standard library only:

```sh
python3 -B scripts/check.py
python3 -B -m unittest discover -s tests
```

These offline checks validate packaging, local links, JSON and selected
publication-risk patterns. The root `local/` folder holds ignored, machine-local
QA artifacts and is outside the portable package; keep it untracked. Package
sources must not link to those artifacts. Source documents still undergo the
same size/count limits and disclosure checks. They do not verify historical claims, remote links,
model behavior, artwork quality or every possible secret.
Article contributions also require the site checks listed in the
[complete contribution procedure](CONTRIBUTING.md).

## Scope of this edition

The THOUGHT records distinguish simulations, real-Agent fixture observations,
product canaries and source inspection. Some underlying evidence is privately
retained and unavailable here. No raw chats, run credentials, local account
configuration, live batch settings or application source are included.

This repo can be handed to a new agent without the originating conversation.
It cannot reproduce private canaries or run THOUGHT by itself. See
[Handoff](HANDOFF.md) for the exact next task and limits.

The inherited Lab records retain their definition sources at Inshell:
[Agent Art](https://inshell.art/docs/agent-art) and
[THOUGHT](https://inshell.art/docs/thought).
Those sources remain part of the records' history and attribution, not Agent
Art Work's organizational ownership. The v2 [Manifesto](docs/MANIFESTO.md) and
[Agent Art definition](docs/AGENT_ART.md) state this website's position without
rewriting those earlier records or claiming consensus across the wider field.

## Publication and reuse

Public repository publication was authorized by the operator on 2026-09-21.
No open-source or Creative Commons license has been selected. Do not infer
redistribution rights for third-party research or private evidence.
See [contribution and publication rules](CONTRIBUTING.md).
