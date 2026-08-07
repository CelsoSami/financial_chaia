const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
let pdfjsReady = null;

function loadScriptOnce(src) {
  return new Promise(function (resolve, reject) {
    if (document.querySelector('script[data-src="' + src + '"]')) { resolve(); return; }
    const s = document.createElement('script');
    s.setAttribute('data-src', src);
    s.src = src;
    s.onload = function () { resolve(); };
    s.onerror = function () { reject(new Error('script failed: ' + src)); };
    document.head.appendChild(s);
  });
}

async function parseCSVFile(file) {
  const buf = await file.arrayBuffer();
  let text = new TextDecoder('utf-8').decode(buf);
  if (text.indexOf('\uFFFD') > -1) text = new TextDecoder('windows-1252').decode(buf);
  text = text.replace(/^\uFEFF/, '');
  const lines = splitCSVLines(text);
  if (lines.length < 2) throw new Error('NO_ROWS');
  const sep = detectSeparator(lines[0], lines[1]);
  const headers = parseCSVLine(lines[0], sep).map(function (h) { return h.trim(); });
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) continue;
    const cells = parseCSVLine(l, sep).map(function (c) { return c.trim(); });
    if (cells.length === 1 && !cells[0]) continue;
    if (cells.every(function (c) { return !c; })) continue;
    rows.push(cells);
  }
  return { headers: headers, rows: rows };
}

function splitCSVLines(text) {
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') inQ = !inQ;
    if ((c === '\n' || c === '\r') && !inQ) {
      if (cur.length) out.push(cur);
      cur = '';
      if (c === '\r' && text[i + 1] === '\n') i++;
    } else cur += c;
  }
  if (cur.length) out.push(cur);
  return out;
}

function parseCSVLine(line, sep) {
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === sep && !inQ) {
      out.push(cur); cur = '';
    } else cur += c;
  }
  out.push(cur);
  return out;
}

function detectSeparator(l1, l2) {
  const c1 = (l1.match(/;/g) || []).length;
  const c2 = (l2.match(/;/g) || []).length;
  if (c1 > 0 && c1 >= c2) return ';';
  return ',';
}

const DATE_RE = /(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/;
const DATE_RE_FULL = /^\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}$/;

function parseDateFlex(s) {
  if (!s) return null;
  s = String(s).trim();
  const iso = s.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/);
  if (iso) {
    const y = parseInt(iso[1], 10), mo = parseInt(iso[2], 10), d = parseInt(iso[3], 10);
    if (y < 2000 || y > new Date().getFullYear() + 1) return null;
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
    return isoFromParts(y, mo, d);
  }
  const m = s.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (!m) return null;
  let d = parseInt(m[1], 10), mo = parseInt(m[2], 10), y = parseInt(m[3], 10);
  if (y < 100) y += y > 60 ? 1900 : 2000;
  if (d > 31 && mo <= 12) { const tmp = d; d = mo; mo = tmp; }
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const now = new Date();
  if (y > now.getFullYear() + 1 || y < 2000) return null;
  return isoFromParts(y, mo, d);
}

function parseAmount(s) {
  if (s == null) return null;
  let t = String(s).trim();
  if (!t) return null;
  t = t.replace(/R\s?\$/gi, '').replace(/[^\d.,()\-]/g, '');
  if (!t) return null;
  let neg = false;
  if (t.indexOf('(') === 0 && t.indexOf(')') === t.length - 1) { neg = true; t = t.slice(1, -1); }
  if (t.indexOf('-') === 0) { neg = true; t = t.slice(1); }
  if (t.indexOf('-') > -1) return null;
  const lastComma = t.lastIndexOf(',');
  const lastDot = t.lastIndexOf('.');
  const isBR = lastComma > lastDot;
  if (isBR) {
    t = t.replace(/\./g, '').replace(',', '.');
  } else if (lastDot > -1) {
    const dec = t.length - 1 - lastDot;
    if (dec === 2 || dec === 3) {
      t = t.replace(/,/g, '').replace(/\.(?=.*\.)/g, '').replace(/\.$/, '');
    } else {
      t = t.replace(/,/g, '');
    }
  } else {
    if (lastComma > -1) t = t.replace(',', '.');
  }
  const n = parseFloat(t);
  if (isNaN(n)) return null;
  return neg ? -Math.abs(n) : n;
}

