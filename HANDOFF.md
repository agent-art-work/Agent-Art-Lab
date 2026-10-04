# Agent-Art-Lab handoff

The current objective is **Agent-Art-Lab establishment**, not THOUGHT repair.
This standalone candidate gives the next agent enough context to continue
without reconstructing the originating conversation.

## Read first

1. [README](README.md): purpose, map and local checks.
2. [AGENTS](AGENTS.md): working instructions and authority.
3. [Guidance](GUIDANCE.md): shared methods and evidence boundaries.
4. [THOUGHT collection](projects/thought/README.md): first case and artifact access.
5. [Findings register](findings/REGISTER.md): bounded observations and practices.
6. [Diagnostic](projects/thought/studies/2026-09-20-model-acquisition.md):
   one completed retrospective study and its method evaluation.

Then use [study template](templates/STUDY.md) and [boundaries](docs/BOUNDARIES.md).
Read the [organization context and split](docs/ORGANIZATION_AND_SPLIT.md)
before making repository-ownership or task-routing proposals.

## Current position

- 2026-10-04 PR phone notifications (Lab maintenance/release lane): the
  operator requested GitHub Mobile pushes for new Lab PRs. The focused
  `Notify Lab maintainer of pull requests` workflow assigns newly opened PRs
  targeting `main` to `inshell-art`
  using trusted default-branch code and a PR-write token, without executing
  contributor code. Existing assignments are retained. The operational path,
  narrowly scoped Actions event policy, manual recovery and phone settings
  are documented in CONTRIBUTING.md section 6. Assignment is not review or
  proof of phone delivery, and this does not wake a desktop agent session.
  All 57 local tests and the 24-page/586-link site check passed. Phone receipt
  remains unconfirmed. Next action: inspect the notification workflow run and
  PR assignees, and confirm device receipt separately with the operator.

- 2026-10-04 Lab review/publication direction: the operator authorized the
  dedicated Lab maintainer to merge future PRs when substantive review and
  required checks pass for the actual head, stopping only for blockers. Another
  confirmation is unnecessary. Contributors continue to submit PRs for Lab
  review. Next action: follow CONTRIBUTING.md section 6 and verify the resulting
  live publication after each merge.

- 2026-10-03 footer correction (Lab-site/release lane): the operator rejected
  replacing the footer's Lab heading. Agent-Art-Lab is restored as the footer
  home link, with the slogan and reference links beneath it. The separate
  “Part of Agent Art Work” line is restored, adding only an 18px Off grid icon
  beside the linked organization name. “Part of” remains unlinked. This
  supersedes the footer organization mark placement below. The separately
  requested GitHub organization avatar was saved as Off grid and is retained.
  All 45 tests and the 21-page/502-link site check passed; Chrome confirmed
  the restored links and 18px icon in desktop light and mobile dark previews.
  Next action: preserve the Lab heading and secondary organization attribution.

- 2026-10-03 footer organization mark (Lab-site/release lane): the operator
  requested the Off grid icon with Agent Art Work at the bottom, linking to its
  GitHub organization. The shared footer's brand is now a 32px icon and visible
  “Agent Art Work” text in one link to `https://github.com/agent-art-work`.
  This replaces the Lab home link and consolidates the former “Part of” line;
  the slogan and reference links remain. GitHub calls this an organization.
  All 45 tests and the 21-page/482-link site check passed. Chrome verified
  the rendered footer in light desktop and dark mobile previews, including
  the destination, accessible label, icon size and absence of horizontal overflow.
  Next action: retain the header as the home link and the footer brand as the
  organization link.

- 2026-10-03 header mark (Lab-site/release lane): the operator requested the
  selected Off grid icon in place of the top-left Agent-Art-Lab text. The shared
  header and style demo's outer header now use the 40px icon in a 44px home link,
  retaining its accessible name and keyboard focus styling. The footer's Lab
  name and the archived style previews retain their text. All 45 tests and the
  21-page/482-link site check passed. Chrome verified light desktop and dark
  mobile headers at 885px and 360px content widths, including icon size, no
  horizontal overflow and navigation from Guidance back home. Next action:
  retain this icon home link while maintaining the site.

- 2026-10-03 Off grid selection (Lab-site/release lane): the operator selected
  Off grid from the three icon concepts. The active favicon now matches its
  nine-dot SVG exactly, including system light/dark colors; both page builders
  use `?v=off-grid-1` to refresh cached favicons. The comparison page records
  the selection and retains the alternatives. This supersedes the pending
  selection below. All 45 local tests and the 21-page/461-link site check passed;
  every generated page uses the new icon URL and the agent index is unchanged.
  Next action: retain Off grid as the active mark when maintaining the site.

- 2026-10-03 stable checkpoint and icon concepts (Lab-site/release lane):
  annotated tag `v0.1.1` is pushed at `07ac40f`, the verified organization/domain
  and corrected footer state. It precedes the exploratory icon comparison.
  `/icon-demo/` presents Off grid, Shared stroke and Open form for Agent Art Work,
  each in light/dark contexts at 16, 32 and 96 pixels. The existing five-by-five
  dots favicon remains active. Local checks passed all 45 tests, 21 pages and
  461 links; Chrome showed all 18 samples loaded at their intended sizes and
  no horizontal overflow on desktop or a 360px content viewport. These are
  design concepts, not a new article or change to the agent document contract.
  Next action: ask the operator to select or refine a concept before replacing
  the active favicon.

