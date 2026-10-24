// Align the global navigation baseline with the bottom row of grid centers.
// Site marks enlarge existing background dots rather than adding a second grid.
(() => {
  const slots = [...document.querySelectorAll('.logo-slot')];
  const header = document.querySelector('.global-top');
  function baselineOf(element) {
    const original = [...element.childNodes];
    const wrapper = document.createElement('span');
    const probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'display:inline-block;width:0;height:0;padding:0;margin:0';
    wrapper.append(...original, probe);
    element.append(wrapper);
    const baseline = probe.getBoundingClientRect().top;
    element.replaceChildren(...original);
    return baseline;
  }
  function align() {
    const body = document.body.getBoundingClientRect();
    const style = getComputedStyle(document.body);
    const step = parseFloat(style.backgroundSize);
    const [px, py] = style.backgroundPosition.split(' ').map(parseFloat);
    if (!step) return;
    const originX = body.left + px + step / 2;
    const originY = body.top + py + step / 2;
    for (const slot of slots) {
      const rect = slot.getBoundingClientRect();
      // The SVG's first dot is (7,9); its grid spacing is 8 SVG units.
      const scale = step / 8;
      const x = rect.left + 7 * scale;
      const y = rect.top + 9 * scale;
      const dx = originX + Math.floor((x - originX) / step) * step - x;
      const dy = originY + Math.round((y - originY) / step) * step - y;
      const mark = slot.querySelector('.logo-field');
      mark.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    // Measure the text baseline after grid snapping; fixed offsets drift with
    // viewport width because the logo itself moves to the nearest grid row.
    const links = header?.querySelector('.home-links');
    const last = links?.querySelector('nav a:last-child');
    const logo = header?.querySelector('img');
    if (!last || !logo) return;
    links.style.transform = 'none';
    const rect = logo.getBoundingClientRect();
    const dotRow = rect.top + rect.height * 25 / 32;
    links.style.transform = `translateY(${dotRow - baselineOf(last)}px)`;

    const footer = document.querySelector('.footer-heading');
    const footerLogo = footer?.querySelector('img');
    const name = footer?.querySelector('.footer-brand-name');
    const slogan = footer?.querySelector('p');
    if (!footerLogo || !name) return;
    const footerRect = footerLogo.getBoundingClientRect();
    const footerRow = footerRect.top + footerRect.height * 25 / 32;
    name.style.transform = 'none';
    name.style.transform = `translateY(${footerRow - baselineOf(name)}px)`;
    if (slogan) {
      slogan.style.transform = 'none';
      // Keep the stacked mobile slogan below the brand; align it when alongside.
      if (getComputedStyle(footer).flexDirection === 'row') {
        slogan.style.transform = `translateY(${footerRow - baselineOf(slogan)}px)`;
      }
    }
  }
  align();
  new ResizeObserver(align).observe(document.body);
  document.fonts.ready.then(align);
  window.addEventListener('resize', align, { passive: true });
})();
