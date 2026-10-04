# Agent-Art-Lab

Articles, studies and working notes on Agent Art.

Agent-Art-Lab is a shared practice and annotated archive for **Agent Art:
art in which an Agent participates at the level of intention**.

The name is **Agent-Art-Lab**. Its scope is Agent Art, not only prompt acceptance,
THOUGHT, or website deployment. It helps projects research a question, refine a
study, observe what happens, analyze the result, and develop revisable practices.
Each artwork keeps its own artistic aims and implementation.

**Read the Lab:** [Agent-Art-Lab blog](https://agentart.work/).
The site presents these Markdown records with reading navigation. See
[site maintenance](site/README.md) for the build and publication path.
The domain is intended as a broader home for Agent Art works and projects,
starting with the Lab. This repository remains Agent-Art-Lab.
For agents, start with the [document index](https://agentart.work/agent-index.json)
and [access guide](docs/AGENT_ACCESS.md) for complete, verifiable downloads.

**Contribute an article from another project:** follow the
[article-to-PR guide](CONTRIBUTING.md) for the destination, source records,
site registration, checks and review submission.

## Start here

1. Read [agent instructions](AGENTS.md) and [Guidance](GUIDANCE.md).
2. Read [handoff and current status](HANDOFF.md).
3. Browse the [THOUGHT collection](projects/thought/README.md), our first case.
   The [Pulse collection](projects/pulse/README.md) studies document access for agents.
   The [Agent handoff collection](projects/agent-handoff/README.md) examines
   reading invitations and public knowledge access across websites.
4. Use the [project intake](templates/PROJECT.md) and [study template](templates/STUDY.md)
   for a new inquiry.

**Current state:** standalone v0 first published on 2026-09-21; now at
[agent-art-work/Agent-Art-Lab](https://github.com/agent-art-work/Agent-Art-Lab).
It contains a usable documentation practice and reviewed derivative records,
not a validated universal method, portable runtime, or complete artwork archive.
The umbrella is **Agent Art Work**, with the website **agentart.work** and
GitHub organization [agent-art-work](https://github.com/agent-art-work).
The organization was registered on 2026-09-21 as `agent-art-collective` and
renamed on 2026-10-03. **Agent Art Lab** is its research and publication component;
the repository name remains `Agent-Art-Lab`.
Repository visibility is public. No reuse license has been selected. See the
[organization context and task split](docs/ORGANIZATION_AND_SPLIT.md).

## What lives here

| Component | Purpose |
| --- | --- |
| [Guidance](GUIDANCE.md) | Shared foundations and methods, not a fixed creative recipe. |
| [Research notes](research/README.md) | Sources, what they suggest, and where transfer is unsupported. |
| Project collections: [THOUGHT](projects/thought/README.md), [Pulse](projects/pulse/README.md), [Agent handoff](projects/agent-handoff/README.md) | Project-specific studies, observations and evidence limits. |
| [Findings register](findings/REGISTER.md) | Observations and scoped provisional practices; no automatic promotion to theory. |
| [Templates](templates/STUDY.md) | Lightweight records adapted to the work, including retrospective diagnosis. |
| [Boundaries](docs/BOUNDARIES.md) | Lab, project tooling, live trials, canaries and releases have different aims. |
| [Provenance](PROVENANCE.json) | Source-document identities and changes made for this portable edition. |

## Working rhythm

**Question → research → refine the study → observe/test → analyze/compare →
record → revise Guidance when justified.**

Practice-led exploration need not be a controlled experiment. A comparison does
need declared factors, measures and limits. Technical completion, intentional
participation, creative interpretation and artwork judgment remain distinct.

Projects instantiate their own small labs when useful. With a few materially
different artworks expected per year, shared text and good records are the
default. A generalized runner is not a prerequisite.

## Check this repository

Requires Python 3.10+ standard library only:

```sh
python3 -B scripts/check.py
python3 -B -m unittest discover -s tests
```

These offline checks validate packaging, local links, JSON and selected
publication-risk patterns. They do not verify historical claims, remote links,
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

This edition retains its existing public definition sources at Inshell:
[Agent Art](https://inshell.art/docs/agent-art) and
[THOUGHT](https://inshell.art/docs/thought).
This repository does not supersede those sources. That attribution identifies
the source of this edition's definition, not Agent-Art-Lab's organizational ownership.

## Publication and reuse

Public repository publication was authorized by the operator on 2026-09-21.
No open-source or Creative Commons license has been selected. Do not infer
redistribution rights for third-party research or private evidence.
See [contribution and publication rules](CONTRIBUTING.md).