- 2026-10-03 footer simplification (Lab-site lane): the operator requested
  a single closing line. “Part of Agent Art Work” now links to the Lab's
  GitHub repository; the separate “agentart.work · starting with the Lab”
  line and its unused CSS are removed. Homepage metadata retains the umbrella
  scope. Later that day, the operator clarified the link: “Part of” is plain
  text and only “Agent Art Work” links to `https://github.com/agent-art-work`.
  This corrects the initial repository destination above. Next action: retain
  this single attribution line and organization link in the shared footer.

- 2026-10-03 DNS completion (Lab-site release lane): the operator restored
  access to the owning Cloudflare account. The www CNAME now points to
  `agent-art-work.github.io` and the new `_github-pages-challenge-agent-art-work`
  TXT record carries GitHub's retained verification value. Cloudflare's UI
  and public Google DNS both confirmed the records. Existing apex records,
  DNS-only status and the earlier verification TXT are preserved. GitHub
  reports the domain verified, certificate approved and HTTPS enforced.
  Seven live checks passed for apex/HTTP/www, an article, the agent index and
  the new GitHub Pages address, including exact served bytes and retained paths.
  This completes the pending DNS step recorded below; the organization/domain
  migration is complete. Next action: retain these DNS and ownership records
  while continuing ordinary article contributions to `agent-art-work/Agent-Art-Lab`.

- 2026-10-03 organization rename (Lab establishment/site release lane): the
  operator authorized aligning the umbrella with agentart.work. GitHub now
  shows `agent-art-work`, display name **Agent Art Work**, with the same
  organization and two public repository identities. `Agent-Art-Lab` and
  `agent-art-Signature-prototype` retain their names; both local origins use
  the new owner, with no prototype file or commit changes. The gallery transfer
  stays on hold. Current source, contribution and site links are updated;
  dated old names remain history. Local checks passed 45 tests, 20 pages and
  428 links. All 15 JSON download envelopes were rebuilt with new source URLs;
  only CONTRIBUTING and BOUNDARIES source revisions changed. GitHub retained
  domain verification, its approved apex/www certificate and HTTPS enforcement.
  Commit `3f74bc5` deployed successfully under the new owner. A live HTTPS sweep
  passed 50 URLs, 20 pages, 428 internal links and all 15 complete documents,
  including schemas, revisions, download bytes and decoded source bytes. All
  eight new-Pages/HTTP/www redirect cases and the custom 404 passed, with no
  retries or failures. Both old repository web URLs redirect to the new owner.
  DNS migration is still pending: public `www` points to the old GitHub owner
  and the challenge uses the old slug. Chrome currently exposes a different
  Cloudflare account; the operator has been asked to open the owning account.
  Next action: change the www CNAME to `agent-art-work.github.io`, add GitHub's
  new `_github-pages-challenge-agent-art-work` TXT host with the existing
  verification value, then recheck public DNS and HTTPS redirects.

- 2026-10-03 quieter positioning (Lab-site lane): the operator found the hero
  annotation too prominent. It is removed from the hero and shortened to
  “agentart.work · starting with the Lab” in the shared footer at 13px, using
  the existing muted color. Homepage metadata retains the broader scope.
  This supersedes the visible placement in the preceding iteration below.
  Next action: keep this positioning secondary to the articles and agent prompt.

- 2026-10-03 site positioning (Lab-site lane): the operator described
  agentart.work as a broader home for Agent Art works and projects, beginning
  with the Lab. A small, muted annotation beneath the existing homepage slogan
  now states that relationship; homepage metadata carries the same scope.
  README and site notes preserve the distinction for later contributors.
  The Lab name and article descriptions remain. Local checks passed 45 tests,
  20 pages and 428 links. Chrome desktop and narrow previews showed the note
  without horizontal overflow (835px and 375px content viewports). The agent
  index and all 15 complete downloads remain byte-identical. This states an
  intended scope, not complete coverage of Agent Art. Next action: retain this
  distinction when adding works or projects beyond the Lab.

- 2026-10-02 dots favicon (Lab-site lane): the operator chose the background
  dots motif in place of the earlier `A.` mark. The initial icon used a three-by-three
  dot pattern on the same paper/charcoal tile, with larger dots and muted text
  colors for tab-size visibility. Both page builders use `?v=dots-1`. Chrome
  loaded and visually verified eight samples at 16, 32, 64 and 128 pixels in
  light/dark image contexts. Later on 2026-10-02 the operator requested more
  dots: the current icon uses five-by-five smaller circles and `?v=dots-2`.
  Chrome verified six samples at 16, 32 and 128 pixels in both themes. Next
  action: retain this denser dots favicon alongside the selected background;
  the earlier three-by-three and letter marks remain history.

- 2026-10-02 editorial favicon (Lab-site lane): the operator requested an icon
  aligned with the selected site style. The red four-square tile is replaced
  with a typewriter-style `A.` in the site's warm paper/ink palette, using SVG
  paths and internal system light/dark rules. Both page builders use the same
  versioned icon URL to refresh earlier cached icons. Chrome loaded ten samples
  at 16, 20, 32, 64 and 128 pixels across light/dark image contexts; screenshot
  inspection found the mark and period legible. Local checks passed 45 tests,
  20 pages and 428 links. All 20 generated pages reference the new icon URL;
  the agent index and all 15 downloads remain byte-identical. These observations
  cover the tested Chrome renders, not every browser's favicon cache behavior.
  Next action: retain this mark and its theme colors as the blog develops.

