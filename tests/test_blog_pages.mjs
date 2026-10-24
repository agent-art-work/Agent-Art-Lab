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

// Match known generated tags by nesting depth, so nested sections do not
// falsely end their parents. This deliberately avoids a new DOM/test dependency.
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

test('the Blog is the single complete article feed, with record dates and evidence preserved', () => {
  const blog = read('_site/blog/index.html');
  const feed = one(blog, 'section', 'journal-feed');
  assert.equal(text(elements(feed.inner, 'a').find(link => link.attrs.href === `${base}/contribute/`).inner),
    'Contribute an article');
  assert.equal(feed.attrs.id, 'articles', 'article links land on the Blog feed');
  assert.deepEqual(postIdentities(feed.inner), expectedPosts(studies));
  assert.equal(text(one(blog, 'title').inner), 'Blog · Agent Art Work');
  assert.equal(text(one(blog, 'h1').inner), 'Articles, studies and working notes on Agent Art.');
  for (const [index, post] of elements(feed.inner, 'article', 'post-preview').entries()) {
    assert.ok(text(one(post.inner, 'p', 'post-meta').inner).includes(studies[index].status));
    assert.equal(text(one(post.inner, 'p', 'post-evidence').inner), studies[index].evidence);
  }
  for (const file of readdirSync(path.join(root, '_site'), { recursive: true }).filter(file => file.endsWith('.html'))) {
    if (file === 'blog/index.html' || file.startsWith('style-demo/')) continue;
    assert.equal(elements(read(`_site/${file}`), 'article', 'post-preview').length, 0,
      `${file}: the full article feed belongs only to Blog`);
  }
});

test('the homepage is the complete locked manifesto with shared footer and reference links', () => {
  const homepage = read('_site/index.html');
  const main = one(homepage, 'main');
  const manuscript = one(main.inner, 'article', 'home-manifesto');
  const expected = markdown.render(read('docs/MANIFESTO.md')).replace(/<h1>[\s\S]*?<\/h1>\n?/, '');
  assert.equal(text(one(manuscript.inner, 'h1').inner), 'Agent Art Manifesto');
  assert.equal(text(one(homepage, 'title').inner), 'Agent Art Manifesto · Agent Art Work');
  assert.equal(text(manuscript.inner), `Agent Art Manifesto ${text(expected)}`, 'render every word with its title');
  assert.deepEqual(elements(manuscript.inner, 'p').map(p => text(p.inner)),
    elements(expected, 'p').map(p => text(p.inner)), 'preserve all paragraph boundaries and order');
  assert.deepEqual(elements(manuscript.inner, 'strong').map(p => text(p.inner)),
    elements(expected, 'strong').map(p => text(p.inner)),
    'preserve the four approved bold paragraphs without nested emphasis');
  assert.equal(elements(homepage, 'header', 'site-header').length, 0);
  assert.equal(elements(homepage, 'footer', 'site-footer').length, 1);
  assert.equal(elements(main.inner, 'a').length, 0, 'no navigation interrupts the declaration');
  const bottom = one(homepage, 'footer', 'site-footer');
  assert.ok(bottom.start > homepage.indexOf('</main>'));
  const top = one(homepage, 'header', 'manifesto-top');
  assert.ok(top.start < main.start);
  const groups = elements(homepage, 'section', 'home-links');
  assert.equal(groups.length, 1);
  for (const group of groups) assert.equal(elements(group.inner, 'h2').length, 0);
  assert.equal(elements(top.inner, 'nav', 'home-reference').length, 0);
  assert.equal(elements(top.inner, 'a').length, 6);
  const homeBrand = one(top.inner, 'a', 'brand');
  assert.equal(text(homeBrand.inner), '');
  assert.equal(homeBrand.attrs['aria-label'], 'Agent Art Work home');
  assert.equal(bottom.inner, one(read('_site/agent-art/index.html'), 'footer', 'site-footer').inner,
    'home uses the same footer as regular pages');
  assert.ok(!elements(bottom.inner, 'a').some(link => link.attrs.href === `${base}/contribute/`),
    'article contribution belongs on Blog rather than in the global footer');
  const about = one(read('_site/about/index.html'), 'main');
  for (const destination of [`${base}/guidance/`, `${base}/ask-your-agent/`, `${base}/contribute/`,
    'https://github.com/agent-art-work',
    'https://github.com/agent-art-work/agentart.work']) {
    assert.ok(elements(about.inner, 'a').some(link => link.attrs.href === destination),
      `About preserves reference access to ${destination}`);
  }
  assert.ok(!elements(bottom.inner, 'a').some(link => link.attrs.href === `${base}/guidance/`),
    'optional research guidance is not a global footer destination');
  assert.equal(text(elements(about.inner, 'a').find(link => link.attrs.href === `${base}/guidance/`).inner),
    'Research guidance', 'current contextual links identify the research scope');
  assert.ok(!elements(about.inner, 'h2').some(heading => text(heading.inner) === 'Read with your Agent'),
    'About uses the shared Ask your Agent entry without a competing reading section');
  for (const destination of [`${base}/agent-access/`, `${base}/agent-index.json`]) {
    assert.ok(!elements(bottom.inner, 'a').some(link => link.attrs.href === destination),
      `technical access to ${destination} belongs under Ask your Agent`);
  }
  const ask = one(read('_site/ask-your-agent/index.html'), 'main');
  for (const [label, destination] of [
    ['Source retrieval and verification', `${base}/agent-access/`],
    ['Document index (JSON)', `${base}/agent-index.json`],
  ]) {
    assert.ok(elements(ask.inner, 'a').some(link => link.attrs.href === destination && text(link.inner) === label),
      `Ask your Agent preserves ${label}`);
  }
  const bridge = elements(top.inner, 'a').filter(item => item.attrs.id === 'articles');
  assert.equal(bridge.length, 1, 'old /#articles links have a visible destination');
  assert.equal(bridge[0].attrs.href, `${base}/blog/`);
  assert.equal(one(homepage, 'section', 'site-reading').attrs.id, 'reading-heading');
  assert.ok(homepage.includes('title="Complete document"'), 'home advertises its canonical source download');
});

