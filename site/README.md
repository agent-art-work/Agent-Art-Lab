# Agent Art Work website maintenance

This repository owns the complete `agentart.work` website. The public identity
is **Agent Art Work**; Blog carries the former Lab publication. The separate
protocol repository owns SDK implementation and releases.

Start from [AGENTS](../AGENTS.md) and [current status](../HANDOFF.md#current-position),
then read the sources relevant to the requested website change. This is the
website-maintenance lane: verify pages, links, source exports and behavior as
appropriate, without study intake or a Lab-method evaluation. Blog submissions
follow [Contribute](../CONTRIBUTING.md); a chosen research inquiry may use
[Research guidance](../GUIDANCE.md). A local preview request does not authorize release.

## Pages and navigation

On `codex/manifesto-home`, the homepage renders the complete locked manifesto
from `docs/MANIFESTO.md`. “Agent Art Manifesto” is the headline; the opening
paragraph uses the same bold style as the three emphatic turns. The declaration
has only title, bold and regular type. Light mode uses black text on white; dark mode uses warm light text on charcoal.
The dot texture and shared reading layout are retained in both modes.
The global top navigation aligns with the centered reading column and has
no visible group heading or divider. On mobile it uses two compact rows.
Home uses the same footer as regular pages: Ask your Agent followed by the
umbrella identity and one continuous list of links. Agent Art, Protocol, Works,
Blog, About, Ask your Agent and GitHub complete the footer. Links wrap naturally
within the reading width with compact gaps. About explains the site's activities
and links to Ask your Agent. The Ask your Agent page links to “Source retrieval and verification” and
“Document index (JSON)” under “For website authors”. Their routes, exports and
Agent discovery remain intact; neither is a global footer destination.
Blog links to the preserved `/contribute/` guide as “Contribute an article”
beside its article feed; publishing guidance is not a global footer destination.
Research references and templates have explicit optional/historical labels.
Collection pages carry a brief dated-record notice; their source records remain
unchanged. The definition uses its contextual Works link without a duplicate
continuation section. Design demos are retained as earlier design studies, and
the 404 page returns to home rather than assuming a missing Blog article.
Introductory section cards stay removed. The design keeps amber-gold and the
approved flat-label button; the tuning desk is not served.

On a fresh homepage visit at the top, navigation remains visible for 1 second,
then a 700ms animation scrolls it just above the viewport. Scrolling back up
reveals it normally. User input cancels the animation; fragment links, restored
positions, history returns and reduced-motion preferences skip it. This is a
homepage-only progressive enhancement in `assets/home-intro.js`.

Ask your Agent carries the same site-wide invitation everywhere, independent
of the current page. Its explanation lives on the dedicated page. The canonical
manual prompt remains available without JavaScript or if the SDK fails to mount,
and is hidden after a successful mount.

Home is the only manifesto page; `/manifesto/` redirects there with a visible
fallback link. There is no separate Manifesto menu or footer item. The source,
document ID and complete agent download remain available, with `/` as the
indexed page. The approved 2026-10-23 participation revision is
preserved in `drafts/agent-art-manifesto/2026-10-23-locked-manifesto-v2.md`; both
earlier 2026-10-22 and 2026-10-23 snapshots remain in the same directory. The
source and rendered-content checks guard against accidental edits.
`/agent-art/` renders `docs/AGENT_ART.md`: the definition, learned intention,
equal artistic standing, artistic freedom, evidence and audience judgment.
Both texts are complete indexed sources. The manifesto's wording stays fixed
while design and placement can be reviewed separately in this local preview.

`/blog/` is the only chronological article feed. Its slogan remains “Articles,
studies and working notes on Agent Art.” Existing article URLs are unchanged.
Blog navigation, article return links and the old `/studies/`, `/lessons/` and
`/lab/` redirects open `/blog/` at the top. Root `/#articles` retains a visible
link to Blog, and existing `/blog/#articles` bookmarks still find the feed.
New navigation links do not force that scroll position.

`/protocol/` renders the reviewed public summary in `docs/PROTOCOL.md`.
`/ask-your-agent/` renders `docs/ASK_YOUR_AGENT.md`, the visitor explanation of
Protocol's reading component. `/about/` renders `docs/AGENT_ART_WORK.md`.
All three are complete, indexed public sources. Private protocol specifications
are not automatically copied or exported.

The shared global top bar has only the Off grid logo at the left, linking home
with the accessible name “Agent Art Work home”. The navigation beside it is
Agent Art, Protocol, Works, Blog and GitHub on every shared-layout page.
GitHub links to the Agent Art Work organization; About remains in the footer. Ask your Agent stays
available as the shared reading control, with its explanation linked from
Protocol and About; it has no top-menu item.
On mobile the five links retain two compact rows beside the logo. The footer GitHub link also opens the organization. The website repository
remains linked from About. Article source
and history links point at `agent-art-work/agentart.work`. The footer retains
agent discovery and contributor links alongside the umbrella identity.

## Appearance

PT Mono Regular and the Dots texture are the fixed reading style.
Source emphasis and table headings stay bold; no font service is required.
Appearance always follows the system, including live OS changes. There is no
manual theme selector; previous saved theme preferences are ignored. CSS handles
the theme without JavaScript; the small script updates browser chrome color.
Printing remains light.
The internal typography/design tuning panel remains absent.

The operator locked **amber-gold** as the primary color on 2026-10-23:
`#A87632` in light mode and `#D9B66F` in dark mode. The Off grid logo keeps
its geometry and neutral dots; only the escaped top-right dot uses the accent.
The Ask your Agent backgrounds use the same accent. Header and footer marks
across the site use the transparent `assets/logo.svg`: nine 2px dots on a 40px
canvas, with the escaped dot in amber-gold. Shared CSS and `masthead.js` align
the eight fixed dots with the background grid and erase the escaped dot's old
position. Menu and footer text align with the bottom row's centers. The same
SVG supplies the browser icon; its cache key is `off-grid-2px-1`.

The approved [button design](ask-your-agent-design.json) replaces the earlier
[Quiet field record](quiet-field-design.json). It is a square flat label with
no frame, tail, glyphs or arrows: 4px vertical padding, 12px label horizontal
padding, 14px system type, 15% action tint and 30% label tint. All four action
spaces are equal, including the outer edges, with a 12px minimum. Space for
“Copied” is distributed across the row, keeping the total width stable.
The label underlines on hover; the three actions underline by default and
remove it on hover. Hover hints and the three-second inline confirmation remain.
The tuning desk is internal design material and is not part of the v2 pages.

The v2 website shipped as `v2.0.0-rc.1`; the newer SDK integration described
below is approved for rollout. See HANDOFF and the integration PR for deployment status.
Historical release records below retain their dates.

## Selected reading typography

PT Mono is selected throughout the site. The manifesto retains 22px desktop /
18px mobile body text and a 60ch maximum column. Other pages use 18px desktop /
16px mobile body text. Both keep 1.65 line height; the shared page frame,
navigation and heading sizes stay unchanged. The font-selection panel has
been removed. The former comparison tools remain archived under ignored
`local/design/typewriter-fonts/`; do not reapply their injection for this design.

The unmodified regular face is self-hosted at `assets/fonts/pt-mono/PTM55FT.ttf`
with its SIL Open Font License and copyright notice in the adjacent `OFL.txt`.
Source: https://github.com/google/fonts/tree/main/ofl/ptmono.
SHA-256: `cbe732b3b8fd211fd986ebdfc9b870ddeca4faab0bb5425fc509b37f9b4ac804`.
Bold emphasis is synthesized by the browser, matching the selected preview.

## Build and preview

The 2026-10-22 manifesto integration passed 27 Node and 39 Python tests,
31-page navigation checks, and local HTTP verification of all 23 exported
documents. Regular Chrome checks covered the new pages at desktop/phone
widths and the retained reading controls in light/dark. Preview at port 8876.
The reading invitation continues to reference the published domain; local
manuscript additions are not available to a receiving Agent there until release.

The integration pins public MIT `@agent-art/protocol@0.1.5-alpha.2` from
`vendor/agent-art-protocol-0.1.5-alpha.2.tgz` (18,235 bytes), SHA-256
`eadf80c14307b635bc69589b3a33ac747314b73fdef96cfb05f169337ffcc2b2`.
Use the final published archive, not the earlier preparation-only candidate.
The [release and integration guide](https://github.com/agent-art-work/agent-art-protocol/releases/tag/v0.1.5-alpha.2)
document the public theme hooks. The lock retains archive integrity. There is
no npm registry publication; install the exact vendored archive with scripts
disabled. Its MIT license applies to original SDK code/documentation, not this
site's content or artworks.

The build copies all five browser files and the MIT `LICENSE` byte-for-byte
from the same installed package into the immutable version directory. The
adapter, client routes and canonical invitation remain unchanged apart from
the versioned SDK import path. The site uses public theme hooks only. The
approved flat geometry, equal visible gaps, 14px text and stable Copy/Copied
width are retained; narrow containers wrap label/action groups without
shrinking the text. Label and action tints are independently transparent.

The operator authorized this alpha integration's website rollout on 2026-10-24,
replacing the `0.1.5-flat-label.1` integration in `v2.0.0-rc.1`. Verify the
integration PR's deployment before treating the new version as live. Historical
archives remain unchanged. No SDK release, registry publication or live Agent
trial is performed by installing this site dependency.

The component retains native desktop-prefill links, exact Copy with a polite
announcement, and selected manual text on clipboard denial. The complete
original prompt remains usable without JavaScript. Browser qualification uses
synthetic clipboard writes and canceled native navigation; it does not claim
a fresh receiving-app trial.

Earlier released integrations: on 2026-10-21 the operator authorized committing,
pushing and deploying the
Ask your Agent integration to `agentart.work`, including its pinned
`@agent-art/protocol@0.1.1` archive and browser assets. This supersedes the earlier
local-only publication hold for this Lab candidate. The archive stays unchanged;
no reuse license, npm publication or protocol-repository visibility change is
implied. Keep private trial screenshots and raw evidence outside the release.
The immutable archive's README records its earlier pilot state. The Lab's
current integration is described here: no app discovery and receipts disabled.

The released explanation-link integration pins SDK 0.1.2 and adds the public
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
run the build and checks with `SITE_BASE_PATH=/agentart.work`; restore the default
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
`assets/agent-art-sdk/0.1.5-alpha.2/`. Versioning the package directory gives its relative
module imports and stylesheet the same cache boundary. On an SDK update, change
that path in the build, adapter and output allowlist together with the package
pin; never overwrite a released package with different bytes.

## Add or revise an article

Follow [Contribute an article](../CONTRIBUTING.md) for either authoring path:
develop a local draft with an agent/maintainer, or contribute directly by PR.
The publishing maintainer or contributing agent handles collection registration,
checks and the PR to `agent-art-work/agentart.work:main`. The current builder
still uses project collections; the author-facing path does not add a private
draft store, CMS or new article schema. That guide owns contribution instructions;
this file covers site behavior and maintenance.

The Blog lists every catalogue entry, ordered by record date
(newest first), with title as the tie-breaker. New records appear automatically;
there is no duplicate homepage article feed. Dates are the source's record
dates, not inferred publication dates or the date of a rebuild. Article pages
label this explicitly and link to the previous/next entry in feed order.
Preserve earlier dates when making a correction; record the dated addition in
the source. The site does not imply a fixed publication schedule.

There are no separate Archive or Lessons browsing sections. Research guidance
remains available through contextual links and the Agent index, with its page
and historical links preserved. It is not a global footer destination. Other
reference documents remain available through the footer and article links. The complete findings register remains a source document.
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

Above every shared footer, the prompt from the access guide's “A prompt to use”
section is available in a native `details` disclosure, closed by default.
Its “Ask your Agent” label matches the mounted component; it opens with a pointer
or keyboard, including without JavaScript, and links to the visitor explanation.
Edit the canonical prompt to update the invitation everywhere. The full text remains in the
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
this site owns placement, Work metadata and the exact canonical prompt. Keep
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
## Works showroom

`docs/WORKS.md` is the canonical source for `/works/` and its Agent document
download. Register new showroom sources in both the builder and Agent export
checker; do not add showroom entries to the dated Blog study catalogue.
Keep artist attribution, current/study status and links to the owning practice.

The THOUGHT SVG at `assets/works/thought-example.svg` reproduces the public
documentation example from `https://inshell.art/docs/thought.md`, inspected
2026-10-23. Its source bytes are pinned by the showroom test. The caption and
image alternative identify it as a documentation example, not a verified
creation record or evidence of a mint. Its colours belong to the work and
remain unchanged across the site's light and dark modes.
