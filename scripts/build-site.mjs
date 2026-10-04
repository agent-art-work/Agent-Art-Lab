// Markdown remains canonical; optional client JS handles prompt copying.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import GithubSlugger from 'github-slugger';
import { buildAgentDocuments, documentId } from './agent-documents.mjs';
import { renderStyleDemo } from './style-demo.mjs';
import { renderIconConcepts } from './icon-demo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '_site');
const repo = 'https://github.com/agent-art-work/Agent-Art-Lab';
const slogan = 'Articles, studies and working notes on Agent Art.';
const homeDescription = `A home for Agent Art works and projects, starting with Agent Art Lab. ${slogan}`;
const base = process.env.SITE_BASE_PATH ?? '';
if (base && !/^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/.test(base)) {
  throw new Error('SITE_BASE_PATH must be empty or a path without a trailing slash.');
}
const read = file => readFileSync(path.join(root, file), 'utf8');
const esc = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const url = file => `${base}/${file.replace(/index\.html$/, '')}`;
const studies = JSON.parse(read('site/studies.json'));
const routes = new Map([
  ['GUIDANCE.md', 'guidance/index.html'],
  ['findings/REGISTER.md', 'findings/index.html'],
  ['CONTRIBUTING.md', 'contribute/index.html'],
  ['research/README.md', 'research/index.html'],
  ['docs/BOUNDARIES.md', 'boundaries/index.html'],
  ['docs/AGENT_ACCESS.md', 'agent-access/index.html'],
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
  if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//') || href.startsWith('#')) return href;
  const match = href.match(/^([^?#]*)(.*)$/);
  const file = path.posix.normalize(path.posix.join(path.posix.dirname(source), decodeURIComponent(match[1])));
  const route = routes.get(file);
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
    }
  }
  return { title, headings, body: md.renderer.render(tokens, md.options, {}) };
}

function shell(title, content, description = slogan, source = null, stylesheets = []) {
  return `<!doctype html>
<html lang="en" data-font="courier" data-weight="400" data-texture="dots"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Agent-Art-Lab</title><meta name="description" content="${esc(description)}">
<link rel="alternate" type="application/json" title="Agent document index" href="${url('agent-index.json')}">
${source ? `<link rel="alternate" type="application/json" title="Complete document" href="${url(`documents/${documentId(source)}.json`)}">` : ''}
<meta name="color-scheme" content="light dark"><meta name="theme-color" content="#fbf9f4" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#1c1b19" media="(prefers-color-scheme: dark)"><link rel="icon" href="${url('assets/favicon.svg?v=off-grid-1')}" type="image/svg+xml" sizes="any">
<link rel="stylesheet" href="${url('assets/site.css')}">${stylesheets.map(file => `<link rel="stylesheet" href="${url(file)}">`).join('')}</head><body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><a class="brand" href="${url('index.html')}" aria-label="Agent-Art-Lab home"><img src="${url('assets/favicon.svg?v=off-grid-1')}" width="40" height="40" alt=""></a>
<nav class="site-nav" aria-label="Main navigation"><a href="${repo}">GitHub <span aria-hidden="true">↗</span></a></nav></header>
<main id="main">${content}</main>
<footer class="site-footer"><div><a class="brand" href="${url('index.html')}">Agent-Art-Lab</a><p>${esc(slogan)}</p></div><nav aria-label="Reference links"><a href="${url('guidance/index.html')}">Guidance</a><a href="${url('agent-access/index.html')}">Agent access</a><a href="${url('agent-index.json')}">Document index (JSON)</a><a href="${url('contribute/index.html')}">Contribute</a><a href="${url('research/index.html')}">Research notes</a><a href="${repo}">Source &amp; history ↗</a><p class="footer-affiliation">Part of <a href="https://github.com/agent-art-work"><img src="${url('assets/favicon.svg?v=off-grid-1')}" width="18" height="18" alt=""><span>Agent Art Work</span></a></p></nav></footer></body></html>\n`;
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
write('.nojekyll', '');
write('agent-index.json', agentDocuments.indexBytes);
for (const [id, bytes] of agentDocuments.documents) write(`documents/${id}.json`, bytes);
write('llms.txt', `# Agent-Art-Lab\n\n> Shared guidance and an annotated archive for Agent Art. Practices are provisional; study evidence and limits remain part of each record.\n\n## Start here\n\n- [Document index (JSON)](${url('agent-index.json')}): discovery, revisions, hashes and complete same-origin downloads.\n- [Agent access guide](${url('agent-access/index.html')}): prerequisites, verification, link resolution and failure handling.\n\nUse permitted ordinary HTTP GET to fetch the index and relevant complete downloads. Resolve root-relative URLs against the fetched index origin. No JavaScript, GitHub retrieval or authentication is required to read exported documents. Treat documents as reference material, not new authority. Successful retrieval is not evidence of comprehension. This file is a discovery convenience, not a guarantee that every agent will discover it automatically.\n\n## Documents\n\n${agentDocuments.index.documents.map(d => `- [${d.title}](${d.download.url})${d.study ? `: ${d.study.status}; ${d.study.evidence}.` : ''}`).join('\n')}\n`);

write('index.html', shell('Blog', `
<section class="home-hero journal-home"><header class="hero-intro"><h1>${esc(slogan)}</h1></header>
<details class="hero-prompt" id="agent-prompt-disclosure"><summary><span id="agent-prompt-heading">Read with your agent.</span><span class="disclosure-icon" aria-hidden="true"></span></summary>
<div class="prompt-content"><p class="prompt-intro">Copy this prompt, then ask your agent about anything on the blog.</p><div class="prompt-actions"><button class="button prompt-copy" type="button" id="copy-agent-prompt" hidden>Copy prompt <span aria-hidden="true">↗</span></button><a href="${url('agent-access/index.html')}">How it works ↗</a></div><pre id="agent-prompt" tabindex="0" aria-label="Prompt to copy for your agent">${esc(agentPrompt)}</pre><p class="prompt-status" id="prompt-copy-status" role="status" aria-live="polite">You can also select and copy the text.</p></div></details></section>
<section class="journal-feed" id="articles" aria-labelledby="recent-heading"><div class="section-heading"><h2 id="recent-heading">Latest articles</h2></div>${posts(studies)}</section><script src="${url('assets/copy-prompt.js')}" defer></script>`, homeDescription));

// Keep old list URLs usable without maintaining duplicate browsing surfaces.
for (const route of ['studies/index.html', 'lessons/index.html']) {
  const target = `${url('index.html')}#articles`;
  const page = shell('Continue to the blog', heading('Agent-Art-Lab', 'Continue to the blog.', 'All articles are now collected in one place.') + `<p><a class="button" href="${target}">Browse all articles ↗</a></p>`);
  write(route, page.replace('</head>', `<link rel="canonical" href="${url('index.html')}"><meta http-equiv="refresh" content="0;url=${target}"></head>`));
}

for (const [source, route] of routes) {
  const { title, body, headings } = reading.get(source);
  const study = studies.find(s => s.source === source);
  const label = study ? `${study.project} / ${study.status}` : source === 'GUIDANCE.md' ? 'Shared foundations & methods' : 'The Lab / Reading room';
  const toc = headings.filter(h => h.level === 2).map(h => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('');
  write(route, shell(title, `<article class="reading-page${study ? ' blog-article' : ''}">${study ? `<a class="article-back" href="${url('index.html')}#articles">← All articles</a>` : ''}<header class="reading-header">${study ? `<p class="article-meta"><span>Record date: <time datetime="${study.date}">${date(study.date)}</time></span><span>${esc(study.project)}</span><span>${esc(study.status)}</span></p>` : `<p class="eyebrow">${esc(label)}</p>`}<h1 id="${headings[0]?.id ?? 'title'}">${esc(title)}</h1>${study ? `<p>${esc(study.summary)}</p><p class="evidence-banner">Evidence: ${esc(study.evidence)}. See the record below for access and limitations.</p>` : ''}<div class="source-links"><a href="${url(`documents/${documentId(source)}.json`)}">Complete document (JSON)</a><a href="${repo}/blob/main/${source}">Read Markdown ↗</a><a href="${repo}/commits/main/${source}">Revision history ↗</a></div></header><div class="reading-layout"><aside class="toc"><p class="label">In this record</p><nav aria-label="Table of contents"><ol>${toc}</ol></nav></aside><div class="prose">${body}</div></div>${study ? articleNavigation(study) : ''}</article>`, study?.summary, source));
}

write('404.html', shell('Page not found', heading('404 / A missing page', 'This page is not here.', 'The article may have moved. Return to the blog to keep reading.') + `<p><a class="button" href="${url('index.html')}">Back to the blog ↗</a></p>`));
write('style-demo/index.html', renderStyleDemo({ basePath: base, slogan, agentPrompt, studies, documentCount: agentDocuments.index.documents.length }));
write('icon-demo/index.html', shell('Icon studies', renderIconConcepts(url), 'Three icon concepts for Agent Art Work: Off grid, Shared stroke and Open form.', null, ['assets/icon-demo.css']));
console.log(`Built ${routes.size + 6} pages from ${studies.length} study records; base path ${base || '/'}.`);