test('the shared reading utility keeps the complete canonical prompt in a native, initially closed disclosure', () => {
  const tokens = markdown.parse(read('docs/AGENT_ACCESS.md'), {});
  const heading = tokens.findIndex(token => token.type === 'inline' && token.content === 'A prompt to use');
  assert.notEqual(heading, -1);
  const canonical = tokens.slice(heading + 1).find(token => token.type === 'fence' && token.info === 'text');
  assert.ok(canonical, 'the access guide supplies the canonical prompt');
  for (const file of readdirSync(path.join(root, '_site'), { recursive: true }).filter(file => file.endsWith('.html'))) {
    const page = read(`_site/${file}`);
    if (!elements(page, 'nav', 'site-nav').length && file !== 'index.html') continue;
    const utility = one(page, 'section', 'site-reading');
    assert.ok(!('hidden' in utility.attrs), `${file}: the no-JavaScript reading utility remains available`);
    assert.equal([...page.matchAll(/\bid="agent-prompt"/g)].length, 1, file);
    const disclosure = one(utility.inner, 'details', 'hero-prompt');
    assert.equal(disclosure.attrs.id, 'agent-prompt-disclosure', file);
    assert.ok(!('open' in disclosure.attrs) && !('hidden' in disclosure.attrs),
      `${file}: the native disclosure starts closed but available without JavaScript`);
    assert.equal(text(one(disclosure.inner, 'summary').inner), 'Ask your Agent', file);
    const prompt = elements(disclosure.inner, 'pre').filter(item => item.attrs.id === 'agent-prompt');
    assert.equal(prompt.length, 1, `${file}: the full prompt remains inside the shared disclosure`);
    const copyButton = elements(disclosure.inner, 'button').filter(item => item.attrs.id === 'copy-agent-prompt');
    assert.equal(copyButton.length, 1, `${file}: copy remains available inside the expanded disclosure`);
    assert.equal(copyButton[0].attrs.type, 'button', file);
    const status = elements(disclosure.inner, 'p').filter(item => item.attrs.id === 'prompt-copy-status');
    assert.equal(status.length, 1, `${file}: copy status remains inside the disclosure`);
    assert.equal(status[0].attrs.role, 'status', file);
    assert.equal(decode(prompt[0].inner), canonical.content.replace(/\n$/, ''), file);
  }
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
  assert.match(integration, /import \{ mountReading \} from '\.\/agent-art-sdk\/0\.1\.5-alpha\.2\/reading-ui\.mjs'/);
  assert.ok(homepage.includes(`${base}/assets/agent-art-sdk/0.1.5-alpha.2/reading.css`),
    'SDK styles and relative module imports share the immutable version path');
  assert.ok(!existsSync(path.join(root, '_site/assets/agent-art-sdk/reading-ui.mjs')));
  assert.doesNotMatch(integration, /discoverClients|127\.0\.0\.1|__aap/, 'public adapter must not probe the visitor’s machine');
  assert.doesNotMatch(integration, /mountOpenGate|\.\/open-gate\.mjs/);
  assert.match(integration, /evidence: false/);
  assert.ok(!existsSync(path.join(root, '_site/assets/open-gate.mjs')));
  assert.ok(!existsSync(path.join(root, '_site/assets/open-gate.css')));
  assert.ok(!homepage.includes('assets/open-gate.css'));
  for (const file of ['index.mjs', 'clients.mjs', 'reading.mjs', 'reading-ui.mjs', 'reading.css', 'LICENSE']) {
    assert.equal(read(`_site/assets/agent-art-sdk/0.1.5-alpha.2/${file}`),
      read(`node_modules/@agent-art/protocol/${file}`));
  }
});

