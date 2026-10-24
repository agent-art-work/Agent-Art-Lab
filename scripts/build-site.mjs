// Markdown remains canonical; optional client JS handles prompt copying.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { defineWork } from '@agent-art/protocol';
import MarkdownIt from 'markdown-it';
import GithubSlugger from 'github-slugger';
import { buildAgentDocuments, documentId } from './agent-documents.mjs';
import { renderStyleDemo } from './style-demo.mjs';
import { renderIconConcepts } from './icon-demo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const sdkRoot = path.dirname(createRequire(import.meta.url).resolve('@agent-art/protocol'));
// Immutable package paths keep its relative imports on the same cache version.
const sdkAssetPath = 'assets/agent-art-sdk/0.1.5-flat-label.1';
if (JSON.parse(readFileSync(path.join(sdkRoot, 'package.json'), 'utf8')).version !== '0.1.5-flat-label.1') {
  throw new Error('The SDK asset path must match the installed immutable package version.');
}
const output = path.join(root, '_site');
const repo = 'https://github.com/agent-art-work/agentart.work';
const slogan = 'Articles, studies and working notes on Agent Art.';
const homeDescription = 'We are learning what it means to be answered by something we made. The Agent Art manifesto, definition, articles and research.';
const base = process.env.SITE_BASE_PATH ?? '';
if (base && (base.split('/').some(segment => ['.', '..'].includes(segment)) || !/^\/[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(base))) {
  throw new Error('SITE_BASE_PATH must be empty or a path without a trailing slash.');
}
const read = file => readFileSync(path.join(root, file), 'utf8');
const esc = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const url = file => `${base}/${file.replace(/index\.html$/, '')}`;
const studies = JSON.parse(read('site/studies.json'));
const routes = new Map([
  ['docs/MANIFESTO.md', 'index.html'],
  ['docs/AGENT_ART.md', 'agent-art/index.html'],
  ['docs/WORKS.md', 'works/index.html'],
  ['GUIDANCE.md', 'guidance/index.html'],
  ['findings/REGISTER.md', 'findings/index.html'],
  ['CONTRIBUTING.md', 'contribute/index.html'],
  ['research/README.md', 'research/index.html'],
  ['docs/BOUNDARIES.md', 'boundaries/index.html'],
  ['docs/AGENT_ACCESS.md', 'agent-access/index.html'],
  ['docs/ASK_YOUR_AGENT.md', 'ask-your-agent/index.html'],
  ['docs/PROTOCOL.md', 'protocol/index.html'],
  ['docs/AGENT_ART_WORK.md', 'about/index.html'],
  ['templates/PROJECT.md', 'templates/project.html'],
  ['templates/STUDY.md', 'templates/study.html'],
  ['projects/thought/README.md', 'projects/thought/index.html'],
  ['projects/pulse/README.md', 'projects/pulse/index.html'],
  ['projects/agent-handoff/README.md', 'projects/agent-handoff/index.html'],
  ...studies.map(study => [study.source, study.source.replace(/\.md$/, '.html')]),
]);
const actualStudies = ['thought', 'pulse', 'agent-handoff'].flatMap(project =>
  readdirSync(path.join(root, 'projects', project, 'studies')).filter(file => file.endsWith('.md'))
    .map(file => `projects/${project}/studies/${file}`));
if (new Set(studies.map(s => s.source)).size !== studies.length ||
    actualStudies.some(source => !studies.some(s => s.source === source))) {
  throw new Error('The study catalogue must contain every study exactly once.');
}
studies.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
const reading = new Map([...routes.keys()].map(source => [source, render(source)]));
const agentDocuments = buildAgentDocuments([...routes].map(([source, route]) => {
  const study = studies.find(s => s.source === source);
  return {
    id: documentId(source), path: source, title: reading.get(source).title,
    page: url(route), bytes: readFileSync(path.join(root, source)),
    ...(study ? { study: { project: study.project, date: study.date, status: study.status, evidence: study.evidence } } : {}),
  };
}), { basePath: base, repository: repo });

function destination(href, source) {
  if (href === 'https://agentart.work/agent-index.json') return url('agent-index.json');
  if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//') || href.startsWith('#')) return href;
  const match = href.match(/^([^?#]*)(.*)$/);
  const file = path.posix.normalize(path.posix.join(path.posix.dirname(source), decodeURIComponent(match[1])));
  const route = routes.get(file);
  if (file.startsWith('site/assets/')) return url(file.slice('site/'.length)) + match[2];
  return route ? url(route) + match[2] : `${repo}/blob/main/${file}${match[2]}`;
}

function render(source) {
  const md = new MarkdownIt({ html: false, linkify: false });
  const tokens = md.parse(read(source), {});
  const slugger = new GithubSlugger();
  const headings = [];
  let title = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'heading_open') {
      const text = tokens[i + 1].children.filter(t => ['text', 'code_inline'].includes(t.type)).map(t => t.content).join('');
      const id = slugger.slug(text);
      token.attrSet('id', id);
      if (token.tag === 'h1' && !title) {
        title = text;
        // The page header displays the original title; preserve its fragment ID.
        tokens[i].hidden = true;
        tokens[i + 1].children = [];
        tokens[i + 2].hidden = true;
        headings.push({ text, id, level: 1 });
      } else if (token.tag === 'h2') headings.push({ text, id, level: 2 });
    }
    for (const child of token.children ?? []) {
      if (child.type === 'link_open') child.attrSet('href', destination(child.attrGet('href'), source));
      if (child.type === 'image') child.attrSet('src', destination(child.attrGet('src'), source));
    }
  }
  let body = md.renderer.render(tokens, md.options, {});
  if (source === 'docs/AGENT_ART_WORK.md') {
    body = '<span id="agent-art-work"></span>' + body;
    body = body.replace('<h2 id="our-logo">', '<span id="an-escape-in-the-astra"></span><h2 id="our-logo">');
    body = body.replace('<h2 id="tools-for-the-practice">',
      `<div class="about-field-mark" aria-hidden="true"><span class="logo-slot"><span class="logo-field"><img src="${url('assets/logo.svg')}" width="40" height="40" alt=""></span></span></div><h2 id="tools-for-the-practice">`);
    body = body.replace('place. We imagine the grid',
      `place. <span class="logo-slot logo-inline" aria-hidden="true"><span class="logo-field"><img src="${url('assets/logo.svg')}" width="40" height="40" alt=""></span></span> We imagine the grid`);
    body = body.replace(/<p>(<img src="[^"]*assets\/logo\.svg"[^>]*>)<\/p>\s*(<p>[\s\S]*?<\/p>)/,
      `<div class="logo-explanation"><span class="logo-slot"><span class="logo-field">$1</span></span><div class="logo-explanation-copy">$2<div class="logo-below" aria-hidden="true"><span class="logo-slot"><span class="logo-field"><img src="${url('assets/logo.svg')}" width="40" height="40" alt=""></span></span></div></div></div>`);
  }
  return { title, headings, body };
}

function shell(title, content, description = homeDescription, source = null, stylesheets = [], section = '') {
  const home = section === 'home';
  const active = section || (source?.startsWith('projects/') ? 'blog' : source === 'docs/WORKS.md' ? 'works' : source === 'docs/AGENT_ART.md' ? 'agent-art' : source === 'docs/PROTOCOL.md' ? 'protocol' : source === 'docs/ASK_YOUR_AGENT.md' ? 'ask-your-agent' : '');
  const navigation = [['agent-art', 'Agent Art'], ['protocol', 'Protocol'], ['works', 'Works'], ['blog', 'Blog']]
    .map(([route, label]) => `<a href="${url(`${route}/index.html`)}"${active === route ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const homeLinks = position => `<section class="home-links" aria-label="${position === 'top' ? 'Top navigation' : 'Bottom navigation'}">
<nav class="home-navigation${position === 'top' ? ' site-nav' : ''}" aria-label="${position === 'top' ? 'Top' : 'Bottom'} site links">${navigation.replace(`href="${url('blog/index.html')}"`, `${home && position === 'top' ? 'id="articles" ' : ''}href="${url('blog/index.html')}"`)}<a href="https://github.com/agent-art-work">GitHub</a></nav>
</section>`;
  return `<!doctype html>
<html lang="en" data-font="pt-mono" data-weight="400" data-texture="dots"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Agent Art Work</title><meta name="description" content="${esc(description)}">
<link rel="alternate" type="application/json" title="Agent document index" href="${url('agent-index.json')}">
${source ? `<link rel="alternate" type="application/json" title="Complete document" href="${url(`documents/${documentId(source)}.json`)}">` : ''}
<meta name="color-scheme" content="light dark"><meta name="theme-color" content="#ffffff"><link rel="icon" href="${url('assets/logo.svg?v=off-grid-2px-1')}" type="image/svg+xml" sizes="any">
<script src="${url('assets/theme.js')}"></script>
<link rel="stylesheet" href="${url('assets/site.css')}">${stylesheets.map(file => `<link rel="stylesheet" href="${url(file)}">`).join('')}</head><body${home ? ' class="manifesto-home"' : ''}>
<script src="${url('assets/masthead.js')}" defer></script>${home ? `<script src="${url('assets/home-intro.js')}" defer></script>` : ''}<a class="skip-link" href="#main">Skip to content</a>
<header class="global-top ${home ? 'manifesto-top' : 'site-header'}"><a class="brand" href="${url('index.html')}" aria-label="Agent Art Work home"><span class="logo-slot"><span class="logo-field"><img src="${url('assets/logo.svg?v=off-grid-2px-1')}" width="40" height="40" alt=""></span></span></a>${homeLinks('top')}</header>
<main id="main">${content}</main>
<section class="site-reading" id="reading-heading" aria-label="Ask your Agent"><div class="site-agent-reading"><div id="ask-your-agent"></div></div>${promptDisclosure}</section>
<footer class="site-footer"><div class="footer-heading"><a class="footer-brand" href="https://github.com/agent-art-work"><span class="logo-slot"><span class="logo-field"><img src="${url('assets/logo.svg?v=off-grid-2px-1')}" width="40" height="40" alt=""></span></span><span class="footer-brand-name">Agent Art Work</span></a><p>Art, tools and research with Agents.</p></div>
<nav class="footer-links" aria-label="Footer links">
<a href="${url('agent-art/index.html')}">Agent Art</a><a href="${url('protocol/index.html')}">Protocol</a><a href="${url('works/index.html')}">Works</a><a href="${url('blog/index.html')}">Blog</a><a href="${url('about/index.html')}">About</a><a href="${url('ask-your-agent/index.html')}">Ask your Agent</a><a href="https://github.com/agent-art-work">GitHub</a>
</nav></footer>${readingScripts}</body></html>\n`;
}

function write(file, content) {
  mkdirSync(path.dirname(path.join(output, file)), { recursive: true });
  writeFileSync(path.join(output, file), content);
}
const date = value => new Date(`${value}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
function posts(items, level = 2) {
  return `<div class="post-list">${items.map(s => `<article class="post-preview"><p class="post-meta"><time datetime="${s.date}">${date(s.date)}</time><span>${esc(s.project)}</span><span>${esc(s.status)}</span></p><h${level}><a href="${url(routes.get(s.source))}">${esc(s.title)}</a></h${level}><p class="post-summary">${esc(s.summary)}</p><p class="post-evidence">${esc(s.evidence)}</p><a class="text-link" href="${url(routes.get(s.source))}">Read article <span aria-hidden="true">↗</span></a></article>`).join('')}</div>`;
}
function articleNavigation(study) {
  const position = studies.indexOf(study);
  return `<nav class="article-pagination" aria-label="More articles">${[[studies[position - 1], 'Previous article', 'prev'], [studies[position + 1], 'Next article', 'next']].filter(([item]) => item).map(([item, label, rel]) => `<a rel="${rel}" href="${url(routes.get(item.source))}"><span class="label">${label}</span>${esc(item.title)}</a>`).join('')}</nav>`;
}
const heading = (label, title, intro) => `<header class="page-heading"><p class="eyebrow">${esc(label)}</p><h1>${esc(title)}</h1><p class="lead">${esc(intro)}</p></header>`;
const agentPrompt = read('docs/AGENT_ACCESS.md').match(/## A prompt to use\s+```text\n([\s\S]*?)\n```/)?.[1];
if (!agentPrompt) throw new Error('The access guide must contain the homepage agent prompt.');

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(path.join(root, 'site/assets'), path.join(output, 'assets'), { recursive: true });
for (const file of ['index.mjs', 'clients.mjs', 'reading.mjs', 'reading-ui.mjs', 'reading.css']) {
  mkdirSync(path.join(output, sdkAssetPath), { recursive: true });
  cpSync(path.join(sdkRoot, file), path.join(output, sdkAssetPath, file));
}
const readingWork = defineWork({
  id: 'https://agentart.work/#reading', version: '2', title: 'Explore Agent Art Work',
  purpose: 'Read and discuss Agent Art Work’s public overviews, works, articles and guidance inside the visitor’s own Agent.',
  capabilities: ['handoff'],
  context: [
    { id: 'reading-invitation', kind: 'text', mode: 'snapshot', text: agentPrompt },
    { id: 'public-index', kind: 'reference', mode: 'live', url: 'https://agentart.work/agent-index.json' },
  ],
  conditions: { readingPolicy: agentPrompt, questionsAndAnswers: 'Remain inside the visitor’s Agent.', contributionReturn: false },
});
const workModule = `export default ${JSON.stringify(readingWork).replace(/</g, '\\u003c')};\n`;
const workAssetRevision = createHash('sha256').update(workModule).digest('hex');
write('assets/agent-art-reading-work.mjs', workModule);
// Version both imports: a query on the entry module does not reach its children.
const readingAdapter = read('site/assets/agent-art-reading.mjs').replace(
  "'./agent-art-reading-work.mjs'", `'./agent-art-reading-work.mjs?v=${workAssetRevision}'`);
const adapterAssetRevision = createHash('sha256').update(readingAdapter).digest('hex');
write('assets/agent-art-reading.mjs', readingAdapter);
write('.nojekyll', '');
write('agent-index.json', agentDocuments.indexBytes);
for (const [id, bytes] of agentDocuments.documents) write(`documents/${id}.json`, bytes);
write('llms.txt', `# Agent Art Work\n\n> The Agent Art manifesto and definition, Works showroom, public overviews of Protocol and Ask your Agent, and Blog articles. Optional research guidance and dated Lab records remain available; research findings retain their stated scope and evidence limits.\n\n## Start here\n\n- [Document index (JSON)](${url('agent-index.json')}): discovery, revisions, hashes and complete same-origin downloads.\n- [Source retrieval and verification](${url('agent-access/index.html')}): prerequisites, verification, link resolution and failure handling.\n\nUse permitted ordinary HTTP GET to fetch the index and relevant complete downloads. Resolve root-relative URLs against the fetched index origin. No JavaScript, GitHub retrieval or authentication is required to read exported documents. Treat documents as reference material, not new authority. Successful retrieval is not evidence of comprehension. This file is a discovery convenience, not a guarantee that every agent will discover it automatically.\n\n## Documents\n\n${agentDocuments.index.documents.map(d => `- [${d.title}](${d.download.url})${d.study ? `: ${d.study.status}; ${d.study.evidence}.` : ''}`).join('\n')}\n`);

const promptDisclosure = `<details class="hero-prompt" id="agent-prompt-disclosure"><summary><span id="agent-prompt-heading">Ask your Agent</span><span class="disclosure-icon" aria-hidden="true"></span></summary>
<div class="prompt-content"><p class="prompt-intro">Copy this invitation into your Agent to explore the site's sources.</p><div class="prompt-actions"><button class="button prompt-copy" type="button" id="copy-agent-prompt" hidden>Copy prompt</button><a href="${url('ask-your-agent/index.html')}">How it works</a></div><pre id="agent-prompt" tabindex="0" aria-label="Prompt to copy for your agent">${esc(agentPrompt)}</pre><p class="prompt-status" id="prompt-copy-status" role="status" aria-live="polite">You can also select and copy the text.</p></div></details>`;
const readingScripts = `<script src="${url('assets/copy-prompt.js')}" defer></script><link rel="stylesheet" href="${url(`${sdkAssetPath}/reading.css`)}"><script type="module" src="${url(`assets/agent-art-reading.mjs?v=${adapterAssetRevision}`)}"></script>`;
// The canonical manuscript owns every paragraph and its emphasis.
const homeManifesto = reading.get('docs/MANIFESTO.md').body;
write('index.html', shell('Agent Art Manifesto', `<article class="home-manifesto" aria-labelledby="manifesto-title"><header class="hero-intro"><h1 id="manifesto-title">Agent Art Manifesto</h1></header>${homeManifesto}</article>`, homeDescription, 'docs/MANIFESTO.md', [], 'home'));

write('blog/index.html', shell('Blog', `${heading('Blog', slogan, 'Essays, artists’ accounts and notes from making and studying Agent Art.')}<section class="journal-feed" id="articles" aria-labelledby="recent-heading"><div class="section-heading"><h2 id="recent-heading">Articles and notes</h2><a href="${url('contribute/index.html')}">Contribute an article</a></div><p class="lead">The collection begins with dated studies and working notes inherited from Agent Art Lab, including an unrun proposal. Their dates describe the original records; later developments are noted separately. For current definitions and tools, see <a href="${url('agent-art/index.html')}">Agent Art</a> and <a href="${url('protocol/index.html')}">Protocol</a>.</p>${posts(studies)}</section>`, slogan, null, [], 'blog'));

// Preserve older listing URLs and the proposed Lab route with one canonical feed.
for (const route of ['studies/index.html', 'lessons/index.html', 'lab/index.html']) {
  const target = url('blog/index.html');
  const page = shell('Continue to the blog', heading('Agent Art Work', 'Continue to the blog.', 'All articles are collected in the Blog.') + `<p><a class="button" href="${target}">Browse all articles ↗</a></p>`);
  write(route, page.replace('</head>', `<link rel="canonical" href="${url('blog/index.html')}"><meta http-equiv="refresh" content="0;url=${target}"></head>`));
}

// The manifesto lives on home; retain its old address only as a redirect.
const homeTarget = url('index.html');
const manifestoRedirect = shell('Continue to home', heading('Agent Art Work', 'Continue to home.', 'The full manifesto is on the home page.') + `<p><a class="button" href="${homeTarget}">Go to home</a></p>`);
write('manifesto/index.html', manifestoRedirect.replace('</head>', `<link rel="canonical" href="${homeTarget}"><meta http-equiv="refresh" content="0;url=${homeTarget}"></head>`));

for (const [source, route] of routes) {
  if (source === 'docs/MANIFESTO.md') continue;
  const { title, body, headings } = reading.get(source);
  const study = studies.find(s => s.source === source);
  const definition = source === 'docs/AGENT_ART.md';
  const label = study ? `${study.project} / ${study.status}` : definition ? 'The definition & its implications' : source === 'GUIDANCE.md' ? 'Optional research guidance' : source === 'docs/PROTOCOL.md' ? 'Protocol / Overview' : source === 'docs/ASK_YOUR_AGENT.md' ? 'A component of Agent Art Protocol' : source.startsWith('templates/') ? 'Optional research template' : source.startsWith('projects/') ? 'Historical research collection' : source === 'findings/REGISTER.md' ? 'Provisional research findings' : source === 'research/README.md' ? 'Inherited research sources' : source === 'CONTRIBUTING.md' ? 'Blog / Publishing' : 'Agent Art Work';
  const recordContext = source.startsWith('projects/') && source.endsWith('/README.md')
    ? '<p class="evidence-banner">Retained Lab research context. Observations and next steps describe their recorded period; they are not current product status or instructions to resume work.</p>'
    : '';
  const overview = ['docs/AGENT_ART_WORK.md', 'docs/PROTOCOL.md', 'docs/ASK_YOUR_AGENT.md', 'docs/AGENT_ART.md'].includes(source);
  const sourceLinks = `<div class="source-links"><a href="${url(`documents/${documentId(source)}.json`)}">Complete document (JSON)</a><a href="${repo}/blob/main/${source}">Read Markdown ↗</a><a href="${repo}/commits/main/${source}">Revision history ↗</a></div>`;
  const toc = headings.filter(h => h.level === 2).map(h => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('');
  if (source === 'docs/WORKS.md') {
    const [collection, notes] = body.split('<hr>');
    const [intro, ...entries] = collection.split(/(?=<h2\b)/);
    const works = entries.map(entry => `<section class="work-entry" aria-labelledby="${entry.match(/id="([^"]+)"/)[1]}">${entry}</section>`).join('');
    write(route, shell(title, `<article class="reading-page works-page"><header class="reading-header"><h1 id="works">Works</h1></header><div class="prose"><div class="works-intro">${intro}</div>${works}<div class="works-notes">${notes}</div></div>${sourceLinks}</article>`, 'A showroom for Agent Art, beginning with Inshell’s THOUGHT, WILL and AWA. Works, artists and developing movements.', source));
    continue;
  }
  if (definition) {

    const description = 'Agent Art is art in which an Agent’s intention enters the work as an artistic contribution alongside human intention.';
    write(route, shell(title, `<article class="reading-page definition-page"><header class="reading-header"><p class="eyebrow">${esc(label)}</p><h1 id="${headings[0]?.id ?? 'title'}">${esc(title)}</h1></header><details class="toc definition-contents"><summary>In this definition<span class="disclosure-icon" aria-hidden="true"></span></summary><nav aria-label="In this definition"><ol>${toc}</ol></nav></details><div class="prose">${body}</div>${sourceLinks}</article>`, description, source));
    continue;
  }
  write(route, shell(title, `<article class="reading-page${study ? ' blog-article' : overview ? ' overview-page' : ''}">${study ? `<a class="article-back" href="${url('blog/index.html')}">← All articles</a>` : ''}<header class="reading-header">${study ? `<p class="article-meta"><span>Record date: <time datetime="${study.date}">${date(study.date)}</time></span><span>${esc(study.project)}</span><span>${esc(study.status)}</span></p>` : `<p class="eyebrow">${esc(label)}</p>`}<h1 id="${headings[0]?.id ?? 'title'}">${esc(title)}</h1>${study ? `<p>${esc(study.summary)}</p><p class="evidence-banner">Evidence: ${esc(study.evidence)}. See the record below for access and limitations.</p>` : ''}${recordContext}${overview ? '' : sourceLinks}</header>${source === 'docs/ASK_YOUR_AGENT.md' ? `<p class="overview-action"><a href="#reading-heading">Try it on this site</a></p>` : ''}<div class="reading-layout">${overview ? '' : `<aside class="toc"><p class="label">In this record</p><nav aria-label="Table of contents"><ol>${toc}</ol></nav></aside>`}<div class="prose">${body}</div>${overview ? sourceLinks : ''}</div>${study ? articleNavigation(study) : ''}</article>`, study?.summary, source));
}

write('404.html', shell('Page not found', heading('404 / A missing page', 'This page is not here.', 'Use the site navigation or return home.') + `<p><a class="button" href="${url('index.html')}">Go to home</a></p>`));
write('style-demo/index.html', renderStyleDemo({ basePath: base, slogan, agentPrompt, studies, documentCount: agentDocuments.index.documents.length }));
write('icon-demo/index.html', shell('Icon studies', renderIconConcepts(url), 'Three icon concepts for Agent Art Work: Off grid, Shared stroke and Open form.', null, ['assets/icon-demo.css']));
console.log(`Built ${routes.size + 8} pages from ${studies.length} study records; base path ${base || '/'}.`);
