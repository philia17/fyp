// Reveal reading units on arrival. Their normal HTML stays readable without JavaScript.
(() => {
  if (!('IntersectionObserver' in window) || !window.matchMedia) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const blocks = document.querySelectorAll(
    '.hero-copy > h1, .hero-copy > p, .featured-chart, .progress-note, ' +
    '.document-section > h2, .finding, .model, .resources'
  );
  let observer;

  function applyMotion() {
    observer?.disconnect();
    for (const block of blocks) {
      delete block.dataset.entered;
      block.style.removeProperty('--enter-delay');
    }
    if (motion.matches) return;
    observer = new IntersectionObserver(entries => {
      let order = 0;
      for (const entry of entries) {
        const block = entry.target;
        if (!entry.isIntersecting) {
          delete block.dataset.entered;
          continue;
        }
        if (block.dataset.entered) continue;
        block.style.setProperty('--enter-delay', Math.min(order++, 3) * 75 + 'ms');
        block.dataset.entered = 'true';
      }
    });
    for (const block of blocks) observer.observe(block);
  }
  applyMotion();
  motion.addEventListener('change', applyMotion);
})();
