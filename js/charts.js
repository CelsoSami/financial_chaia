function setupCanvas(cv) {
  const dpr = devicePixelRatio || 1;
  const rect = cv.getBoundingClientRect();
  cv.width = rect.width * dpr;
  cv.height = rect.height * dpr;
  const ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

function drawDonut(cv, slices, centerText, centerSub) {
  const ctx = setupCanvas(cv);
  const rect = cv.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  ctx.clearRect(0, 0, W, H);
  const total = slices.reduce(function (a, s) { return a + (s.value || 0); }, 0);
  if (total <= 0) {
    ctx.strokeStyle = 'rgba(140,150,175,.18)';
    ctx.lineWidth = 13;
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, Math.min(W, H) / 2 - 10, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }
  const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 10;
  let ang = -Math.PI / 2;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  for (const s of slices) {
    if (!s.value) continue;
    const slice = (s.value / total) * Math.PI * 2;
    const from = ang + 0.03;
    const to = ang + slice - 0.03;
    if (to > from) {
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.arc(cx, cy, R, from, to);
      ctx.stroke();
    }
    ang += slice;
  }
  ctx.fillStyle = textColor();
  ctx.font = '800 17px Sora, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(centerText, cx, cy - 8);
  ctx.fillStyle = 'rgba(150,160,185,.7)';
  ctx.font = '600 10px Inter, sans-serif';
  ctx.fillText(centerSub || '', cx, cy + 12);
}

function textColor() {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#e8eefb';
  } catch (e) { return '#e8eefb'; }
}

function drawBars(cv, values, colorFn, gradient) {
  const ctx = setupCanvas(cv);
  const rect = cv.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  ctx.clearRect(0, 0, W, H);
  const max = Math.max.apply(null, values.map(Math.abs).concat([1]));
  const n = values.length;
  const pad = 6;
  const gap = n > 1 ? 6 : 0;
  const bw = (W - pad * 1.5) / n - gap;
  const baseY = H * 0.82;
  const usable = H * 0.74;
  const peak = max;
  for (let i = 0; i < n; i++) {
    const v = values[i];
    const hgt = Math.abs(v) / peak * usable;
    const x = pad + i * (bw + gap);
    const yTop = v >= 0 ? baseY - hgt : baseY;
    const col = gradient ? 'rgba(38,211,153,0.9)' : colorFn(i, v);
    const grad = ctx.createLinearGradient(0, yTop, 0, yTop + hgt);
    grad.addColorStop(0, col);
    grad.addColorStop(1, 'rgba(56,189,248,.25)');
    drawRoundedTop(ctx, x, yTop, bw, hgt, 5, grad);
    if (i === n - 1 && v >= 0) {
      ctx.strokeStyle = 'rgba(255,255,255,.45)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 1.2, yTop - 1.2, bw + 2.4, hgt + 2.4);
    }
  }
}

function drawRoundedTop(ctx, x, y, w, h, r, fill) {
  const rr = Math.min(r, h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawSparkline(cv, values, color) {
  const ctx = setupCanvas(cv);
  const rect = cv.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  ctx.clearRect(0, 0, W, H);
  if (!values.length) return;
  const min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  const span = (max - min) || 1;
  const step = values.length > 1 ? W / (values.length - 1) : W;
  ctx.beginPath();
  values.forEach(function (v, i) {
    const x = i * step;
    const y = H - 4 - (v - min) / span * (H - 8);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, color + '55');
  grad.addColorStop(1, color + '00');
  ctx.fillStyle = grad;
  ctx.fill();
}