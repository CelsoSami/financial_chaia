(function () {
  'use strict';

  const $ = function (s) { return document.querySelector(s); };
  const $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  const ICONS = {
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z"/>',
    tx: '<path d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h10v2H4v-2Zm13-2 4 3.5-4 3.5v-7Z"/>',
    import: '<path d="M12 16V4m0 0 4 4m-4-4L8 8M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
    bills: '<path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v2h6V7H9Zm0 4v2h6v-2H9Zm0 4v2h4v-2H9Z"/>',
    more: '<path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm-9-2.8 2.3-.4a8 8 0 0 1 1.2-2l-1.3-2 2.1-2.1 2 1.3a8 8 0 0 1 2-1.2L11.6 1h3l.4 2.3a8 8 0 0 1 2 1.2l2-1.3 2.1 2.1-1.3 2a8 8 0 0 1 1.2 2l2.3.4v3l-2.3.4a8 8 0 0 1-1.2 2l1.3 2-2.1 2.1-2-1.3a8 8 0 0 1-2 1.2l-.4 2.3h-3l-.4-2.3a8 8 0 0 1-2-1.2l-2 1.3-2.1-2.1 1.3-2a8 8 0 0 1-1.2-2L3 10.5v-3Z"/>',
    settings: '<path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm-9-2.8 2.3-.4a8 8 0 0 1 1.2-2l-1.3-2 2.1-2.1 2 1.3a8 8 0 0 1 2-1.2L11.6 1h3l.4 2.3a8 8 0 0 1 2 1.2l2-1.3 2.1 2.1-1.3 2a8 8 0 0 1 1.2 2l2.3.4v3l-2.3.4a8 8 0 0 1-1.2 2l1.3 2-2.1 2.1-2-1.3a8 8 0 0 1-2 1.2l-.4 2.3h-3l-.4-2.3a8 8 0 0 1-2-1.2l-2 1.3-2.1-2.1 1.3-2a8 8 0 0 1-1.2-2L3 10.5v-3Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M4 20h4.2L20.5 7.7a2 2 0 0 0 0-2.9l-1.3-1.3a2 2 0 0 0-2.9 0L4 15.8V20Zm12.9-13-1.3-1.3 1.4-1.4 1.3 1.3-1.4 1.4Z"/>',
    trash: '<path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 12H7L6 9Zm4 3v6h2v-6h-2Zm4 0v6h2v-6h-2Z"/>',
    close: '<path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z"/>',
    theme: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    globe: '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-6.9 8h3.1a11 11 0 0 1 .9-4.6A7 7 0 0 0 5.1 11ZM12 5.4c.8 1 1.7 2.5 2.2 4.6h-4.4c.5-2.1 1.4-3.6 2.2-4.6ZM5 12a7 7 0 0 0 .2 1.5H2.3A7 7 0 0 1 2 12c0-.5 0-1 .1-1.5h2.9A7 7 0 0 0 5 12Zm.3 3h3.2c.2 1.8.5 3.4 1 4.6A7 7 0 0 1 5.3 15ZM12 18.6c-.8-1-1.7-2.5-2.2-4.6h4.4c-.5 2.1-1.4 3.6-2.2 4.6ZM14.5 15h-5A13 13 0 0 1 12 7.6 13 13 0 0 1 14.5 15Zm.6 4.6a7 7 0 0 0 1-4.6h3.2a7 7 0 0 1-4.2 4.6Zm1.6-6a11 11 0 0 0 .2-1.5c0-.5 0-1-.1-1.5h2.9c.1.5.1 1 .1 1.5s0 1-.1 1.5h-3Z"/>',
    logout: '<path d="M15 5h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3v-2h3V7h-3V5Zm-5 1.5L11.4 8l-1.9 1.9H20v2H9.5l1.9 1.9L10 15l-4.5-4.5L10 6.5Z"/>',
    check: '<path d="m9.5 15.6-4-4L4 13l5.5 5.5L20 8l-1.5-1.5-9 9Z"/>',
    alert: '<path d="M12 2 1.5 21h21L12 2Zm1 14h-2v2h2v-2Zm0-6h-2v5h2v-5Z"/>',
    card: '<path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 4h16v2H4V9Zm0 4v4h16v-4H4Z"/>',
    cash: '<path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm3 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM17 8h3v8h-3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/>',
    chart: '<path d="M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-7h4v7h-4Z"/>',
    coin: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2.2 2.2 4.9L19 10l-4.8 1-1 4.8L12 10.6 8.8 15.8l-1-4.8L3 10l4.8-.9L12 4.2Z"/>',
    eye: '<path d="M12 7c-2.7 0-5.1 1.1-6.8 3.1L4 12l1.2 1.9C6.9 15.9 9.3 17 12 17s5.1-1.1 6.8-3.1L20 12l-1.2-1.9C17.1 8.1 14.7 7 12 7Zm0 2.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z"/>',
    search: '<path d="M10 4a6 6 0 1 0 3.7 10.7l5 5 1.4-1.4-5-5A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>',
    download: '<path d="M12 3v10m0 0 4-4m-4 4L8 9M4 15v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
    upload: '<path d="M12 16V6m0 0 4 4m-4-4L8 10M4 15v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
    bank: '<path d="M2 10h20L12 3 2 10Zm2.5 2H6v7H4.5v-7Zm4 0H10v7H8.5v-7Zm4 0H14v7h-1.5v-7Zm4 0H18v7h-1.5v-7ZM2 19h20v2H2v-2Z"/>',
    tag: '<path d="M3 4h9l9 9-8 8-9-9V4Zm4 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>',
    spark: '<path d="M12 2 13.8 8.2 20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/>',
    target: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/>',
    refresh: '<path d="M17.7 6.3A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.8-4.3L13 11h8V3l-3.3 3.3Z"/>',
    shield: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"/>',
    sub: '<path d="M12 5V3H4v18h2V5h6Zm7.5 5.5-1.4-1.4L15 12l3.1 3.1 1.4-1.4-1-1H20v-2h-1.5l1-1Z"/>',
    dupe: '<path d="M9 2h8a2 2 0 0 1 2 2v12h-2V4H9V2ZM6 6h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v12h8V8H6Z"/>',
    cut: '<path d="M9.5 6.5 8.1 5.1l2.2-2.2L11.7 4.3 9.5 6.5ZM6.5 3.5 5.1 4.9 1.9 1.7.5 3.1l3.2 3.2-2.2 2.2 1.4 1.4 2.2-2.2 3.2 3.2 1.4-1.4-3.2-3.2 2.2-2.2L8 5.7 4.9 2.5 5.8 1.6l3.2 3.2-1.4 1.4-3.2-3.2 2.2-2.2 1.4 1.4-2.2 2.2L8 3.5l-.7.7ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>',
    save: '<path d="M3 17.5 9 11.5l4 4L21 8l-2-2-6 6-4-4-6 6v3.5Z"/>',
    bill: '<path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v2h6V7H9Zm0 4v2h6v-2H9Zm0 4v2h4v-2H9Z"/>',
    pix: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    income: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
    invest: '<path d="M3 17.5 9 11.5l4 4L21 8l-2-2-6 6-4-4-6 6v3.5Z"/>',
    calendar: '<path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2Zm-2 6v10h14V8H5Z"/>',
    info: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5h-2v2h2V7Zm0 4h-2v6h2v-6Z"/>',
    cloud: '<path d="M12 3C7 3 3 4.8 3 7v10c0 2.2 4 4 9 4s9-1.8 9-4V7c0-2.2-4-4-9-4Zm0 2c4.4 0 7 1.6 7 2s-2.6 2-7 2-7-1.6-7-2 2.6-2 7-2Zm7 12c0 .4-2.6 2-7 2s-7-1.6-7-2v-2.3C6.3 15.6 9 16.3 12 16.3s5.7-.7 7-1.6V17Zm0-5c0 .4-2.6 2-7 2s-7-1.6-7-2V9.7C6.3 10.6 9 11.3 12 11.3s5.7-.7 7-1.6V12Z"/>',
    checkcircle: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.4 14.6-4.7-4.7 1.4-1.4 3.3 3.3 6.1-6.1 1.4 1.4-7.5 7.5Z"/>',
    back: '<path d="M15 5 5 12l10 7-1.5 2L2.5 12 13.5 3 15 5Z"/>',
    home2: '<path d="M8 5V3h8v2h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5Zm2 0h4V4h-4v1Z"/>',
    building: '<path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6h3a1 1 0 0 1 1 1v8h2v2H2v-2h2Zm3-2h2v-3H7v3Zm0-6h2v-3H7v3Zm4 6h2v-3h-2v3Zm0-6h2v-3h-2v3Z"/>',
    box: '<path d="M21 8v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8l2-4h14l2 4ZM9 11H6a6 6 0 0 0 12 0h-3v2h-6v-2Zm-1.5-5-1 2h11l-1-2H7.5Z"/>',
    person: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/>',
    undo: '<path d="M9 8 3 14l6 6 1.5-1.5L6.5 15H14a5 5 0 0 0 5-5V7h-2v3a3 3 0 0 1-3 3H6.5l4-4.5L9 8Z"/>',
    scale: '<path d="M12 3v18M9 21h6M12 5 4 8v1h16V8l-8-3Zm-7 4 2.5 6H8.5L11 9H5Zm8 0 2.5 6h1l2.5-6h-6Z"/>',
    bag: '<path d="M6 6h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm3 3a3 3 0 0 0 6 0h-2a1 1 0 0 1-2 0H9Z"/>',
    cart: '<path d="M4 4h2l2.3 10.5h9.2l1.9-7H7.2L6.6 4H4Zm3 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>',
    car: '<path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6Zm2.5 0h9l-1-3h-7l-1 3ZM8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>',
    tv: '<path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm4.5 2L6 7v10h2.5V7Zm4 0h-2.5v10h2.5V7Zm4 0h-2.5v10h2.5V7Z"/>',
    game: '<path d="M7 8h10a4 4 0 0 1 4 4v4a3 3 0 0 1-3 3c-1 0-2-.5-2.6-1.3L14 16.5h-4l-1.4 1.2A3.1 3.1 0 0 1 6 19a3 3 0 0 1-3-3v-4a4 4 0 0 1 4-4Zm1.5 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-2.5 2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>',
    heart: '<path d="M12 21C7 16.6 3 13 3 9a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 21 9c0 4-4 7.6-9 12Z"/>',
    grad: '<path d="M12 3 1 8l11 5 9-4.1V15h2V8L12 3ZM5 13.5V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.5l-7 3.2-7-3.2Z"/>',
    shirt: '<path d="M14 3h6l-1 4-2 1-1 13H7L6 8 4 7 3 3h6l1 2h4l2-2Z"/>',
    cross: '<path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6V2Z"/>',
    phone: '<path d="M7 2h3l1.5 4-2.2 1.8a10 10 0 0 0 6.9 6.9l1.8-2.2L22 14v3a3 3 0 0 1-3 3C10.6 20 4 13.4 4 5a3 3 0 0 1 3-3Z"/>',
    receipt: '<path d="M6 2h12a1 1 0 0 1 1 1v18l-3-2-3 2-3-2-3 2-3-2V3a1 1 0 0 1 1-1Zm3 6v2h6V8H9Zm0 4v2h6v-2H9Z"/>',
    paw: '<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm8 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-4 2a4 4 0 0 1 4 4c0 1.7-1.8 3-4 3s-4-1.3-4-3a4 4 0 0 1 4-4ZM3 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm18 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>',
    plane: '<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-4.5l8 2.5Z"/>',
    gift: '<path d="M20 12v9H4v-9H2v-3h20v3h-2ZM11 5.5A2.5 2.5 0 0 0 8.5 3 2.5 2.5 0 0 0 6 5.5c0 .8.4 1.5 1 2h-3v2h16v-2h-3c.6-.5 1-1.2 1-2A2.5 2.5 0 0 0 15.5 3 2.5 2.5 0 0 0 13 5.5v.5h-2v-.5Z"/>',
    giftbox: '<path d="M20 12v9H4v-9H2v-3h20v3h-2ZM11 5.5A2.5 2.5 0 0 0 8.5 3 2.5 2.5 0 0 0 6 5.5c0 .8.4 1.5 1 2h-3v2h16v-2h-3c.6-.5 1-1.2 1-2A2.5 2.5 0 0 0 15.5 3 2.5 2.5 0 0 0 13 5.5v.5h-2v-.5Z"/>'
  };

  const CAT_ICON = {
    'cat.food': 'bag', 'cat.market': 'cart', 'cat.transport': 'car', 'cat.housing': 'home',
    'cat.subs': 'tv', 'cat.leisure': 'game', 'cat.health': 'heart', 'cat.education': 'grad',
    'cat.clothes': 'shirt', 'cat.card': 'card', 'cat.faith': 'cross', 'cat.services': 'phone',
    'cat.taxes': 'receipt', 'cat.loans': 'bank', 'cat.financing': 'home', 'cat.pets': 'paw',
    'cat.home': 'home', 'cat.travel': 'plane', 'cat.gifts': 'gift', 'cat.other': 'coin',
    'inc.salary': 'bag', 'inc.company': 'building', 'inc.sales': 'tag', 'inc.termination': 'box',
    'inc.retirement': 'person', 'inc.aid': 'heart', 'inc.refund': 'undo', 'inc.lawsuit': 'scale',
    'inc.investments': 'chart', 'inc.other': 'coin'
  };

  const CATS_EXPENSE = ['cat.food', 'cat.market', 'cat.transport', 'cat.housing', 'cat.subs', 'cat.leisure', 'cat.health', 'cat.education', 'cat.clothes', 'cat.card', 'cat.faith', 'cat.services', 'cat.taxes', 'cat.loans', 'cat.financing', 'cat.pets', 'cat.home', 'cat.travel', 'cat.gifts', 'cat.other'];
  const CATS_INCOME = ['inc.salary', 'inc.company', 'inc.sales', 'inc.termination', 'inc.retirement', 'inc.aid', 'inc.refund', 'inc.lawsuit', 'inc.investments', 'inc.other'];

  const state = {
    user: null,
    view: 'home',
    data: { banks: [], tx: [], aliases: [], bills: [], templates: [], payments: [], bankPayments: [], settings: {} },
    aliasesMap: {},
    bankMap: {},
    setupNeeded: false,
    loading: false,
    txFilters: { bank: 'all', month: 'all', type: 'all', q: '' },
    merchFilter: { q: '', pendingOnly: false },
    imp: null,
    importing: false,
    insightsOpen: false,
    bankRotTimer: null,
    bankRotIdx: 0,
    tmplSeg: 'bills',
    billsView: 'due',
    extratoMonth: null
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.coin) + '</svg>';
  }

  function catIconKey(cat) {
    if (cat && CAT_ICON[cat]) return CAT_ICON[cat];
    const base = cat && cat.indexOf('inc.') === 0 ? 'inc.other' : 'cat.other';
    return CAT_ICON[base];
  }

  function catName(cat) {
    if (!cat) return '';
    return t(cat);
  }

  function resolveName(txRow) {
    const k = normalizeName(txRow.raw_name || '');
    if (k && state.aliasesMap[k]) return state.aliasesMap[k];
    return txRow.display_name || txRow.raw_name || '—';
  }

  function bankName(id) {
    const b = state.bankMap[id];
    return b ? b.name : (id ? '?' : '');
  }

  function bankColor(id) {
    const b = state.bankMap[id];
    return b && b.color ? b.color : '#10b981';
  }

  const BANK_COLORS = ['#10b981', '#38bdf8', '#a78bfa', '#fbbf24', '#fb7185', '#34d399', '#60a5fa', '#f472b6', '#2dd4bf', '#c084fc'];

  function savePrefs() {
    localStorage.setItem('fc_prefs', JSON.stringify({ theme: document.documentElement.getAttribute('data-theme'), lang: LANG }));
  }

  function loadPrefs() {
    try {
      const p = JSON.parse(localStorage.getItem('fc_prefs') || '{}');
      if (p.theme === 'light' || p.theme === 'dark') document.documentElement.setAttribute('data-theme', p.theme);
      if (p.lang) setLang(p.lang);
    } catch (e) { }
    applyI18n();
  }

  function prettyName(email) {
    const local = String(email || '').split('@')[0] || '';
    return local.split('.').map(function (p) {
      return p ? p.charAt(0).toUpperCase() + p.slice(1) : p;
    }).join(' ');
  }

  async function currentAuthUser() {
    const s = await supabaseSession();
    if (!s || !s.user || !s.user.email) return null;
    return { login: s.user.email, name: prettyName(s.user.email) };
  }

  function toast(msg, tone) {
    const root = $('#toast-root');
    const el = document.createElement('div');
    el.className = 'toast ' + (tone || 'info');
    const ic = tone === 'ok' ? 'checkcircle' : (tone === 'err' ? 'alert' : 'info');
    el.innerHTML = icon(ic) + '<span>' + msg + '</span>';
    root.appendChild(el);
    setTimeout(function () {
      el.classList.add('out');
      setTimeout(function () { el.remove(); }, 320);
    }, 2800);
  }

  function openModal(opts) {
    const root = $('#modal-root');
    root.classList.remove('hidden');
    if (window.innerWidth >= 720) root.classList.add('desktop');
    root.innerHTML =
      '<div class="modal-backdrop" data-action="close-modal"></div>' +
      '<div class="modal" role="dialog">' +
      '<div class="modal-head"><h3>' + opts.title + '</h3>' +
      '<button class="modal-close" data-action="close-modal">' + icon('close') + '</button></div>' +
      '<div class="modal-body">' + opts.body + '</div>' +
      '</div>';
    if (opts.onOpen) opts.onOpen(root.querySelector('.modal'));
  }

  function closeModal() {
    const root = $('#modal-root');
    root.classList.add('hidden');
    root.innerHTML = '';
  }

  function confirmDialog(title, body, onYes, yesLabel) {
    openModal({
      title: title,
      body: '<p style="font-size:14px;color:var(--muted)">' + body + '</p>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-soft" data-action="close-modal">' + t('common.cancel') + '</button>' +
        '<button class="btn btn-danger-soft" data-action="confirm-yes">' + (yesLabel || t('common.delete')) + '</button>' +
        '</div>',
      onOpen: function (m) {
        m.addEventListener('click', function (e) {
          const a = e.target.closest('[data-action]');
          if (a && a.getAttribute('data-action') === 'confirm-yes') { closeModal(); onYes(); }
        });
      }
    });
  }

  function go(view) {
    state.view = view;
    setActiveNav();
    renderView();
  }

  function setActiveNav() {
    $$('.nav-item[data-view]').forEach(function (el) {
      const v = el.getAttribute('data-view');
      el.classList.toggle('active', v === state.view || (state.view === 'import' && v === 'more') || (state.view === 'import' && v === 'home'));
    });
    if (['banks', 'merchants', 'settings', 'import'].indexOf(state.view) > -1) {
      $$('.nav-item[data-view="more"]').forEach(function (el) { el.classList.add('active'); });
    }
    $('#actions-sheet').classList.add('hidden');
  }

  function viewTitle() {
    const map = { home: 'dash.insights', templates: 'tmpl.title', tx: 'tx.title', bills: 'bill.title', import: 'imp.title', more: 'set.title', banks: 'bank.title', merchants: 'mer.title', settings: 'set.title' };
    return t(map[state.view] || 'login.title');
  }

  function renderView() {
    stopBankRotation();
    $('#header-title').textContent = viewTitle();
    const v = $('#view');
    v.classList.remove('view-enter');
    void v.offsetWidth;
    v.classList.add('view-enter');
    v.innerHTML = '';
    if (state.setupNeeded) renderSetupBanner();
    else $('#setup-banner').classList.add('hidden');
    if (state.view === 'home') renderHome();
    else if (state.view === 'templates') renderTemplates();
    else if (state.view === 'tx') renderTx();
    else if (state.view === 'bills') renderBills();
    else if (state.view === 'import') renderImport();
    else if (state.view === 'more') renderMore();
    else if (state.view === 'banks') renderBanks();
    else if (state.view === 'merchants') renderMerchants();
    else if (state.view === 'settings') renderSettings();
    $('#view').scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function renderSetupBanner() {
    const b = $('#setup-banner');
    b.classList.remove('hidden');
    b.innerHTML =
      icon('alert') +
      '<div><b>' + t('setup.title') + '</b><p style="margin-top:2px">' + t('setup.body') + '</p>' +
      '<div class="sb-actions">' +
      '<button class="btn btn-sm btn-soft" data-action="setup-copy">' + t('setup.copy') + '</button>' +
      '<button class="btn btn-sm btn-soft" data-action="setup-howto">' + t('setup.howto') + '</button>' +
      '<button class="btn btn-sm btn-primary" data-action="setup-retry">' + t('setup.retry') + '</button>' +
      '</div></div>';
  }

  function buildAliasesMap() {
    const m = {};
    (state.data.aliases || []).forEach(function (a) { m[normalizeName(a.raw_name)] = a.display_name; });
    state.aliasesMap = m;
  }

  function buildBankMap() {
    const m = {};
    (state.data.banks || []).forEach(function (b) { m[b.id] = b; });
    state.bankMap = m;
  }

async function loadData(silent) {
    state.loading = true;
    if (!silent) setSync('wait');
    try {
      const check = await apiCheck();
      if (!check.ok) {
        state.setupNeeded = true;
    state.data = { banks: [], tx: [], aliases: [], bills: [], templates: [], payments: [], bankPayments: [], settings: {} };
        buildAliasesMap();
        buildBankMap();
        setSync('err');
        renderView();
        return;
      }
      state.setupNeeded = false;
const [banks, tx, aliases, bills, templates, payments, bankPayments, settings] = await Promise.all([
        dbFetch('banks'), dbFetch('transactions'), dbFetch('aliases'), dbFetch('bills'), dbFetch('bill_templates'), dbFetch('bill_payments'), dbFetch('bank_payments'), dbFetch('settings')
      ]);
      const settingsObj = {};
      (settings || []).forEach(function (s) { settingsObj[s.key] = s.value; });
      state.data = {
        banks: sortBanksByName(banks),
        tx: (tx || []).sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }),
        aliases: aliases || [],
        bills: bills || [],
        templates: (templates || []).sort(function (a, b) {
          const dayOf = function (t) {
            if (t.kind === 'cccomp' && t.bank_id) {
              const br = (banks || []).find(function (x) { return x.id === t.bank_id; });
              if (br && br.invoice_day) return Number(br.invoice_day);
            }
            return Number(t.due_day) || 1;
          };
          return (dayOf(a) || 31) - (dayOf(b) || 31);
        }),
        payments: payments || [],
        bankPayments: bankPayments || [],
        settings: settingsObj
      };
      buildAliasesMap();
      buildBankMap();
      const synced = await syncTemplateBills();
      if (synced) { loadData(true); return; }
      setSync('on');
      renderView();
} catch (e) {
      const msg = String(e && e.message || e);
      if (isSetupError(e)) {
        state.setupNeeded = true;
        setSync('err');
        renderView();
      } else {
        state.setupNeeded = false;
        setSync('err');
        toast(t('con.err.general') + (msg ? ': ' + msg.slice(0, 90) : ''), 'err');
        renderView();
      }
    } finally {
      state.loading = false;
    }
  }

  function setSync(kind) {
    const d = $('#sync-dot');
    d.className = 'sync-dot' + (kind === 'on' ? ' on' : kind === 'err' ? ' err' : '');
  }

  async function reloadData() {
    await loadData(true);
  }

  async function syncTemplateBills() {
    const now = new Date();
    const today = todayISO();
    let changed = false;
    try {
      const legacy = (state.data.bills || []).filter(function (b) { return b.kind === 'monthly' && !b.template_id; });
      for (const b of legacy) {
        const tpl = await dbInsert('bill_templates', {
          name: b.name,
          kind: b.amount ? 'fixed' : 'variable',
          amount: b.amount || null,
          due_day: Number(b.due_day) || 1,
          category: b.category || null,
          bank_id: b.bank_id || null,
          type: b.type === 'inc' ? 'inc' : 'exp',
          active: true
        });
        await dbUpdate('bills', b.id, { template_id: tpl.id });
        changed = true;
      }
      if (legacy.length) toast(t('tmpl.migrated'), 'info');
      const templates = (state.data.templates || []).filter(function (t) { return t.active; });
      for (const t of templates) {
        const day = templateDueDay(t);
        const due = nextDueDate(day, now);
        const mk = monthKeyFromISO(due);
        const nmk = parseISO(due);
        nmk.setMonth(nmk.getMonth() + 1);
        const mkNext = monthKeyFromISO(isoFromParts(nmk.getFullYear(), nmk.getMonth() + 1, 1));
        const linked = (state.data.bills || []).filter(function (b) {
          if (b.template_id !== t.id || b.kind !== 'monthly') return false;
          const bMk = monthKeyFromISO(billDueDate(b, now));
          if (t.kind === 'cccomp') return bMk === mk || (bMk === mkNext && (Number(b.due_day) || 1) !== day);
          return bMk === mk;
        });
        if (linked.length > 0) {
          const cur = linked[0];
          const patch = {};
          if (t.kind === 'cccomp' && (Number(cur.due_day) || 1) !== day) patch.due_day = day;
          if (cur.name !== t.name) patch.name = t.name;
          if ((cur.category || null) !== (t.category || null)) patch.category = t.category || null;
          if ((cur.bank_id || null) !== (t.bank_id || null)) patch.bank_id = t.bank_id || null;
          if ((t.kind === 'fixed' || t.kind === 'cccomp') && t.amount != null && (Number(cur.amount) || 0) !== Math.abs(Number(t.amount))) patch.amount = Math.abs(Number(t.amount));
          if (Object.keys(patch).length > 0) {
            await dbUpdate('bills', cur.id, patch);
            changed = true;
          }
          continue;
        }
        if (diffDays(due, today) > 7) continue;
        await dbInsert('bills', {
          name: t.name,
          amount: (t.kind === 'fixed' || t.kind === 'cccomp') && t.amount != null ? Math.abs(Number(t.amount)) : 0,
          kind: 'monthly',
          type: t.type === 'inc' ? 'inc' : 'exp',
          due_day: day,
          due_date: null,
          category: t.category || null,
          bank_id: t.bank_id || null,
          active: true,
          template_id: t.id
        });
        changed = true;
      }
    } catch (e) {
      if (!isSchemaError(e)) throw e;
      toast(t('con.err.schema'), 'err');
      return false;
    }
    return changed;
  }

  async function handleMutation(fn) {
    try {
      await fn();
      await reloadData();
      return true;
    } catch (e) {
      if (isSchemaError(e)) toast(t('con.err.schema'), 'err');
      else if (isPermissionError(e)) toast(t('set.needSetup'), 'err');
      else toast(t('con.err.general') + (e && e.message ? ': ' + String(e.message).slice(0, 90) : ''), 'err');
      return false;
    }
  }

  function countUp(el, target, fmtFn) {
    if (!el) return;
    if (window.__noAnim) { el.textContent = fmtFn(target); return; }
    const start = performance.now();
    const dur = 700;
    function frame(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmtFn(target * eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

function fmtSigned(v, lang) {
    return (v < 0 ? '-' : '+') + fmtMoney(Math.abs(v), lang);
  }

  function monthDueDate(b, now) {
    if (b.kind === 'once' || b.kind === 'ccbill') return b.due_date ? String(b.due_date) : null;
    const y = now.getFullYear(), m = now.getMonth() + 1;
    return isoFromParts(y, m, Math.min(Number(b.due_day) || 1, daysInMonth(y, m)));
  }

  function monthStats() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth() + 1;
    const today = todayISO();
    const pending = {};
    const dueByBank = {};
    (state.data.bills || []).forEach(function (b) {
      if (!b.active) return;
      if ((b.type || 'exp') === 'inc') return;
      const due = monthDueDate(b, now);
      if (!due || !isSameMonth(due, y, m)) return;
      const mk = monthKeyFromISO(due);
      const paid = (state.data.payments || []).some(function (p) { return p.bill_id === b.id && p.month === mk; });
      if (paid) return;
      pending[due] = (pending[due] || 0) + (Number(b.amount) || 0);
      const key = b.bank_id || '';
      dueByBank[key] = (dueByBank[key] || 0) + (Number(b.amount) || 0);
    });
    let dueMonth = 0, overdue = 0;
    Object.keys(pending).forEach(function (d) {
      if (d < today) overdue += pending[d];
      dueMonth += pending[d];
    });
    const totalDebt = (state.data.banks || []).reduce(function (a, b) { return a + (Number(b.debt) || 0); }, 0);
    const cash = totalCash(state.data.banks, state.data.settings.cash_balance);
    const monthTx = state.data.tx.filter(function (t) { return isSameMonth(t.date, y, m); });
    const monthSpend = monthTx.filter(function (t) { return t.type === 'expense'; }).reduce(function (a, t) { return a + Math.abs(Number(t.amount) || 0); }, 0);
    const monthIncome = monthTx.filter(function (t) { return t.type === 'income'; }).reduce(function (a, t) { return a + Math.abs(Number(t.amount) || 0); }, 0);
return { cash: cash, totalDebt: totalDebt, dueMonth: dueMonth, overdue: overdue, dueByBank: dueByBank, monthSpend: monthSpend, monthIncome: monthIncome, y: y, m: m };
}

  function overduePastEntries(now) {
    const today = todayISO();
    const cy = now.getFullYear(), cm = now.getMonth() + 1;
    const paidByBill = {};
    (state.data.payments || []).forEach(function (p) {
      if (!paidByBill[p.bill_id]) paidByBill[p.bill_id] = {};
      paidByBill[p.bill_id][p.month] = true;
    });
    const out = [];
    (state.data.bills || []).forEach(function (b) {
      if (!b.active) return;
      if ((b.type || 'exp') === 'inc') return;
      const paidMonths = paidByBill[b.id] || {};
      if (b.kind === 'once' || b.kind === 'ccbill') {
        const due = b.due_date ? String(b.due_date) : null;
        if (!due || due >= today) return;
        if (paidMonths[monthKeyFromISO(due)]) return;
        out.push({ b: b, due: due });
        return;
      }
      let created = null;
      if (b.created_at) {
        const c = String(b.created_at).slice(0, 10);
        if (/^\d{4}-\d{2}-\d{2}$/.test(c)) created = parseISO(c);
      }
      let yy, mm;
      if (created) {
        yy = created.getFullYear();
        mm = created.getMonth() + 1;
      } else {
        yy = cy; mm = cm;
      }
      let sy = yy, sm = mm;
      const ny = cy - 1;
      if (sy < ny) { sy = ny; sm = cm + 1; }
      if (sm > 12) { sm = 1; sy++; }
      yy = sy; mm = sm;
      while (yy < cy || (yy === cy && mm < cm)) {
        const dim = daysInMonth(yy, mm);
        const due = isoFromParts(yy, mm, Math.min(Number(b.due_day) || 1, dim));
        if (due < today && !paidMonths[monthKeyFromISO(due)]) out.push({ b: b, due: due });
        mm++;
        if (mm > 12) { mm = 1; yy++; }
      }
    });
    out.sort(function (a, c) { return String(a.due).localeCompare(String(c.due)); });
    return out;
  }

  function renderHome() {
    const st = monthStats();
    const budget = Number(state.data.settings.monthly_budget || 0);
    const now = new Date();
    const today = todayISO();
    const y = now.getFullYear(), m = now.getMonth() + 1;
    const rows = (state.data.bills || []).map(function (b) {
      if (!b.active) return null;
      if ((b.type || 'exp') === 'inc') return null;
      const due = monthDueDate(b, now);
      if (!due || !isSameMonth(due, y, m)) return null;
      const paid = (state.data.payments || []).some(function (p) { return p.bill_id === b.id && p.month === monthKeyFromISO(due); });
      return { b: b, due: due, paid: paid };
    }).filter(Boolean)
      .sort(function (a, c) {
        if (a.paid !== c.paid) return a.paid ? 1 : -1;
        return String(a.due).localeCompare(String(c.due));
      });
    const unpaid = rows.reduce(function (a, r) { return a + (r.paid ? 0 : (Number(r.b.amount) || 0)); }, 0);
    const overduePast = overduePastEntries(now);
    const overduePastTotal = overduePast.reduce(function (a, o) { return a + (Number(o.b.amount) || 0); }, 0);

    const html =
      '<div class="hero">' +
      '<div class="hero-top">' +
      '<div><div class="hero-greet">' + t('hello', { name: state.user ? state.user.name || state.user.login : '' }) + '</div>' +
      '<div class="hero-name">Chaia Finance</div></div>' +
      '<span class="badge soft">BRL</span>' +
      '</div>' +
      '<div class="hero-cash"><div class="hero-cash-label">' + t('stat.cash') + '</div>' +
      '<div class="hero-cash-value" id="cash-count">' + fmtMoney(st.cash, LANG) + '</div></div>' +
      (budget > 0 ? '<div class="hero-tags"><span class="badge good">' + icon('target', 'mini') + ' ' + t('dash.budget') + ': ' + fmtMoneyCompact(budget, LANG) + '</span></div>' : '') +
      '</div>' +

      '<div class="stat-grid">' +
      statCard('card', t('stat.debt'), fmtMoney(st.totalDebt, LANG), st.totalDebt > 0 ? 'warn' : 'good', 'stat-debt', st.totalDebt > 0 ? t('dash.tapView') : t('dash.zeroDebt')) +
      statCard('calendar', t('stat.dueMonth'), fmtMoney(st.dueMonth, LANG), st.dueMonth > 0 ? 'warn' : '', 'stat-due', st.dueMonth > 0 ? t('dash.dueThisMonth') : t('dash.noDueThisMonth')) +
      bankDueCard(st) +
      statCard('alert', t('stat.overdue'), fmtMoney(st.overdue, LANG), st.overdue > 0 ? 'hot' : '', 'stat-overdue', st.overdue > 0 ? t('dash.overduePending') : t('dash.noOverdue'), st.overdue > 0) +
      '</div>' +

      '<div class="section-gap"></div>' +

      (overduePast.length ?
        '<div class="card">' +
        '<div class="card-title">' + icon('alert') + t('dash.overduePast') + (overduePastTotal > 0 ? '<span class="x-total">' + fmtMoney(overduePastTotal, LANG) + '</span>' : '') + '</div>' +
        overduePast.map(function (o) { return renderBillRow(o.b, o.due); }).join('') +
        (overduePastTotal > 0 ? '<div class="hb-total"><span>' + t('dash.extractTotal') + '</span><b>' + fmtMoney(overduePastTotal, LANG) + '</b></div>' : '') +
        '</div>' +
        '<div class="section-gap"></div>' : '') +

      '<div class="card">' +
      '<div class="card-title">' + icon('bills') + t('dash.monthBills') + ' · ' + monthLabel(monthKeyFromISO(today), LANG) +
      (unpaid > 0 ? '<span class="x-total">' + fmtMoney(unpaid, LANG) + '</span>' : '') +
      '</div>' +
      (rows.length ?
        rows.map(function (r) { return renderBillRow(r.b, r.due); }).join('') +
        (unpaid > 0 ? '<div class="hb-total"><span>' + t('dash.extractTotal') + '</span><b>' + fmtMoney(unpaid, LANG) + '</b></div>' : '') :
        '<div class="empty">' + icon('bills') + '<b>' + t('dash.noBillsMonth') + '</b><p>' + t('dash.noBillsMonthHint') + '</p></div>') +
      '<button class="btn btn-soft btn-block" style="margin-top:12px" data-action="go" data-view="bills">' + t('dash.viewAll') + '</button>' +
      '</div>';

    $('#view').innerHTML = html;
    countUp($('#cash-count'), st.cash, function (v) { return fmtMoney(v, LANG); });
    countUp($('#stat-debt'), st.totalDebt, function (v) { return fmtMoney(v, LANG); });
    countUp($('#stat-due'), st.dueMonth, function (v) { return fmtMoney(v, LANG); });
    countUp($('#stat-overdue'), st.overdue, function (v) { return fmtMoney(v, LANG); });
    startBankRotation(st);
  }

  function statCard(ic, label, value, tone, id, sub, pulse) {
    const vars = tone === 'warn'
      ? '--tone:var(--warn);--tone-bg:var(--warn-bg);--tone-glow:color-mix(in srgb,var(--warn) 30%,transparent);--tone-wash:color-mix(in srgb,var(--warn) 8%,transparent)'
      : tone === 'hot'
        ? '--tone:var(--danger);--tone-bg:var(--danger-bg);--tone-glow:color-mix(in srgb,var(--danger) 30%,transparent);--tone-wash:color-mix(in srgb,var(--danger) 8%,transparent)'
        : tone === 'good'
          ? '--tone:var(--good);--tone-bg:var(--good-bg);--tone-glow:color-mix(in srgb,var(--good) 30%,transparent);--tone-wash:color-mix(in srgb,var(--good) 8%,transparent)'
          : '--tone:var(--accent);--tone-bg:color-mix(in srgb,var(--accent) 14%,transparent);--tone-glow:color-mix(in srgb,var(--accent) 26%,transparent);--tone-wash:color-mix(in srgb,var(--accent) 7%,transparent)';
    return '<button type="button" class="stat" data-action="go" data-view="bills" style="' + vars + '">' +
      '<span class="stat-glow"></span>' +
      '<span class="stat-ico">' + icon(ic) + '</span>' +
      '<span class="stat-main"><span class="stat-label">' + label + '</span>' +
      '<span class="stat-value"' + (id ? ' id="' + id + '"' : '') + '>' + value + '</span>' +
      (sub ? '<span class="stat-sub">' + (pulse ? '<span class="stat-pulse"></span>' : '') + sub + '</span>' : '') +
      '</span></button>';
  }

  function stopBankRotation() {
    if (state.bankRotTimer) { clearInterval(state.bankRotTimer); state.bankRotTimer = null; }
    state.bankRotIdx = 0;
  }

  function bankDueCard(st) {
    const banks = state.data.banks || [];
    const first = banks.length ? banks[0] : null;
    const label = first ? t('stat.dueMonth') + ' · ' + first.name : t('stat.dueMonth');
    const value = first ? fmtMoney(Number(st.dueByBank[first.id] || 0), LANG) : fmtMoney(st.dueMonth, LANG);
    return '<button type="button" class="stat" data-action="go" data-view="bills" style="--tone:var(--accent-2);--tone-bg:color-mix(in srgb,var(--accent-2) 14%,transparent);--tone-glow:color-mix(in srgb,var(--accent-2) 26%,transparent);--tone-wash:color-mix(in srgb,var(--accent-2) 7%,transparent)">' +
      '<span class="stat-glow"></span>' +
      '<span class="stat-ico">' + icon('bank') + '</span>' +
      '<span class="stat-main"><span class="stat-label" id="bankdue-label">' + esc(label) + '</span>' +
      '<span class="stat-value" id="bankdue-value">' + value + '</span>' +
      '<span class="stat-sub">' + t('dash.tapView') + '</span></span></button>';
  }

  function startBankRotation(st) {
    const banks = state.data.banks || [];
    if (banks.length < 2) return;
    const items = banks.map(function (b) {
      return { name: b.name, value: Number(st.dueByBank[b.id] || 0) };
    });
    const tick = function () {
      if (state.bankRotIdx >= items.length) state.bankRotIdx = 0;
      const it = items[state.bankRotIdx];
      const labelEl = $('#bankdue-label');
      const valEl = $('#bankdue-value');
      if (!labelEl || !valEl) { stopBankRotation(); return; }
      labelEl.style.opacity = '0';
      valEl.style.opacity = '0';
      setTimeout(function () {
        labelEl.textContent = t('stat.dueMonth') + ' · ' + it.name;
        valEl.textContent = fmtMoney(it.value, LANG);
        labelEl.style.opacity = '1';
        valEl.style.opacity = '1';
      }, 180);
      state.bankRotIdx++;
    };
    state.bankRotTimer = setInterval(tick, 3000);
  }

function bankKindLabel(kind) {
    if (kind === 'credit') return t('bank.credit');
    if (kind === 'invest') return t('bank.invest');
    return t('bank.debit');
  }

function renderTx() {
    const banks = state.data.banks || [];
    const months = [];
    state.data.tx.forEach(function (t) {
      const mk = monthKeyFromISO(t.date);
      if (months.indexOf(mk) < 0) months.push(mk);
    });
    months.sort().reverse();
    const f = state.txFilters;
    let list = state.data.tx;
    if (f.bank !== 'all') list = list.filter(function (t) { return t.bank_id === f.bank; });
    if (f.month !== 'all') list = list.filter(function (t) { return monthKeyFromISO(t.date) === f.month; });
    if (f.type !== 'all') list = list.filter(function (t) { return t.type === f.type; });
    if (f.q) {
      const q = normalizeName(f.q);
      list = list.filter(function (t) {
        return normalizeName(resolveName(t)).indexOf(q) > -1 || normalizeName(t.raw_name || '').indexOf(q) > -1 || normalizeName(t.category || '').indexOf(q) > -1;
      });
    }

    const html =
      '<div class="chip-row">' +
      chip('all', t('tx.allBanks'), f.bank === 'all', 'txf-bank', 'all') +
      banks.map(function (b) { return chip(b.id, esc(b.name), f.bank === b.id, 'txf-bank', b.id); }).join('') +
      '</div>' +
      '<div class="chip-row">' +
      chip('all', t('tx.all'), f.type === 'all', 'txf-type', 'all') +
      chip('expense', t('tx.expenses'), f.type === 'expense', 'txf-type', 'expense') +
      chip('income', t('tx.income'), f.type === 'income', 'txf-type', 'income') +
      '</div>' +
      '<div class="field"><input class="input" id="tx-search" type="search" placeholder="' + t('tx.search') + '" value="' + esc(f.q) + '"></div>' +
      (months.length > 1 ?
        '<div class="field"><select class="input" id="tx-month">' +
        '<option value="all">' + t('tx.allMonths') + '</option>' +
        months.map(function (mk) { return '<option value="' + mk + '"' + (f.month === mk ? ' selected' : '') + '>' + esc(monthLabel(mk, LANG)) + '</option>'; }).join('') +
        '</select></div>' : '') +

      (list.length ?
        '<button class="btn btn-dash btn-block" data-action="open-tx" style="margin-bottom:12px">' + icon('plus') + t('tx.add') + '</button>' :
        '<div class="empty">' + icon('tx') + '<b>' + t('tx.empty') + '</b><p>' + t('tx.emptyHint') + '</p>' +
        '<button class="btn btn-primary btn-sm" data-action="open-tx" style="margin-top:14px">' + t('tx.add') + '</button></div>') +

      renderTxList(list);
    $('#view').innerHTML = html;
    const s = $('#tx-search');
    if (s) s.focus();
  }

  function renderTxList(list) {
    if (!list.length) return '';
    const groups = {};
    list.forEach(function (t) {
      const mk = monthKeyFromISO(t.date);
      (groups[mk] = groups[mk] || []).push(t);
    });
    return Object.keys(groups).sort().reverse().map(function (mk) {
      const items = groups[mk].sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
      const sum = items.reduce(function (a, t) { return a + (t.type === 'expense' ? -Math.abs(Number(t.amount) || 0) : Math.abs(Number(t.amount) || 0)); }, 0);
      return '<div class="tx-month"><div class="tx-month-head"><b>' + esc(monthLabel(mk, LANG)) + '</b>' +
        '<span>' + (sum < 0 ? '' : '+') + fmtMoney(sum, LANG) + '</span></div>' +
        '<div class="card" style="padding:6px 14px">' +
        items.map(function (t) {
          const isExp = t.type === 'expense';
          const cat = t.category || (isExp ? 'cat.other' : 'inc.other');
          return '<div class="list-row">' +
            '<span class="row-ico ' + (isExp ? 'exp' : 'inc') + '">' + icon(catIconKey(cat)) + '</span>' +
            '<div class="row-main"><div class="row-title">' + esc(resolveName(t)) + '</div>' +
            '<div class="row-sub">' + catName(cat) + (t.bank_id ? ' · ' + esc(bankName(t.bank_id)) : '') +
            (t.source === 'import' || t.source === 'pdf' ? ' · ' + t('tx.imported') : '') + '</div></div>' +
            '<div class="row-end"><div class="row-amount ' + (isExp ? 'exp' : 'inc') + '">' +
            (isExp ? '-' : '+') + fmtMoney(t.amount, LANG) + '</div>' +
            '<small style="color:var(--faint)">' + fmtDate(t.date, LANG) + '</small></div>' +
            '<button class="row-action" data-action="edit-tx" data-id="' + t.id + '">' + icon('edit') + '</button>' +
            '</div>';
        }).join('') +
        '</div></div>';
    }).join('');
  }

  function chip(key, label, active, action, value) {
    return '<button class="chip' + (active ? ' active' : '') + '" data-action="' + action + '" data-value="' + value + '">' + label + '</button>';
  }

  function openTxModal(id) {
    const tx = id ? state.data.tx.find(function (t) { return t.id === id; }) : null;
    if (!state.data.banks.length && !tx) {
      toast(t('tx.needBank'), 'info');
      return;
    }
    const now = new Date();
    const defDate = tx ? tx.date : isoFromParts(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const defType = tx ? tx.type : 'expense';
    const defCat = tx ? (tx.category || '') : '';
    const defBank = tx ? (tx.bank_id || '') : '';
    const defAmt = tx ? String(Math.abs(Number(tx.amount) || 0)).replace('.', ',') : '';
    openModal({
      title: tx ? t('tx.edit') : t('tx.add'),
      body:
        '<div class="field"><label class="field-label">' + t('tx.date') + '</label><input class="input" type="date" id="m-date" value="' + defDate + '"></div>' +
        '<div class="field"><label class="field-label">' + t('tx.desc') + '</label><input class="input" id="m-desc" value="' + esc(tx ? tx.raw_name : '') + '"></div>' +
        '<div class="field"><label class="field-label">' + t('tx.amount') + '</label><input class="input" id="m-amount" inputmode="decimal" value="' + esc(defAmt) + '"></div>' +
        '<div class="field-grid">' +
        '<div class="field"><label class="field-label">' + t('tx.type') + '</label><select class="input" id="m-type">' +
        '<option value="expense"' + (defType === 'expense' ? ' selected' : '') + '>' + t('tx.expense') + '</option>' +
        '<option value="income"' + (defType === 'income' ? ' selected' : '') + '>' + t('tx.income') + '</option></select></div>' +
        '<div class="field"><label class="field-label">' + t('tx.category') + '</label><select class="input" id="m-cat"></select></div>' +
        '</div>' +
        '<div class="field"><label class="field-label">' + t('tx.bank') + '</label><select class="input" id="m-bank">' +
        '<option value="">—</option>' +
        state.data.banks.map(function (b) { return '<option value="' + b.id + '"' + (defBank === b.id ? ' selected' : '') + '>' + esc(b.name) + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-soft" data-action="close-modal">' + t('common.cancel') + '</button>' +
        '<button class="btn btn-primary" data-action="save-tx"' + (id ? ' data-id="' + id + '"' : '') + '>' + t('common.save') + '</button>' +
        '</div>',
      onOpen: function (m) {
        fillCatSelect(m.querySelector('#m-cat'), defType, defCat);
        m.querySelector('#m-type').addEventListener('change', function (e) {
          fillCatSelect(m.querySelector('#m-cat'), e.target.value, '');
        });
      }
    });
  }

  function fillCatSelect(sel, type, selected) {
    const cats = sortedCats(type === 'income' ? CATS_INCOME : CATS_EXPENSE);
    sel.innerHTML = cats.map(function (c) {
      return '<option value="' + c + '"' + (c === selected ? ' selected' : '') + '>' + t(c) + '</option>';
    }).join('');
  }

  function sortedCats(cats) {
    return cats.slice().sort(function (a, b) {
      const aOther = a === 'cat.other' || a === 'inc.other';
      const bOther = b === 'cat.other' || b === 'inc.other';
      if (aOther !== bOther) return aOther ? 1 : -1;
      return t(a).localeCompare(t(b), LANG === 'en' ? 'en' : 'pt-BR', { sensitivity: 'base' });
    });
  }

  async function saveTx(id) {
    const date = $('#m-date').value;
    const desc = $('#m-desc').value.trim();
    const amt = parseAmount($('#m-amount').value);
    const type = $('#m-type').value;
    const cat = $('#m-cat').value;
    const bank = $('#m-bank').value;
    if (!date || !desc || amt === null) { toast(t('imp.parseError'), 'err'); return; }
    const row = { date: date, raw_name: desc, display_name: state.aliasesMap[normalizeName(desc)] || null, category: cat, amount: Math.abs(amt), type: type, bank_id: bank || null, source: 'manual' };
    const ok = await handleMutation(function () {
      if (id) return dbUpdate('transactions', id, row);
      return dbInsert('transactions', row);
    });
    if (ok) { closeModal(); toast(t('tx.saved'), 'ok'); }
  }

  function renderImport() {
    const html =
      '<p style="color:var(--muted);font-size:13.5px;margin-bottom:14px">' + t('imp.subtitle') + '</p>' +
      (state.imp ? renderImportSession() :
        '<div class="import-grid">' +
        '<label class="import-type csv"><input type="file" id="csv-file" accept=".csv,text/csv,text/plain" class="hidden">' +
        icon('receipt') + '<b>' + t('imp.csvTitle') + '</b><p>' + t('imp.csvSub') + '</p></label>' +
        '<label class="import-type pdf"><input type="file" id="pdf-file" accept=".pdf,application/pdf" class="hidden">' +
        icon('bill') + '<b>' + t('imp.pdfTitle') + '</b><p>' + t('imp.pdfSub') + '</p></label>' +
        '</div>' +
        '<div class="dropzone" id="dropzone">' + icon('upload') + '<b>' + t('imp.drop') + '</b><p>' + t('imp.choose') + '</p></div>');
    $('#view').innerHTML = html;
    const csv = $('#csv-file');
    const pdf = $('#pdf-file');
    if (csv) csv.addEventListener('change', function () { if (csv.files[0]) handleCSVFile(csv.files[0]); });
    if (pdf) pdf.addEventListener('change', function () { if (pdf.files[0]) handlePDFFile(pdf.files[0]); });
    const dz = $('#dropzone');
    if (dz) {
      dz.addEventListener('dragover', function (e) { e.preventDefault(); dz.classList.add('drag'); });
      dz.addEventListener('dragleave', function () { dz.classList.remove('drag'); });
      dz.addEventListener('drop', function (e) {
        e.preventDefault(); dz.classList.remove('drag');
        const f = e.dataTransfer.files[0];
        if (!f) return;
        if (/\.csv$/i.test(f.name)) handleCSVFile(f);
        else if (/\.pdf$/i.test(f.name)) handlePDFFile(f);
        else toast(t('imp.fileType'), 'err');
      });
    }
  }

  function renderImportSession() {
    const imp = state.imp;
    if (imp.kind === 'csv') {
      return '<button class="chip" data-action="cancel-import">' + icon('back') + ' ' + t('imp.back') + '</button>' +
        '<div class="section-gap"></div>' +
        '<div class="card"><div class="card-title">' + icon('tag') + t('imp.step.map') + '</div>' +
        '<p style="color:var(--muted);font-size:12.5px;margin-bottom:12px">' + t('imp.step.mapHint') + '</p>' +
        '<div class="field"><label class="field-label">' + t('imp.col.date') + '</label>' + mapSelect('date', imp.layout.dateIdx) + '</div>' +
        '<div class="field"><label class="field-label">' + t('imp.col.desc') + '</label>' + mapSelect('desc', imp.layout.descIdx) + '</div>' +
        '<div class="field"><label class="field-label">' + t('imp.col.amount') + '</label>' + mapSelect('amount', imp.layout.amountIdx) + '</div>' +
        '<div class="field-grid">' +
        '<div class="field"><label class="field-label">' + t('imp.col.debit') + '</label>' + mapSelect('debit', imp.layout.debitIdx) + '</div>' +
        '<div class="field"><label class="field-label">' + t('imp.col.credit') + '</label>' + mapSelect('credit', imp.layout.creditIdx) + '</div>' +
        '</div>' +
        '<div class="field"><label class="field-label">' + t('imp.col.type') + '</label>' + mapSelect('type', imp.layout.typeIdx) + '</div>' +
        '<button class="btn btn-soft btn-sm" data-action="invert-signs">' + icon('undo') + ' ' + t('imp.invert') + '</button>' +
        '</div>' +
        '<div class="section-gap"></div>' +
        renderBankPicker() +
        '<div class="section-gap"></div>' +
        '<div class="card"><div class="card-title">' + icon('tx') + t('imp.preview') + '</div>' +
        '<div class="csv-map"><table><thead><tr>' +
        '<th>' + t('tx.date') + '</th><th>' + t('tx.desc') + '</th><th>' + t('tx.amount') + '</th><th>' + t('tx.type') + '</th>' +
        '</tr></thead><tbody id="csv-preview"></tbody></table></div>' +
        '<button class="btn btn-primary btn-block" id="csv-import-btn" data-action="do-import-csv" style="margin-top:14px" disabled>' +
        t('imp.import', { n: 0 }) + '</button></div>';
    }
    return '<button class="chip" data-action="cancel-import">' + icon('back') + ' ' + t('imp.back') + '</button>' +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('bill') + t('imp.pdfTitle') + '</div>' +
      '<p style="color:var(--muted);font-size:12.5px">' + t('imp.pdfRows', { n: imp.rows.length }) + '</p>' +
      '<p style="color:var(--muted);font-size:12.5px">' + t('imp.editing') + '</p></div>' +
      '<div class="section-gap"></div>' +
      renderBankPicker() +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('tx') + t('imp.preview') + '</div>' +
      '<div id="pdf-rows">' + imp.rows.map(function (r, i) {
        return '<div class="pdf-row-edit" style="margin-bottom:8px">' +
          '<input data-idx="' + i + '" data-field="date" type="date" value="' + r.date + '">' +
          '<input data-idx="' + i + '" data-field="desc" value="' + esc(r.desc) + '">' +
          '<input data-idx="' + i + '" data-field="amount" inputmode="decimal" value="' + String(r.amount).replace('.', ',') + '" style="max-width:110px">' +
          '<select data-idx="' + i + '" data-field="type" style="max-width:110px">' +
          '<option value="expense"' + (r.type === 'expense' ? ' selected' : '') + '>' + t('tx.expense') + '</option>' +
          '<option value="income"' + (r.type === 'income' ? ' selected' : '') + '>' + t('tx.income') + '</option>' +
          '</select>' +
          '<button class="del" data-action="del-pdf-row" data-idx="' + i + '">' + icon('trash') + '</button>' +
          '</div>';
      }).join('') + '</div>' +
      '<button class="btn btn-primary btn-block" data-action="do-import-pdf" style="margin-top:12px">' +
      t('imp.import', { n: imp.rows.length }) + '</button></div>';
  }

  function mapSelect(field, selected) {
    const headers = state.imp.headers;
    let opts = '<option value="-1"' + (selected < 0 ? ' selected' : '') + '>' + t('imp.col.ignore') + '</option>';
    headers.forEach(function (h, i) {
      const key = field === 'amount' ? 'amount' : (field === 'debit' || field === 'credit' ? field : field);
      opts += '<option value="' + i + '"' + (selected === i ? ' selected' : '') + '>' + esc(h || '#' + (i + 1)) + '</option>';
    });
    return '<select class="input" data-map="' + field + '">' + opts + '</select>';
  }

  function renderBankPicker() {
    return '<div class="card"><div class="card-title">' + icon('bank') + t('imp.bankLabel') + '</div>' +
      '<div class="field"><select class="input" id="imp-bank">' +
      state.data.banks.map(function (b) { return '<option value="' + b.id + '">' + esc(b.name) + '</option>'; }).join('') +
      '<option value="__new__">' + t('imp.bankNew') + '</option></select></div>' +
      '<div id="imp-new-bank" class="hidden">' +
      '<div class="field"><input class="input" id="imp-new-name" placeholder="' + t('imp.bankName') + '"></div>' +
      '<div class="field"><select class="input" id="imp-new-kind">' +
      '<option value="credit">' + t('bank.credit') + '</option>' +
      '<option value="debit">' + t('bank.debit') + '</option>' +
      '<option value="invest">' + t('bank.invest') + '</option></select></div>' +
      '</div></div>';
  }

  function refreshCSVPreview() {
    const imp = state.imp;
    const layout = imp.layout;
    layout.dateIdx = Number($('[data-map="date"]').value);
    layout.descIdx = Number($('[data-map="desc"]').value);
    layout.amountIdx = Number($('[data-map="amount"]').value);
    layout.debitIdx = Number($('[data-map="debit"]').value);
    layout.creditIdx = Number($('[data-map="credit"]').value);
    layout.typeIdx = Number($('[data-map="type"]').value);
    const entries = buildCSVEntries(layout, imp.headers, imp.rows, { invert: imp.invert });
    imp.entries = entries;
    const tbody = $('#csv-preview');
    if (tbody) {
      tbody.innerHTML = entries.slice(0, 8).map(function (e) {
        return '<tr><td>' + fmtDate(e.date, LANG) + '</td><td>' + esc(e.desc) + '</td><td>' + fmtMoney(e.amount, LANG) + '</td>' +
          '<td>' + (e.type === 'expense' ? t('tx.expense') : t('tx.income')) + '</td></tr>';
      }).join('') +
        (entries.length > 8 ? '<tr><td colspan="4" style="text-align:center;color:var(--faint)">+ ' + (entries.length - 8) + ' ' + t('imp.rows') + '</td></tr>' : '');
    }
    const btn = $('#csv-import-btn');
    if (btn) {
      btn.disabled = entries.length === 0 || state.importing;
      btn.innerHTML = (state.importing ? t('imp.importing') : t('imp.import', { n: entries.length }));
    }
  }

  async function handleCSVFile(file) {
    try {
      const parsed = await parseCSVFile(file);
      state.imp = { kind: 'csv', headers: parsed.headers, rows: parsed.rows, layout: detectLayout(parsed.headers, parsed.rows), invert: false, entries: [] };
      renderImport();
      requestAnimationFrame(refreshCSVPreview);
    } catch (e) {
      toast(e && e.message === 'NO_ROWS' ? t('imp.parseError') : t('imp.readError'), 'err');
    }
  }

  async function handlePDFFile(file) {
    toast(t('imp.processing'), 'info');
    try {
      const rows = await parsePDFFile(file);
      if (!rows.length) { toast(t('imp.pdfNoText'), 'err'); state.imp = null; renderImport(); return; }
      state.imp = { kind: 'pdf', rows: rows };
      renderImport();
    } catch (e) {
      toast(t('imp.parseError'), 'err');
      state.imp = null;
      renderImport();
    }
  }

  async function resolveImportBank() {
    const sel = $('#imp-bank');
    if (!sel) return null;
    const v = sel.value;
    if (v !== '__new__') return v || null;
    const name = ($('#imp-new-name') || {}).value;
    if (!name) { toast(t('imp.bankName'), 'err'); return null; }
    const kind = ($('#imp-new-kind') || {}).value;
    const color = BANK_COLORS[state.data.banks.length % BANK_COLORS.length];
    const b = await dbInsert('banks', { name: name, kind: kind, color: color });
    state.data.banks.push(b);
    buildBankMap();
    return b.id;
  }

  async function doImport(entries) {
    if (!entries.length || state.importing) return;
    state.importing = true;
    const btn = $('#csv-import-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = t('imp.importing'); }
    try {
      const bankId = await resolveImportBank();
      if (bankId === null) { state.importing = false; return; }
      let ok = 0, aliased = 0;
      for (const e of entries) {
        const alias = state.aliasesMap[normalizeName(e.desc)] || null;
        const cat = e.type === 'expense' ? (suggestCategory(e.desc) || 'cat.other') : null;
        await dbInsert('transactions', {
          bank_id: bankId, date: e.date, raw_name: e.desc, display_name: alias,
          category: cat, amount: e.amount, type: e.type, source: 'import'
        });
        ok++;
        if (alias) aliased++;
      }
      await reloadData();
      toast(t('imp.done') + ' · ' + t('imp.importedCount', { n: ok }) + (aliased ? ' · ' + t('imp.aliased', { n: aliased }) : ''), 'ok');
      state.imp = null;
      go('home');
    } catch (e) {
      toast(t('con.err.general') + (e && e.message ? ': ' + String(e.message).slice(0, 90) : ''), 'err');
    } finally {
      state.importing = false;
    }
  }

  function templateDueDay(tp) {
    if (tp && tp.kind === 'cccomp' && tp.bank_id) {
      const bankRow = (state.data.banks || []).find(function (x) { return x.id === tp.bank_id; });
      if (bankRow && bankRow.invoice_day) return Number(bankRow.invoice_day);
    }
    return Number(tp && tp.due_day) || 1;
  }

  function renderTemplates() {
    const seg = state.tmplSeg === 'income' ? 'income' : 'bills';
    const list = (state.data.templates || []).filter(function (t) {
      return t.active && ((t.type || 'exp') === 'inc') === (seg === 'income');
    });
    const now = new Date();
    const today = todayISO();
    const ccbills = seg === 'bills' ? (state.data.bills || []).filter(function (b) {
      if (!b.active || b.kind !== 'ccbill' || String(b.due_date) < today) return false;
      const mk = monthKeyFromISO(billDueDate(b, now));
      return !(state.data.payments || []).some(function (p) { return p.bill_id === b.id && p.month === mk; });
    }) : [];
    const rows = list.map(function (tp) {
      const income = (tp.type || 'exp') === 'inc';
      const fixed = tp.kind === 'fixed' && tp.amount != null;
      const comp = tp.kind === 'cccomp';
      const amt = (fixed || comp) ? ' · ' + fmtMoney(tp.amount, LANG) : '';
      return '<div class="list-row">' +
        '<span class="row-ico' + (income ? ' inc' : '') + '">' + icon(comp ? 'card' : (income ? 'income' : 'calendar')) + '</span>' +
        '<div class="row-main"><div class="row-title">' + esc(tp.name) + '</div>' +
        '<div class="row-sub">' + (income ? t('tmpl.incomeDayLabel', { d: Number(tp.due_day) || 1 }) : t('tmpl.dayLabel', { d: templateDueDay(tp) })) +
        amt + (tp.bank_id ? ' · ' + esc(bankName(tp.bank_id)) : '') + '</div></div>' +
        '<span class="badge ' + (income ? 'good' : (comp ? 'soft' : (fixed ? 'good' : 'soft'))) + '">' +
        (income ? t('tmpl.incomeFixed') : comp ? t('tmpl.cccompBadge') : fixed ? t('tmpl.fixed') : t('tmpl.variable')) + '</span>' +
        '<button class="row-action" data-action="edit-tmpl" data-id="' + tp.id + '">' + icon('edit') + '</button>' +
        '</div>';
    }).concat(ccbills.map(function (b) {
      const due = billDueDate(b, now);
      return '<div class="list-row">' +
        '<span class="row-ico exp">' + icon('card') + '</span>' +
        '<div class="row-main"><div class="row-title">' + esc(b.name) + '</div>' +
        '<div class="row-sub">' + esc(bankName(b.bank_id)) + ' · ' + t('bill.nextDue', { d: fmtDate(due, LANG) }) + ' · ' + fmtMoney(b.amount, LANG) + '</div></div>' +
        '<span class="badge soft">' + t('tmpl.ccbillBadge') + '</span>' +
        '<button class="row-action" data-action="edit-bill" data-id="' + b.id + '">' + icon('edit') + '</button>' +
        '<button class="row-action" data-action="del-bill" data-id="' + b.id + '">' + icon('trash') + '</button>' +
        '</div>';
    }));
    const html =
      '<div class="seg" style="margin-bottom:14px">' +
      '<button class="seg-btn' + (seg === 'bills' ? ' active' : '') + '" data-action="tmpl-seg" data-seg="bills">' + t('tmpl.segBills') + '</button>' +
      '<button class="seg-btn' + (seg === 'income' ? ' active' : '') + '" data-action="tmpl-seg" data-seg="income">' + t('tmpl.segIncome') + '</button>' +
      '</div>' +
      '<p style="color:var(--muted);font-size:13.5px;margin-bottom:12px">' + (seg === 'income' ? t('tmpl.subtitleIncome') : t('tmpl.subtitle')) + '</p>' +
      '<button class="btn btn-dash btn-block" data-action="open-tmpl" data-seg="' + seg + '" style="margin-bottom:12px">' + icon('plus') + (seg === 'income' ? t('tmpl.addIncome') : t('tmpl.add')) + '</button>' +
      (rows.length ?
        '<div class="card" style="padding:6px 14px">' + rows.join('') + '</div>' :
        '<div class="empty">' + icon(seg === 'income' ? 'income' : 'calendar') + '<b>' + (seg === 'income' ? t('tmpl.emptyIncome') : t('tmpl.empty')) + '</b><p>' + (seg === 'income' ? t('tmpl.emptyIncomeHint') : t('tmpl.emptyHint')) + '</p></div>');
    $('#view').innerHTML = html;
  }

  function openTemplateModal(id, seg) {
    const tp = id ? state.data.templates.find(function (x) { return x.id === id; }) : null;
    const income = tp ? (tp.type || 'exp') === 'inc' : (seg || state.tmplSeg) === 'income';
    const defKind = tp ? (income ? (tp.kind === 'once' ? 'once' : 'fixed') : (tp.kind === 'variable' || tp.kind === 'cccomp' ? tp.kind : 'fixed')) : 'fixed';
    const defAmount = tp && tp.amount != null ? String(tp.amount).replace('.', ',') : '';
    const banks = state.data.banks || [];
    const cards = banks.filter(function (x) { return x.invoice_day; });
    const allOpts = '<option value="">—</option>' + banks.map(function (x) { return '<option value="' + x.id + '"' + (tp && tp.bank_id === x.id ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('');
    const cardOpts = cards.map(function (x) { return '<option value="' + x.id + '"' + (tp && tp.bank_id === x.id ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('');
    openModal({
      title: tp ? (income ? t('tmpl.editIncome') : t('tmpl.edit')) : (income ? t('tmpl.addIncome') : t('tmpl.add')),
      body:
        '<input type="hidden" id="m-tseg" value="' + (income ? 'inc' : 'exp') + '">' +
        '<div class="field" id="f-tname"><label class="field-label">' + (income ? t('tmpl.name') : t('tmpl.name')) + '</label><input class="input" id="m-tname" value="' + esc(tp ? tp.name : '') + '" placeholder="' + esc(t('tmpl.name')) + '"></div>' +
        '<div class="field"><label class="field-label">' + t('tmpl.type') + '</label><select class="input" id="m-tkind">' +
        (income ?
          '<option value="fixed"' + (defKind === 'fixed' ? ' selected' : '') + '>' + t('tmpl.incomeFixed') + '</option>' +
          '<option value="once"' + (defKind === 'once' ? ' selected' : '') + '>' + t('tmpl.incomeOnce') + '</option>' :
          '<option value="fixed"' + (defKind === 'fixed' ? ' selected' : '') + '>' + t('tmpl.fixed') + '</option>' +
          '<option value="variable"' + (defKind === 'variable' ? ' selected' : '') + '>' + t('tmpl.variable') + '</option>' +
          '<option value="cccomp"' + (defKind === 'cccomp' ? ' selected' : '') + '>' + t('tmpl.kindComposition') + '</option>' +
          '<option value="ccbill"' + (defKind === 'ccbill' ? ' selected' : '') + '>' + t('tmpl.kindCardBill') + '</option>') +
        '</select></div>' +
        '<div class="field" id="f-tamount"><label class="field-label" id="f-tamount-label">' + t('tmpl.amount') + '</label><input class="input" id="m-tamount" inputmode="decimal" value="' + esc(defAmount) + '">' +
        '<small id="f-tamount-hint" style="color:var(--faint);font-size:11.5px">' + t('tmpl.amountHint') + '</small></div>' +
        '<div class="field" id="f-cccalc" style="display:none;padding:10px 12px;background:var(--card2,#0f172a);border-radius:10px"></div>' +
        '<div class="field" id="f-tcat"><label class="field-label">' + t('tx.category') + '</label><select class="input" id="m-tcat">' +
        sortedCats(income ? CATS_INCOME : CATS_EXPENSE).map(function (c) { return '<option value="' + c + '"' + (tp && tp.category === c ? ' selected' : '') + '>' + t(c) + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="field" id="f-tbank"><label class="field-label" id="f-tbank-label">' + t('tx.bank') + '</label><select class="input" id="m-tbank">' + allOpts + '</select></div>' +
        '<div class="field" id="f-tday"><label class="field-label">' + (income ? t('tmpl.incomeDueDay') : t('tmpl.dueDay')) + '</label><input class="input" id="m-tday" type="number" min="1" max="31" value="' + (tp ? (Number(tp.due_day) || 1) : 5) + '"></div>' +
        '<div class="field hidden" id="f-tdate"><label class="field-label">' + t('tmpl.incomeDueDate') + '</label><input class="input" id="m-tdate" type="date" value="' + todayISO() + '"></div>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-soft" data-action="close-modal">' + t('common.cancel') + '</button>' +
        '<button class="btn btn-primary" data-action="save-tmpl"' + (id ? ' data-id="' + id + '"' : '') + '>' + t('common.save') + '</button>' +
        '</div>',
      onOpen: function (m) {
        const bankSel = m.querySelector('#m-tbank');
        const calcCc = function () {
          const bankId = bankSel.value;
          const amt = parseAmount(m.querySelector('#m-tamount').value);
          const subs = (state.data.templates || []).filter(function (x) { return x.active && x.kind === 'cccomp' && x.bank_id === bankId; })
            .reduce(function (a, x) { return a + (Number(x.amount) || 0); }, 0);
          const eff = Math.max(0, (amt == null ? 0 : amt) - subs);
          m.querySelector('#f-cccalc').innerHTML = '<small style="color:var(--faint);font-size:11.5px">' + t('tmpl.ccbillHint') + '</small>' +
            '<div style="margin-top:8px;font-size:13px">' + t('tmpl.ccbillSubs') + ': <b>' + fmtMoney(subs, LANG) + '</b><br>' +
            t('tmpl.ccbillEffective') + ': <b>' + fmtMoney(eff, LANG) + '</b></div>';
        };
        const toggle = function () {
          const kind = m.querySelector('#m-tkind').value;
          const isInc = m.querySelector('#m-tseg').value === 'inc';
          if (isInc) {
            const fixed = kind === 'fixed';
            ['#f-tamount', '#f-tcat', '#f-tbank'].forEach(function (sel) {
              m.querySelector(sel).classList.toggle('hidden', false);
            });
            m.querySelector('#f-tday').classList.toggle('hidden', isInc && !fixed);
            m.querySelector('#f-tdate').classList.toggle('hidden', !(isInc && !fixed));
            m.querySelector('#f-cccalc').style.display = 'none';
            m.querySelector('#f-tamount-hint').style.display = '';
            m.querySelector('#f-tamount-hint').textContent = t('tmpl.incAmountHint');
            return;
          }
          m.querySelector('#f-tname').classList.toggle('hidden', kind === 'ccbill');
          m.querySelector('#f-tamount').classList.toggle('hidden', kind === 'variable');
          m.querySelector('#f-tcat').classList.toggle('hidden', kind === 'ccbill');
          m.querySelector('#f-tday').classList.toggle('hidden', kind === 'cccomp' || kind === 'ccbill');
          m.querySelector('#f-tbank-label').textContent = kind === 'ccbill' ? t('tmpl.ccbillBank') : t('tx.bank');
          m.querySelector('#f-tamount-label').textContent = kind === 'ccbill' ? t('tmpl.ccbillAmount') : t('tmpl.amount');
          const hint = m.querySelector('#f-tamount-hint');
          const calc = m.querySelector('#f-cccalc');
          if (kind === 'ccbill') {
            hint.style.display = 'none';
            calc.style.display = 'block';
            bankSel.innerHTML = cardOpts;
            calcCc();
          } else {
            hint.style.display = '';
            hint.textContent = kind === 'cccomp' ? t('tmpl.cccompHint') : t('tmpl.amountHint');
            calc.style.display = 'none';
            bankSel.innerHTML = allOpts;
            if (kind === 'cccomp' && !bankSel.value) bankSel.value = (cards.length ? cards[0].id : (banks.length ? banks[0].id : ''));
          }
        };
        m.querySelector('#m-tkind').addEventListener('change', toggle);
        bankSel.addEventListener('change', function () {
          if (m.querySelector('#m-tkind').value === 'ccbill') calcCc();
        });
        m.querySelector('#m-tamount').addEventListener('input', function () {
          if (m.querySelector('#m-tkind').value === 'ccbill') calcCc();
        });
        toggle();
      }
    });
  }

  async function saveTemplate(id) {
    const tp = id ? state.data.templates.find(function (x) { return x.id === id; }) : null;
    const name = $('#m-tname').value.trim();
    const kind = $('#m-tkind').value;
    const seg = $('#m-tseg').value === 'inc' ? 'inc' : 'exp';
    const cat = $('#m-tcat').value;
    const bank = $('#m-tbank').value;
    let amount = null;
    if (kind === 'fixed' || kind === 'cccomp' || kind === 'ccbill' || (seg === 'inc' && kind === 'once')) {
      const a = parseAmount($('#m-tamount').value);
      if (a === null) { toast(t('imp.parseError'), 'err'); return; }
      amount = Math.abs(a);
    }
    if (seg === 'inc' && kind === 'once') {
      const date = $('#m-tdate').value;
      if (!name || !date || amount === null) { toast(t('imp.parseError'), 'err'); return; }
      const ok = await handleMutation(function () {
        return dbInsert('bills', {
          name: name, amount: amount, kind: 'once', due_day: null, due_date: date,
          category: cat || null, bank_id: bank || null, active: true, type: 'inc', template_id: null
        });
      });
      if (ok) { closeModal(); toast(t('tmpl.savedIncome'), 'ok'); go('bills'); }
      return;
    }
    if (seg === 'exp' && kind === 'ccbill') {
      const card = (state.data.banks || []).find(function (x) { return x.id === bank && x.invoice_day; });
      if (!card || amount === null || amount <= 0) { toast(t('imp.parseError'), 'err'); return; }
      const subs = (state.data.templates || []).filter(function (x) { return x.active && x.kind === 'cccomp' && x.bank_id === bank; })
        .reduce(function (s, x) { return s + (Number(x.amount) || 0); }, 0);
      const eff = Math.max(0, amount - subs);
      const ok = await handleMutation(function () {
        return dbInsert('bills', {
          name: t('tmpl.ccbillName', { bank: card.name }), amount: eff, kind: 'ccbill', due_day: null,
          due_date: nextDueDate(card.invoice_day, new Date()),
          category: 'cat.card', bank_id: bank, active: true, type: 'exp', template_id: null
        });
      });
      if (ok) { closeModal(); toast(t('tmpl.savedCcbill'), 'ok'); }
      return;
    }
    let day;
    if (kind === 'cccomp') {
      const bankRow = (state.data.banks || []).find(function (x) { return x.id === bank; });
      if (!name || !bank || amount === null || amount <= 0) { toast(t('imp.parseError'), 'err'); return; }
      day = (bankRow && bankRow.invoice_day) ? Number(bankRow.invoice_day) : 1;
    } else {
      day = parseInt($('#m-tday').value, 10);
      if (!name || !day || day < 1 || day > 31) { toast(t('imp.parseError'), 'err'); return; }
    }
    const row = { name: name, kind: kind, amount: amount, due_day: day, category: cat || null, bank_id: bank || null, active: true, type: seg };
    const ok = await handleMutation(function () {
      if (id) return dbUpdate('bill_templates', id, row);
      return dbInsert('bill_templates', row);
    });
    if (ok) { closeModal(); toast(seg === 'inc' ? t('tmpl.savedIncome') : t('tmpl.saved'), 'ok'); }
  }



  function renderStatement() {
    const mk = state.extratoMonth || monthKeyFromISO(todayISO());
    const rows = (state.data.payments || []).map(function (p) {
      const b = (state.data.bills || []).find(function (x) { return x.id === p.bill_id; });
      return b ? { p: p, b: b, inc: (b.type || 'exp') === 'inc' } : null;
    }).filter(Boolean)
      .filter(function (r) { return monthKeyFromISO(r.p.paid_at) === mk; })
      .sort(function (a, b) { return a.p.paid_at === b.p.paid_at ? 0 : (a.p.paid_at < b.p.paid_at ? -1 : 1); });
    let paidTotal = 0, recvTotal = 0;
    rows.forEach(function (r) {
      const v = Math.abs(Number(r.p.amount) || 0);
      if (r.inc) recvTotal += v; else paidTotal += v;
    });
    const bal = recvTotal - paidTotal;
    let body = '';
    let cur = null;
    rows.forEach(function (r) {
      if (r.p.paid_at !== cur) {
        cur = r.p.paid_at;
        const dt = new Date(Number(cur.slice(0, 4)), Number(cur.slice(5, 7)) - 1, Number(cur.slice(8, 10)));
        const wd = dt.toLocaleDateString(LANG === 'en' ? 'en-US' : 'pt-BR', { weekday: 'long' });
        body += '<div class="stmt-day">' + esc(wd) + ' · ' + fmtDate(cur, LANG) + '</div>';
      }
      body += '<div class="stmt-row">' +
        '<span class="row-ico ' + (r.inc ? 'inc' : 'exp') + '">' + icon(catIconKey(r.b.category || 'cat.other')) + '</span>' +
        '<div class="row-main"><div class="row-title">' + esc(r.b.name) + '</div>' +
        '<div class="row-sub">' + catName(r.b.category) + '</div></div>' +
        '<div class="row-end"><div class="row-amount' + (r.inc ? ' inc' : '') + '">' + (r.inc ? '+' : '-') + fmtMoney(Math.abs(Number(r.p.amount) || 0), LANG) + '</div></div>' +
        '</div>';
    });
const html =
      '<p style="color:var(--muted);font-size:13.5px;margin-bottom:12px">' + t('bills.statementHint') + '</p>' +
      '<div class="stmt-month"><label class="field-label">' + t('bills.month') + '</label><input class="input" type="month" id="bills-month" value="' + mk + '"></div>' +
      '<div class="stmt-sum">' +
      '<div class="stat"><div class="stat-label">' + t('bills.paidTotal') + '</div><div class="stat-value sm">' + fmtMoney(paidTotal, LANG) + '</div></div>' +
      '<div class="stat"><div class="stat-label">' + t('bills.receivedTotal') + '</div><div class="stat-value sm inc">' + fmtMoney(recvTotal, LANG) + '</div></div>' +
      '<div class="stat ' + (bal < 0 ? 'hot' : 'good') + '"><div class="stat-label">' + t('bills.monthBalance') + '</div><div class="stat-value sm">' + (bal < 0 ? '-' : '+') + fmtMoney(Math.abs(bal), LANG) + '</div></div>' +
      '</div>' +
      (rows.length ?
        '<div class="card" style="padding:6px 14px">' + body + '</div>' :
        '<div class="empty">' + icon('bills') + '<b>' + t('bills.stmtEmpty') + '</b><p>' + t('bills.stmtEmptyHint') + '</p></div>');
    $('#view').innerHTML = html;
  }

function renderBills() {
    renderStatement();
  }

function renderBillRow(b, dueOverride) {
    const inc = (b.type || 'exp') === 'inc';
    const now = new Date();
    const today = todayISO();
    const due = dueOverride || billDueDate(b, now);
    const mk = monthKeyFromISO(due);
    const paid = (state.data.payments || []).some(function (p) { return p.bill_id === b.id && p.month === mk; });
const d = diffDays(due, today);
    let status, statusKey;
    if (paid) { status = 'paid'; statusKey = inc ? t('bill.received') : t('bill.paid'); }
    else if (d < 0) { status = 'overdue'; statusKey = t('bill.overdue'); }
    else { status = 'pending'; statusKey = t('bill.pending'); }
const markLabel = inc ? t('bill.markReceived') : t('bill.markPaid');
    const dueLabel = d < 0
      ? (b.kind === 'once' ? t('bill.onceDate', { d: fmtDate(due, LANG) }) : fmtDate(due, LANG))
      : (b.kind === 'once' ? t('bill.onceDate', { d: fmtDate(due, LANG) }) : t('bill.nextDue', { d: fmtDate(due, LANG) }));
    return '<div class="list-row" style="padding:12px 0 10px">' +
      '<span class="row-ico ' + (status === 'overdue' ? 'exp' : status === 'paid' ? 'inc' : '') + '">' + icon(catIconKey(b.category || 'cat.other')) + '</span>' +
      '<div class="row-main"><div class="row-title">' + esc(b.name) + '</div>' +
      '<div class="row-sub">' + (b.kind === 'ccbill' ? esc(bankName(b.bank_id)) + ' · ' : '') + catName(b.category) + ' · ' + dueLabel + '</div></div>' +
      '<div class="row-end"><div class="row-amount' + (inc ? ' inc' : '') + '">' + (inc ? '+' : '') + fmtMoney(b.amount, LANG) + '<small style="color:var(--faint)">' + (b.kind === 'once' ? t('bill.once') : b.kind === 'ccbill' ? t('bill.ccbillShort') : t('bill.monthly')) + '</small></div>' +
      '<span class="bill-status ' + status + '">' + (status === 'paid' ? icon('check') : '') + statusKey + '</span></div>' +
      '</div>' +
      '<div class="row-actions">' +
      (paid ?
        '<button class="act-btn" data-action="undo-paid" data-id="' + b.id + '" data-due="' + due + '">' + t('bill.undoPaid') + '</button>' :
        '<button class="act-btn primary" data-action="mark-paid" data-id="' + b.id + '" data-due="' + due + '">' + markLabel + '</button>') +
      '<button class="act-btn" data-action="edit-bill" data-id="' + b.id + '">' + t('common.edit') + '</button>' +
      '<button class="act-btn danger" data-action="del-bill" data-id="' + b.id + '">' + icon('trash') + '</button>' +
      '</div>';
  }

  function openBillModal(id) {
    const b = id ? state.data.bills.find(function (x) { return x.id === id; }) : null;
    const monthly = b && b.kind === 'monthly';
    const inc = b && (b.type || 'exp') === 'inc';
    openModal({
      title: b ? (inc ? t('bill.editIncome') : t('bill.edit')) : t('bill.add'),
      body:
        '<div class="field"><label class="field-label">' + t('bill.name') + '</label><input class="input" id="m-bname" value="' + esc(b ? b.name : '') + '"></div>' +
        '<div class="field" style="margin-top:-4px">' +
        (monthly ?
          '<small style="color:var(--faint)">' + t('bill.monthly') + ' · ' + t('tmpl.dayLabel', { d: Number(b.due_day) || 1 }) + '</small>' :
          '<small style="color:var(--faint)">' + t('bill.kindOnceNote') + '</small>') +
        '</div>' +
        '<div class="field-grid">' +
        '<div class="field"><label class="field-label">' + t('bill.amount') + '</label><input class="input" id="m-bamount" inputmode="decimal" value="' + (b ? String(b.amount).replace('.', ',') : '') + '"></div>' +
        (monthly ? '' :
          '<div class="field"><label class="field-label">' + t('bill.dueDate') + '</label><input class="input" id="m-bdate" type="date" value="' + (b && b.due_date ? b.due_date : todayISO()) + '"></div>') +
        '</div>' +
        '<div class="field"><label class="field-label">' + t('tx.category') + '</label><select class="input" id="m-bcat">' +
        sortedCats(inc ? CATS_INCOME : CATS_EXPENSE).map(function (c) { return '<option value="' + c + '"' + (b && b.category === c ? ' selected' : '') + '>' + t(c) + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="field"><label class="field-label">' + t('tx.bank') + '</label><select class="input" id="m-bbank">' +
        '<option value="">—</option>' +
        state.data.banks.map(function (x) { return '<option value="' + x.id + '"' + (b && b.bank_id === x.id ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-soft" data-action="close-modal">' + t('common.cancel') + '</button>' +
        '<button class="btn btn-primary" data-action="save-bill"' + (id ? ' data-id="' + id + '"' : '') + '>' + t('common.save') + '</button>' +
        '</div>'
    });
  }

  async function saveBill(id) {
    const b = id ? state.data.bills.find(function (x) { return x.id === id; }) : null;
    const monthly = b && b.kind === 'monthly';
    const name = $('#m-bname').value.trim();
    const amount = parseAmount($('#m-bamount').value);
    const cat = $('#m-bcat').value;
    const bank = $('#m-bbank').value;
    if (!name || amount === null) { toast(t('imp.parseError'), 'err'); return; }
    let row;
    if (monthly) {
      row = { name: name, amount: Math.abs(amount), kind: 'monthly', due_day: Number(b.due_day) || 1, due_date: null, category: cat, bank_id: bank || null, active: true };
    } else {
      const date = $('#m-bdate').value;
      if (!date) { toast(t('imp.parseError'), 'err'); return; }
      row = { name: name, amount: Math.abs(amount), kind: b && b.kind === 'ccbill' ? 'ccbill' : 'once', due_day: null, due_date: date, category: cat, bank_id: bank || null, active: true };
    }
    const ok = await handleMutation(function () {
      if (id) return dbUpdate('bills', id, row);
      return dbInsert('bills', row);
    });
    if (ok) { closeModal(); toast(t('bill.saved'), 'ok'); }
  }

function markPaidFlow(id, due) {
    const b = state.data.bills.find(function (x) { return x.id === id; });
    if (!b) return;
    const inc = (b.type || 'exp') === 'inc';
    const now = new Date();
    const ref = due || monthDueDate(b, now);
    const mk = monthKeyFromISO(ref);
    const needsValue = !b.amount;
    openModal({
      title: inc ? t('bill.markReceivedTitle') : t('bill.markPaidTitle'),
      body: '<p style="font-size:14px;color:var(--muted)">' + t('bill.markPaidHint', { n: esc(b.name), m: esc(monthLabel(mk, LANG)) }) + '</p>' +
        '<div class="field" style="margin-top:12px"><label class="field-label">' + t('bill.amount') + '</label><input class="input" id="m-pamount" inputmode="decimal" value="' + (needsValue ? '' : String(b.amount).replace('.', ',')) + '"></div>' +
        (needsValue ? '<small style="color:var(--faint);font-size:11.5px">' + t('bill.amountRequiredHint') + '</small>' : '') +
        '<div class="modal-actions">' +
        '<button class="btn btn-soft" data-action="close-modal">' + t('common.cancel') + '</button>' +
        '<button class="btn btn-primary" data-action="confirm-paid" data-id="' + id + '" data-due="' + ref + '">' + (inc ? t('bill.markReceived') : t('bill.markPaid')) + '</button></div>'
    });
  }

  async function confirmPaid(id, due) {
    const b = state.data.bills.find(function (x) { return x.id === id; });
    if (!b) return;
    const amt = parseAmount($('#m-pamount').value);
    if (amt === null || amt <= 0) { toast(t('bill.amountRequired'), 'err'); return; }
    const now = new Date();
    const ref = due || monthDueDate(b, now);
    const mk = monthKeyFromISO(ref);
    const paid = Math.abs(amt);
const ok = await handleMutation(async function () {
      await dbUpsert('bill_payments', { bill_id: id, month: mk, amount: paid, paid_at: todayISO() }, 'bill_id,month');
      if (!b.amount) await dbUpdate('bills', id, { amount: paid });
      const inc = (b.type || 'exp') === 'inc';
      const cur = Number(state.data.settings.cash_balance) || 0;
      await dbUpsert('settings', { key: 'cash_balance', value: inc ? cur + paid : cur - paid }, 'key');
    });
    if (ok) { closeModal(); toast((b.type || 'exp') === 'inc' ? t('bill.receivedMsg') : t('bill.paidMsg'), 'ok'); }
  }

  async function undoPaid(id, due) {
    const now = new Date();
    const b = state.data.bills.find(function (x) { return x.id === id; });
    if (!b) return;
const ref = due || monthDueDate(b, now);
    const mk = monthKeyFromISO(ref);
    const pay = state.data.payments.find(function (p) { return p.bill_id === id && p.month === mk; });
    if (!pay) return;
    const ok = await handleMutation(async function () {
      await dbDelete('bill_payments', pay.id);
      const inc = (b.type || 'exp') === 'inc';
      const cur = Number(state.data.settings.cash_balance) || 0;
      const amt = Math.abs(Number(pay.amount) || 0);
      await dbUpsert('settings', { key: 'cash_balance', value: inc ? cur - amt : cur + amt }, 'key');
    });
    if (ok) toast(t('bill.unpaidMsg'), 'ok');
  }

function renderBanks() {
    const banks = state.data.banks || [];
    const html =
      '<button class="btn btn-dash btn-block" data-action="open-bank" style="margin-bottom:12px">' + icon('plus') + t('bank.add') + '</button>' +
      (banks.length ?
        '<div class="card" style="padding:6px 14px">' +
        banks.map(function (b) {
          const debt = Number(b.debt) || 0;
          const bal = Number(b.balance) || 0;
          return '<div class="list-row">' +
            '<span class="bank-dot" style="background:' + (b.color || '#10b981') + '">' + esc(b.name.slice(0, 1).toUpperCase()) + '</span>' +
            '<div class="row-main"><div class="row-title">' + esc(b.name) + '</div>' +
            '<div class="row-sub">' + bankKindLabel(b.kind) +
            (b.invoice_day ? ' · ' + t('bank.invoiceOn', { d: b.invoice_day }) : '') + '</div></div>' +
            '<div class="row-end"><b class="row-amount">' + fmtMoney(b.kind === 'credit' ? -debt : bal, LANG) + '</b>' +
            '<small style="color:var(--faint)">' + (b.kind === 'credit' ? t('bank.debtLabel') : t('bank.balanceLabel')) + '</small></div>' +
            '<button class="row-action" data-action="edit-bank" data-id="' + b.id + '">' + icon('edit') + '</button>' +
            '</div>';
        }).join('') + '</div>' :
        '<div class="empty">' + icon('bank') + '<b>' + t('bank.noBanks') + '</b><p>' + t('bank.noBanksHint') + '</p></div>');
    $('#view').innerHTML = html;
  }

  function openBankModal(id) {
    const b = id ? state.data.banks.find(function (x) { return x.id === id; }) : null;
    openModal({
      title: b ? t('bank.edit') : t('bank.add'),
      body:
        '<div class="field"><label class="field-label">' + t('bank.name') + '</label><input class="input" id="m-bankname" value="' + esc(b ? b.name : '') + '"></div>' +
        '<div class="field"><label class="field-label">' + t('bank.kind') + '</label><select class="input" id="m-bankkind">' +
        '<option value="credit"' + (b && b.kind === 'credit' ? ' selected' : !b ? ' selected' : '') + '>' + t('bank.credit') + '</option>' +
        '<option value="debit"' + (b && b.kind === 'debit' ? ' selected' : '') + '>' + t('bank.debit') + '</option>' +
        '<option value="invest"' + (b && b.kind === 'invest' ? ' selected' : '') + '>' + t('bank.invest') + '</option>' +
        '</select></div>' +
        '<div class="field-grid">' +
        '<div class="field"><label class="field-label">' + t('bank.balance') + '</label><input class="input" id="m-bankbal" inputmode="decimal" value="' + (b ? String(b.balance || 0).replace('.', ',') : '') + '"></div>' +
        '<div class="field"><label class="field-label">' + t('bank.debt') + ' <small style="color:var(--faint)">(' + t('bank.debtHint') + ')</small></label><input class="input" id="m-bankdebt" inputmode="decimal" value="' + (b ? String(b.debt || 0).replace('.', ',') : '') + '"></div>' +
        '</div>' +
        '<div class="field"><label class="field-label">' + t('bank.invoiceDay') + '</label><select class="input" id="m-bankday">' +
        '<option value="">' + t('bank.noDay') + '</option>' +
        Array.from({ length: 31 }, function (_, i) {
          const d = i + 1;
          return '<option value="' + d + '"' + (b && Number(b.invoice_day) === d ? ' selected' : '') + '>' + d + ' ' + t('bank.day') + '</option>';
        }).join('') +
        '</select></div>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-soft" data-action="close-modal">' + t('common.cancel') + '</button>' +
        '<button class="btn btn-primary" data-action="save-bank"' + (id ? ' data-id="' + id + '"' : '') + '>' + t('common.save') + '</button>' +
        '</div>'
    });
  }

  async function saveBank(id) {
    const name = $('#m-bankname').value.trim();
    if (!name) { toast(t('imp.parseError'), 'err'); return; }
    const row = {
      name: name,
      kind: $('#m-bankkind').value,
      balance: parseAmount($('#m-bankbal').value) || 0,
      debt: parseAmount($('#m-bankdebt').value) || 0,
      invoice_day: $('#m-bankday').value ? parseInt($('#m-bankday').value, 10) : null,
      color: id ? (state.bankMap[id] || {}).color : BANK_COLORS[state.data.banks.length % BANK_COLORS.length]
    };
    const ok = await handleMutation(function () {
      if (id) return dbUpdate('banks', id, row);
      return dbInsert('banks', row);
    });
    if (ok) { closeModal(); toast(t('bank.saved'), 'ok'); }
  }

  function renderMerchants() {
    const merchants = groupMerchants(state.data.tx);
    const f = state.merchFilter;
    let list = merchants;
    if (f.pendingOnly) list = list.filter(function (m) { return !state.aliasesMap[normalizeName(m.raw)]; });
    if (f.q) {
      const q = normalizeName(f.q);
      list = list.filter(function (m) { return normalizeName(m.raw).indexOf(q) > -1; });
    }
    const pending = merchants.filter(function (m) { return !state.aliasesMap[normalizeName(m.raw)]; }).length;
    const html =
      '<p style="color:var(--muted);font-size:13.5px;margin-bottom:12px">' + t('mer.subtitle') + '</p>' +
      '<div class="chip-row">' +
      '<button class="chip' + (!f.pendingOnly ? ' active' : '') + '" data-action="merch-pending" data-value="0">' + t('mer.title') + ' (' + merchants.length + ')</button>' +
      '<button class="chip' + (f.pendingOnly ? ' active' : '') + '" data-action="merch-pending" data-value="1">' + t('mer.onlyPending') + ' (' + pending + ')</button>' +
      '</div>' +
      '<div class="field"><input class="input" id="merch-search" type="search" placeholder="' + t('mer.search') + '" value="' + esc(f.q) + '"></div>' +
      (list.length ?
        '<div class="card" style="padding:6px 14px">' +
        list.map(function (m) {
          const has = !!state.aliasesMap[normalizeName(m.raw)];
          return '<div class="merchant-row">' +
            '<span class="merch-ico">' + esc((m.raw || '?').slice(0, 1).toUpperCase()) + '</span>' +
            '<div class="merch-main">' +
            '<div class="row-title">' + (has ? esc(state.aliasesMap[normalizeName(m.raw)]) : esc(m.raw)) + '</div>' +
            '<div class="merch-raw">' + esc(m.raw) + '</div>' +
            '<div class="merch-alias" style="display:flex;gap:8px">' +
            '<input class="input" style="height:40px;flex:1;font-size:13px" data-alias-input="' + esc(m.raw) + '" placeholder="' + t('mer.renameTo') + '" value="' + esc(state.aliasesMap[normalizeName(m.raw)] || '') + '">' +
            '<button class="btn btn-sm btn-primary" data-action="save-alias" data-raw="' + esc(m.raw) + '">' + t('mer.save') + '</button>' +
            '</div></div>' +
            '<div class="merch-meta"><b>' + fmtMoney(m.total, LANG) + '</b>' +
            '<small>' + t('mer.countTx', { n: m.count }) + '</small></div>' +
            '</div>';
        }).join('') + '</div>' :
        '<div class="empty">' + icon('tag') + '<b>' + t('mer.empty') + '</b><p>' + t('mer.emptyHint') + '</p></div>');
    $('#view').innerHTML = html;
    const s = $('#merch-search');
    if (s) s.focus();
  }

  async function saveAlias(raw) {
    const input = document.querySelector('[data-alias-input="' + CSS.escape(raw) + '"]');
    const val = input ? input.value.trim() : '';
    if (!val) { toast(t('imp.parseError'), 'err'); return; }
    const k = normalizeName(raw);
    const ok = await handleMutation(function () {
      if (state.aliasesMap[k]) {
        return dbUpdate('aliases', state.data.aliases.find(function (a) { return normalizeName(a.raw_name) === k; }).id, { display_name: val });
      }
      return dbInsert('aliases', { raw_name: raw, display_name: val });
    });
    if (ok) toast(t('mer.saved'), 'ok');
  }

  function renderMore() {
    const html =
      '<div class="card"><div class="card-title">' + icon('bank') + t('bank.title') + '</div>' +
      '<p style="color:var(--muted);font-size:13px;margin-bottom:10px">' + t('bank.subtitle') + '</p>' +
      '<button class="btn btn-soft btn-block" data-action="go-banks">' + t('bank.title') + '</button></div>' +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('tag') + t('mer.title') + '</div>' +
      '<p style="color:var(--muted);font-size:13px;margin-bottom:10px">' + t('mer.subtitle') + '</p>' +
      '<button class="btn btn-soft btn-block" data-action="go-merchants">' + t('mer.title') + '</button></div>' +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('import') + t('imp.title') + '</div>' +
      '<p style="color:var(--muted);font-size:13px;margin-bottom:10px">' + t('imp.subtitle') + '</p>' +
      '<button class="btn btn-soft btn-block" data-action="go-import">' + t('imp.title') + '</button></div>' +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('more') + t('set.title') + '</div>' +
      '<button class="btn btn-soft btn-block" data-action="go-settings">' + t('set.title') + '</button></div>' +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('cloud') + t('set.sync') + '</div>' +
      '<div class="list-row"><div class="row-main"><div class="row-title">' +
      (state.setupNeeded ? t('set.needSetup') : t('set.connected')) + '</div></div>' +
      '<button class="btn btn-sm btn-soft" data-action="setup-retry">' + t('set.checkSync') + '</button></div></div>' +
      '<div class="section-gap"></div>' +
      '<button class="btn btn-danger-soft btn-block" data-action="logout">' + icon('logout') + t('set.logout') + '</button>' +
      '<p style="text-align:center;color:var(--faint);font-size:11.5px;margin-top:18px">' + t('set.about') + '</p>';
    $('#view').innerHTML = html;
  }

  function renderSettings() {
    const st = state.data.settings;
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    const html =
      '<div class="card"><div class="card-title">' + icon('theme') + t('set.title') + '</div>' +
      '<div class="set-row"><div class="set-info"><b>' + t('set.theme') + '</b><small>' + t('set.themeSub') + '</small></div>' +
      '<button class="toggle' + (dark ? ' on' : '') + '" data-action="toggle-theme" role="switch"></button></div>' +
      '<div class="set-row"><div class="set-info"><b>' + t('set.lang') + '</b><small>' + t('set.langSub') + '</small></div>' +
      '<button class="chip' + (LANG === 'pt' ? ' active' : '') + '" data-action="set-lang" data-lang="pt">PT</button>' +
      '<button class="chip' + (LANG === 'en' ? ' active' : '') + '" data-action="set-lang" data-lang="en">EN</button></div>' +
      '</div>' +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('cash') + t('set.cash') + '</div>' +
      '<div class="field"><input class="input" id="set-cash" inputmode="decimal" value="' + String(st.cash_balance || 0).replace('.', ',') + '"></div>' +
      '<div class="card-title" style="margin-top:14px">' + icon('target') + t('set.budget') + '</div>' +
      '<div class="field"><input class="input" id="set-budget" inputmode="decimal" value="' + String(st.monthly_budget || 0).replace('.', ',') + '"></div>' +
      '<p style="color:var(--muted);font-size:12px;margin-bottom:10px">' + t('set.budgetSub') + '</p>' +
      '<button class="btn btn-primary btn-block" data-action="save-settings">' + t('set.save') + '</button></div>' +
      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('download') + t('set.data') + '</div>' +
      '<button class="btn btn-soft btn-block" data-action="export-data">' + icon('download') + t('set.export') + '</button>' +
      '<p style="color:var(--faint);font-size:11.5px;margin-top:10px">' + t('set.deployNote') + '</p></div>';
    $('#view').innerHTML = html;
  }

  async function saveSettings() {
    const cash = parseAmount($('#set-cash').value);
    const budget = parseAmount($('#set-budget').value);
    const ok = await handleMutation(function () {
      return Promise.all([
        dbUpsert('settings', { key: 'cash_balance', value: cash === null ? 0 : cash }, 'key'),
        dbUpsert('settings', { key: 'monthly_budget', value: budget === null ? 0 : budget }, 'key')
      ]);
    });
    if (ok) toast(t('set.saved'), 'ok');
  }

  function exportData() {
    const payload = {
      exported_at: new Date().toISOString(),
      app: APP_NAME,
      banks: state.data.banks,
      transactions: state.data.tx,
      aliases: state.data.aliases,
      bills: state.data.bills,
      bill_templates: state.data.templates,
      bill_payments: state.data.payments,
      bank_payments: state.data.bankPayments,
      settings: state.data.settings
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'chaia-finance-backup-' + todayISO() + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast(t('set.export'), 'ok');
  }

  function setupHowTo() {
    openModal({
      title: t('setup.howto'),
      body:
        '<ol style="margin:0 0 14px 18px;font-size:14px;display:grid;gap:8px">' +
        '<li>' + t('setup.step1') + '</li>' +
        '<li>' + t('setup.step2') + '</li>' +
        '<li>' + t('setup.step3') + '</li>' +
        '<li>' + t('setup.step4') + '</li>' +
        '</ol>' +
        '<button class="btn btn-primary btn-block" data-action="setup-copy">' + t('setup.copy') + '</button>' +
        '<button class="btn btn-soft btn-block" data-action="setup-retry" style="margin-top:10px">' + t('setup.retry') + '</button>'
    });
  }

  function copyInstallSQL() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(INSTALL_SQL).then(function () {
        toast(t('setup.copied'), 'ok');
      }, function () { fallbackCopy(); });
    } else fallbackCopy();
  }

  function fallbackCopy() {
    const ta = document.createElement('textarea');
    ta.value = INSTALL_SQL;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast(t('setup.copied'), 'ok'); } catch (e) { }
    ta.remove();
  }

  function showLogin() {
    $('#screen-app').classList.add('hidden');
    $('#screen-login').classList.remove('hidden');
  }

  function enterApp() {
    $('#screen-login').classList.add('hidden');
    $('#screen-app').classList.remove('hidden');
    loadData(true);
  }

  async function doLogin(e) {
    e.preventDefault();
    const login = $('#login-user').value.trim().toLowerCase();
    const pass = $('#login-pass').value;
    const errEl = $('#login-error');
    errEl.textContent = '';
    if (!login || !pass) { failLogin(errEl); return; }
    const email = login.indexOf('@') > -1 ? login : login + AUTH_EMAIL_DOMAIN;
    const { data, error } = await supabaseSignIn(email, pass);
    if (error || !data.session) {
      if (isAuthError(error) || /invalid login credentials/i.test(String(error && error.message || ''))) {
        failLogin(errEl);
      } else {
        errEl.textContent = t('con.err.general') + (error && error.message ? ': ' + String(error.message).slice(0, 80) : '');
      }
      return;
    }
    state.user = { login: data.session.user.email || email, name: prettyName(data.session.user.email || email) };
    enterApp();
  }

  function failLogin(errEl) {
    errEl.textContent = t('login.error');
    const card = $('#login-form');
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }

  async function logout() {
    await supabaseSignOut();
    state.user = null;
    state.data = { banks: [], tx: [], aliases: [], bills: [], payments: [], bankPayments: [], settings: {} };
    buildAliasesMap();
    buildBankMap();
    showLogin();
  }

  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.getAttribute('data-action');
    const id = el.getAttribute('data-id');
    const val = el.getAttribute('data-value');
    switch (a) {
      case 'go': {
        go(el.getAttribute('data-view'));
        break;
      }
      case 'go-banks': go('banks'); break;
      case 'go-bills': go('bills'); break;
      case 'go-merchants': go('merchants'); break;
      case 'go-import': go('import'); break;
      case 'go-settings': go('settings'); break;
      case 'open-actions': $('#actions-sheet').classList.remove('hidden'); break;
      case 'close-actions': $('#actions-sheet').classList.add('hidden'); break;
      case 'open-tmpl': {
        const sh = $('#actions-sheet');
        if (sh) sh.classList.add('hidden');
        openTemplateModal(null, el.getAttribute('data-seg'));
        break;
      }
      case 'edit-tmpl': openTemplateModal(id); break;
case 'tmpl-seg': state.tmplSeg = el.getAttribute('data-seg') === 'income' ? 'income' : 'bills'; renderView(); break;
      case 'save-tmpl': saveTemplate(id); break;
      case 'del-tmpl': {
        const isInc = (state.data.templates.find(function (x) { return x.id === id; }) || {}).type === 'inc';
        confirmDialog(isInc ? t('tmpl.deletedIncome') : t('tmpl.deleted'), isInc ? t('tmpl.confirmDeleteIncome') : t('tmpl.confirmDelete'), function () {
          handleMutation(function () { return dbDelete('bill_templates', id); }).then(function (ok) {
            if (ok) toast(isInc ? t('tmpl.deletedIncome') : t('tmpl.deleted'), 'ok');
          });
        });
        break;
      }
      case 'open-tx': openTxModal(null); break;
      case 'edit-tx': openTxModal(id); break;
      case 'save-tx': saveTx(id); break;
      case 'del-tx': {
        confirmDialog(t('tx.delete'), t('tx.confirmDelete'), function () {
          handleMutation(function () { return dbDelete('transactions', id); }).then(function (ok) {
            if (ok) toast(t('tx.deleted'), 'ok');
          });
        });
        break;
      }
      case 'open-bank': openBankModal(null); break;
      case 'edit-bank': openBankModal(id); break;
      case 'save-bank': saveBank(id); break;
case 'open-bill': openBillModal(null); break;
      case 'edit-bill': openBillModal(id); break;
      case 'save-bill': saveBill(id); break;
      case 'del-bill': {
        confirmDialog(t('bill.delete'), t('bill.confirmDelete'), function () {
          handleMutation(function () { return dbDelete('bills', id); }).then(function (ok) {
            if (ok) toast(t('bill.deleted'), 'ok');
          });
        });
        break;
      }
case 'mark-paid': markPaidFlow(id, el.getAttribute('data-due') || null); break;
      case 'confirm-paid': confirmPaid(id, el.getAttribute('data-due') || null); break;
      case 'undo-paid': undoPaid(id, el.getAttribute('data-due') || null); break;
      case 'save-alias': saveAlias(el.getAttribute('data-raw')); break;
      case 'merch-pending': state.merchFilter.pendingOnly = val === '1'; renderMerchants(); break;
      case 'toggle-theme': {
        const cur = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
        savePrefs();
        if (window.__refreshParticles) window.__refreshParticles();
        if (state.view === 'settings') renderSettings();
        else renderView();
        break;
      }
      case 'toggle-lang': {
        setLang(LANG === 'pt' ? 'en' : 'pt');
        savePrefs();
        applyI18n();
        renderView();
        break;
      }
      case 'set-lang': setLang(el.getAttribute('data-lang')); savePrefs(); applyI18n(); renderSettings(); break;
      case 'toggle-pass': {
        const inp = $('#login-pass');
        inp.type = inp.type === 'password' ? 'text' : 'password';
        break;
      }
      case 'close-modal': closeModal(); break;
      case 'confirm-yes': break;
      case 'toggle-insights': state.insightsOpen = !state.insightsOpen; renderView(); break;
      case 'cancel-import': state.imp = null; renderImport(); break;
      case 'invert-signs': state.imp.invert = !state.imp.invert; refreshCSVPreview(); break;
      case 'do-import-csv': doImport(state.imp.entries || []); break;
      case 'do-import-pdf': doImport(state.imp.rows || []); break;
      case 'del-pdf-row': {
        const i = Number(el.getAttribute('data-idx'));
        state.imp.rows.splice(i, 1);
        renderImport();
        break;
      }
      case 'setup-copy': copyInstallSQL(); break;
      case 'setup-howto': setupHowTo(); break;
      case 'setup-retry': {
        state.setupNeeded = false;
        loadData(true);
        break;
      }
      case 'save-settings': saveSettings(); break;
      case 'export-data': exportData(); break;
      case 'logout': logout(); break;
    }
  });

  document.addEventListener('change', function (e) {
    if (e.target.getAttribute('data-map')) refreshCSVPreview();
    if (e.target.id === 'imp-bank') {
      const nv = $('#imp-new-bank');
      if (nv) nv.classList.toggle('hidden', e.target.value !== '__new__');
    }
    if (e.target.id === 'tx-month') { state.txFilters.month = e.target.value; renderTx(); }
    if (e.target.id === 'bills-month') { state.extratoMonth = e.target.value; renderStatement(); }
    if (e.target.getAttribute('data-field')) {
      const i = Number(e.target.getAttribute('data-idx'));
      const f = e.target.getAttribute('data-field');
      const row = state.imp.rows[i];
      if (!row) return;
      if (f === 'amount') { const v = parseAmount(e.target.value); if (v !== null) row.amount = Math.abs(v); }
      else if (f === 'type') row.type = e.target.value;
      else row[f] = e.target.value;
    }
  });

  document.addEventListener('input', debounce(function (e) {
    if (e.target.id === 'tx-search') {
      state.txFilters.q = e.target.value;
      renderTx();
      const s = $('#tx-search');
      if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
    }
    if (e.target.id === 'merch-search') { state.merchFilter.q = e.target.value; renderMerchants(); }
  }, 250));

  document.addEventListener('click', function (e) {
    const chip = e.target.closest('[data-action="txf-bank"]');
    const type = e.target.closest('[data-action="txf-type"]');
    if (chip) { state.txFilters.bank = chip.getAttribute('data-value'); renderTx(); }
    if (type) { state.txFilters.type = type.getAttribute('data-value'); renderTx(); }
  });

let lastVW = window.innerWidth;
window.addEventListener('resize', debounce(function () {
    const w = window.innerWidth;
    if (w === lastVW) return;
    lastVW = w;
    if (state.view === 'home') renderView();
  }, 200));

  async function boot() {
    loadPrefs();
    initParticles();
    $('#login-form').addEventListener('submit', doLogin);
    const u = await currentAuthUser();
    if (u) {
      state.user = u;
      enterApp();
    } else {
      showLogin();
    }
  }

  boot();
})();

