# Reading site maintenance

The site slogan is “Articles, studies and working notes on Agent Art.” Its shared
value in `scripts/build-site.mjs` supplies the homepage heading, footer and default
page description. The footer starts with the Agent-Art-Lab name linking home.
Below its reference links, “Part of” is plain text; a small Off grid icon beside
“Agent Art Work” shares the link to `https://github.com/agent-art-work`.
The hero contains the slogan, Ask your Agent component and original manual
prompt. Homepage metadata names the broader scope and the current Lab starting
point. Article-specific descriptions keep their own summaries.

The public reading site renders the existing repository Markdown. Edit the
original study or Guidance to change its article; do not edit generated HTML.
The homepage is the single blog feed. The former `/studies/` and `/lessons/`
listing URLs redirect to its articles section, with a visible fallback link and
no JavaScript requirement. The selected Quiet editorial layout uses a narrow
reading column and restrained rules. The operator selected Courier New Regular
with Dots as the fixed appearance on 2026-10-02.
The header's Off grid icon links home, with the accessible name “Agent-Art-Lab
home”; GitHub is the only separate top link. The icon is 40px inside a 44px link
target. The footer's secondary organization link uses an 18px icon;
its visible “Agent Art Work” text supplies the accessible name.
Light and dark colors follow the system preference through CSS, including live
system changes and reading without JavaScript. Dark mode uses warm charcoal,
light text and subtle dots. Print keeps a light background and dark text
regardless of the screen theme.

## Appearance

Courier New Regular and the Dots texture are set in the shared HTML and CSS.
Source emphasis and table headings remain bold. Device fonts use CSS fallbacks;
no font service or font download is required. The internal design chooser and
its preference script are removed from published pages, so previously saved
comparison choices no longer change the reading style. The earlier style demo
preserves its original, separate previews.

The favicon is **Off grid**, selected by the operator on 2026-10-03: nine dots
with one stepping outside the regular pattern. It retains the site's warm
paper/charcoal palette and carries its own system light/dark colors. The active
`site/assets/favicon.svg` matches `site/assets/icon-concepts/off-grid.svg`.
Both page builders use `?v=off-grid-1` to refresh earlier cached designs.