const CREDIT_HINTS = ['credito', 'credit', 'entrada', 'receita', 'receb', 'deposito'];
const DEBIT_HINTS = ['debito', 'debit', 'saida', 'saída', 'pagamento', 'despesa'];
const DESC_HINTS = ['descricao', 'descrição', 'desc', 'detalhe', 'historico', 'histórico', 'nome', 'estabelecimento', 'empresa', 'lancamento', 'lançamento', 'pagador', 'favorecido', 'identificador', 'titulo', 'título', 'memoria', 'memória'];
const DATE_HINTS = ['data', 'date', 'dt', 'competencia', 'lançamento', 'lancamento', 'datalancamento', 'data do lançamento'];
const TYPE_HINTS = ['tipo', 'natureza', 'sentido', 'movimentacao', 'tipo_lancamento', 'crédito_débito', 'credito_debito'];
const IGNORE_HINTS = ['saldo', 'balance', 'categoria', 'código', 'codigo', 'id', 'identificador'];

function colHint(h) {
  return normalizeName(h);
}

function detectLayout(headers, rows) {
  const n = headers.length;
  const layout = { dateIdx: -1, descIdx: -1, amountIdx: -1, debitIdx: -1, creditIdx: -1, typeIdx: -1, ignore: {} };
  const ratios = [];
  for (let c = 0; c < n; c++) {
    let dateHits = 0, numHits = 0, filled = 0;
    const uniq = {};
    const total = Math.min(rows.length, 400);
    for (let r = 0; r < total; r++) {
      const v = (rows[r][c] || '').trim();
      if (!v) continue;
      filled++;
      if (DATE_RE_FULL.test(v)) dateHits++;
      if (parseAmount(v) !== null) numHits++;
      uniq[normalizeName(v)] = true;
    }
    ratios.push({ col: c, dateHits, numHits, filled, uniq: Object.keys(uniq).length });
  }
  const h = headers.map(function (x) { return colHint(x); });

  for (let c = 0; c < n; c++) {
    const hh = h[c];
    if (TYPE_HINTS.some(function (k) { return hh.indexOf(k) > -1; }) && layout.typeIdx < 0) layout.typeIdx = c;
    if (IGNORE_HINTS.some(function (k) { return hh === k || hh.indexOf(k) > -1; })) layout.ignore[c] = true;
  }

  for (let c = 0; c < n; c++) {
    const r = ratios[c];
    if (r.filled > 0 && r.dateHits / r.filled > 0.6 && layout.dateIdx < 0 && !layout.ignore[c]) layout.dateIdx = c;
  }
  if (layout.dateIdx < 0) {
    for (let c = 0; c < n; c++) {
      const hh = h[c];
      if (DATE_HINTS.some(function (k) { return hh.indexOf(k) > -1; }) && layout.dateIdx < 0 && !layout.ignore[c]) layout.dateIdx = c;
    }
  }

  let numericCols = [];
  for (let c = 0; c < n; c++) {
    if (layout.ignore[c] || c === layout.dateIdx) continue;
    const r = ratios[c];
    if (r.filled > 0 && r.numHits / r.filled > 0.55) numericCols.push(c);
  }

  if (numericCols.length >= 2) {
    const scored = numericCols.map(function (c) {
      let s = 0;
      const hh = h[c];
      if (CREDIT_HINTS.some(function (k) { return hh.indexOf(k) > -1; })) s += 3;
      if (DEBIT_HINTS.some(function (k) { return hh.indexOf(k) > -1; })) s += 3;
      if (hh === 'valor' || hh === 'value') s += 2;
      return { col: c, score: s };
    }).sort(function (a, b) { return b.score - a.score; });

    if (scored[0] && scored[0].score > 0) {
      layout.debitIdx = scored[0].col;
      if (scored[1] && scored[1].score > 0) layout.creditIdx = scored[1].col;
      else layout.amountIdx = scored[0].col;
    } else {
      layout.debitIdx = numericCols[0];
      layout.creditIdx = numericCols[1];
    }
  } else if (numericCols.length === 1) {
    layout.amountIdx = numericCols[0];
  } else {
    for (let c = 0; c < n; c++) {
      const hh = h[c];
      if ((hh === 'valor' || hh === 'value' || hh === 'valor_lancamento' || hh === 'valor do lançamento') && layout.amountIdx < 0) layout.amountIdx = c;
    }
  }

  let bestDesc = -1, bestScore = -1;
  for (let c = 0; c < n; c++) {
    if (c === layout.dateIdx || c === layout.amountIdx || c === layout.debitIdx || c === layout.creditIdx || c === layout.typeIdx) continue;
    if (layout.ignore[c]) continue;
    let score = ratios[c].filled / Math.max(1, rows.length) * 2;
    const hh = h[c];
    if (DESC_HINTS.some(function (k) { return hh.indexOf(k) > -1; })) score += 8;
    if (ratios[c].uniq > 4) score += 3;
    if (score > bestScore) { bestScore = score; bestDesc = c; }
  }
  layout.descIdx = bestDesc;
  return layout;
}