test('public reading alpha retains archive integrity and redistribution notice', () => {
  const design = JSON.parse(read('site/ask-your-agent-design.json'));
  const archive = readFileSync(path.join(root, design.integration.archive));
  assert.equal(archive.length, 18235);
  assert.equal(createHash('sha256').update(archive).digest('hex'), design.integration.sha256);
  const lock = JSON.parse(read('package-lock.json')).packages['node_modules/@agent-art/protocol'];
  assert.equal(lock.version, design.integration.version);
  assert.equal(lock.integrity, 'sha512-' + createHash('sha512').update(archive).digest('base64'));
  assert.equal(lock.resolved, 'file:' + design.integration.archive);
  const metadata = JSON.parse(read('node_modules/@agent-art/protocol/package.json'));
  assert.equal(metadata.license, 'MIT');
  assert.equal(metadata.version, design.integration.version);
  const notice = read(`_site/assets/agent-art-sdk/${metadata.version}/LICENSE`);
  assert.equal(notice, read('node_modules/@agent-art/protocol/LICENSE'));
  assert.match(notice, /MIT License/);
});

test('legacy studies, lessons and Lab URLs redirect to the Blog with a visible fallback', () => {
  for (const route of ['studies/index.html', 'lessons/index.html', 'lab/index.html']) {
    const page = read(`_site/${route}`);
    assert.equal(elements(page, 'article', 'post-preview').length, 0, route);
    assert.equal(elements(page, 'div', 'lesson-list').length, 0, route);
    const metas = [...page.matchAll(/<meta\b([^>]*)>/g)].map(match => attributes(match[1]));
    const refresh = metas.filter(meta => meta['http-equiv']?.toLowerCase() === 'refresh');
    assert.equal(refresh.length, 1, route);
    const destination = refresh[0].content?.match(/^\s*0\s*;\s*url=(.+?)\s*$/i);
    assert.ok(destination, `${route} redirects immediately`);
    assert.equal(destination[1], `${base}/blog/`, route);
    const links = [...page.matchAll(/<link\b([^>]*)>/g)].map(match => attributes(match[1]));
    assert.deepEqual(links.filter(link => link.rel === 'canonical').map(link => link.href), [`${base}/blog/`], route);
    const fallback = elements(one(page, 'main').inner, 'a')
      .filter(link => link.attrs.href === `${base}/blog/`);
    assert.ok(fallback.some(link => text(link.inner) && !('hidden' in link.attrs)
      && link.attrs['aria-hidden'] !== 'true'), `${route} has a readable fallback`);
  }
});

test('the legacy manifesto URL redirects to its complete home-page edition', () => {
  const page = read('_site/manifesto/index.html');
  const metas = [...page.matchAll(/<meta\b([^>]*)>/g)].map(match => attributes(match[1]));
  const refresh = metas.filter(meta => meta['http-equiv']?.toLowerCase() === 'refresh');
  assert.equal(refresh.length, 1);
  assert.equal(refresh[0].content, `0;url=${base}/`);
  const links = [...page.matchAll(/<link\b([^>]*)>/g)].map(match => attributes(match[1]));
  assert.deepEqual(links.filter(link => link.rel === 'canonical').map(link => link.href), [`${base}/`]);
  const fallback = elements(one(page, 'main').inner, 'a')
    .filter(link => link.attrs.href === `${base}/`);
  assert.ok(fallback.some(link => text(link.inner) && !('hidden' in link.attrs)
    && link.attrs['aria-hidden'] !== 'true'), 'keep a readable home link if automatic navigation is disabled');
  assert.doesNotMatch(text(one(page, 'main').inner), /We are learning what it means to be answered/,
    'the legacy route no longer publishes a duplicate manifesto');
});

