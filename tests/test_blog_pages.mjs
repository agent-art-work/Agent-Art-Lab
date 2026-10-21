import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createReading } from '@agent-art/protocol/reading';
import { before, test } from 'node:test';
import MarkdownIt from 'markdown-it';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = process.env.SITE_BASE_PATH ?? '';
const read = file => readFileSync(path.join(root, file), 'utf8');
const markdown = new MarkdownIt({ html: false, linkify: false });
const studies = JSON.parse(read('site/studies.json'))
  .sort((left, right) => right.date.localeCompare(left.date) || left.title.localeCompare(right.title));
const route = study => study.source.replace(/\.md$/, '.html');
const href = study => `${base}/${route(study)}`;
const decode = value => value.replace(/&(?:#\d+|#x[\da-f]+|[a-z][a-z\d]+);/gi,
  entity => markdown.utils.unescapeAll(entity));
const text = html => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attributes = source => Object.fromEntries([...source.matchAll(/\b([a-z-]+)(?:="([^"]*)")?/g)]
  .map(attribute => [attribute[1], decode(attribute[2] ?? '')]));

// Match known generated tags by nesting depth, so sections inside the hero do
// not falsely end it. This deliberately avoids a new DOM/test dependency.
function elements(html, tag, className) {
  const tokens = new RegExp(`<(/?)${tag}\\b([^>]*)>`, 'g');
  const stack = [];
  const result = [];
  for (const match of html.matchAll(tokens)) {
    if (!match[1]) {
      const attrs = attributes(match[2]);
      stack.push({ attrs, start: match.index, innerStart: match.index + match[0].length });
    } else {
      const item = stack.pop();
      assert.ok(item, `unbalanced generated ${tag}`);
      if (!className || (item.attrs.class ?? '').split(/\s+/).includes(className)) {
        result.push({ ...item, inner: html.slice(item.innerStart, match.index) });
      }
    }
  }
  assert.equal(stack.length, 0, `unclosed generated ${tag}`);
  return result.sort((left, right) => left.start - right.start);
}

function one(html, tag, className) {
  const matches = elements(html, tag, className);
  assert.equal(matches.length, 1, `expected one ${tag}.${className}`);
  return matches[0];
}

function postIdentities(html) {
  return elements(html, 'article', 'post-preview').map(post => {
    const heading = [...elements(post.inner, 'h2'), ...elements(post.inner, 'h3')];
    assert.equal(heading.length, 1, 'each preview has one linked article title');
    const link = one(heading[0].inner, 'a');
    const meta = one(post.inner, 'p', 'post-meta');
    return { title: text(link.inner), href: link.attrs.href, date: one(meta.inner, 'time').attrs.datetime };
  });
}

const expectedPosts = items => items.map(study => ({ title: study.title, href: href(study), date: study.date }));

before(() => {
  const build = spawnSync(process.execPath, ['scripts/build-site.mjs'], { cwd: root, encoding: 'utf8' });
  assert.equal(build.status, 0, `site build failed:\n${build.stdout}\n${build.stderr}`);
});

test('homepage includes every study in descending record-date and title order', () => {
  const homepage = read('_site/index.html');
  const feed = one(homepage, 'section', 'journal-feed');
  assert.equal(feed.attrs.id, 'articles', 'legacy links land on the single article feed');
  assert.deepEqual(postIdentities(feed.inner), expectedPosts(studies));
});

test('the homepage keeps the complete canonical prompt inside a native, initially closed disclosure', () => {
  const homepage = read('_site/index.html');
  assert.equal([...homepage.matchAll(/\bid="agent-prompt"/g)].length, 1);
  const hero = one(homepage, 'section', 'home-hero');
  const disclosure = one(hero.inner, 'details', 'hero-prompt');
  assert.equal(disclosure.attrs.id, 'agent-prompt-disclosure');
  assert.ok(!('open' in disclosure.attrs), 'the native disclosure is closed by default');
  assert.equal(text(one(disclosure.inner, 'summary').inner), 'Copy the original reading prompt');
  const prompt = elements(disclosure.inner, 'pre').filter(item => item.attrs.id === 'agent-prompt');
  assert.equal(prompt.length, 1, 'the full prompt remains inside the hero disclosure');
  const copyButton = elements(disclosure.inner, 'button').filter(item => item.attrs.id === 'copy-agent-prompt');
  assert.equal(copyButton.length, 1, 'copy remains available inside the expanded disclosure');
  assert.equal(copyButton[0].attrs.type, 'button');
  const status = elements(disclosure.inner, 'p').filter(item => item.attrs.id === 'prompt-copy-status');
  assert.equal(status.length, 1, 'copy status remains inside the disclosure');
  assert.equal(status[0].attrs.role, 'status');
  const tokens = markdown.parse(read('docs/AGENT_ACCESS.md'), {});
  const heading = tokens.findIndex(token => token.type === 'inline' && token.content === 'A prompt to use');
  assert.notEqual(heading, -1);
  const canonical = tokens.slice(heading + 1).find(token => token.type === 'fence' && token.info === 'text');
  assert.ok(canonical, 'the access guide supplies the canonical prompt');
  assert.equal(decode(prompt[0].inner), canonical.content.replace(/\n$/, ''));
});

test('reading controls mount before the manual disclosure and preserve the exact handoff-only public context', async () => {
  const homepage = read('_site/index.html');
  assert.ok(homepage.indexOf('id="ask-your-agent"') < homepage.indexOf('id="agent-prompt-disclosure"'));
  assert.ok(homepage.includes(`${base}/assets/agent-art-reading.mjs`));
  const { default: work } = await import(pathToFileURL(path.join(root, '_site/assets/agent-art-reading-work.mjs')).href);
  const reading = createReading({ work });
  const canonical = read('docs/AGENT_ACCESS.md').match(/## A prompt to use\s+```text\n([\s\S]*?)\n```/)?.[1];
  for (const [client, protocol, parameter] of [
    ['codex-app', 'codex:', 'prompt'], ['claude-app', 'claude:', 'q'],
  ]) {
    const destination = new URL(reading.prepare({ client }).url);
    assert.equal(destination.protocol, protocol);
    assert.equal(destination.searchParams.get(parameter), canonical);
  }
  assert.equal(reading.prepare({ client: 'claude-app', conversation: 'existing' }).kind, 'manual');
  assert.ok(!read('_site/assets/agent-art-reading.mjs').includes('/__bridge/'));
  const integration = read('_site/assets/agent-art-reading.mjs');
  const workRevision = createHash('sha256').update(read('_site/assets/agent-art-reading-work.mjs')).digest('hex');
  const adapterRevision = createHash('sha256').update(integration).digest('hex');
  assert.ok(integration.includes(`'./agent-art-reading-work.mjs?v=${workRevision}'`),
    'the nested Work import must change its cache key when prompt bytes change');
  assert.ok(homepage.includes(`${base}/assets/agent-art-reading.mjs?v=${adapterRevision}`),
    'the homepage must request the matching adapter revision');
  assert.match(integration, /import \{ mountReading \} from '\.\/agent-art-sdk\/0\.1\.2\/reading-ui\.mjs'/);
  assert.ok(homepage.includes(`${base}/assets/agent-art-sdk/0.1.2/reading.css`),
    'SDK styles and relative module imports share the immutable version path');
  assert.ok(!existsSync(path.join(root, '_site/assets/agent-art-sdk/reading-ui.mjs')));
  assert.doesNotMatch(integration, /discoverClients|127\.0\.0\.1|__aap/, 'public adapter must not probe the visitor’s machine');
  assert.doesNotMatch(integration, /mountOpenGate|\.\/open-gate\.mjs/);
  assert.match(integration, /evidence: false/);
  assert.ok(!existsSync(path.join(root, '_site/assets/open-gate.mjs')));
  assert.ok(!existsSync(path.join(root, '_site/assets/open-gate.css')));
  assert.ok(!homepage.includes('assets/open-gate.css'));
  for (const file of ['index.mjs', 'clients.mjs', 'reading.mjs', 'reading-ui.mjs', 'reading.css']) {
    assert.equal(read(`_site/assets/agent-art-sdk/0.1.2/${file}`),
      read(`node_modules/@agent-art/protocol/${file}`));
  }
});

test('legacy studies and lessons URLs redirect to the single blog with a visible fallback', () => {
  for (const route of ['studies/index.html', 'lessons/index.html']) {
    const page = read(`_site/${route}`);
    assert.equal(elements(page, 'article', 'post-preview').length, 0, route);
    assert.equal(elements(page, 'div', 'lesson-list').length, 0, route);
    const metas = [...page.matchAll(/<meta\b([^>]*)>/g)].map(match => attributes(match[1]));
    const refresh = metas.filter(meta => meta['http-equiv']?.toLowerCase() === 'refresh');
    assert.equal(refresh.length, 1, route);
    const destination = refresh[0].content?.match(/^\s*0\s*;\s*url=(.+?)\s*$/i);
    assert.ok(destination, `${route} redirects immediately`);
    assert.equal(destination[1], `${base}/#articles`, route);
    const links = [...page.matchAll(/<link\b([^>]*)>/g)].map(match => attributes(match[1]));
    assert.deepEqual(links.filter(link => link.rel === 'canonical').map(link => link.href), [`${base}/`], route);
    const fallback = elements(one(page, 'main').inner, 'a')
      .filter(link => link.attrs.href === `${base}/#articles`);
    assert.ok(fallback.some(link => text(link.inner) && !('hidden' in link.attrs)
      && link.attrs['aria-hidden'] !== 'true'), `${route} has a readable fallback`);
  }
});

test('the brand returns home and top navigation contains only GitHub', () => {
  let checked = 0;
  for (const file of readdirSync(path.join(root, '_site'), { recursive: true }).filter(file => file.endsWith('.html'))) {
    const page = read(`_site/${file}`);
    const navigation = elements(page, 'nav', 'site-nav');
    if (!navigation.length) continue; // The isolated style demonstration has its own controls.
    assert.equal(navigation.length, 1, file);
    const links = elements(navigation[0].inner, 'a');
    assert.deepEqual(links.map(link => link.attrs.href), ['https://github.com/agent-art-work/Agent-Art-Lab'], file);
    assert.match(text(links[0].inner), /^GitHub\b/, file);
    const brand = one(one(page, 'header', 'site-header').inner, 'a', 'brand');
    assert.equal(brand.attrs.href, `${base}/`, file);
    assert.equal(brand.attrs['aria-label'], 'Agent-Art-Lab home', file);
    checked += 1;
  }
  assert.ok(checked > studies.length, 'check the reading pages as well as the articles');
});

test('reading pages keep the selected static appearance without publishing chooser controls or code', () => {
  assert.ok(!existsSync(path.join(root, '_site/assets/font-picker.js')), 'do not publish the retired preference script');
  const stylesheet = read('_site/assets/site.css');
  assert.match(stylesheet, /--site-font:\s*"Courier New",\s*Courier,\s*monospace\s*;/);
  assert.match(stylesheet, /--site-weight:\s*400\s*;/);
  assert.match(stylesheet, /--texture-image:\s*radial-gradient\(/, 'keep the selected dots background without JavaScript');
  assert.match(stylesheet, /color-scheme:\s*light dark\s*;/);
  assert.match(stylesheet, /@media\s*\(prefers-color-scheme:\s*dark\)/, 'colors follow the system preference');
  for (const file of readdirSync(path.join(root, '_site'), { recursive: true }).filter(file => file.endsWith('.html') && !file.startsWith('style-demo/'))) {
    const page = read(`_site/${file}`);
    const defaults = one(page, 'html').attrs;
    assert.equal(defaults['data-font'], 'courier', file);
    assert.equal(defaults['data-weight'], '400', file);
    assert.equal(defaults['data-texture'], 'dots', file);
    assert.equal(elements(page, 'details', 'font-panel').length, 0, `${file}: omit the appearance panel`);
    assert.doesNotMatch(page, /\bid="(?:font-panel|font-current|weight-current|texture-current)"/, file);
    const inputs = [...page.matchAll(/<input\b([^>]*)>/g)].map(match => attributes(match[1]));
    assert.ok(inputs.every(input => !['site-font', 'site-weight', 'site-texture'].includes(input.name)),
      `${file}: omit preference controls`);
    const scripts = elements(page, 'script');
    assert.ok(scripts.every(script => !/(?:^|\/)font-picker\.js(?:[?#]|$)/.test(script.attrs.src ?? '')),
      `${file}: do not load the preference script`);
    assert.ok(scripts.every(script => !/agent-art-lab:(?:font|weight|texture)/.test(script.inner)),
      `${file}: saved choices cannot override the fixed appearance`);
  }
});

test('article pages retain complete source text and identify dates as record dates', () => {
  for (const study of studies) {
    const page = read(`_site/${route(study)}`);
    const article = one(page, 'article', 'blog-article');
    assert.equal(one(article.inner, 'a', 'article-back').attrs.href, `${base}/#articles`, study.source);
    const meta = one(article.inner, 'p', 'article-meta');
    assert.equal(one(meta.inner, 'time').attrs.datetime, study.date, study.source);
    assert.match(text(meta.inner), /Record date:/);
    assert.doesNotMatch(text(meta.inner), /\b(?:published|updated)\b/i);
    assert.ok(text(meta.inner).includes(study.status), `keep the status for ${study.source}`);
    const expected = markdown.render(read(study.source)).replace(/<h1>[\s\S]*?<\/h1>\n?/, '');
    assert.equal(text(one(article.inner, 'div', 'prose').inner), text(expected),
      `retain the complete source body and limits for ${study.source}`);
  }
});

test('adjacent article links follow the catalogue order and stop at both boundaries', () => {
  for (const [index, study] of studies.entries()) {
    const page = read(`_site/${route(study)}`);
    const navigation = one(page, 'nav', 'article-pagination');
    const actual = elements(navigation.inner, 'a').map(link => ({ rel: link.attrs.rel, href: link.attrs.href }));
    const expected = [];
    if (index > 0) expected.push({ rel: 'prev', href: href(studies[index - 1]) });
    if (index < studies.length - 1) expected.push({ rel: 'next', href: href(studies[index + 1]) });
    assert.deepEqual(actual, expected, `adjacent records for ${study.source}`);
  }
});
