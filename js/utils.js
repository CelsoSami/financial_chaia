function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

function pad(n) { return String(n).padStart(2, '0'); }

function todayISO() { return new Date().toISOString().slice(0, 10); }

function monthKeyFromISO(iso) { return iso ? iso.slice(0, 7) : new Date().toISOString().slice(0, 7); }

function daysInMonth(y, m) { return new Date(y, m, 0).getDate(); }

function parseISO(d) { const p = String(d).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }

function addMonths(y, m, n) { const dd = new Date(y, m - 1, 1); dd.setMonth(dd.getMonth() + n); return dd; }

function isSameMonth(iso, y, m) { const p = String(iso).split('-').map(Number); return p[0] === y && p[1] === m; }

function normalizeName(s) {
  return String(s || '').trim().replace(/\s+/g, ' ').toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, ' ');
}

function monthLabel(m, lang) {
  const d = new Date(Number(m.slice(0, 4)), Number(m.slice(5, 7)) - 1, 1);
  try {
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { month: 'long', year: 'numeric' });
  } catch (e) { return m; }
}

function nextDueDate(dueDay, from) {
  const base = from || new Date();
  const y = base.getFullYear(), m = base.getMonth() + 1;
  const dim = daysInMonth(y, m);
  const day = Math.min(dueDay, dim);
  if (new Date(y, m - 1, day) >= new Date(base.getFullYear(), base.getMonth(), base.getDate())) {
    return isoFromParts(y, m, day);
  }
  const nm = m === 12 ? 1 : m + 1;
  const ny = m === 12 ? y + 1 : y;
  const ndim = daysInMonth(ny, nm);
  return isoFromParts(ny, nm, Math.min(dueDay, ndim));
}

function isoFromParts(y, m, d) { return y + '-' + pad(m) + '-' + pad(d); }

function diffDays(aISO, bISO) {
  const a = parseISO(aISO).getTime(), b = parseISO(bISO).getTime();
  return Math.round((a - b) / 86400000);
}

function fmtMoney(v, lang) {
  const n = Number(v) || 0;
  try {
    return n.toLocaleString(lang === 'en' ? 'en-US' : 'pt-BR', { style: 'currency', currency: 'BRL' });
  } catch (e) { return 'R$ ' + n.toFixed(2); }
}

function fmtMoneyCompact(v, lang) {
  const n = Number(v) || 0;
  const abs = Math.abs(n);
  let out;
  if (abs >= 1000000) out = (n / 1000000).toFixed(1).replace('.', lang === 'en' ? '.' : ',') + 'M';
  else if (abs >= 1000) out = (n / 1000).toFixed(1).replace('.', lang === 'en' ? '.' : ',') + 'k';
  else out = n.toFixed(0);
  return (lang === 'en' ? '$' : 'R$') + out;
}

function fmtDate(iso, lang) {
  if (!iso) return '';
  const d = parseISO(iso);
  try {
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'short' });
  } catch (e) { return iso.slice(5); }
}

function debounce(fn, ms) {
  let t;
  return function () {
    const args = arguments, c = this;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(c, args); }, ms);
  };
}

function totalCash(banks, cashSetting) {
  const inBanks = (banks || []).reduce(function (a, b) {
    return a + (b.kind === 'credit' ? 0 : (Number(b.balance) || 0));
  }, 0);
  return inBanks + (Number(cashSetting) || 0);
}

function sortBanksByName(banks) {
  return (banks || []).slice().sort(function (a, b) {
    return String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' });
  });
}

function billDueDate(b, now) {
  if (b && b.kind === 'once' && b.due_date) return String(b.due_date);
  return nextDueDate(b && b.due_day, now);
}