test('Agent Art Work navigation and the shared reading utility serve every site page', () => {
  let checked = 0;
  for (const file of readdirSync(path.join(root, '_site'), { recursive: true }).filter(file => file.endsWith('.html'))) {
    const page = read(`_site/${file}`);
    const navigation = elements(page, 'nav', 'site-nav');
    if (!navigation.length && file !== 'index.html') continue; // The isolated style demonstration has its own controls.
    if (file !== 'index.html') {
      assert.equal(navigation.length, 1, file);
      const links = elements(navigation[0].inner, 'a');
      assert.deepEqual(links.map(link => link.attrs.href), [
        `${base}/agent-art/`, `${base}/protocol/`,
        `${base}/works/`, `${base}/blog/`, 'https://github.com/agent-art-work',
      ], file);
      assert.deepEqual(links.map(link => text(link.inner)),
        ['Agent Art', 'Protocol', 'Works', 'Blog', 'GitHub'], file);
      const brand = one(one(page, 'header', 'site-header').inner, 'a', 'brand');
      assert.equal(brand.attrs.href, `${base}/`, file);
      assert.equal(brand.attrs['aria-label'], 'Agent Art Work home', file);
      assert.equal(text(brand.inner), '', `${file}: logo only`);
      assert.equal([...brand.inner.matchAll(/<img\b/g)].length, 1, file);
    }
    assert.ok(elements(page, 'a').every(link => link.attrs.href !== `${base}/manifesto/`),
      `${file}: site links lead directly to the canonical home page`);
    for (const menu of elements(page, 'nav', 'home-navigation')) {
      assert.ok(elements(menu.inner, 'a').every(link => text(link.inner) !== 'Manifesto'),
        `${file}: omit the redundant Manifesto navigation item`);
    }
    assert.ok(text(one(page, 'title').inner).includes('Agent Art Work'), file);
    const utility = one(page, 'section', 'site-reading');
    assert.ok(utility.start > page.indexOf('</main>'), `${file}: reading follows page content`);
    assert.ok(utility.start < one(page, 'footer', 'site-footer').start);
    assert.equal(utility.attrs.id, 'reading-heading', file);
    assert.equal(utility.attrs['aria-label'], 'Ask your Agent', file);
    assert.equal([...utility.inner.matchAll(/\bid="ask-your-agent"/g)].length, 1, file);
    assert.ok(utility.inner.indexOf('id="ask-your-agent"') < utility.inner.indexOf('id="agent-prompt-disclosure"'),
      `${file}: the compact button precedes its manual fallback`);
    const scripts = elements(page, 'script');
    assert.equal(scripts.filter(script => script.attrs.src === `${base}/assets/copy-prompt.js`).length, 1, file);
    assert.equal(scripts.filter(script => script.attrs.src?.startsWith(`${base}/assets/agent-art-reading.mjs?v=`)).length, 1, file);
    assert.ok(page.includes(`${base}/assets/agent-art-sdk/0.1.5-alpha.2/reading.css`), file);
    checked += 1;
  }
  assert.ok(checked > studies.length, 'check the reading pages as well as the articles');
});

