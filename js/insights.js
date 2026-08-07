function resolveAlias(raw, aliasesMap) {
  const k = normalizeName(raw || '');
  if (k && aliasesMap && aliasesMap[k]) return aliasesMap[k];
  return String(raw || '').trim() || '—';
}

function buildInsights(state) {
  const out = [];
  const tx = state.tx || [];
  const banks = state.banks || [];
  const bills = state.bills || [];
  const cash = totalCash(banks, state.settings.cash_balance);
  const budget = Number(state.settings.monthly_budget || 0);
  const today = new Date();
  const y = today.getFullYear(), m = today.getMonth() + 1;
  const monthTx = tx.filter(function (t) { return t.type === 'expense' && isSameMonth(t.date, y, m); });
  const monthIncome = tx.filter(function (t) { return t.type === 'income' && isSameMonth(t.date, y, m); });

  const totalDebt = banks.reduce(function (a, b) { return a + (Number(b.debt) || 0); }, 0);
  const monthSpend = monthTx.reduce(function (a, t) { return a + Math.abs(Number(t.amount) || 0); }, 0);

  if (tx.length === 0 && banks.length === 0 && bills.length === 0) {
    out.push({ tone: 'tip', icon: 'spark', title: t('ins.nodata'), body: t('ins.nodataBody') });
    return out;
  }

  const extraIncome = monthIncome.filter(function (i) {
    const k = normalizeName(i.raw_name || i.display_name || '');
    return /rescisao|rescisão|aposentadoria|auxilio|auxílio|processo|acordo|reembolso|venda|seguro|indenizacao|indemnizacao|premio|prêmio|bonus|bônus/.test(k);
  });
  if (extraIncome.length) {
    const v = extraIncome.reduce(function (a, i) { return a + Math.abs(Number(i.amount) || 0); }, 0);
    out.push({ tone: 'tip', icon: 'cash', title: t('ins.termination'), body: t('ins.terminationBody', { v: fmtMoney(v, LANG) }) });
  }

  if (monthIncome.length) {
    let max = null;
    monthIncome.forEach(function (i) {
      const v = Math.abs(Number(i.amount) || 0);
      if (!max || v > max.v) max = { name: resolveAlias(i.raw_name || i.display_name, state.aliasesMap), v: v };
    });
    if (max) out.push({ tone: 'good', icon: 'income', title: t('ins.income'), body: t('ins.incomeBody', { n: max.name, v: fmtMoney(max.v, LANG) }) });
  }

  if (cash < 0) {
    out.push({ tone: 'danger', icon: 'alert', title: t('alert.cashNegative'), body: t('ins.debtPriorityBody', { v: fmtMoney(totalDebt, LANG) }) });
  }

  if (totalDebt > 0) {
    out.push({ tone: 'warn', icon: 'card', title: t('ins.debtPriority'), body: t('ins.debtPriorityBody', { v: fmtMoney(totalDebt, LANG) }) });
  } else if (banks.length) {
    out.push({ tone: 'good', icon: 'shield', title: t('ins.debtClear'), body: t('ins.debtClearBody') });
  }

  if (cash > 0 && totalDebt === 0) {
    out.push({ tone: 'tip', icon: 'invest', title: t('ins.invest'), body: t('ins.investBody', { v: fmtMoney(cash, LANG) }) });
  }

  if (monthSpend > 0) {
    const reserve = monthSpend * 6;
    out.push({ tone: 'tip', icon: 'shield', title: t('ins.emergency'), body: t('ins.emergencyBody', { v: fmtMoney(reserve, LANG) }) });
  }

  const catMap = {};
  monthTx.forEach(function (t) {
    const c = t.category || 'cat.other';
    catMap[c] = (catMap[c] || 0) + Math.abs(Number(t.amount) || 0);
  });
  const topCat = Object.keys(catMap).map(function (k) { return { cat: k, v: catMap[k] }; }).sort(function (a, b) { return b.v - a.v; });

  if (topCat.length >= 2) {
    const top3 = topCat.slice(0, 3);
    const topSum = top3.reduce(function (a, c) { return a + c.v; }, 0);
    const pct = monthSpend > 0 ? Math.round(topSum / monthSpend * 100) : 0;
    out.push({
      tone: 'tech', icon: 'chart', title: t('ins.topSpend'),
      body: t('ins.topSpendBody', { n: top3.length, p: pct, v: fmtMoney(topSum, LANG) })
    });
  }

  const recurring = detectRecurring(tx);
  if (recurring.length) {
    const tot = recurring.reduce(function (a, r) { return a + r.amount; }, 0);
    out.push({ tone: 'warn', icon: 'sub', title: t('ins.subs'), body: t('ins.subsBody', { n: recurring.length, v: fmtMoney(tot, LANG) }) });
  }

  const dupes = countDuplicates(monthTx);
  if (dupes >= 2) out.push({ tone: 'warn', icon: 'dupe', title: t('ins.dupe'), body: t('ins.dupeBody', { n: dupes }) });

  const small = monthTx.filter(function (t) { return Math.abs(Number(t.amount) || 0) < 40; });
  if (small.length >= 5) {
    const tot = small.reduce(function (a, t) { return a + Math.abs(Number(t.amount) || 0); }, 0);
    out.push({ tone: 'warn', icon: 'cut', title: t('ins.cut'), body: t('ins.cutBody', { v: fmtMoney(tot, LANG), s: fmtMoney(tot / 2, LANG) }) });
  }

  if (budget > 0) {
    const day = today.getDate();
    const avg = monthSpend / Math.max(1, day);
    const goal = budget / 30;
    out.push({
      tone: avg > goal ? 'warn' : 'good', icon: 'target', title: t('ins.dailyBudget'),
      body: t('ins.dailyBudgetBody', { v: fmtMoney(avg, LANG), s: fmtMoney(goal, LANG) })
    });
  }

  const dueSoon = bills.filter(function (b) {
    if (!b.active) return false;
    const due = nextDueDate(b.due_day, today);
    const d = diffDays(due, todayISO());
    return d >= 0 && d <= 7;
  });
  if (dueSoon.length) {
    const tot = dueSoon.reduce(function (a, b) { return a + (Number(b.amount) || 0); }, 0);
    out.push({ tone: 'warn', icon: 'bill', title: t('ins.billSoon'), body: t('ins.billSoonBody', { n: dueSoon.length, v: fmtMoney(tot, LANG) }) });
  }

  const pix = monthTx.filter(function (t) { return /pix/.test(normalizeName(t.raw_name || '')) || /^pix/i.test(t.raw_name || ''); });
  if (pix.length >= 3) {
    const tot = pix.reduce(function (a, p) { return a + Math.abs(Number(p.amount) || 0); }, 0);
    out.push({ tone: 'tip', icon: 'pix', title: t('ins.pix'), body: t('ins.pixBody', { n: pix.length, v: fmtMoney(tot, LANG) }) });
  }

  if (budget > 0 && monthSpend > 0) {
    const save = Math.max(0, Math.round(monthSpend * 0.15));
    if (save > 10) out.push({ tone: 'good', icon: 'save', title: t('ins.saving'), body: t('ins.savingBody', { v: fmtMoney(save, LANG) }) });
  }

  const fund = budget > 0 ? budget * 0.1 : 100;
  if (monthSpend > 0) {
    out.push({
      tone: 'tech', icon: 'target', title: t('ins.goal'),
      body: t('ins.goalBody', {
        v: fmtMoney(fund, LANG),
        s: fmtMoney(investmentProjection(fund, 36, 0.01), LANG)
      })
    });
  }

  return out.slice(0, 9);
}

