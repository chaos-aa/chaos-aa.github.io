  const glow = document.querySelector('.grid-glow');
  const root = document.documentElement;
  const cards = document.querySelectorAll('.projectCard');

  let px = 0, py = 0, queued = false;

  function paint() {
    queued = false;
    // page grid glow (viewport coords)
    root.style.setProperty('--gx', px + 'px');
    root.style.setProperty('--gy', py + 'px');
    // per-card spotlight (coords relative to each card)
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((px - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((py - r.top) / r.height * 100) + '%');
    });
  }

  addEventListener('pointermove', e => {
    px = e.clientX; py = e.clientY;
    glow.classList.add('active');
    if (!queued) { queued = true; requestAnimationFrame(paint); }
  });

  addEventListener('pointerleave', () => glow.classList.remove('active'));

  // scroll-to-top 
  const toTop = document.getElementById('toTop');
  addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 400));
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));