function buildCSVEntries(layout, headers, rows, opts) {
  const invert = !!(opts && opts.invert);
  const out = [];
  for (const row of rows) {
    let date = layout.dateIdx > -1 ? parseDateFlex(row[layout.dateIdx]) : null;
    if (!date && layout.dateIdx > -1) {
      const d = String(row[layout.dateIdx]).trim();
      if (d.length === 7 && d.indexOf('/') === 2) date = isoFromParts(new Date().getFullYear(), parseInt(d.slice(3, 5), 10), parseInt(d.slice(0, 2), 10));
    }
    let desc = layout.descIdx > -1 ? String(row[layout.descIdx] || '').trim() : '';
    if (!desc && layout.dateIdx > -1) {
      desc = row.filter(function (_, c) {
        return c !== layout.dateIdx && c !== layout.amountIdx && c !== layout.debitIdx && c !== layout.creditIdx && c !== layout.typeIdx && !layout.ignore[c];
      }).join(' ').trim();
    }
    let amount = null;
    if (layout.amountIdx > -1) amount = parseAmount(row[layout.amountIdx]);
    else if (layout.debitIdx > -1 && layout.creditIdx > -1) {
      const d = parseAmount(row[layout.debitIdx]) || 0;
      const c = parseAmount(row[layout.creditIdx]) || 0;
      amount = c - d;
    }
    if (amount === null && layout.amountIdx > -1) amount = parseAmount(String(row[layout.amountIdx] || '').replace(/^"|"$/g, ''));
    if (amount === null || date === null || !desc) continue;
    let type = amount < 0 ? 'expense' : 'income';
    if (layout.typeIdx > -1) {
      const tv = String(row[layout.typeIdx] || '').toLowerCase();
      if (/(crédito|credito|credit|entrada|receb|deposito|depósito)/.test(tv)) type = 'income';
      else if (/(débito|debito|debit|saída|saida|pagamento|despesa|compra|tarifa)/.test(tv)) type = 'expense';
    }
    if (invert) type = type === 'expense' ? 'income' : 'expense';
    out.push({ date: date, desc: desc, amount: Math.abs(amount), type: type });
  }
  return out;
}

function guessCSVYear(date) {
  if (date) return date;
  return null;
}

async function loadPDFJS() {
  if (pdfjsReady) return pdfjsReady;
  pdfjsReady = loadScriptOnce(PDFJS_CDN).then(function () {
    return loadScriptOnce(PDFJS_WORKER_CDN).then(function () {
      return fetch(PDFJS_WORKER_CDN).then(function (r) { return r.text(); }).then(function (txt) {
        const blob = new Blob([txt], { type: 'text/javascript' });
        pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(blob);
      });
    });
  });
  return pdfjsReady;
}

async function parsePDFFile(file) {
  await loadPDFJS();
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: data }).promise;
  const lines = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const byY = {};
    for (const item of content.items) {
      if (!item.str || !item.str.trim()) continue;
      const y = Math.round((item.transform && item.transform[5]) || 0);
      (byY[y] = byY[y] || []).push(item.str);
    }
    Object.keys(byY).sort(function (a, b) { return Number(b) - Number(a); }).forEach(function (y) {
      lines.push(byY[y].join(' ').replace(/\s{2,}/g, ' ').trim());
    });
  }
  const rows = [];
  const tail = new Date().getFullYear();
  const head = new Date().getFullYear() - 1;
  for (const line of lines) {
    if (!line) continue;
    const dm = line.match(/(\d{2}\/\d{2})\s+(.+?)\s+([\d.,]+(?:\s*,\d{2})?)(?:\s+([\d.,]+(?:\s*,\d{2})?))?\s*$/);
    const dfull = line.match(/(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+([\d.,]+(?:\s*,\d{2})?)(?:\s+([\d.,]+(?:\s*,\d{2})?))?\s*$/);
    let m = dfull || dm;
    if (!m) continue;
    let desc = m[2].trim();
    if (/(PÁGINA|PAGE|SALDO ANTERIOR|SALDO FINAL|VALOR TOTAL|TOTAL|EXTRATO|FATURA|DATA|EXTRATO DA CONTA)/i.test(desc)) continue;
    let amt1 = parseAmount(m[3]);
    let amt2 = m[4] ? parseAmount(m[4]) : null;
    let amount = amt1;
    if (amt2 !== null && /saldo/i.test(desc)) { amount = amt1; desc = desc.replace(/saldo.*/i, '').trim(); }
    if (amount === null) continue;
    let iso;
    if (dfull) {
      const p = dfull[1].split('/');
      iso = isoFromParts(parseInt(p[2], 10), parseInt(p[1], 10), parseInt(p[0], 10));
    } else {
      const p = dm[1].split('/');
      let y = tail;
      if (parseInt(p[1], 10) > new Date().getMonth() + 1) y = head;
      iso = isoFromParts(y, parseInt(p[1], 10), parseInt(p[0], 10));
    }
    desc = desc.replace(/\s+/g, ' ').trim();
    rows.push({ date: iso, desc: desc, amount: Math.abs(amount), type: amount < 0 ? 'expense' : 'income' });
  }
  return rows;
}

