// Briefly reveal the navigation, then let the manifesto lead the first view.
// Links remain in normal flow and can always be reached by scrolling back up.
(() => {
  const bar = document.querySelector('.manifesto-top');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const navigation = performance.getEntriesByType('navigation')[0];
  if (!bar || location.hash || motion.matches || navigation?.type === 'back_forward') return;

  let stopped = false;
  let timer;
  let frame;
  const interactions = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'hashchange'];
  function stop() {
    stopped = true;
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    interactions.forEach(type => window.removeEventListener(type, stop));
    document.removeEventListener('visibilitychange', stop);
    motion.removeEventListener('change', stop);
    window.removeEventListener('load', start);
  }
  interactions.forEach(type => window.addEventListener(type, stop, { passive: true }));
  document.addEventListener('visibilitychange', stop);
  motion.addEventListener('change', stop);

  function start() {
    if (stopped) return;
    timer = setTimeout(() => {
      // Respect restored positions, fragment navigation and anything already focused.
      if (scrollY > 1 || location.hash || document.hidden || motion.matches ||
          ![document.body, document.documentElement].includes(document.activeElement)) {
        stop();
        return;
      }
      const target = bar.getBoundingClientRect().bottom + scrollY;
      const started = performance.now();
      function tick(now) {
        if (stopped) return;
        const progress = Math.min((now - started) / 700, 1);
        const eased = progress * progress * (3 - 2 * progress);
        window.scrollTo({ top: target * eased, behavior: 'instant' });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else stop();
      }
      frame = requestAnimationFrame(tick);
    }, 1000);
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
