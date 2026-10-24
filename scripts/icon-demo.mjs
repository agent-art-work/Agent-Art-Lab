// An isolated record of the three concepts and the operator's selection.
export function renderIconConcepts(url) {
  const concepts = [
    ['off-grid', 'Off grid', 'A dot steps out of the pattern. A small act of intention, rooted in the site’s existing texture.'],
    ['shared-stroke', 'Shared stroke', 'An A joins a rising stroke. One continuous mark for work made through participation.'],
    ['open-form', 'Open form', 'An unfinished frame and an independent point. Space for the work, and whoever enters it.'],
  ];
  const samples = (id, title, theme) => `<div class="icon-sample ${theme}">
    <span class="sample-label">${theme === 'light' ? 'Light' : 'Dark'}</span>
    <img class="icon-large" src="${url(`assets/icon-concepts/${id}.svg`)}" width="96" height="96" alt="${title}, ${theme} preview">
    <div class="icon-small"><img src="${url(`assets/icon-concepts/${id}.svg`)}" width="16" height="16" alt=""><img src="${url(`assets/icon-concepts/${id}.svg`)}" width="32" height="32" alt=""></div>
    <span class="sample-label">16 / 32 px</span>
  </div>`;
  return `<header class="page-heading"><p class="eyebrow">Agent Art Work / Design archive</p>
    <h1>Three small marks.</h1><p class="lead">A pattern, a shared line, an open space.</p>
    <p class="icon-note">Earlier icon concepts. Off grid became the site mark; the current logo has since been refined.</p></header>
    <div class="icon-concepts">${concepts.map(([id, title, description], index) => `<article class="icon-concept" aria-labelledby="${id}">
      <p class="eyebrow">0${index + 1}${id === 'off-grid' ? ' / Selected' : ''}</p><h2 id="${id}">${title}</h2>
      <div class="icon-samples">${samples(id, title, 'light')}${samples(id, title, 'dark')}</div>
      <p class="icon-description">${description}</p><a class="text-link" href="${url(`assets/icon-concepts/${id}.svg`)}">Open SVG ↗</a>
    </article>`).join('')}</div>
    <p class="icon-note">Each mark is shown at 96 px and at actual 16 / 32 px icon sizes. SVG colors follow the system theme.</p>`;
}
