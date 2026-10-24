// CSS follows the system; keep browser chrome in sync with it.
(() => {
  const system = matchMedia('(prefers-color-scheme: dark)');
  function apply() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = system.matches ? '#1c1b19' : '#ffffff';
  }
  apply();
  system.addEventListener('change', apply);
})();