- 2026-10-02 contribution pipeline (Lab establishment/site lane): the operator
  requested rollout of a discoverable cross-repository article-to-PR procedure.
  CONTRIBUTING.md now covers existing/new collections, exact publication
  registration, full checks, writer/fork branches, PR destination/base and the
  maintainer merge/deployment boundary. README, AGENTS, site notes and the PR
  template point to it; obsolete first-publication/no-Actions wording is removed.
  Local checks passed 45 tests, 20 pages and 428 links; Chrome desktop/narrow
  guide views had no page overflow. Independent source review found no blocker.
  A fresh agent followed only repository docs in a disposable copy to add a
  fictional new collection and unrun proposal: 45 tests, 22 pages, 468 links and
  all 17 exports passed, including the two new sources' exact byte integrity.
  The rehearsal exposed a title/H1 wording mismatch, corrected to allow shorter
  feed titles consistent with existing articles. It did not exercise remote
  forks or PR access and does not establish general contributor reliability.
  No fixture or new tooling is included in this change. PR #2 passed CI and
  merged at `e8259c9`; the Pages deployment succeeded. Live HTTPS checks verified
  49 URLs, 20 pages, 428 internal links and all 15 complete documents against the
  build, including the new contribution guide's schema, revision and bytes.
  One HTTP index redirect returned 502 on the first sweep, then passed a focused
  recheck with the exact index bytes; the remaining redirects and custom 404
  passed. Next action: use CONTRIBUTING.md for the next real article PR, with
  contributor submission and maintainer merge kept separate.

- 2026-10-02 appearance-panel removal (Lab-site lane): the operator clarified
  that the chooser was for internal design only. Published reading pages now
  use fixed Courier New Regular (400) with Dots. The panel, preference script,
  alternate-style rules and unused paper texture are removed; stored comparison
  choices no longer affect pages. System light/dark colors and the hero agent
  prompt remain. Local checks passed 45 tests, 20 pages and 423 internal links;
  the agent index and all 15 document exports are byte-identical. Chrome's
  desktop and narrow mobile previews showed the selected font, weight and dots,
  no chooser, and no horizontal overflow. The existing separate style demo is
  unchanged. Commit `7a9fc63` deployed successfully; the live HTTPS sweep passed
  49 URLs covering all 20 pages, 42 served resources, 423 internal links and
  15 agent documents, including schema, revision and byte-integrity checks.
  Redirects and the custom 404 passed. One document GET reset once and passed
  its retry; no failures remain. Chrome confirmed the live homepage has the
  selected appearance and no panel. Next action: keep design controls out of
  public reading pages while adding articles or refining the fixed style.

- 2026-10-02 HTTPS completion (Lab-site/release lane): following explicit
  operator approval, the custom-domain setting was cleared and immediately
  restored once to restart GitHub's certificate provisioning. GitHub then
  reported an approved certificate for `agentart.work` and `www.agentart.work`;
  strict TLS verification passed, and HTTPS enforcement is enabled. The name
  remains Agent Art Lab / Agent-Art-Lab. A secure direct-origin sweep verified
  51 URLs covering 20 pages, 44 public resources, 442 internal links and all
  15 complete agent documents against the local build, including schemas,
  revisions, serialized download bytes and decoded UTF-8 source hashes.
  Eight old-GitHub, HTTP and www redirect cases plus the custom 404 passed.
  One HEAD request timed out once and passed its retry; no failures remain in
  that sweep. The same full sweep passed on the ordinary network path with
  111 requests and no retries or failures. Chrome loaded the HTTPS domain and verified the hero
  prompt, selected appearance and home/article navigation without overflow.
  The earlier certificate and local-proxy failures below remain historical
  observations. These checks establish retrieval and rendering on the tested
  paths, not worldwide propagation or agent comprehension. Next action:
  maintain the blog at `https://agentart.work/` and retain its DNS / ownership
  records; no additional domain restart is needed.

- 2026-10-02 custom-domain cutover (Lab-site/release lane): Chrome access to
  the owning Cloudflare account is restored. GitHub verified `agentart.work`
  for `agent-art-collective`; the repository's Pages custom domain is configured.
  Cloudflare now holds the retained verification TXT plus four GitHub Pages A
  records, four AAAA records and a `www` CNAME to
  `agent-art-collective.github.io`, all DNS-only. Commit `d88fb0c` published the
  root-path site build and updated agent prompt; GitHub Actions passed. Public
  DNS and GitHub's DNS check passed. All 44 served files, including 20 pages
  and 15 agent exports, match the checked local build over HTTP directly to
  GitHub's published IP. Local validation passed 45 tests and 442 links; Chrome
  verified root-path home/article navigation, typography and prompt disclosure.
  These checks do not establish HTTPS: GitHub still reports no certificate,
  and strict direct TLS verification rejects the current hostname mismatch.
  The local proxy separately returned resets / HTTP 502 for the new domain.
  A documented certificate-provisioning restart was blocked by automatic
  approval review because it briefly removes the live domain; no removal
  occurred, and operator approval was requested. Next action: wait for issuance
  or carry out one restart if approved, enable HTTPS, then verify secure page
  and export acquisition plus old-URL, HTTP and www redirects. Keep the site
  and repository names unchanged.

