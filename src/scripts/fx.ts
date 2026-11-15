// Progressive enhancement only: everything is visible and usable without this file.
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Scroll reveal. The hidden state is applied by JS, so no-JS and reduced-motion readers see everything.
if (!reduced && 'IntersectionObserver' in window) {
  const sel = '.sec-head, .masters, .index > li, .pubs > li, .area, .xp > li, .edu > *, .skills > div, .filters, .contact h2, .contact p, .clinks, .block, .timeline > li, .glance > li';
  const els = [...document.querySelectorAll<HTMLElement>(sel)].filter((el) => el.getBoundingClientRect().top > innerHeight * 0.9);
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => {
    const sibs = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.setProperty('--d', `${Math.min(sibs, 6) * 70}ms`);
    el.classList.add('rv'); io.observe(el);
  });
}

// 3D tilt with a moving highlight on the Masters panel, journal entries and client blocks.
if (!reduced && fine) {
  document.querySelectorAll<HTMLElement>('.feature, .entry, .client').forEach((el) => {
    el.classList.add('tilt');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', `${(x - 0.5) * 9}deg`);
      el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });
}
