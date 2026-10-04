# Contribute an article

Contribute through a pull request to
[agent-art-work/Agent-Art-Lab](https://github.com/agent-art-work/Agent-Art-Lab),
with **`main` as the base branch**. This guide is the complete path for a human
or agent contributing from another project. The source project keeps its code,
tools, ownership and releases; the Lab receives the reviewed article.

**Prepare Markdown → register the article → run checks → open a PR → Lab review
and merge → automatic publication at [agentart.work](https://agentart.work/).**
Opening a PR does not publish the blog. Contributors leave merging to the Lab
maintainer/operator unless separately asked to merge.

## 1. Start with the task and a separate Lab checkout

Read [agent instructions](AGENTS.md), [README](README.md),
[Guidance](GUIDANCE.md), [current handoff](HANDOFF.md) and
[organization context](docs/ORGANIZATION_AND_SPLIT.md), then the relevant project
collection. For an article contribution, follow this guide rather than taking
on an unrelated next task in the handoff.

A request to contribute an article and open a PR supplies the direction for that
reviewable contribution. Follow the user's scope for material that may be made
public, and use available, permitted Git/GitHub tools. These documents grant no
access to private history, new live trials, spending or unrelated publication.
Do not ask again for permission already given. If account access or publication
scope is missing, report that specific gap and preserve a reviewable draft.

Work in a separate Lab clone or a suitable existing clean Lab checkout. Do not
change the source project's Git remotes or include its unrelated changes. Use a
branch such as `codex/article-your-topic`; replace example names below with the
actual article slug and account. Do not push directly to `main` for a contribution.

**With write access to the Lab:** from a directory outside your source project,
clone the Lab into a new directory, then branch from current `origin/main`:

```sh
git clone https://github.com/agent-art-work/Agent-Art-Lab.git
cd Agent-Art-Lab
git fetch origin
git switch -c codex/article-your-topic origin/main
```

**Without write access:** create or reuse your own fork on GitHub, clone that
fork into a separate directory, and add the Lab as `upstream`. For a fresh clone:

```sh
git clone https://github.com/YOUR-ACCOUNT/Agent-Art-Lab.git
cd Agent-Art-Lab
git remote add upstream https://github.com/agent-art-work/Agent-Art-Lab.git
git fetch upstream
git switch -c codex/article-your-topic upstream/main
```

In an existing Lab checkout, first inspect `git status` and `git remote -v`.
Reuse the correct remotes instead of adding duplicates or overwriting them.
Fetch the Lab remote's `main`, then create a new contribution branch from that
ref. A fork's own `main` may be behind. GitHub authentication is needed to push
and open the PR; a public clone alone does not establish write access. If no
permitted push/fork path is available, hand the draft or patch to the operator
and state that no PR was opened.

## 2. Write the article and register it

For an existing collection, add the article at
`projects/PROJECT/studies/YYYY-MM-DD-short-topic.md` and link it from that
collection's `README.md`. Use the actual project slug, such as `pulse` or
`thought`. The `studies` directory also holds articles and working notes;
choosing that path does not require claiming an experiment was performed.

Use one `# Title`, followed by ordinary Markdown. Adapt the
[study template](templates/STUDY.md) to the material and omit irrelevant fields.
At minimum, give the question or purpose, project and record date, what was
observed or learned, source attribution, evidence limits and remaining questions.
Keep proposals labelled unrun. Distinguish direct observations from reports and
interpretation. Do not invent missing evidence to complete a template.

Add one object to the array in [site/studies.json](site/studies.json), following
its existing entries. Each object needs:

| Field | What to provide |
| --- | --- |
| `source` | Repository-relative Markdown path, unique in the catalogue. |
| `title` | Feed title consistent with the Markdown H1; it may be shorter. |
| `project` | Display name of the owning project. |
| `date` | Record date in `YYYY-MM-DD` form, not the deployment date. |
| `status` | Honest record type/status, such as `Retrospective study` or `Working note`; use `Study proposal` for an unrun proposal. |
| `evidence` | Short label naming the kind and access limits of the evidence. |
| `summary` | Short description of what the record supports, including its main limitation. |

The build sorts the feed by record date, newest first, then title. Editing an
existing article normally needs no new catalogue entry. Preserve its original
date and observations; append dated corrections and adjust the summary when
needed. Link a justified provisional practice from the
[findings register](findings/REGISTER.md), but not every article needs one.
Update [HANDOFF.md](HANDOFF.md) only if current work or ownership changes.

Do not edit generated `_site/` HTML, indexes or JSON exports. The build generates
the homepage, article navigation and complete agent downloads from these sources.
For rendering details and local preview, see [site maintenance](site/README.md).

## 3. If this is a new project collection

A new collection can be proposed in the same PR; Lab maintainers decide whether
to admit it during review. Do not put an unrelated project under THOUGHT or Pulse
to get around the current publication selection. Use a lowercase slug with
letters, digits and hyphens, such as `example-work`.

1. Create `projects/example-work/README.md`, adapting the
   [project intake](templates/PROJECT.md). Name the owner/source repository,
   premise, scope, evidence access and article index. Create its `studies/`
   directory and add the article plus catalogue entry as above.
2. In [scripts/build-site.mjs](scripts/build-site.mjs), add the collection README
   to `routes` with output `projects/example-work/index.html`, and add the slug
   to the explicit project list used by `actualStudies`.
3. In [scripts/check_agent_documents.py](scripts/check_agent_documents.py), add
   the README to `ROUTES` with output `projects/example-work/`. Add only the new
   slug to `source_catalogue`'s project-name allowlist: for example, extend
   `(?:thought|pulse)` to `(?:thought|pulse|example-work)`. Keep the rest of the
   path restriction intact; do not accept arbitrary repository files.
4. Link the collection from the root [README](README.md). Run all checks below;
   confirm its article appears in the home feed and both its README and article
   appear in `agent-index.json` with complete downloads.

These small configuration edits keep publication explicit. Existing-project
articles need no route or allowlist edits. Leave application code, credentials,
private source material and project-specific runners in their owning repository.
New records do not become original-edition imports in
[PROVENANCE.json](PROVENANCE.json); use that manifest only for an actual change
to the provenance it describes.

## 4. Validate and review the exact diff

Use Node.js 22+ and Python 3.10+. If dependencies are absent and installation is
permitted, run `npm ci --ignore-scripts` using the committed lockfile. From the
Lab root, run the same checks as the [Pages workflow](.github/workflows/pages.yml):

```sh
python3 -B scripts/check.py
python3 -B -m unittest discover -s tests
git diff --check
npm test
npm run build
npm run check:site
```

Use the default root-path build for `https://agentart.work/`; clear an inherited
`SITE_BASE_PATH` override before these checks. Inspect the built article and its
links. Use a browser for desktop/narrow layout checks when changing templates,
styles or wide content. The site check also verifies agent export identities,
revisions, exact bytes and links; a successful build alone is not that check.

Review the diff manually for unsupported claims, missing attribution, private
raw handoffs, credentials, personal paths, private source identifiers and rights
issues. Automated checks are not a complete disclosure audit or verification of
historical claims. Third-party research stays linked and summarized with
attribution; do not import whole papers. Private evidence may remain private:
state that limitation. No reuse license has been selected for this repository.

Report commands and actual results in the PR. If a tool, dependency or check is
unavailable, state exactly what was not run; do not call it a pass. Submit a
draft PR if validation or content remains incomplete, and identify what the
maintainer needs to resolve. A fork workflow may wait for maintainer approval
before GitHub runs it; do not change workflow permissions to work around that.

## 5. Commit, push the branch and open the PR

Stage only the reviewed contribution files by name, inspect `git diff --cached`,
and commit with a descriptive message. Keep generated output, `node_modules/`
and unrelated project changes out of the commit. Then push your branch to the
verified `origin` (the Lab for a writer, or your fork otherwise):

```sh
git push -u origin codex/article-your-topic
```

On GitHub choose **base repository `agent-art-work/Agent-Art-Lab`, base
branch `main`**, and your pushed branch as the compare/head. For a fork, select
your fork as the head repository. Fill the
[PR template](.github/PULL_REQUEST_TEMPLATE.md) with purpose, evidence limits,
changed files and check results. Mention explicitly when proposing a new collection.

If GitHub CLI is available, prepare that body in a temporary file outside the
checkout, then use the following form, replacing the title, branch and body path:

```sh
gh pr create --repo agent-art-work/Agent-Art-Lab --base main \
  --head codex/article-your-topic --title "Article: your title" \
  --body-file ../article-pr.md
```

For a personal fork, use `--head YOUR-ACCOUNT:codex/article-your-topic`. For an
organization-owned fork, use GitHub's web interface if the installed CLI cannot
address it. Add `--draft` when appropriate. Return the actual PR URL, check
results and unresolved gaps to the operator. Keep follow-up corrections on the
same branch/PR. Do not enable auto-merge or merge as part of contribution alone.

## 6. Lab review and publication

The operator authorized the dedicated Lab maintainer on 2026-10-04 to merge
future Lab PRs once validation passes, without asking again. Validation includes
substantive review of scope, evidence, privacy, rights and integration, plus all
required checks against the actual PR head. If the head changes, review the
changes and validate that revision before merging. Stop and report blockers;
passing automated checks alone is insufficient. This standing direction does
not authorize contributing agents to merge their own submissions.

The `Publish reading site` workflow builds and checks PRs; it does not deploy
them or provide a hosted PR preview. A merge
into `main` triggers a build and GitHub Pages deployment to
[agentart.work](https://agentart.work/). Opening or approving a PR is not evidence
that deployment finished.

After merging, the maintainer checks that deployment succeeded and verifies the
live article, home-feed link and agent download against the new index. Report
any deployment or retrieval failure separately from PR/merge status. Roll back a
bad publication by reverting its source commit through the same reviewed path.
Publication does not transfer project ownership or change repository licensing.

## A request to give another agent

```text
Contribute an article about [topic] from this project to
https://github.com/agent-art-work/Agent-Art-Lab.
Follow its CONTRIBUTING.md, preserve evidence limits, and include only material
permitted for public sharing. Prepare the article and required catalogue or new
collection changes, run the documented checks, and open a PR targeting main.
Return the PR URL and check results. Leave merging to the Lab maintainer.
```
