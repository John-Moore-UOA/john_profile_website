// Sliding nav indicator.
// Hover: the pill leans toward the hovered item, as if getting ready to jump.
// Press:  the pill and the item compress (the press is acknowledged on pointerdown)...
// Release: ...and the jump happens on click (pointer up). The pill stretches across to the
//          target, then settles with a small overshoot. Scroll position also drives it.
const list = document.querySelector<HTMLUListElement>('.nav ul');
const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav [data-spy]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (list && links.length) {
  const pill = document.createElement('span');
  pill.className = 'nav-pill';
  pill.setAttribute('aria-hidden', 'true');
  list.prepend(pill);
  list.classList.add('has-pill');

  let current: HTMLAnchorElement | null = null;
  let lockUntil = 0;
  let anim: Animation | null = null;

  const box = (a: HTMLElement) => ({ x: a.offsetLeft, w: a.offsetWidth });
  const place = (a: HTMLElement) => {
    const { x, w } = box(a);
    pill.style.transform = `translateX(${x}px)`;
    pill.style.width = `${w}px`;
  };

  const setCurrent = (a: HTMLAnchorElement | null, animate: boolean) => {
    if (a === current) return;
    const from = current;
    links.forEach((l) => l.toggleAttribute('aria-current', l === a));
    if (a) a.setAttribute('aria-current', 'true');
    current = a;
    if (!a) { pill.classList.remove('on'); return; }
    if (!from || !animate || reduced || !pill.classList.contains('on')) {
      anim?.cancel(); place(a); pill.classList.add('on'); return;
    }
    const f = box(from), t = box(a);
    const right = t.x > f.x;
    const left = Math.min(f.x, t.x), span = Math.max(f.x + f.w, t.x + t.w) - left;
    const over = right ? 6 : -6;
    anim?.cancel();
    place(a);
    anim = pill.animate([
      { transform: `translateX(${f.x}px) scaleY(1)`, width: `${f.w}px`, easing: 'cubic-bezier(.5,0,.75,0)' },
      { transform: `translateX(${right ? f.x : left}px) scaleY(.82)`, width: `${span}px`, offset: .42, easing: 'cubic-bezier(.25,1,.5,1)' },
      { transform: `translateX(${t.x + over}px) scaleY(1.06)`, width: `${t.w}px`, offset: .74, easing: 'ease-in-out' },
      { transform: `translateX(${t.x - over / 3}px) scaleY(.98)`, width: `${t.w}px`, offset: .88, easing: 'ease-out' },
      { transform: `translateX(${t.x}px) scaleY(1)`, width: `${t.w}px` },
    ], { duration: 560 });
  };

  // Hover anticipation: lean toward the target.
  links.forEach((a) => {
    a.addEventListener('pointerenter', () => {
      if (!current || a === current || reduced) return;
      const dir = box(a).x > box(current).x ? 1 : -1;
      pill.style.setProperty('--lean', `${dir * 5}px`);
      pill.style.setProperty('--grow', '8px');
      pill.style.setProperty('--origin', dir > 0 ? 'left' : 'right');
      pill.classList.add('lean');
    });
    a.addEventListener('pointerleave', () => pill.classList.remove('lean', 'press'));
    a.addEventListener('pointerdown', () => { pill.classList.add('press'); a.classList.add('press'); });
    a.addEventListener('pointercancel', () => { pill.classList.remove('press'); a.classList.remove('press'); });
    a.addEventListener('click', () => {
      pill.classList.remove('lean', 'press'); a.classList.remove('press');
      lockUntil = performance.now() + 1100; // let the smooth scroll finish without the spy fighting it
      setCurrent(a, true);
    });
  });
  addEventListener('pointerup', () => { pill.classList.remove('press'); links.forEach((l) => l.classList.remove('press')); });

  // Scroll spy (home page only: the targets exist there).
  const targets = links.map((a) => document.getElementById(a.dataset.spy!)).filter(Boolean) as HTMLElement[];
  if (targets.length) {
    const io = new IntersectionObserver((entries) => {
      if (performance.now() < lockUntil) return;
      for (const e of entries) if (e.isIntersecting) setCurrent(links.find((l) => l.dataset.spy === e.target.id) ?? null, true);
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => io.observe(t));
    addEventListener('scrollend', () => { lockUntil = 0; });
  }
  addEventListener('resize', () => current && place(current));
  document.fonts?.ready.then(() => current && place(current));
}