test('the manifesto preserves the locked manuscript, complete paragraph order and four bold paragraphs', () => {
  const source = read('docs/MANIFESTO.md');
  const locked = read('drafts/agent-art-manifesto/2026-10-23-locked-manifesto-v2.md');
  assert.equal(source, locked, 'publication source must preserve the exact approved manuscript');
  const page = read('_site/index.html');
  assert.equal(text(one(page, 'h1').inner), 'Agent Art Manifesto');
  const prose = one(page, 'article', 'home-manifesto');
  const expected = markdown.render(locked).replace(/<h1>[\s\S]*?<\/h1>\n?/, '');
  assert.equal(text(prose.inner), `Agent Art Manifesto ${text(expected)}`, 'render every word of the locked manifesto');
  assert.deepEqual(elements(prose.inner, 'p').map(paragraph => text(paragraph.inner)),
    elements(expected, 'p').map(paragraph => text(paragraph.inner)),
    'preserve the manuscript’s paragraph boundaries and sequence');
  const emphaticTurns = [
    'We are learning what it means to be answered by something we made.',
    'If an Agent can think better than I can, what do I do? Who am I?',
    'We make Agent Art from this encounter.',
    'Face another intention. Give this age a form.',
  ];
  assert.deepEqual(elements(prose.inner, 'strong').map(item => text(item.inner)), emphaticTurns);
  assert.deepEqual(elements(prose.inner, 'p')
    .filter(paragraph => elements(paragraph.inner, 'strong').length === 1)
    .map(paragraph => text(paragraph.inner)), emphaticTurns,
  'each emphatic turn remains its own complete paragraph');
  assert.ok(elements(one(page, 'footer', 'site-footer').inner, 'a')
    .some(link => link.attrs.href === `${base}/agent-art/` && text(link.inner)),
  'the manifesto leads readers to the separate definition');
});

test('the Agent Art companion carries the definition without inserting it into the manifesto', () => {
  const definition = 'Agent Art is art in which an Agent’s intention enters the work as an artistic contribution alongside human intention.';
  const page = read('_site/agent-art/index.html');
  assert.equal(text(one(page, 'h1').inner), 'Agent Art');
  const prose = one(page, 'div', 'prose');
  assert.ok(text(prose.inner).includes(definition), 'give readers the complete formal definition');
  assert.ok(!text(one(read('_site/index.html'), 'article', 'home-manifesto').inner).includes(definition),
    'the manifesto and companion retain their distinct editorial purposes');
  assert.ok(elements(page, 'a').some(link => link.attrs.href === `${base}/`
    && link.attrs['aria-label'] === 'Agent Art Work home'),
  'the companion connects back to the home-page manifesto through the site logo');
});

