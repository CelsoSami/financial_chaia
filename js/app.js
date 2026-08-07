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
    data: { banks: [], tx: [], aliases: [], bills: [], payments: [], settings: {} },
    aliasesMap: {},
    bankMap: {},
    setupNeeded: false,
    loading: false,
    txFilters: { bank: 'all', month: 'all', type: 'all', q: '' },
    merchFilter: { q: '', pendingOnly: false },
    imp: null,
    importing: false,
    insightsOpen: false
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
    const map = { home: 'dash.insights', tx: 'tx.title', bills: 'bill.title', import: 'imp.title', more: 'set.title', banks: 'bank.title', merchants: 'mer.title', settings: 'set.title' };
    return t(map[state.view] || 'login.title');
  }

  function renderView() {
    const v = $('#view');
    v.classList.remove('view-enter');
    void v.offsetWidth;
    v.classList.add('view-enter');
    v.innerHTML = '';
    if (state.setupNeeded) renderSetupBanner();
    else $('#setup-banner').classList.add('hidden');
    if (state.view === 'home') renderHome();
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
        state.data = { banks: [], tx: [], aliases: [], bills: [], payments: [], settings: {} };
        buildAliasesMap();
        buildBankMap();
        setSync('err');
        renderView();
        return;
      }
      state.setupNeeded = false;
      const [banks, tx, aliases, bills, payments, settings] = await Promise.all([
        dbFetch('banks'), dbFetch('transactions'), dbFetch('aliases'), dbFetch('bills'), dbFetch('bill_payments'), dbFetch('settings')
      ]);
      const settingsObj = {};
      (settings || []).forEach(function (s) { settingsObj[s.key] = s.value; });
      state.data = {
        banks: sortBanksByName(banks),
        tx: (tx || []).sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }),
        aliases: aliases || [],
        bills: bills || [],
        payments: payments || [],
        settings: settingsObj
      };
      buildAliasesMap();
      buildBankMap();
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

  async function handleMutation(fn) {
    try {
      await fn();
      await reloadData();
      return true;
    } catch (e) {
      if (isPermissionError(e)) toast(t('set.needSetup'), 'err');
      else toast(t('con.err.general') + (e && e.message ? ': ' + String(e.message).slice(0, 90) : ''), 'err');
      return false;
    }
  }

  function countUp(el, target, fmtFn) {
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

  function todayExpenses() {
    const today = todayISO();
    return state.data.tx.filter(function (t) { return t.type === 'expense' && t.date === today; })
      .reduce(function (a, t) { return a + Math.abs(Number(t.amount) || 0); }, 0);
  }

  function monthStats() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth() + 1;
    const today = todayISO();
    const pending = {};
    (state.data.bills || []).forEach(function (b) {
      if (!b.active) return;
      const due = nextDueDate(b.due_day, now);
      const mk = monthKeyFromISO(due);
      const paid = (state.data.payments || []).some(function (p) { return p.bill_id === b.id && p.month === mk; });
      if (paid) return;
      if (isSameMonth(due, y, m)) pending[due] = (pending[due] || 0) + (Number(b.amount) || 0);
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
    return { cash: cash, totalDebt: totalDebt, dueMonth: dueMonth, overdue: overdue, monthSpend: monthSpend, monthIncome: monthIncome, y: y, m: m };
  }

  function computeAlerts(st) {
    const out = [];
    const now = new Date();
    const today = todayISO();
    (state.data.bills || []).forEach(function (b) {
      if (!b.active) return;
      const due = nextDueDate(b.due_day, now);
      const mk = monthKeyFromISO(due);
      const paid = (state.data.payments || []).some(function (p) { return p.bill_id === b.id && p.month === mk; });
      if (paid) return;
      const name = b.name;
      const d = diffDays(due, today);
      if (d < 0) out.push({ tone: 'danger', ic: 'alert', title: t('alert.overdue'), sub: name + ' — ' + fmtDate(due, LANG) });
      else if (d === 0) out.push({ tone: 'danger', ic: 'alert', title: t('alert.dueToday'), sub: name + ' — ' + fmtMoney(b.amount, LANG) });
      else if (d === 1) out.push({ tone: 'warn', ic: 'calendar', title: t('alert.dueTomorrow'), sub: name + ' — ' + fmtMoney(b.amount, LANG) });
      else if (d <= 3) out.push({ tone: 'warn', ic: 'calendar', title: t('alert.dueSoon', { n: d }), sub: name + ' — ' + fmtDate(due, LANG) });
    });
    (state.data.banks || []).forEach(function (b) {
      if (!b.invoice_day) return;
      const due = nextDueDate(b.invoice_day, now);
      const d = diffDays(due, today);
      if (d >= -3 && d <= 3 && (Number(b.debt) > 0 || b.kind === 'credit')) {
        out.push({
          tone: d < 0 ? 'danger' : 'warn', ic: 'card',
          title: t('alert.invoiceSoon') + ' · ' + b.name,
          sub: (d < 0 ? t('alert.overdue') + ' — ' : '') + fmtDate(due, LANG) + (Number(b.debt) > 0 ? ' · ' + fmtMoney(b.debt, LANG) : '')
        });
      }
    });
    if (st.cash < 0) out.push({ tone: 'danger', ic: 'cash', title: t('alert.cashNegative'), sub: fmtMoney(st.cash, LANG) });
    const budget = Number(state.data.settings.monthly_budget || 0);
    const spentToday = todayExpenses();
    if (budget > 0 && spentToday > budget / 30) out.push({ tone: 'warn', ic: 'target', title: t('alert.budgetExceeded'), sub: fmtMoney(spentToday, LANG) + ' / ' + fmtMoney(budget / 30, LANG) });
    return out.slice(0, 6);
  }

  function getStreak() {
    try { return JSON.parse(localStorage.getItem('fc_streak') || '{"date":"","count":0}'); } catch (e) { return { date: '', count: 0 }; }
  }

  function updateStreak() {
    const budget = Number(state.data.settings.monthly_budget || 0);
    const today = todayISO();
    let s = getStreak();
    if (budget <= 0) return s;
    const goal = budget / 30;
    const ok = todayExpenses() <= goal;
    if (s.date === today) return s;
    if (ok) {
      const yest = new Date();
      yest.setDate(yest.getDate() - 1);
      const yISO = isoFromParts(yest.getFullYear(), yest.getMonth() + 1, yest.getDate());
      s.count = s.date === yISO ? s.count + 1 : 1;
      s.date = today;
    } else {
      s = { date: today, count: 0 };
    }
    localStorage.setItem('fc_streak', JSON.stringify(s));
    return s;
  }

  function badgesEarned() {
    const st = monthStats();
    const earned = [];
    if (state.data.tx.length) earned.push('first-tx');
    if (state.data.tx.some(function (t) { return t.source === 'import' || t.source === 'pdf'; })) earned.push('first-import');
    if (state.data.banks.length) earned.push('first-bank');
    const streak = getStreak().count;
    if (streak >= 3) earned.push('on-track');
    if (state.data.banks.length && st.totalDebt === 0) earned.push('no-debt');
    if (st.monthSpend > 0 && st.cash >= st.monthSpend * 6) earned.push('investor');
    const aliased = (state.data.aliases || []).length;
    if (aliased >= 3) earned.push('organizer');
    return earned;
  }

  const BADGES = [
    { id: 'first-tx', ic: 'tx' }, { id: 'first-import', ic: 'import' }, { id: 'first-bank', ic: 'bank' },
    { id: 'on-track', ic: 'target' }, { id: 'no-debt', ic: 'shield' }, { id: 'investor', ic: 'invest' }, { id: 'organizer', ic: 'tag' }
  ];

  function renderHome() {
    const st = monthStats();
    const alerts = computeAlerts(st);
    const budget = Number(state.data.settings.monthly_budget || 0);
    const streak = updateStreak();
    const earned = badgesEarned();
    const insights = buildInsights({
      tx: state.data.tx, banks: state.data.banks, bills: state.data.bills,
      settings: state.data.settings, aliasesMap: state.aliasesMap
    });
    const hasData = state.data.tx.length > 0 || state.data.banks.length > 0;

    const html =
      '<div class="hero">' +
      '<div class="hero-top">' +
      '<div><div class="hero-greet">' + t('hello', { name: state.user ? state.user.name || state.user.login : '' }) + '</div>' +
      '<div class="hero-name">Chaia Finance</div></div>' +
      '<span class="badge soft">' + (LANG === 'en' ? 'BRL' : 'BRL') + '</span>' +
      '</div>' +
      '<div class="hero-cash"><div class="hero-cash-label">' + t('stat.cash') + '</div>' +
      '<div class="hero-cash-value" id="cash-count">' + fmtMoney(st.cash, LANG) + '</div></div>' +
      '<div class="hero-tags">' +
      (budget > 0 ? '<span class="badge good">' + t('dash.budget') + ': ' + fmtMoneyCompact(budget, LANG) + '</span>' : '') +
      '<span class="badge' + (streak.count > 0 ? ' good' : ' soft') + '">' + icon('target', 'mini') + ' ' + t('dash.streak') + ': ' + streak.count + '</span>' +
      '</div></div>' +

      '<div class="stat-grid">' +
      statCard('cash', t('stat.cash'), fmtMoney(st.cash, LANG), st.cash < 0 ? 'hot' : (st.cash > 0 ? 'good' : '')) +
      statCard('card', t('stat.debt'), fmtMoney(st.totalDebt, LANG), st.totalDebt > 0 ? 'warn' : 'good') +
      statCard('calendar', t('stat.dueMonth'), fmtMoney(st.dueMonth, LANG), st.dueMonth > 0 ? 'warn' : '') +
      statCard('alert', t('stat.overdue'), fmtMoney(st.overdue, LANG), st.overdue > 0 ? 'hot' : '') +
      '</div>' +

      '<div class="section-gap"></div>' +
      (alerts.length ? '<div class="card"><div class="card-title">' + icon('alert') + t('dash.alerts') + '</div>' +
        alerts.map(function (a) {
          return '<div class="alert-row ' + a.tone + '">' + icon(a.ic) +
            '<div><b>' + a.title + '</b><small>' + a.sub + '</small></div></div>';
        }).join('') + '</div>' :
        '<div class="card"><div class="card-title">' + icon('checkcircle') + t('dash.allGood') + '</div>' +
        '<p style="color:var(--muted);font-size:13px">' + t('dash.allGoodSub') + '</p></div>') +

      '<div class="section-gap"></div>' +
      '<div class="quick-grid">' +
      quickTile('plus', t('tx.add'), 'open-tx') +
      quickTile('import', t('sheet.import'), 'go-import') +
      quickTile('bank', t('bank.title'), 'go-banks') +
      quickTile('bills', t('bill.title'), 'go-bills') +
      quickTile('tag', t('mer.title'), 'go-merchants') +
      quickTile('settings', t('set.title'), 'go-settings') +
      '</div>' +

      '<div class="section-gap"></div>' +
      (hasData ?
        '<div class="card"><div class="card-title">' + icon('bank') + t('dash.bankList') + '</div>' + renderBankBalances() + '</div>' +
        '<div class="section-gap"></div>' +
        '<div class="card"><div class="card-title">' + icon('chart') + t('dash.flow') + '</div>' +
        '<div class="chart-wrap" style="height:150px"><canvas id="flow-chart"></canvas></div></div>' +
        '<div class="section-gap"></div>' +
        '<div class="card"><div class="card-title">' + icon('target') + t('dash.categories') + '</div>' +
        '<div class="chart-wrap"><canvas id="cat-chart"></canvas></div>' +
        '<div class="legend" id="cat-legend"></div></div>' +
        (budget > 0 ?
          '<div class="section-gap"></div>' +
          '<div class="card"><div class="card-title">' + icon('target') + t('dash.budget') + '</div>' +
          '<div class="ring-wrap"><div class="ring"><svg width="96" height="96" viewBox="0 0 96 96">' +
          '<circle cx="48" cy="48" r="40" fill="none" stroke="var(--card-2)" stroke-width="9"/>' +
          '<circle id="ring-progress" cx="48" cy="48" r="40" fill="none" stroke="url(#ringgrad)" stroke-width="9" stroke-linecap="round" stroke-dasharray="251.2" stroke-dashoffset="251.2" style="transition:stroke-dashoffset 1s var(--ease)"/>' +
          '<defs><linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#38bdf8"/></linearGradient></defs></svg>' +
          '<div class="ring-val" id="ring-val">0%</div></div>' +
          '<div class="ring-meta"><b>' + t('dash.spentToday') + '</b><br>' + fmtMoney(todayExpenses(), LANG) + ' ' + t('tx.of') + ' ' + fmtMoney(budget / 30, LANG) +
          '<br><br><span style="color:var(--muted)">' + t('dash.streak') + '</span><br><b>' + streak.count + ' ' + t('dash.days') + '</b></div></div></div>' : '') +
        '<div class="section-gap"></div>' :
        '<div class="empty">' + icon('coin') + '<b>' + t('dash.noData') + '</b><p>' + t('dash.noDataHint') + '</p></div>' +
        '<div class="section-gap"></div>') +

      '<div class="card"><div class="card-title">' + icon('spark') + t('dash.insights') + '</div>' +
      (insights.length ?
        insights.slice(0, state.insightsOpen ? insights.length : 3).map(function (ins) {
          return '<div class="insight-card"><div class="insight-ico ' + ins.tone + '">' + icon(ins.icon) + '</div>' +
            '<div><div class="insight-title">' + ins.title + '</div><div class="insight-body">' + ins.body + '</div></div></div>';
        }).join('') +
        (insights.length > 3 ? '<button class="btn btn-sm btn-soft btn-block" data-action="toggle-insights">' +
          (state.insightsOpen ? t('dash.less') : t('dash.more')) + '</button>' : '') :
        '<p style="color:var(--muted);font-size:13px">' + t('ins.nodataBody') + '</p>') +
      '</div>' +

      '<div class="section-gap"></div>' +
      '<div class="card"><div class="card-title">' + icon('coin') + t('dash.badges') + '</div>' +
      '<div class="badge-row">' +
      BADGES.map(function (b) {
        const got = earned.indexOf(b.id) > -1;
        return '<span class="badge-chip' + (got ? ' got' : '') + '">' + icon(b.ic) + t('badge.' + b.id) + '</span>';
      }).join('') +
      '</div></div>';

    $('#view').innerHTML = html;
    requestAnimationFrame(function () { drawHomeCharts(); });
    requestAnimationFrame(function () { animateRing(); });
    countUp($('#cash-count'), st.cash, function (v) { return fmtMoney(v, LANG); });
  }

  function statCard(ic, label, value, extra) {
    return '<div class="stat ' + (extra || '') + '">' +
      '<div class="stat-ico">' + icon(ic) + '</div>' +
      '<div class="stat-label">' + label + '</div>' +
      '<div class="stat-value">' + value + '</div></div>';
  }

  function quickTile(ic, label, action) {
    return '<button class="quick-tile" data-action="' + action + '">' + icon(ic) + '<span>' + label + '</span></button>';
  }

  function bankKindLabel(kind) {
    if (kind === 'credit') return t('bank.credit');
    if (kind === 'invest') return t('bank.invest');
    return t('bank.debit');
  }

  function renderBankBalances() {
    const banks = state.data.banks || [];
    if (!banks.length) return '<p style="color:var(--muted);font-size:13px">' + t('bank.noBanksHint') + '</p>';
    return banks.map(function (b) {
      const debt = Number(b.debt) || 0;
      const bal = Number(b.balance) || 0;
      const v = b.kind === 'credit' ? debt : bal;
      return '<div class="list-row">' +
        '<span class="bank-dot" style="background:' + (b.color || '#10b981') + '">' + esc(b.name.slice(0, 1).toUpperCase()) + '</span>' +
        '<div class="row-main"><div class="row-title">' + esc(b.name) + '</div>' +
        '<div class="row-sub">' + bankKindLabel(b.kind) +
        (b.invoice_day ? ' · ' + t('bank.invoiceOn', { d: b.invoice_day }) : '') + '</div></div>' +
        '<div class="row-end"><div class="row-amount' + (b.kind === 'credit' ? (debt > 0 ? '' : ' inc') : (bal < 0 ? '' : ' inc')) + '">' +
        fmtMoney(b.kind === 'credit' ? -debt : bal, LANG) + '</div>' +
        '<small style="color:var(--faint);font-size:11px">' + (b.kind === 'credit' ? t('bank.debtLabel') : t('bank.balanceLabel')) + '</small></div></div>';
    }).join('');
  }

  function animateRing() {
    const rp = $('#ring-progress');
    if (!rp) return;
    const budget = Number(state.data.settings.monthly_budget || 0);
    const goal = budget / 30;
    const spent = todayExpenses();
    const pct = goal > 0 ? Math.min(1, spent / goal) : 0;
    setTimeout(function () {
      rp.setAttribute('stroke-dashoffset', String(251.2 - 251.2 * pct));
      const rv = $('#ring-val');
      if (rv) rv.innerHTML = Math.round(pct * 100) + '%<small>' + t('dash.ofDay') + '</small>';
    }, 60);
  }

  function flowSeries() {
    const now = new Date();
    const out = [];
    const labels = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear(), m = d.getMonth() + 1;
      const inM = state.data.tx.filter(function (t) { return isSameMonth(t.date, y, m) && t.type === 'income'; }).reduce(function (a, t) { return a + Math.abs(Number(t.amount) || 0); }, 0);
      const exM = state.data.tx.filter(function (t) { return isSameMonth(t.date, y, m) && t.type === 'expense'; }).reduce(function (a, t) { return a + Math.abs(Number(t.amount) || 0); }, 0);
      out.push(inM - exM);
      try {
        labels.push(d.toLocaleDateString(LANG === 'en' ? 'en-US' : 'pt-BR', { month: 'short' }).replace('.', ''));
      } catch (e) { labels.push(String(m)); }
    }
    return { values: out, labels: labels };
  }

  function categorySlices() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth() + 1;
    const map = {};
    state.data.tx.forEach(function (t) {
      if (t.type !== 'expense' || !isSameMonth(t.date, y, m)) return;
      const c = t.category || 'cat.other';
      map[c] = (map[c] || 0) + Math.abs(Number(t.amount) || 0);
    });
    const arr = Object.keys(map).map(function (k) { return { cat: k, v: map[k] }; }).sort(function (a, b) { return b.v - a.v; });
    const PALETTE = ['#34d399', '#38bdf8', '#a78bfa', '#fbbf24', '#fb7185', '#94a3b8'];
    const top = arr.slice(0, 5);
    const rest = arr.slice(5).reduce(function (a, c) { return a + c.v; }, 0);
    const slices = top.map(function (c, i) { return { value: c.v, color: PALETTE[i], cat: c.cat }; });
    if (rest > 0) slices.push({ value: rest, color: PALETTE[5], cat: 'cat.other' });
    return slices;
  }

  function drawHomeCharts() {
    const fc = $('#flow-chart');
    if (fc) {
      const s = flowSeries();
      drawBars(fc, s.values, function (i, v) { return v >= 0 ? '#34d399' : '#fb7185'; }, true);
      fc.parentElement.setAttribute('data-labels', JSON.stringify(s.labels));
      const cv = fc.getBoundingClientRect();
      const ctx = fc.getContext('2d');
      const dpr = devicePixelRatio || 1;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      const stepX = cv.width / s.labels.length;
      s.labels.forEach(function (lb, i) {
        ctx.fillText(lb, stepX * i + stepX / 2, cv.height - 2);
      });
    }
    const cc = $('#cat-chart');
    if (cc) {
      const slices = categorySlices();
      const total = slices.reduce(function (a, s) { return a + s.value; }, 0);
      drawDonut(cc, slices, fmtMoneyCompact(total, LANG), t('dash.categoriesSub'));
      const legend = $('#cat-legend');
      if (legend) {
        legend.innerHTML = slices.map(function (s) {
          return '<div class="legend-item"><span class="legend-dot" style="background:' + s.color + '"></span>' +
            '<span>' + catName(s.cat) + '</span><b>' + fmtMoney(s.value, LANG) + '</b>' +
            '<span style="width:44px;text-align:right;flex:none">' + (total ? Math.round(s.value / total * 100) : 0) + '%</span></div>';
        }).join('');
      }
    }
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
        '<button class="btn btn-soft btn-block" data-action="open-tx" style="margin-bottom:12px">' + icon('plus') + t('tx.add') + '</button>' :
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
    const cats = type === 'income' ? CATS_INCOME : CATS_EXPENSE;
    sel.innerHTML = cats.map(function (c) {
      return '<option value="' + c + '"' + (c === selected ? ' selected' : '') + '>' + t(c) + '</option>';
    }).join('');
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

  function renderBills() {
    const banks = (state.data.banks || []).filter(function (b) { return b.invoice_day; });
    const bills = (state.data.bills || []).filter(function (b) { return b.active; });
    const now = new Date();
    const today = todayISO();
    const html =
      '<button class="btn btn-soft btn-block" data-action="open-bill" style="margin-bottom:12px">' + icon('plus') + t('bill.add') + '</button>' +
      (banks.length ?
        '<div class="card"><div class="card-title">' + icon('card') + t('bill.bankInvoices') + '</div>' +
        banks.map(function (b) {
          const due = nextDueDate(b.invoice_day, now);
          const d = diffDays(due, today);
          const cls = d < 0 ? 'today' : (d <= 3 ? 'soon' : '');
          return '<div class="list-row">' +
            '<span class="bank-dot" style="background:' + (b.color || '#10b981') + ';width:36px;height:36px;font-size:13px">' + esc(b.name.slice(0, 1).toUpperCase()) + '</span>' +
            '<div class="row-main"><div class="row-title">' + esc(b.name) + '</div>' +
            '<div class="row-sub due-chip ' + cls + '">' + t('bank.invoiceOn', { d: b.invoice_day }) + ' · ' + fmtDate(due, LANG) +
            (d < 0 ? ' · ' + t('bill.overdue') : d === 0 ? ' · ' + t('alert.dueToday') : d === 1 ? ' · ' + t('alert.dueTomorrow') : '') + '</div></div>' +
            '<div class="row-end"><div class="row-amount">' + fmtMoney(b.debt || 0, LANG) + '</div>' +
            '<small style="color:var(--faint)">' + t('bank.debtLabel') + '</small></div></div>';
        }).join('') + '</div>' + '<div class="section-gap"></div>' : '') +
      (bills.length ? bills.map(function (b) { return renderBillRow(b); }).join('') :
        '<div class="empty">' + icon('bills') + '<b>' + t('bill.noBills') + '</b><p>' + t('bill.noBillsHint') + '</p></div>');
    $('#view').innerHTML = html;
  }

  function renderBillRow(b) {
    const now = new Date();
    const today = todayISO();
    const due = nextDueDate(b.due_day, now);
    const mk = monthKeyFromISO(due);
    const paid = (state.data.payments || []).some(function (p) { return p.bill_id === b.id && p.month === mk; });
    const d = diffDays(due, today);
    let status, statusKey;
    if (paid) { status = 'paid'; statusKey = t('bill.paid'); }
    else if (d < 0) { status = 'overdue'; statusKey = t('bill.overdue'); }
    else { status = 'pending'; statusKey = t('bill.pending'); }
    return '<div class="card"><div class="list-row" style="padding:0 0 10px;border:0">' +
      '<span class="row-ico ' + (status === 'overdue' ? 'exp' : status === 'paid' ? 'inc' : '') + '">' + icon(catIconKey(b.category || 'cat.other')) + '</span>' +
      '<div class="row-main"><div class="row-title">' + esc(b.name) + '</div>' +
      '<div class="row-sub">' + catName(b.category) + ' · ' + t('bill.nextDue', { d: fmtDate(due, LANG) }) + '</div></div>' +
      '<div class="row-end"><div class="row-amount">' + fmtMoney(b.amount, LANG) + '<small style="color:var(--faint)">' + t('bill.monthly') + '</small></div>' +
      '<span class="bill-status ' + status + '">' + (status === 'paid' ? icon('check') : '') + statusKey + '</span></div>' +
      '</div>' +
      '<div class="modal-actions" style="margin-top:2px">' +
      (paid ?
        '<button class="btn btn-sm btn-soft" data-action="undo-paid" data-id="' + b.id + '">' + t('bill.undoPaid') + '</button>' :
        '<button class="btn btn-sm btn-primary" data-action="mark-paid" data-id="' + b.id + '">' + t('bill.markPaid') + '</button>') +
      '<button class="btn btn-sm btn-soft" data-action="edit-bill" data-id="' + b.id + '">' + t('common.edit') + '</button>' +
      '<button class="btn btn-sm btn-danger-soft" data-action="del-bill" data-id="' + b.id + '">' + icon('trash') + '</button>' +
      '</div></div>';
  }

  function openBillModal(id) {
    const b = id ? state.data.bills.find(function (x) { return x.id === id; }) : null;
    openModal({
      title: b ? t('bill.edit') : t('bill.add'),
      body:
        '<div class="field"><label class="field-label">' + t('bill.name') + '</label><input class="input" id="m-bname" value="' + esc(b ? b.name : '') + '"></div>' +
        '<div class="field-grid">' +
        '<div class="field"><label class="field-label">' + t('bill.amount') + '</label><input class="input" id="m-bamount" inputmode="decimal" value="' + (b ? String(b.amount).replace('.', ',') : '') + '"></div>' +
        '<div class="field"><label class="field-label">' + t('bill.dueDay') + '</label><input class="input" id="m-bday" type="number" min="1" max="31" value="' + (b ? b.due_day : 5) + '"></div>' +
        '</div>' +
        '<div class="field"><label class="field-label">' + t('tx.category') + '</label><select class="input" id="m-bcat">' +
        CATS_EXPENSE.map(function (c) { return '<option value="' + c + '"' + (b && b.category === c ? ' selected' : '') + '>' + t(c) + '</option>'; }).join('') +
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
    const name = $('#m-bname').value.trim();
    const amount = parseAmount($('#m-bamount').value);
    const day = parseInt($('#m-bday').value, 10);
    const cat = $('#m-bcat').value;
    const bank = $('#m-bbank').value;
    if (!name || amount === null || !day || day < 1 || day > 31) { toast(t('imp.parseError'), 'err'); return; }
    const row = { name: name, amount: Math.abs(amount), due_day: day, category: cat, bank_id: bank || null, active: true };
    const ok = await handleMutation(function () {
      if (id) return dbUpdate('bills', id, row);
      return dbInsert('bills', row);
    });
    if (ok) { closeModal(); toast(t('bill.saved'), 'ok'); }
  }

  function markPaidFlow(id) {
    const b = state.data.bills.find(function (x) { return x.id === id; });
    if (!b) return;
    const now = new Date();
    const due = nextDueDate(b.due_day, now);
    const mk = monthKeyFromISO(due);
    openModal({
      title: t('bill.markPaidTitle'),
      body: '<p style="font-size:14px;color:var(--muted)">' + t('bill.markPaidHint', { n: esc(b.name), m: esc(monthLabel(mk, LANG)) }) + '</p>' +
        '<div class="field" style="margin-top:12px"><input class="input" id="m-pamount" inputmode="decimal" value="' + String(b.amount).replace('.', ',') + '"></div>' +
        '<div class="modal-actions">' +
        '<button class="btn btn-soft" data-action="close-modal">' + t('common.cancel') + '</button>' +
        '<button class="btn btn-primary" data-action="confirm-paid" data-id="' + id + '">' + t('bill.markPaid') + '</button></div>'
    });
  }

  async function confirmPaid(id) {
    const b = state.data.bills.find(function (x) { return x.id === id; });
    const amt = parseAmount($('#m-pamount').value);
    if (!b || amt === null) return;
    const now = new Date();
    const due = nextDueDate(b.due_day, now);
    const mk = monthKeyFromISO(due);
    const ok = await handleMutation(function () {
      return dbUpsert('bill_payments', { bill_id: id, month: mk, amount: Math.abs(amt), paid_at: todayISO() }, 'bill_id,month');
    });
    if (ok) { closeModal(); toast(t('bill.paidMsg'), 'ok'); }
  }

  async function undoPaid(id) {
    const now = new Date();
    const b = state.data.bills.find(function (x) { return x.id === id; });
    if (!b) return;
    const due = nextDueDate(b.due_day, now);
    const mk = monthKeyFromISO(due);
    const pay = state.data.payments.find(function (p) { return p.bill_id === id && p.month === mk; });
    if (!pay) return;
    const ok = await handleMutation(function () { return dbDelete('bill_payments', pay.id); });
    if (ok) toast(t('bill.unpaidMsg'), 'ok');
  }

  function renderBanks() {
    const banks = state.data.banks || [];
    const html =
      '<button class="btn btn-soft btn-block" data-action="open-bank" style="margin-bottom:12px">' + icon('plus') + t('bank.add') + '</button>' +
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
      bill_payments: state.data.payments,
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
    state.data = { banks: [], tx: [], aliases: [], bills: [], payments: [], settings: {} };
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
        const v = el.getAttribute('data-view');
        if (v === 'tx' && el.getAttribute('data-new') === '1') { go('tx'); openTxModal(null); }
        else go(v);
        break;
      }
      case 'go-banks': go('banks'); break;
      case 'go-merchants': go('merchants'); break;
      case 'go-import': go('import'); break;
      case 'go-settings': go('settings'); break;
      case 'open-actions': $('#actions-sheet').classList.remove('hidden'); break;
      case 'close-actions': $('#actions-sheet').classList.add('hidden'); break;
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
      case 'mark-paid': markPaidFlow(id); break;
      case 'confirm-paid': confirmPaid(id); break;
      case 'undo-paid': undoPaid(id); break;
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

  window.addEventListener('resize', debounce(function () {
    if (state.view === 'home') drawHomeCharts();
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