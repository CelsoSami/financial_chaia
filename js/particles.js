function initParticles() {
  const canvas = document.getElementById('pbg');
  if (!canvas || canvas.__particlesOn) return;
  canvas.__particlesOn = true;
  const ctx = canvas.getContext('2d');
  const glyphs = ['$', '€', 'R$', '¥'];
  let w = 0, h = 0, parts = [], raf = 0;

  function getPalette() {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    return dark
      ? { base: '255,255,255', accent: '52,211,153', accent2: '139,92,246' }
      : { base: '15,23,42', accent: '5,150,105', accent2: '124,58,237' };
  }

  function newPart() {
    const pal = getPalette();
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: (2 + Math.random() * 3) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.3 * devicePixelRatio,
      vy: -(0.1 + Math.random() * 0.4) * devicePixelRatio,
      a: 0.15 + Math.random() * 0.35,
      pulse: Math.random() * Math.PI * 2,
      useGlyph: Math.random() < 0.2,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      color: Math.random() < 0.5 ? pal.accent : (Math.random() < 0.25 ? pal.accent2 : pal.base)
    };
  }

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    const target = Math.min(130, Math.round(w / (140 * devicePixelRatio)));
    if (parts.length < target) {
      while (parts.length < target) parts.push(newPart());
    } else if (parts.length > target) {
      parts.length = target;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const n = parts.length;
    for (let i = 0; i < n; i++) {
      const p = parts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;
      if (p.y < -40) { p.y = h + 40; p.x = Math.random() * w; }
      if (p.x < -40) p.x = w + 40;
      else if (p.x > w + 40) p.x = -40;
      const alpha = (p.a * (0.7 + 0.3 * Math.sin(p.pulse))).toFixed(3);
      ctx.fillStyle = 'rgba(' + p.color + ',' + alpha + ')';
      if (p.useGlyph) {
        ctx.font = (p.r * 4) + 'px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.glyph, p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    raf = requestAnimationFrame(draw);
  }

  function refresh() {
    for (let i = 0; i < parts.length; i++) {
      const pal = getPalette();
      parts[i].color = Math.random() < 0.55 ? pal.accent : (Math.random() < 0.3 ? pal.accent2 : pal.base);
      parts[i].useGlyph = Math.random() < 0.2;
    }
  }

  resize();
  draw();
  window.addEventListener('resize', debounce(function () { resize(); refresh(); }, 150));
  window.__refreshParticles = refresh;
}