function monthTxList(tx, y, m) {
  return tx.filter(function (t) { return isSameMonth(t.date, y, m); });
}

function detectRecurring(tx) {
  const map = {};
  tx.forEach(function (t) {
    if (t.type !== 'expense') return;
    const k = normalizeName(t.raw_name || '') + '|' + (Math.abs(Number(t.amount) || 0) || 0).toFixed(2);
    const mk = monthKeyFromISO(t.date);
    if (!map[k]) map[k] = { amount: Math.abs(Number(t.amount) || 0), name: t.raw_name, names: {} };
    map[k].names[mk] = true;
  });
  const out = [];
  Object.keys(map).forEach(function (k) {
    const g = map[k];
    const months = Object.keys(g.names);
    const recent = recentMonths(3);
    const hits = months.filter(function (mm) { return recent.indexOf(mm) > -1; }).length;
    if (months.length >= 2 && hits >= 2) out.push(g);
  });
  return out.sort(function (a, b) { return b.amount - a.amount; });
}

function recentMonths(n) {
  const out = [], d = new Date();
  for (let i = 0; i < n; i++) {
    const dd = new Date(d.getFullYear(), d.getMonth() - i, 1);
    out.push(dd.getFullYear() + '-' + pad(dd.getMonth() + 1));
  }
  return out;
}

function countDuplicates(tx) {
  const map = {};
  tx.forEach(function (t) {
    const k = normalizeName(t.raw_name || '') + '|' + fmtDate(t.date, LANG) + '|' + Math.abs(Number(t.amount) || 0).toFixed(2);
    map[k] = (map[k] || 0) + 1;
  });
  return Object.keys(map).reduce(function (a, k) {
    if (map[k] > 1) a += map[k];
    return a;
  }, 0);
}

function investmentProjection(monthly, months, rate) {
  let v = 0;
  for (let i = 0; i < months; i++) v = (v + monthly) * (1 + rate);
  return v;
}

function groupMerchants(transactions) {
  const map = {};
  transactions.forEach(function (tr) {
    const k = normalizeName(tr.raw_name || tr.display_name || '');
    if (!k) return;
    if (!map[k]) map[k] = { raw: tr.raw_name, count: 0, total: 0 };
    map[k].count++;
    map[k].total += Math.abs(Number(tr.amount) || 0);
  });
  return Object.keys(map).map(function (k) { return map[k]; })
    .sort(function (a, b) { return (b.count - a.count) || (b.total - a.total); });
}

function sumRecurring(tx) {
  return detectRecurring(tx).reduce(function (a, r) { return a + r.amount; }, 0);
}