function suggestCategory(name) {
  const s = normalizeName(name);
  const rules = [
    [/nubank|inter|itau|itaú|bradesco|santander|caixa|bb |banco do brasil|c6|cartao|cartão|fatura/, 'cat.card'],
    [/netflix|spotify|disney|hbo|amazon prime|prime video|paramount|deezer|youtube|play station|playstation|nintendo|chatgpt|openai|apple music|kindle|udemy|coursera|duolingo/, 'cat.subs'],
    [/mercado|supermercado|supermercados|carrefour|pão de açúcar|pao de acucar|assai|atacadao|atacadão|sonda|dia |walmart|extra|hipermercado|covabra|cesta|hortifruti|sams/, 'cat.market'],
    [/ifood|restaurante|lanchonete|hamburg|burger|pizza|sushi|padaria|acai|açaí|delivery|food|mc donald|mcdonalds|bk |subway|giraffas|outback|madero|churrascaria|starbucks|emporio/, 'cat.food'],
    [/uber|99 |99t|taxi|táxi|shell|petrobras|ipiranga|posto|estacionamento|pedagio|pedágio|grab|lyft|abastecimento|combustivel|combustível|sem parar|conectcar/, 'cat.transport'],
    [/luz|energia|eletropaulo|enel|cpfl|ceb|edp|equatorial|cosern|coelba|celesc|copel|light |neonergia|conta de energia/, 'cat.housing'],
    [/agua|água|sabesp|sanepar|cedae|comgas|gás|gas|diretoria de agua/, 'cat.housing'],
    [/aluguel|condominio|condomínio|iptu|ippu|imov|caixa economica|financiamento/, 'cat.financing'],
    [/telefone|claro|vivo|tim |oi |nextel|movel|celular|recarga/, 'cat.services'],
    [/internet|fibra|vivo fibra|claro net|net |gvt|sky|sktv/, 'cat.services'],
    [/farmacia|farmácia|droga|drogasil|drogaraia|pacheco|panvel|farma|hospital|medico|médico|dentista|unimed|bradesco saude|saúde|laboratorio|consultorio|vacina/, 'cat.health'],
    [/escola|faculdade|curso|matricula|mensalidade escolar|fies|kumon|wise up|cna|ccaa|livraria|saraiva/, 'cat.education'],
    [/renner|c&a|c e a|riachuelo|marisa|zara|hm |h&m|centauro|nike|adidas|camicado|shopping|roupa|vestuario|vestuário/, 'cat.clothes'],
    [/dizimo|dízimo|oferta|igreja|templo|congregacao|catolica|evangelica/, 'cat.faith'],
    [/petshop|pet |ração|veterinario|veterinário|cachorro|gato|petlove|cobasi/, 'cat.pets'],
    [/loterica|jogo|bet|bet365|aposta|cassino|bilhete|loteria|iugu|brl|stream/, 'cat.leisure'],
    [/bemol|magazine|casas bahia|casas bainhas|ponto|americanas|shopee|mercado livre|mercadolivre|amazon|aliexpress|wish|submarino|extra eletro/, 'cat.other'],
    [/empresa|mei|cnpj|contador|contabilidade|alvara|alvará|b3|banco do brasil empresa/, 'cat.services'],
    [/emprestimo|empréstimo|parcela|credito pessoal|crédito pessoal|nubank parcelado|pagseguro|will bank|neon|renegociacao|renegociação/, 'cat.loans']
  ];
  for (const r of rules) {
    if (r[0].test(s)) return r[1];
  }
  return null;
}

function suggestTypeKeywords(name) {
  const s = normalizeName(name);
  if (/(pix recebido|transferencia recebida|transferência recebida|salario|salário|recebimento|reembolso|estorno|estorno de|crédito|credito em conta|dividendos|juros sobre|rescisao|rescisão|aposentadoria|auxilio|auxílio|processo|acordo judicial|venda|adiantamento)/.test(s)) return 'income';
  if (/(pix enviado|transferencia enviada|transferência enviada|pagamento|compra|tarifa|debito|débito|mensalidade|parcela|boleto|imposto|taxa)/.test(s)) return 'expense';
  return null;
}