- 2026-10-02 custom-domain preparation (Lab-site/release lane): the operator
  registered `agentart.work` and requested connection to the existing Pages
  site. The site and repository names remain Agent Art Lab / Agent-Art-Lab;
  a domain suffix does not require a project rename. Root-path build defaults,
  current links and the hero's canonical agent prompt are prepared locally,
  uncommitted and unpublished. Both root and `/Agent-Art-Lab` override checks
  passed: 20 Node tests, 25 Python tests, 20 pages and 442 links; all 15 agent
  exports passed integrity checks. These are local checks, not live-domain
  evidence. Registration was observed in Cloudflare, and GitHub's organization
  domain-verification challenge is pending. No DNS records or Pages custom
  domain have been changed. Firefox page controls could not be operated reliably;
  the operator was asked to open the owning Cloudflare account in Chrome.
  Next action: add and verify GitHub's TXT challenge, configure DNS and the
  repository custom domain, then publish the root build and verify HTTPS,
  navigation, old-URL redirects and every agent download. Do not publish this
  root-path candidate to the existing project-path URL before that cutover.

- 2026-10-02 selected appearance (Lab-site lane): the operator chose Courier
  New, Regular (400) and Dots from the comparison panel. This is now the default
  in generated HTML, CSS and preference fallbacks, including reading without
  JavaScript. Explicit saved reader choices still take precedence; the panel
  remains available and light/dark colors still follow the system. Agent
  documents are unchanged. Checks passed 44 tests, 20 pages, 442 links and
  eight desktop/mobile browser views in both color themes, plus preference
  storage and no-JavaScript cases. Next action: retain this selected appearance
  as new articles are added.

- 2026-10-02 background textures (Lab-site lane): the floating panel is now
  called Appearance and adds Paper, Linen, Canvas, Laid and Dots, plus Plain
  to restore the original background. Font, weight and texture persist through
  separate local preferences. Native controls, preview swatches, system colors
  and plain-white printing remain available. Local checks passed 44 tests,
  20 pages and 442 links; 48 browser views covered all backgrounds, both color
  themes, desktop and mobile. Keyboard, storage denial, cross-tab changes,
  independent choices and no-JavaScript defaults passed. Visual review found
  the first Paper preview too regular and led to an irregular grain refinement;
  Canvas line intersections were softened after an initial contrast shortfall.
  Paper's eight affected views passed again; sampled text contrast stayed at
  least 4.64:1 in light mode and 6.33:1 in dark mode across the final textures.
  Agent index and all 15 document exports remain byte-identical. These checks
  cover rendering and behavior in Chrome, not reader preference or comprehension.
  Next action: compare the five textures with font and weight on the live site.

- 2026-10-02 font weights (Lab-site lane): the floating Fonts panel now offers
  Light (300), Regular (400) and Bold (700). Font and weight persist independently
  across pages and tabs; source emphasis stays bold. Sixty local Chrome views
  covered all 15 combinations on home/article pages at desktop/mobile widths,
  plus keyboard, storage denial, cross-tab updates and no-JavaScript reading.
  All checks passed after correcting two browser-harness assumptions (default
  preferences need no stored key, and numeric CSS attribute values need quotes).
  Actual glyph inspection found that all five installed fonts use their regular
  face for Light on this machine; the panel explains that fallback when selected.
  Agent index and all 15 document exports remain byte-identical. The browser
  checks establish behavior on this machine, not reader preference or other
  devices' font availability. Next action: compare weights on the live site.

- 2026-10-02 automatic color themes (Lab-site lane): reading pages now follow
  the system light/dark preference through CSS, including changes without a
  reload. The prompt, font picker and native controls use matching colors;
  print keeps dark text on white. Checks passed 76 page/theme/viewport views,
  automatic switching with a saved font, no-JavaScript dark reading and print
  contrast. Measured text contrast stayed above 5.18:1. Agent exports are
  unchanged. Next action: preserve system-following colors in future UI edits.

- 2026-10-02 font chooser (Lab-site lane): added a floating Fonts panel to every
  reading page with Georgia, Palatino, Times New Roman, Arial and Courier New.
  Choices apply across page text and persist locally; the collapsible panel
  starts closed on narrower screens. Native radio controls, keyboard selection,
  Escape, blocked-storage feedback and no-JavaScript reading were verified.
  All five actual typefaces rendered in Chrome; 60 font/page/viewport checks
  passed from 320px to desktop, plus a short landscape screen. Local tests and
  source/export checks passed. Device fonts use fallbacks where unavailable;
  the original style demo remains separate. No agent documents changed.
  Next action: let the operator compare the five fonts on the live site.

- 2026-10-02 larger type (Lab-site lane): increased screen text sizes throughout
  the Quiet editorial site, including responsive overrides and table code.
  Article prose is 21px on desktop and 20px on mobile; summaries are 20px and
  metadata is at least 14px. Build/link checks and 76 browser views passed.
  Next action: retain the larger reading scale in future site edits.

- 2026-10-02 header simplification (Lab-site lane): removed the redundant top
  “Blog” link at the operator's request. The left Agent-Art-Lab name remains the
  home link on every reading page; GitHub remains on the right. Next action:
  preserve this navigation as articles are added.

- 2026-10-02 Quiet editorial (Lab-site lane): the operator selected this style
  for the production blog. The shared site now uses warm paper, a narrow reading
  column, serif type and light rules. The hero's “Read with your agent.” prompt
  is a native disclosure, closed by default; it expands with pointer or keyboard
  and without JavaScript. Its full canonical text stays in the HTML and the copy
  button preserves manual-selection recovery. The agent index and all 15 full
  document exports are byte-identical to the previous build. Local validation
  passed 43 tests, both base paths, 20 generated pages and 442 internal links.
  Chrome checked 19 production pages at four widths (76 views, 320–1440px),
  keyboard toggling/tab order, exact clipboard text, denied-copy recovery and
  no-JavaScript expansion/redirects. A temporary disk-space failure was retried;
  the manual-selection check was corrected to compare the selected source range,
  since rendered text normalizes whitespace. No remaining check failed.
  Method lesson: native disclosure adds the requested interaction without a new
  script; visual and keyboard checks cover behavior absent from byte checks.
  Reader preference and agent comprehension remain unmeasured. Next action:
  maintain the selected style and add future articles through canonical records.

