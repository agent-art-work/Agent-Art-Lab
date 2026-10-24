# Contribute an article

Blog welcomes essays, artists' accounts, working notes and studies about Agent
Art. You can develop a draft with an agent and the website maintainer, or submit
a pull request directly. Both paths lead to editorial review and checked
publication at [agentart.work](https://agentart.work/).

The source artist or project keeps its work, code, tools and releases. Publishing
an article here does not transfer ownership. An artist's account need not become
a technical study: support factual claims appropriately, distinguish observation
from interpretation, and credit the work and sources you draw on.

## Path 1: develop a draft with an agent

**Notes or draft → develop the article → review a local page → approve publication
→ maintainer handles checks, PR and release.**

1. Bring a draft, notes or a subject to the website maintainer, with an agent's
   help if useful. Name the intended author/byline, purpose and intended readers.
2. Develop a title, summary and body. Include sources and limitations where
   relevant to the claims; no research template is required for an essay or
   artist's account. Agree the publication date for a new article; retain the
   original record date for a historical study.
3. The maintainer prepares the local preview and handles the source placement,
   catalogue and checks described below. Review the wording, attribution and
   page together. A draft or preview request alone does not authorize publishing.
4. When the operator authorizes public submission/publication, the maintainer
   prepares the PR and follows the review and release procedure below. Existing
   authorization remains valid within its scope; report blockers rather than
   repeatedly requesting the same permission.

No GitHub account or Git commands are needed from the author on this path.
There is no submission form or private editorial service on the site: this is
collaboration with the maintainer. Keep private drafts local and out of commits
intended for public sharing. A public branch or PR, including a **draft PR**,
exposes its contents before the website is deployed.

## Path 2: contribute directly by PR

**Prepare Markdown → register the article → run checks → open a PR → maintainer
review and merge → verify publication.**

This path suits contributors and agents already working with Git. Target
[agent-art-work/agentart.work](https://github.com/agent-art-work/agentart.work),
base branch **`main`**. Use a separate clean checkout and a contribution branch
such as `codex/article-your-topic`; fork the repository if you lack write access.
Do not change the source project's remotes or include unrelated changes.

Read [agent instructions](AGENTS.md), [README](README.md),
[current status](HANDOFF.md#current-position) and the current
[ownership context](docs/ORGANIZATION_AND_SPLIT.md). Read source records relevant
to the article's claims; use [Research guidance](GUIDANCE.md) for research reports or an
inquiry that needs it. Ordinary articles require no study intake or Lab-method
evaluation. Follow the contribution task, not earlier tasks in the handoff.
These documents grant no private-history access, live trials, spending or
publication authority beyond the operator's request.

Use the publishing procedure below. If you cannot push or open a PR, return the
local draft or patch to the maintainer and report the limitation. Contributions
request review; they do not authorize contributors to merge their own PRs.

## Publishing procedure for the maintainer or contributing agent

These mechanics apply to both paths. Authors using Path 1 do not need to perform
them. The current builder still uses project collections; this guide does not
introduce a CMS, scheduled posts or a private-draft state. Every catalogue entry
is published by the build, regardless of its `status` label.

### Prepare the source

For an existing collection, place the source at
`projects/PROJECT/studies/YYYY-MM-DD-short-topic.md`, and link it from the
collection's `README.md`. Use one `# Title` and ordinary Markdown. Put an agreed
byline in the body; the current catalogue has no author field. The `studies`
directory also holds articles and working notes and does not imply an experiment.

Use the [study template](templates/STUDY.md) only when useful. Research reports
need a bounded question, method, sources and evidence limits; proposals must
remain labelled unrun. An essay or artist's account can use its own form.
Do not fabricate evidence or impose technical proof as a condition of art.

Add an entry to [site/studies.json](site/studies.json):

| Field | Meaning |
| --- | --- |
| `source` | Unique repository-relative Markdown path. |
| `title` | Feed title consistent with the source H1. |
| `project` | Owning project or collection display name. |
| `date` | Record date, `YYYY-MM-DD`; never the rebuild date. |
| `status` | Honest kind, such as Essay, Artist account, Working note, Retrospective study or Study proposal. This is not a publication gate. |
| `evidence` | Short basis/limits label appropriate to the piece, such as artist's account or attributed interpretation; not an artwork qualification. |
| `summary` | What readers will find, without overstating the claims. |

For a newly written article, use its agreed publication date as the record date;
this field does not track actual deployment. Retain historical record dates,
source paths, document IDs and URLs. Add dated corrections or later-development
notes rather than rewriting past observations. Scope old product-status claims
to their observation date; verify with the owner before asserting present status.
Current definitions and tool instructions belong on their maintained pages.

The feed sorts by record date, newest first, then title. Adjust summaries when
later context changes their meaning. Update [findings](findings/REGISTER.md) or
[Research guidance](GUIDANCE.md) only when justified by the claims, and [HANDOFF](HANDOFF.md)
when current work or ownership changes. Do not edit generated `_site/` output.

### A topic outside the existing collections

Do not force an unrelated article into THOUGHT, Pulse or Agent handoff. The
maintainer decides its collection placement and handles registration; an author
can supply the draft without making these code changes. With the current build:

1. Create `projects/example-work/README.md` and its `studies/` directory. Adapt
   the [project intake](templates/PROJECT.md), omitting irrelevant study fields.
   Name the collection's purpose, attribution and article index.
2. Register the README route and add the collection slug to `actualStudies` in
   [scripts/build-site.mjs](scripts/build-site.mjs).
3. Add the README route to `ROUTES` and the slug to the `source_catalogue`
   allowlist in [scripts/check_agent_documents.py](scripts/check_agent_documents.py).
   Keep that allowlist explicit; do not expose arbitrary repository files.
4. Link the collection from [README](README.md), then verify the feed, article
   and complete Agent downloads. Mention the new collection in the PR.

Leave application code and private material with their owners. Do not modify
[PROVENANCE.json](PROVENANCE.json) for a new article; it describes original-edition
imports. General article storage is a separate future implementation decision.

### Check and submit

Use Node.js 22+ and Python 3.10+. If dependencies are missing, install with
`npm ci --ignore-scripts` only when authorized. Run the same checks as the
[Pages workflow](.github/workflows/pages.yml), using the default root-path build
for agentart.work (clear an inherited `SITE_BASE_PATH` override):

```sh
python3 -B scripts/check.py
python3 -B -m unittest discover -s tests
git diff --check
npm test
npm run build
npm run check:site
```

Inspect the rendered article and its links; check desktop and narrow layouts
when templates, styles or wide content change. Verify the complete Agent export
against its index. Automated checks do not verify historical claims, rights or
all private disclosures: review attribution, evidence limits, personal paths,
credentials and private source material separately. No reuse license has been
selected; do not infer rights to republish third-party work.

Stage only reviewed contribution files, inspect `git diff --cached`, commit and
push the contribution branch to its verified remote. Open the PR against
`agent-art-work/agentart.work:main`, using the [PR template](.github/PULL_REQUEST_TEMPLATE.md).
Report actual check results and any blockers, including unrelated failing checks.
A draft PR may record incomplete validation only if its contents are ready for
public exposure. Never label an unrun check as passed or weaken checks to publish.

Return the PR URL and review notes. Keep corrections on the same PR; do not
merge or enable auto-merge as part of contribution alone. See
[site maintenance](site/README.md) for build and preview details.

### Review and release

The operator's 2026-10-04 standing direction authorizes the dedicated website
maintainer to merge contributions once validation passes. Review scope, claims,
evidence, privacy, rights and integration, plus required checks against the actual
PR head. If it changes, validate the new revision. Stop for blockers; passing
checks alone is insufficient. This does not authorize contributors to merge,
Protocol releases or deployment of the local v2 redesign.

The `Publish reading site` workflow checks PRs but does not deploy them or host
PR previews. Merging to `main` triggers GitHub Pages publication. Approval or
merge alone does not establish successful deployment: verify the live article,
feed link and complete Agent download against the new index. Report failures
separately; revert a bad publication through the reviewed path if necessary.
Publication does not change ownership or licensing.

### PR notifications for the maintainer


`Notify site maintainer of pull requests` assigns newly opened PRs targeting
`main` (including drafts) to `inshell-art` through GitHub Actions. Assignment
routes the PR to the operator; it does not mean review passed. Existing assignees are preserved. An already
assigned PR produces no additional assignment notification. PRs created using
another workflow's `GITHUB_TOKEN` do not trigger this workflow automatically;
use the manual recovery below for those PRs.

GitHub Mobile supports assignment pushes. Sign in as `inshell-art`, enable
assignment notifications in the app's notification settings, and allow phone
notifications. Working hours and device settings can delay delivery. See
[GitHub's notification settings](https://docs.github.com/en/subscriptions-and-notifications/get-started/configuring-notifications).
A successful workflow confirms assignment, not receipt on a phone. This does
not wake the desktop maintainer chat or merge anything; send the PR link to the website
maintainer session for review under the standing direction above.

The notifier runs trusted default-branch code with only `pull-requests: write`.
It never checks out or executes contributor code or downloads PR artifacts.
The repository's existing Actions event allowance targets only
`.github/workflows/pr-notifications.yml`, allowing `pull_request_target` and
`workflow_dispatch`; keep that allowance scoped when maintaining the workflow.

To test or recover a missed assignment, run **Notify site maintainer of pull
requests** from Actions on `main`, supplying an existing PR number. Closed or
merged PRs are accepted for this manual test. It sends a real assignment when
needed, so do not unassign/reassign just to repeat a push. Inspect the run and PR
assignees, then confirm receipt on the phone separately. Disable this workflow
in Actions to stop automatic assignments.

## Requests to give another agent

For a local draft:

```text
Help me develop an article about [topic] for Agent Art Work.
Follow Path 1 in its CONTRIBUTING.md. Work with the website maintainer to prepare
a local preview. Preserve attribution and evidence limits. Keep the draft local;
do not push, open a public PR or publish until authorized.
```

For a direct contribution:

```text
Contribute an article about [topic] to
https://github.com/agent-art-work/agentart.work.
Follow Path 2 in its CONTRIBUTING.md. Include only material authorized for public
sharing, register the article, run the checks and open a PR targeting main.
Return the PR URL and actual results. Leave merging to the website maintainer.
```