The separate [icon comparison page](https://agentart.work/icon-demo/) presents
three Agent Art Work concepts: Off grid, Shared stroke and Open form, in light
and dark contexts at 16, 32 and 96 pixels. Their SVGs live in
`site/assets/icon-concepts/`; `scripts/icon-demo.mjs` renders the comparison.
The page records Off grid as selected and preserves the two alternatives.

## Build and preview

On 2026-10-21 the operator authorized committing, pushing and deploying this
Ask your Agent integration to `agentart.work`, including its pinned
`@agent-art/protocol@0.1.1` archive and browser assets. This supersedes the earlier
local-only publication hold for this Lab candidate. The archive stays unchanged;
no reuse license, npm publication or protocol-repository visibility change is
implied. Keep private trial screenshots and raw evidence outside the release.
The immutable archive's README records its earlier pilot state. The Lab's
current integration is described here: no app discovery and receipts disabled.

The current explanation-link integration pins SDK 0.1.2 and adds the public
`/ask-your-agent/` route. The mark, label and decorative ⓘ share one ordinary
same-tab About link; ChatGPT, Claude and Copy remain separate actions. The About
link carries no invitation or Work query. Both versioned archives remain
immutable. The combined Lab and protocol qualification passed; PR #10 deployed
this scoped update on 2026-10-21. Live page navigation, component checks and all
19 exported documents were verified after deployment.

SDK 0.1.2 provenance was checked on 2026-10-21: all 11 packaged files match
`protocol/` at upstream source revision
`cb2cd37ea14c8853a0f003bec987f01843ed3978`. The vendored archive's SHA-256 is
`0a535238ad9eaecd973fa8127b7d24f745ca502908ad1f7377654ecdd8bdcfa5`.
The pushed upstream branch, lock integrity, installed package and all five live
browser assets were verified. Upstream source remains private; inspecting that
revision requires repository access, while the vendored package is available
in this public Lab repository. No package bytes changed for this provenance update.

Requires Node.js 22+ and Python 3.10+ for the offline checks:

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run check:site
```

The default build uses the root path for `https://agentart.work/`. For a local
preview at the same root path:

```sh
npm run build
npm run check:site
python3 -m http.server 8080 --bind 127.0.0.1 --directory _site
```

Open `http://127.0.0.1:8080`. To check a project-path deployment explicitly,
run the build and checks with `SITE_BASE_PATH=/Agent-Art-Lab`; restore the default
root build before publishing. Generated `_site/` and `node_modules/` are ignored and
excluded from the source packaging scan; the site checker validates the output.

Rebuilding does not update an already-open preview. Reload the exact tab used
for a handoff after rebuilding; reloading a separate Chrome tab does not update
an in-app preview. Previously sent messages and prefilled drafts retain their
old text. Before another handoff, expand the original prompt and check its
paragraphs. The generated adapter URL and its Work import carry content hashes
so the newly built homepage requests its matching prompt assets. Those hashes
do not refresh an already-mounted page or an old HTML document by themselves.
The SDK's five browser files are copied unchanged under
`assets/agent-art-sdk/0.1.2/`. Versioning the package directory gives its relative
module imports and stylesheet the same cache boundary. On an SDK update, change
that path in the build, adapter and output allowlist together with the package
pin; never overwrite a released package with different bytes.

## Add or revise an article

Follow [Contribute an article](../CONTRIBUTING.md) for the complete procedure:
existing or new project files, catalogue fields, full checks, branch/fork setup,
and a PR to `agent-art-work/Agent-Art-Lab:main`. That guide is the source
of contribution instructions; this file covers site behavior and maintenance.

The homepage lists every catalogue entry, ordered by record date
(newest first), with title as the tie-breaker. New records appear automatically;
there is no separately curated homepage feature. Dates are the source's record
dates, not inferred publication dates or the date of a rebuild. Article pages
label this explicitly and link to the previous/next entry in feed order.
Preserve earlier dates when making a correction; record the dated addition in
the source. The site does not imply a fixed publication schedule.

There are no separate Archive or Lessons browsing sections. Guidance and other
reference documents remain available through the footer, article links and agent
index. The complete findings register remains a source document.
Article bodies, links and heading anchors come from their original Markdown.
Repository operations such as the handoff stay linked on GitHub. Only the
explicit reading-page list and site assets are copied to the deployment artifact.

## Agent document access

The build also generates `agent-index.json`, `llms.txt` and one complete JSON
document per canonical reading source under `documents/`. These come from the
same Markdown bytes used for the HTML pages; do not edit the generated files.
The index carries separate source and download lengths/hashes, content revisions,
source paths and study evidence labels. Article pages link to their complete
document, and every page advertises the index. The generated `llms.txt` provides
another discovery entry point without promising automatic agent support.

The homepage hero contains the prompt from the access guide's “A prompt to use”
section in a native `details` disclosure, closed by default. “Copy the original
reading prompt” opens it with a pointer or keyboard, including without JavaScript.
Edit that canonical prompt to update both places. The full text remains in the
HTML source. A small optional script copies it on click; the expanded text is
selectable without JavaScript, and clipboard failure selects it for manual copying.
The prompt gives a no-question first run a bounded outcome: introduce the collection
from the index, distinguish that from documents actually read, report limits and
ask what the visitor wants to explore. A supplied question uses the complete
document-reading policy. The introduction does not require downloading every source.
Keep copyable prose as logical paragraphs, with one source line per paragraph;
do not add editor-width hard wraps inside sentences. The build and SDK preserve
that text for Copy and native URLs. The on-page prompt previews also preserve
paragraph breaks, so they do not hide formatting that recipients will receive.
Do not normalize arbitrary SDK context: line breaks in code, lists or quoted
sources can be meaningful.

The Ask your Agent component appears above that fallback. The build imports
`defineWork` from the locked SDK and copies its five packaged browser assets
without modification. `site/assets/agent-art-reading.mjs` mounts the SDK UI;
the Lab owns placement, Work metadata and the exact canonical prompt. Keep
component changes in the protocol project and version new SDK bytes separately.

The visitor explanation at `/ask-your-agent/` comes from
[What is Ask your Agent?](../docs/ASK_YOUR_AGENT.md), with a complete document
export in the agent index. Keep its explanation of shared context and receiving
app boundaries distinct from the technical retrieval contract at `/agent-access/`.

ChatGPT and Claude prepare native application URLs; Copy supports a conversation
the visitor chooses. The mounted controls use different routes:

| Control | Native route | Destination contract |
| --- | --- | --- |
| ChatGPT | `codex://new?prompt=...` | New local conversation with a prefilled composer; no explicit Chat/Work/Codex mode parameter is supplied. |
| Claude | `claude://claude.ai/new?q=...` | New Claude Chat, even when another tab was active; this is not the distinct `claude://code/new` route. |

See the [OpenAI deep-link reference](https://learn.chatgpt.com/docs/reference/commands)
and [Claude desktop link reference](https://support.claude.com/en/articles/14729294-open-claude-desktop-with-a-link).
On 2026-10-21 the operator reported Claude moving from Code to Chat, and the
ChatGPT route opening Work in its ChatGPT surface or a Codex session in its Codex
surface. The latter surface mapping is an operator observation, not a universal
mode guarantee. The SDK opens the destination URL and does not invoke a separate
Send action. Do not promise that every destination remains at a draft: in one
authorized Claude check, the first inspected view already showed a sent message
and running response, without a separate Send action by the inspecting agent.
That observation does not establish whether the app or an intervening operator
action submitted it. Review the actual destination state before acting again.
Copy is the path for a visitor-selected existing conversation or app mode.

These links do not prove installation, arrival, reading or Agent execution. The public
adapter provides no discovery callback or loopback helper. Receipts are explicitly
disabled. The component does not retrieve private conversations.
Permissions and final-answer delivery belong to the destination client. If its
visible chat reports an expired approval, do not infer that no work happened or
automatically resend the invitation. Inspect the existing run when authorized,
report any difference between execution and visible output, and let the operator
start a fresh client action if needed. Do not change security or proxy settings
as a reading-component repair.

The site check requires the complete page inventory (including the 404 page),
exact agreement between the hero prompt and its source, and a labelled document
index link on every page. Browser checks are still needed for computed visibility,
responsive overflow, clipboard behavior and reading without JavaScript.

See [the access guide](../docs/AGENT_ACCESS.md) for the reading contract, relative
source-link resolution and failure handling. `scripts/check_agent_documents.py`
independently checks the export selection, exact bytes and metadata as part of
the site check. When deliberately adding a new reading source, update that
checker's selection alongside the build routes. Tests include representation,
malformed-input and integrity-failure cases; no Agent or product trial is run.

For a deployment check, use ordinary permitted HTTP GET and HEAD for the index
and downloads, then verify the actual response bytes against the index and local
build. GitHub Pages controls response headers; do not infer MIME types, security
headers or live compatibility from local source checks. An inconsistent cached
index/document pair is a failure to report, not verified acquisition.

## Publishing

The [visual direction demo](https://agentart.work/style-demo/)
compares Plain-text journal, Swiss index and Quiet editorial. These replace the
earlier rejected proposals. All three use the current slogan, canonical agent
prompt and the same three recent articles with their record dates and evidence
labels. Quiet editorial was selected and applied to the production blog; the
demo styles remain isolated to preserve the original comparison.
Links and copy buttons work, and all previews remain readable without JavaScript.

GitHub Pages uses the existing repository's GitHub Actions source and the custom
domain `agentart.work`, configured in Pages settings. Cloudflare serves four
GitHub Pages A records, four AAAA records and a
`www` CNAME pointing to `agent-art-work.github.io`, all DNS-only in Cloudflare.
GitHub retained domain verification, the valid apex/www certificate and HTTPS
enforcement after the rename on 2026-10-03. Live pages, agent exports and
redirects to `https://agentart.work/` passed, retaining article and document paths.
The `www` target and `_github-pages-challenge-agent-art-work` TXT record were
verified through public DNS on 2026-10-03 using GitHub's retained verification
value. HTTPS and path-preserving redirects passed again after the DNS update.
Retain the ownership TXT record; the earlier challenge record is also preserved.
This Actions deployment does not use a `CNAME` file. The pinned
workflow builds and checks pull requests; pushes to `main` also deploy `_site`.
Reading requires no client JavaScript, remote fonts, analytics, database or
third-party runtime. The homepage loads the optional local SDK assets alongside
its copy script; the demo retains its separate copy script.
Build dependencies are pinned in `package-lock.json` and can be
updated through an ordinary reviewed change.

To roll back a site change, revert its source commit and publish through the
same workflow. The documentation history remains in Git. Publication does not
change the repository's visibility, reuse licensing or project ownership.