- 2026-10-02 minimal style previews (Lab-site lane): `/style-demo/` now compares
  Plain-text journal, Swiss index and Quiet editorial at the operator's request.
  It replaces the earlier rejected theme proposals. Every preview uses the same
  slogan, complete agent prompt and three recent articles with dates/evidence.
  All 43 tests and 442 internal links passed; 12 theme/viewport checks covered
  320–1440px, with matching content, native clipboard copy, denial recovery and
  no-JavaScript reading. Production pages and agent documents remain byte-identical.
  Next action: let the operator select a style before applying it to the blog.

- 2026-10-02 slogan (Lab-site lane): the operator selected “Articles, studies
  and working notes on Agent Art.” as the slogan. The homepage heading, footer,
  default page description and README now use that exact wording. The existing
  style is retained. Build/link checks, 18 Node tests and both desktop/mobile
  views passed. Next action: keep this wording consistent in future site edits.

- 2026-10-02 single blog (Lab-site lane): the operator requested removing the
  overlapping Journal, Archive and Lessons views. The homepage is now the only
  article feed, labelled Blog. The two old listing URLs redirect to its articles
  section without JavaScript and include readable fallback links. Article return
  links point to that feed; Guidance and reference links are in the footer.
  Canonical records, evidence limits, agent exports and the existing style remain
  intact. Checks passed 43 tests and 448 internal links; ten browser views covered
  home, both old URLs, an article and Guidance at desktop/mobile widths. Native
  copying, denied-copy recovery and both redirects without JavaScript passed.
  Method lesson: separate views of the same small collection added unnecessary
  navigation. Reader preference and Agent comprehension were not measured.
  Next action: maintain one dated blog feed as new articles are added.

- 2026-10-02 journal refinement (Lab-site lane): the operator found the three
  theme proposals generic and chose the existing visual style with a blog-like
  structure. This supersedes the pending theme-selection action below. The
  homepage now lists every article newest first; `/studies/` is a monthly archive,
  and article pages show record dates with previous/next navigation. The large
  featured lesson and project slogans are replaced by the dated feed. The full
  agent prompt stays near the top; source records, old URLs and agent exports
  are preserved. Dates describe the source records, not inferred publication or
  update times. Local checks passed 42 tests, 20 pages and 504 internal links;
  Chrome checked all 20 pages at desktop, tablet and phone widths (60 views),
  including real prompt copying, denial recovery and no-JavaScript reading.
  Method evaluation: reusing the catalogue kept dates/content aligned and avoids
  a second homepage curation step. Reader preference and Agent comprehension
  were not measured. Next action: add future articles through canonical source
  records and catalogue metadata; keep the current visual style for now.

- 2026-10-02 visual theme review (Lab-site lane): the operator requested three
  directions on a demo page. `/style-demo/` compares Field Notes (warm editorial),
  Signal Room (dark research console) and Open Studio (bold public art identity).
  Each uses the same complete guide prompt, P-07 introduction and current study
  records, with working navigation and copy buttons. Styles are isolated; the
  main reading-site theme awaits the operator's selection. Local validation
  passed all 37 tests, 20 pages and 480 internal links. Chrome checks passed all
  three previews at four widths (320–1440px), exact native clipboard/guide parity,
  denied-clipboard recovery and reading without JavaScript. Contrast/source
  review found no blockers. Using identical material helped compare the styles;
  these checks do not measure visitor preference or Agent comprehension.
  Next action: obtain the operator's choice before applying a production theme.

- 2026-10-02 complete site validation (Lab-site lane): fixed lesson previews in
  `949f0b1`; the old multiline regex stopped at source line endings. Markdown
  paragraph extraction now retains all seven complete introductions. Added
  persistent regressions for excerpts, page inventory including 404, exact hero
  prompt parity and visible agent discovery. All 37 tests passed; both site base
  paths passed 19 pages, 40 build files and 432 internal links. Browser checks
  covered all 19 pages at desktop, tablet and mobile widths (57 views).
  After deployment, all 39 public resources passed GET/HEAD and exact-build
  comparisons; the 15 full article texts and seven previews matched their
  sources. A missing nested URL returned the custom 404 and working recovery
  links. Native clipboard copy on the live homepage, simulated denial/manual
  selection and reading without JavaScript passed in a normal Chrome window.
  Initial headless clipboard reads were empty/inconclusive; the normal-window
  check read back the exact prompt. One live HEAD request had a TLS EOF and
  succeeded on one retry; no remaining failure was hidden. Method lesson: link
  and byte checks alone missed truncated previews, so complete-text regressions
  now accompany them. External references, private evidence and general Agent
  comprehension remain outside this check. Next action: retain these CI checks
  and repeat browser/live validation when changing reading routes or interactions.