test('reading pages keep fixed typography and follow the system appearance', () => {
  assert.ok(!existsSync(path.join(root, '_site/assets/font-picker.js')), 'do not publish the retired preference script');
  const stylesheet = read('_site/assets/site.css');
  assert.match(stylesheet, /--site-font:\s*"PT Mono",\s*"Courier New",\s*monospace\s*;/);
  assert.match(stylesheet, /--site-weight:\s*400\s*;/);
  assert.match(stylesheet, /--texture-image:\s*radial-gradient\(/, 'keep the selected dots background without JavaScript');
  assert.match(stylesheet, /color-scheme:\s*light dark\s*;/);
  assert.ok(existsSync(path.join(root, '_site/assets/fonts/pt-mono/PTM55FT.ttf')), 'serve the selected font locally');
  for (const file of readdirSync(path.join(root, '_site'), { recursive: true }).filter(file => file.endsWith('.html') && !file.startsWith('style-demo/'))) {
    const page = read(`_site/${file}`);
    const defaults = one(page, 'html').attrs;
    assert.doesNotMatch(page, /id="site-theme"|class="theme-switch"/, file);
    assert.equal(defaults['data-font'], 'pt-mono', file);
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
    assert.equal(one(article.inner, 'a', 'article-back').attrs.href, `${base}/blog/`, study.source);
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

test('Works preserves artist attribution, study status and example limits outside the Blog', () => {
  const page = read('_site/works/index.html');
  const entries = elements(page, 'section', 'work-entry');
  assert.deepEqual(entries.map(entry => text(one(entry.inner, 'h2').inner)), ['THOUGHT', 'WILL', 'AWA']);
  assert.match(text(entries[0].inner), /Inshell · Individual · Current practice/);
  for (const entry of entries.slice(1)) assert.match(text(entry.inner), /Inshell · .* · Study/);
  assert.match(text(entries[0].inner), /not a verified creation record or evidence of a minted work/);
  const images = [...page.matchAll(/<img\b([^>]*)>/g)].map(match => attributes(match[1]));
  const example = images.find(image => image.src === `${base}/assets/works/thought-example.svg`);
  assert.ok(example, 'serve the documented SVG under either site base path');
  assert.match(example.alt, /Human: What if the future stays unclear\? Agent: Then choose the next visible kindness\./);
  assert.equal(createHash('sha256').update(readFileSync(path.join(root, 'site/assets/works/thought-example.svg'))).digest('hex'),
    '467d7167138174d23882bf2f364bcf93ddfe276d6d330c18d1e535fda3ba0104', 'preserve the inspected documentation example');
  const active = elements(one(page, 'nav', 'site-nav').inner, 'a').filter(a => a.attrs['aria-current'] === 'page');
  assert.deepEqual(active.map(a => text(a.inner)), ['Works']);
  assert.ok(studies.every(study => study.source !== 'docs/WORKS.md'), 'showroom is not an article record');
});

test('manifesto, definition and public explanations are complete indexed documents alongside retained records', () => {
  const index = JSON.parse(read('_site/agent-index.json'));
  assert.equal(index.schema, 'agent-art-lab.index/v1', 'the website rename does not migrate the reader contract');
  const retainedRoutes = {
    guidance: 'guidance/', 'findings-register': 'findings/', contributing: 'contribute/',
    'research-readme': 'research/', 'docs-boundaries': 'boundaries/',
    'docs-agent-access': 'agent-access/', 'docs-ask-your-agent': 'ask-your-agent/',
    'templates-project': 'templates/project.html', 'templates-study': 'templates/study.html',
    'projects-thought-readme': 'projects/thought/', 'projects-pulse-readme': 'projects/pulse/',
    'projects-agent-handoff-readme': 'projects/agent-handoff/',
  };
  for (const [id, route] of Object.entries(retainedRoutes)) {
    const entry = index.documents.find(document => document.id === id);
    assert.ok(entry, `retain the existing document identity ${id}`);
    assert.equal(entry.page, `${base}/${route}`);
    assert.equal(entry.download.url, `${base}/documents/${id}.json`);
  }
  for (const study of studies) {
    assert.ok(index.documents.some(document => document.source.path === study.source && document.page === href(study)),
      `retain the article URL ${study.source}`);
  }
  for (const [source, route, id] of [
    ['docs/MANIFESTO.md', '', 'docs-manifesto'],
    ['docs/AGENT_ART.md', 'agent-art/', 'docs-agent-art'],
    ['docs/WORKS.md', 'works/', 'docs-works'],
    ['docs/PROTOCOL.md', 'protocol/', 'docs-protocol'],
    ['docs/AGENT_ART_WORK.md', 'about/', 'docs-agent-art-work'],
  ]) {
    const descriptor = index.documents.find(document => document.id === id);
    assert.ok(descriptor, `index the reviewed public source ${source}`);
    assert.equal(descriptor.page, `${base}/${route}`);
    assert.equal(descriptor.source.path, source);
    const page = read(`_site/${route}index.html`);
    const expected = markdown.render(read(source)).replace(/<h1>[\s\S]*?<\/h1>\n?/, '');
    const content = source === 'docs/MANIFESTO.md'
      ? one(page, 'article', 'home-manifesto').inner.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/, '')
      : one(page, 'div', 'prose').inner;
    assert.equal(text(content), text(expected), `retain complete ${source} explanations and limits`);
    const sourceBytes = readFileSync(path.join(root, source));
    const sourceHash = createHash('sha256').update(sourceBytes).digest('hex');
    assert.equal(descriptor.source.sha256, sourceHash, source);
    assert.equal(descriptor.source.byteLength, sourceBytes.length, source);
    assert.equal(descriptor.revision, `sha256:${sourceHash}`, source);
    assert.equal(descriptor.download.url, `${base}/documents/${id}.json`, source);
    const downloadBytes = readFileSync(path.join(root, `_site/documents/${id}.json`));
    assert.equal(descriptor.download.sha256, createHash('sha256').update(downloadBytes).digest('hex'), source);
    assert.equal(descriptor.download.byteLength, downloadBytes.length, source);
    assert.equal(JSON.parse(downloadBytes.toString('utf8')).content, sourceBytes.toString('utf8'),
      `the complete ${source} source survives the agent download`);
  }
  for (const descriptor of index.documents) {
    assert.ok(!descriptor.source.path.startsWith('../'), 'export only this repository’s reviewed public sources');
    assert.equal(descriptor.source.url, `https://github.com/agent-art-work/agentart.work/blob/main/${descriptor.source.path}`);
    const document = JSON.parse(read(`_site/documents/${descriptor.id}.json`));
    assert.equal(document.schema, 'agent-art-lab.document/v1');
    assert.equal(document.id, descriptor.id);
    assert.equal(document.source.url, descriptor.source.url);
  }
});