- 2026-10-02 homepage prompt (Lab-site lane): at the operator's request, the
  homepage hero now displays the canonical access-guide prompt and a copy button,
  with directions to paste it into an agent and add a question. The build reads
  the prompt from the guide so the two stay aligned. Reading/manual copying
  remains available without JavaScript; clipboard denial selects the full text
  and announces manual recovery. Local checks passed 19 pages, 40 public files,
  432 links and all 23 existing tests. Browser checks covered desktop/mobile
  layout, disabled JavaScript and simulated clipboard success/denial. No Agent
  comprehension trial was run. Next action: maintain the guide's canonical
  prompt when changing the document-access contract.

- 2026-10-02 agent-access publication verified (Lab-site lane): commit `8ee23f8`
  passed Pages build/deploy. Direct read-only GET and HEAD checks passed for
  the index, all 15 complete documents, the guide, discovery text, home and CSS;
  JSON responses were `application/json` and fetched bytes matched the local
  build. Source/download identities, lengths and hashes passed, followed by a
  separate saved-file replay with no network code. Index revision:
  `sha256:57465fead5f9277b4fbb020e778ca023772f6c9c5e2d709dd95c68d41aed5ece`.
  This is one client acquisition path, not a comparative Agent trial. Raw
  responses were retained temporarily, not archived in this repo. Offline checks
  passed 19 pages, 39 public files, 431 links, 7 Node tests and 16 Python tests;
  desktop/mobile views had no page-width overflow. Method evaluation: the Pulse
  contract helped separate complete-source and download checks; synthetic
  corruption was rejected, with no unexpected failure in this pass. Discovery
  across Agent products, comprehension and efficiency remain unmeasured.
  This completes the verification action below. Next action: keep export
  selection, canonical documents and evidence labels aligned when adding records.

- 2026-10-02 agent-access implementation (Lab-site lane): the operator requested
  applying the existing document-access lessons to the reading pages. The Pulse
  study, P-07 and native/explicit Guidance support a generated same-origin index
  and complete JSON documents with exact-source hashes, download hashes,
  revisions and evidence labels. [Agent access](docs/AGENT_ACCESS.md) records
  prerequisites, link resolution, verification and failures; existing study
  claims and scopes are preserved. No private records or project code are added.
  Next action: verify the deployed GET/HEAD and saved-byte path. These checks
  concern acquisition and integrity, not comprehension or general reliability.

- 2026-10-02 reading site published: [Agent-Art-Lab website](https://agent-art-collective.github.io/Agent-Art-Lab/)
  is live from site commit `5e8dbbc`; the first Pages build and deployment passed.
  All 18 HTML pages and both assets returned successfully and matched the local
  build byte for byte. Offline validation passed 323 generated links/fragments,
  25 source documents, 78 repository links and all 10 checker tests. Desktop and
  mobile browser inspection found no page-width overflow in the checked views;
  the publication file scan reported no secrets. These validate the reading site,
  not the underlying historical study claims. This completes the first-deployment
  check below. Next action: edit canonical Markdown for article updates and keep
  study metadata, evidence labels and site checks aligned as the archive grows.

- 2026-10-02 reading-site work (Lab establishment): the operator accepted a
  small GitHub Pages reading site for this lessons repository. Home, Lessons,
  Studies and Guidance render the existing Markdown with scoped evidence labels;
  no source study or numbered practice is replaced. A small static build and
  pinned Pages workflow provide publication from `main`. Maintenance is in
  [the site notes](site/README.md). Next action: verify the first deployed site
  and retain the same checks when adding future studies. This scope does not
  authorize project runtime work, private evidence publication or license changes.

- 2026-10-01 publication authorization (Lab project-learning lane): the operator
  subsequently directed rollout of the sanitized native/explicit execution item.
  This supersedes the preparation-only publication boundary in the entry below.
  The four-file contribution comprises Guidance, this handoff, the THOUGHT
  collection index and the new study. Its connecting guidance stays provisional;
  new runtime observations remain OPS-reported, and P-04–P-07 are unchanged.
  Authorization covers ordinary repository publication after review, with no
  private raw records, artwork, runtime work or release changes. Next action:
  revisit the scoped guidance when relevant new evidence becomes available.

- 2026-10-01 local contribution (Lab project-learning lane):
  [native tools and explicit execution prerequisites](projects/thought/studies/2026-10-01-native-explicit-execution.md)
  and a proposed Guidance connection are prepared from the sanitized OPS draft.
  New runtime evidence is OPS-reported; no private underlying records were
  retrieved or live checks run by the Lab. The proposal connects P-04–P-07;
  existing studies and practices are preserved. Applications/OPS retain product
  and release ownership. Next action: operator review of wording and a separate
  publication decision. This handoff authorizes no commit, push, PR or publication.

- 2026-09-28 review completion (project-study lane):
  [PR #1](https://github.com/agent-art-collective/Agent-Art-Lab/pull/1) merged
  as `e875614`. This supersedes the pending review action below. Review of the
  pinned public implementation found no blockers; offline checks passed for
  19 documents, 69 local links and 10 tests, with clean whitespace and secret
  scans. This review did not rerun Pulse's live acquisition or establish its
  private historical reports. P-07 remains provisional within its stated scope.
  Next action: use the Pulse collection as a bounded reference for the next
  operator-selected project study; no new trial or product work is initiated.

- 2026-09-28 contribution: [Pulse document-access study](projects/pulse/studies/2026-09-28-document-access.md)
  and O-07/P-07 are prepared for public PR review at the operator's request.
  This lane is a project study; Lab continuation ownership and Pulse product
  ownership are unchanged. It records a simpler acquisition contract with
  explicit evidence limits, not a measured cross-agent reliability gain.
  Next action: Lab maintainers review the contribution and scoped practice.
  No live agent trial, product deployment or shared tooling is requested.

- Latest work, 2026-09-24: [sanitized THOUGHT follow-up](projects/thought/studies/2026-09-24-boundaries-and-canary-follow-up.md)
  and practical Guidance/findings updated locally from OPS reports. Production
  completion is OPS-reported; no Lab experiment or deployment was performed.
  Initially prepared locally under the OPS handoff; the operator subsequently
  authorized committing and pushing this sanitized update on 2026-09-24.

- Standalone v0 published publicly on 2026-09-21 at
  [agent-art-collective/Agent-Art-Lab](https://github.com/agent-art-collective/Agent-Art-Lab),
  default branch `main`.
- Source originals in Applications remain unchanged; this is an adapted edition.
- Verified organization: `agent-art-collective`; `agent-art` was the earlier
  intended namespace. On 2026-09-21, GitHub API inspection confirmed active
  owner membership for `inshell-art`. The selected repository name remains
  `Agent-Art-Lab`; public visibility is selected. No reuse license was selected.
  Lab publication and the Signature prototype transfer are complete. The
  `signatures.gallery` transfer is on hold at the operator's request.
- THOUGHT provides technical investigations, not a validated general art method.
- Its Codex diagnostic is complete; the product defect remains Applications-owned.
- Its proposed comparison remains draft, unrun and unfrozen.
- Its [practice-led study proposal](projects/thought/studies/2026-09-20-intentional-participation-proposal.md)
  is prepared; artwork inspection remains unrun because material is unavailable.
- No artwork or private raw report is exported here for independent interpretation.
- The initial edition enabled no live agent runner, account configuration, paid
  service or CI. The 2026-10-02 reading site adds documentation checks and a
  GitHub Pages publishing workflow; no Agent trial is part of that workflow.

The objective is a usable Lab home. A THOUGHT repair, new runner, live trial or
deployment is not a prerequisite.

## Ownership transfer completed, 2026-09-20

OPS relayed the operator's explicit direction to pass Agent-Art-Lab to this
dedicated task and return DEPLOY-SUPERVISOR to Inshell deployment. This task
acknowledges and accepts ownership of Lab continuation. The earlier preparation
and naming notes below are historical; task creation is no longer pending.

Agent-Art-Lab owns shared Guidance, research, archive and study preparation.
DEPLOY-SUPERVISOR focuses on Inshell Studio Preview release coordination;
Applications owns product fixes. The intended organization remains `agent-art`.
Bring Lab-specific material, scope and publication decisions to this task.
No repository transfer, remote creation or publication accompanied this task
ownership transfer.

The previously assigned bounded work is complete: the handoff was checked and
the [practice-led proposal](projects/thought/studies/2026-09-20-intentional-participation-proposal.md)
was prepared with an evidence inventory and explicit material gaps. No artwork
was inspected or created, and no live trial ran. The method review is included
in the proposal; it makes no claim of measured efficiency or artistic findings.

Validation: offline packaging checks passed (16 documents, 56 local links),
and all 10 synthetic checker tests passed. These checks do not validate artwork
interpretation or private historical evidence.

## Next bounded Lab action

The bounded 2026-09-24 learning-list handoff is complete locally. It retains
representation, final-worker and safe-diagnostic lessons with functional success
separate from compliance and privacy claims. Raw private evidence was not
imported; no new release gate or shared tooling was added. The operator's later
2026-09-24 instruction authorizes publication of these documentation changes.
No product or release action is needed to complete the Lab update.

Local validation passed: 17 documents, 64 local links, all 10 synthetic checker
tests, whitespace check and a redacted gitleaks scan. These are documentation
checks, not fresh verification of OPS's runtime or production observations.

The requested Signature prototype transfer is complete. Leave the working
`signatures.gallery` repository and its deployment untouched until the operator
explicitly resumes that transfer; no timed retry or automatic continuation is
scheduled. See the [current repository status](docs/ORGANIZATION_AND_SPLIT.md).

The next available Lab study step is to obtain an operator-selected existing
THOUGHT candidate and permitted review material, or defer the proposed inquiry.
No material retrieval, live creation or Inshell release work is implied.

## Prototype transferred; gallery held, 2026-09-21

The operator paused the `signatures.gallery` transfer because work is ongoing
there, and requested transfer of the separate `agent-art-Signature-prototype`
repository instead. GitHub ownership was transferred from `inshell-art` to
`agent-art-collective`, retaining the repository name, public visibility and
default branch `main`:
[agent-art-Signature-prototype](https://github.com/agent-art-collective/agent-art-Signature-prototype).

Before/after API inspection confirmed the same repository identity and remote
`main` commit `d00c018d1a740a5807480126d1f1bd0c620fb96d`. The pre-transfer check
reported no GitHub Pages site, Actions workflows, deployment records or webhooks;
this does not inventory unknown external services or test the artwork.

The existing local prototype checkout's `origin` now uses the new organization.
Tracking refs were fetched, while local `main` and working files were preserved.
The local checkout remains at `0e1a036`, behind the remote; no pull, merge or
prototype code push was performed. The gallery repository and remote were not
modified by this operation.

Later on 2026-09-21, the operator also requested local relocation. The prototype
checkout was moved into the same parent directory as Agent-Art-Lab, retaining
the directory name `agent-art-Signature-prototype`. All files and Git metadata
were verified unchanged across the move; the old checkout location is gone.

## Public Lab publication completed, 2026-09-21

The operator selected public visibility and `agent-art-collective` ownership.
The 19-file edition was reviewed for credentials, personal identifiers, private
artwork and third-party material; the retained research consists of attributed
summaries and links, and raw private evidence remains excluded. Packaging checks
and all 10 synthetic tests passed; gitleaks reported no leaks. These checks do
not verify historical claims or establish a universal method.

Initial commit `177ccab` was pushed to `main`. GitHub subsequently reported
`agent-art-collective/Agent-Art-Lab`, `PUBLIC`, nonempty, with default branch
`main`. The local `origin` points to that repository. No license was added;
publication does not authorize new live trials or publication of private originals.
The dated preparation notes below preserve the state before publication.

## Organization registered and verified, 2026-09-21

The operator reported completed registration. Read-only GitHub API calls found
the actual organization at
[agent-art-collective](https://github.com/agent-art-collective), with `inshell-art`
in active `admin` membership (organization owner). Requests for the previously
intended `agent-art` namespace returned 404; that is not proof of availability.
The registered slug supersedes the planned namespace for future repository
destinations. Earlier dated planning notes remain as history.

The local Lab has no configured remote. The gallery remains
`inshell-art/Agent-Art-signatures.gallery`, public. No new permissions, transfers,
repository publication or license selection were performed during verification.

The prepared practice-led proposal remains available for later continuation:
The operator identifies one existing THOUGHT candidate and the prompt, artifact
and contextual material authorized for review/retention, or defers the inquiry.
The Lab then checks that material's availability and revises the proposal before
interpretation. No private-history retrieval or live creation is implied.

## Handoff review and naming update, 2026-09-20

The operator requested a handoff check and selected **Agent-Art-Lab** as the
project and repository name, replacing Agent Lab / `agent-lab` for current use.
The local directory already has the selected name. Current documentation and
edition metadata now use it; original source paths, hashes and historical
runner identifiers remain unchanged.

This task has begun the Lab continuation with that bounded review and rename.
The task-creation language below records the earlier preparation stage.
Repository-only review found the purpose, evidence limits and ownership split
explicit. No missing chat is needed for this naming change. Publication still
requires destination/control, visibility and licensing decisions; a practice-led
study still lacks an exported artwork and its documented conditions.

Validation after the rename: the offline checker passed (15 documents,
48 local links), all 10 synthetic checker tests passed, and the nine recorded
source-document paths and hashes were unchanged. Source originals were not
re-accessed or rehashed during this review.

Next action: prepare the proposed practice-led study described below, recording
the material gap explicitly. This review does not initiate that study or verify
private historical evidence.

## Operator-directed split, 2026-09-20

The operator will create another agent/task for this local repository.
This handoff prepares that separation; it does not claim a new task exists.

- The new Agent-Art-Lab task continues Lab establishment, repository publication
  preparation and shared research/archive work.
- DEPLOY-SUPERVISOR returns to `inshell.art` Studio Preview release coordination.
- Applications owns the website implementation and its concrete fixes.
- THOUGHT and other practice repositories retain their own implementation and
  ownership. Participation does not require transfer into the shared organization.

Do not use Lab incompleteness to block an unrelated website release, or silently
make a THOUGHT repair the Lab's next task. The source documents in Applications
remain preserved; this standalone repo is the home for the new Lab task's work.

Suggested opening message for the new task:

```text
Continue Agent-Art-Lab establishment in this repository. Read AGENTS.md, README.md,
HANDOFF.md and docs/ORGANIZATION_AND_SPLIT.md. Preserve the intended agent-art
organization context and the split from Inshell deployment. Review current
status and propose the next bounded Lab action; do not assume publication or
live-execution authority. THOUGHT is a worked case, not the Lab's definition.
```

## Validation checkpoint, 2026-09-20

The preparing agent ran the offline checker (14 documents, 42 local links),
all 10 synthetic checker tests, and a local gitleaks scan; all passed.
The nine recorded source documents were rehashed and remained unchanged.
A fresh read-only agent, given only this repository, passed cold-start review:
it identified the purpose, evidence limits, owners, authority and next task.
Its two wording clarifications were applied. This is a usability observation,
not a controlled efficiency study, historical-evidence verification or final
publication approval. Rerun checks after changes.

## Original bounded Lab task (preparation now complete)

First sanity-check this handoff using repository documents alone. Report any question
that depends on missing chat, inaccessible artifacts or an unstated decision.
Correct navigation and explanations only where retained evidence supports it.

Then prepare a proposed practice-led study:

- Ask what observable choices could support intentional Agent participation.
- Inventory already-authorized retained artwork and its documented conditions.
- State whether that material is actually available; none is exported here yet.
- Separate direct observations, interpretations and unknowns.
- Identify the evidence needed and the next bounded action.

Do not invent an artwork, second project or operator mandate. If material is
unavailable, finish the proposed record with that gap explicit. Do not start
new artwork creation, access private stores or execute live trials by implication.

## v0 completion criteria

| Criterion | Required evidence |
| --- | --- |
| Cold-start orientation | New agent explains aim, boundaries, evidence access and next task without chat. |
| Portable package | Offline links/JSON/checker tests pass outside the Applications checkout. |
| Honest archive | Derivative status, private missing evidence and limits explicit. |
| Usable method | Project and study templates cover artistic and technical work without requiring a runner. |
| GitHub publication | Operator confirms destination/visibility; reviewed file set committed and pushed separately. |

The first four concern the local edition. GitHub publication was completed on
2026-09-21 under explicit operator direction. No open-source license is granted.
