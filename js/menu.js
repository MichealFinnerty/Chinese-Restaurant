const ALLERGEN_NAMES = {
    1:'Gluten', 2:'Crustaceans', 3:'Eggs', 4:'Fish', 5:'Peanuts', 6:'Soya', 7:'Milk',
    8:'Nuts', 9:'Celery', 10:'Mustard', 11:'Sesame Seed', 12:'Sulphur Dioxide', 13:'Lupin', 14:'Molluscs'
  };

  // Allergen filter state - now supports multiple selections
  let selectedAllergens = new Set();
  const warningBanner = document.getElementById('allergenWarningBanner');
  const warningClose = document.getElementById('allergenWarningClose');
  const selectedAllergenName = document.getElementById('selectedAllergenName');

  function clearAllergenFilter(){
    selectedAllergens.clear();
    document.body.classList.remove('allergen-filter-active');
    warningBanner.classList.remove('active');
    document.querySelectorAll('.allergen-badge.filter-active').forEach(b => b.classList.remove('filter-active'));
    document.querySelectorAll('.item-row.contains-selected-allergen').forEach(r => r.classList.remove('contains-selected-allergen'));
  }

  function updateAllergenDisplay(){
    if(selectedAllergens.size === 0){
      clearAllergenFilter();
      return;
    }

    document.body.classList.add('allergen-filter-active');
    warningBanner.classList.add('active');
    
    // Create display text for selected allergens
    const allergenNames = Array.from(selectedAllergens)
      .map(num => ALLERGEN_NAMES[num] || 'Unknown')
      .sort();
    
    if(allergenNames.length === 1){
      selectedAllergenName.textContent = allergenNames[0];
    } else {
      selectedAllergenName.textContent = allergenNames.join(', ');
    }
    
    // Update badges
    document.querySelectorAll('.allergen-badge').forEach(badge => {
      const num = parseInt(badge.dataset.allergen);
      badge.classList.toggle('filter-active', selectedAllergens.has(num));
    });
    
    // Update menu items - highlight if contains ANY of the selected allergens
    document.querySelectorAll('.item-row[data-allergens]').forEach(row => {
      const rowAllergens = row.dataset.allergens.split(',').map(a => parseInt(a.trim()));
      const containsAny = rowAllergens.some(allergen => selectedAllergens.has(allergen));
      row.classList.toggle('contains-selected-allergen', containsAny);
    });
  }

  function toggleAllergenFilter(allergenNum){
    if(selectedAllergens.has(allergenNum)){
      selectedAllergens.delete(allergenNum);
    } else {
      selectedAllergens.add(allergenNum);
    }
    updateAllergenDisplay();
  }

  warningClose.addEventListener('click', clearAllergenFilter);

  // Allergen badge click handler - now supports multi-select
  document.querySelectorAll('.allergen-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      const allergenNum = parseInt(badge.dataset.allergen);
      toggleAllergenFilter(allergenNum);
    });
  });

  // Rest of the existing menu script code...
  function setNavHeight(){
    const nav = document.querySelector('.site-nav');
    if(nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  setNavHeight();
  window.addEventListener('resize', setNavHeight);
  window.addEventListener('load', setNavHeight);

  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('nav-open', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }));

  const ICONS = {
    appetizers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="12" cy="12" rx="9" ry="4.2"/><path d="M4 12c0 3 3.5 5 8 5s8-2 8-5"/><path d="M8 10.5l2 2M14 10.5l2 2"/></svg>',
    soups: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11h18a9 6 0 0 1-18 0z"/><path d="M7 11c0-1.5 1-2 1-3.5S7 5 7 5M12 11c0-1.5 1-2 1-3.5S12 5 12 5M17 11c0-1.5 1-2 1-3.5S17 5 17 5"/></svg>',
    curry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c-2 3-4 4-4 7a4 4 0 0 0 8 0c0-1.2-.6-2-1.3-2.8.1 1-.2 1.8-.9 2.2 0-2-.6-3-1.8-6.4z"/></svg>',
    sweetsour: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 1 0-9 4.5 4.5 0 0 0 0-9z"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none"/></svg>',
    wok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h18a7 4.5 0 0 1-14 0z"/><path d="M3 12L1 9M21 12l2-3"/></svg>',
    chef: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 21h10M8 21V13M16 21V13"/><path d="M6 9a3 3 0 0 1 3-3 3 3 0 0 1 6 0 3 3 0 0 1 2 5.2c-.6.5-1.3.8-2 .8H8c-.7 0-1.4-.3-2-.8A3 3 0 0 1 6 9z"/></svg>',
    thai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 18c8-1 12-7 12-14 0 7 4 6 4 6-2 9-9 10-16 8z"/><path d="M6 17 16 5"/></svg>',
    friedrice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11h16a8 5 0 0 1-16 0z"/><circle cx="9" cy="9" r=".6" fill="currentColor"/><circle cx="12" cy="8" r=".6" fill="currentColor"/><circle cx="15" cy="9.2" r=".6" fill="currentColor"/></svg>',
    chowmein: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9c2 2 2-2 4 0s2-2 4 0 2-2 4 0 2-2 4 0"/><path d="M4 14c2 2 2-2 4 0s2-2 4 0 2-2 4 0 2-2 4 0"/></svg>',
    extras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1.5 12h-9z"/><path d="M9 8V5h6v3"/></svg>',
    snackbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9h16v10H4z"/><path d="M4 9l3-5h10l3 5M12 9v10"/></svg>',
    setdinner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="6"/><path d="M4 4v6M4 7h1.6M20 4v16"/></svg>',
    catering: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="12" cy="17" rx="9" ry="2.2"/><path d="M4.5 16C4 10 7.5 5 12 5s8 5 7.5 11"/></svg>',
    allergen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3.5 21.5 20h-19z"/><path d="M12 9.5v5"/><circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none"/></svg>'
  };

  const FEATURED = [
    { name:'Aromatic Duck',              caption:'Aromatic Duck',                    img:'400x400Food/Aromatic Duck.avif',                 num:2  },
    { name:'Spring Roll',                caption:'Spring Roll',                      img:'400x400Food/Spring Roll.avif',                   num:5  },
    { name:'Sesame King Prawn on Toast', caption:'Sesame King<br>Prawn on Toast',    img:'400x400Food/Sesame King Prawn on Toast.avif',    num:16 },
    { name:'Chicken Satay Skewer',       caption:'Chicken Satay<br>Skewer',          img:'400x400Food/Chicken Satay Skewer.avif',          num:17 },
    { name:'Hot & Sour Soup',            caption:'Hot & Sour Soup',                  img:'400x400Food/Hot & Sour Soup.avif',               num:23 },
    { name:'Sweet & Sour Chicken',       caption:'Sweet & Sour<br>Chicken',          img:'400x400Food/Sweet & Sour Chicken.avif',          num:32 },
    { name:'Pad Thai',              caption:'Pad Thai',              img:'400x400Food/Pad Thai.avif',              num:53 },
    { name:'Chicken Fried Rice',    caption:'Chicken Fried Rice',    img:'400x400Food/Chicken Fried Rice.avif',    num:63 },
    { name:'Chicken Chow Mein',     caption:'Chicken Chow Mein',     img:'400x400Food/Chicken Chow Mein.avif',     num:71 }
  ];

  const MENU = [
    { id:'appetizers', title:'Appetizers', sub:'頭盤', icon:'appetizers', items:[
      {n:'Ruby Combination (For 2 Person)', d:'2 Spring Rolls, 2 Spare Ribs, 2 Chicken Satay Skewers, 4 Fried Won Ton, Prawn Toast & Sweet Sour Sauce', p:'€13.50', a:[1,2,5,8,11]},
      {n:'Aromatic Duck', d:'Served with fresh vegetables, pancakes & hoi sin sauce', p:'(1/4) €11.00 / (1/2) €20.00', a:[1,6]},
      {n:'Dragon Beef', d:'Armona spicy shredded beef, served with pancakes', p:'€10.00', a:[1,6]},
      {n:'Minced Chicken Iceberg Parcel (For 2 Person)', p:'€9.50', a:[6,8]},
      {n:'Spring Roll (2)', p:'€4.50', a:[1]},
      {n:'Vegetarian Spring Roll (2)', p:'€4.50', a:[1]},
      {n:'Chicken & Cheese Roll (2)', p:'€5.00', a:[1,7,10]},
      {n:'Salt & Chili Smoked Chicken', d:'Long tray', p:'€6.50', a:[2,3]},
      {n:'Salt & Chili Chicken Wings', d:'Long tray', p:'€6.50', a:[2,3]},
      {n:'Salt & Chili Spare Ribs', d:'Long tray', p:'€7.50', a:[2]},
      {n:'Salt & Chili King Prawn (12)', p:'€11.50', a:[2,3]},
      {n:'Deep Fried Chicken Wings', d:'Choice of BBQ / Honey / Garlic Butter / Sweet Chili', p:'€6.50', a:[3]},
      {n:'Spare Ribs', d:'Choice of BBQ / Honey / King Do / Sweet Sour', p:'€7.50'},
      {n:'Curry Samosa (10)', p:'€5.00', a:[1]},
      {n:'Deep Fried Won Ton (8)', d:'With sweet sour sauce', p:'€6.50', a:[1,2,9]},
      {n:'Sesame King Prawn on Toast', p:'€6.00', a:[2,11]},
      {n:'Chicken Satay Skewer (5)', p:'€6.00', a:[5]},
      {n:'Crispy Chicken in Garlic Butter Sauce', p:'€7.00', a:[3,7]}
    ]},
    { id:'soups', title:'Soups', sub:'湯', icon:'soups', items:[
      {n:'Chicken Sweet Corn Soup', d:'Thick', p:'€4.50', a:[3]},
      {n:'Crab Sweet Corn Soup', d:'Thick', p:'€4.50', a:[3]},
      {n:'Chicken Noodle Soup', d:'Clear', p:'€4.50', a:[1,3,6]},
      {n:'Chicken Mushroom Soup', d:'Clear', p:'€4.50', a:[1]},
      {n:'Hot & Sour Soup', d:'Thick', p:'€5.00', a:[2,3]},
      {n:'Won Ton Soup', d:'Clear', p:'€5.00', a:[2,6]}
    ]},
    { id:'curry', title:'Curry Dishes', sub:'咖喱', icon:'curry', items:[
      {n:'Breast Chicken Curry', p:'€10.80', a:[1,9]},
      {n:'Beef Curry', p:'€10.80', a:[1,9]},
      {n:'Pork Curry', p:'€10.80', a:[1,9]},
      {n:'King Prawn Curry', p:'€12.00', a:[1,2,9]},
      {n:'House Special Curry', p:'€12.00', a:[1,2,6,9]},
      {n:'Roast Duck Curry', p:'€13.00', a:[1,6,9]},
      {n:'Mixed Vegetable Curry', p:'€9.50', a:[1,9]}
    ]},
    { id:'sweet-sour', title:'Sweet & Sour Dishes', sub:'甜酸', icon:'sweetsour', items:[
      {n:'Sweet & Sour Chicken', p:'€10.80', a:[3,9]},
      {n:'Sweet & Sour King Prawn', p:'€12.00', a:[2,3,9]},
      {n:'Sweet & Sour Special', p:'€12.00', a:[2,3,9]},
      {n:'Sweet & Sour Roast Duck', p:'€13.00', a:[6,9]}
    ]},
    { id:'chef-specials', title:"Chef's Specialties", sub:'名廚推介', icon:'chef', items:[
      {n:'Crispy Chilli Chicken', d:'Honey chilli, garlic sauce', p:'€10.80', a:[2,3,9]},
      {n:'Crispy Chilli Beef', p:'€10.80', a:[2,3,9]},
      {n:'Chicken Hickory', p:'€13.00', a:[2,3,6]},
      {n:'Roast Duck with Cantonese Sauce', p:'€13.00', a:[6]}
    ]},
    { id:'thai', title:'Thai Dishes', sub:'泰式', icon:'thai', items:[
      {n:'Thai Chicken Green / Red Curry', p:'€11.00', a:[7]},
      {n:'Thai Beef Green / Red Curry', p:'€11.00', a:[6,7]},
      {n:'Thai Pork Green / Red Curry', p:'€11.00', a:[7]},
      {n:'Thai King Prawn Green / Red Curry', p:'€12.50', a:[2,7]},
      {n:'Thai Special Green / Red Curry', p:'€12.50', a:[2,6,7]},
      {n:'Thai Duck Green / Red Curry', p:'€13.50', a:[6,7]},
      {n:'Thai Mixed Vegetable Green / Red Curry', p:'€9.50', a:[7]}
    ]},
    { id:'fried-rice', title:'Fried Rice Dishes', sub:'炒飯', icon:'friedrice', items:[
      {n:'Chicken Fried Rice', p:'€10.80', a:[3,6]},
      {n:'Beef Fried Rice', p:'€10.80', a:[3,6]},
      {n:'House Special Fried Rice', p:'€12.00', a:[2,3,6]},
      {n:'King Prawn Fried Rice', p:'€12.00', a:[2,3,6]},
      {n:'Duck Fried Rice', p:'€13.00', a:[3,6]},
      {n:'Yong Chow Fried Rice', d:'Chicken, pork, ham, shrimp & peas', p:'€12.00', a:[2,3,6]},
      {n:'Spicy Singapore Fried Rice', d:'Chicken, pork, ham, shrimp & vegetables', p:'€11.00', a:[2]}
    ]},
    { id:'chow-mein', title:'Chow Mein Dishes', sub:'炒麵', icon:'chowmein', items:[
      {n:'Mixed Vegetables Chow Mein', p:'€9.00', a:[1,3,6,14]},
      {n:'Chicken Chow Mein', p:'€11.00', a:[1,3,6,14]},
      {n:'Beef Chow Mein', p:'€12.00', a:[1,3,6,14]},
      {n:'King Prawn Chow Mein', p:'€12.00', a:[1,2,3,6,14]},
      {n:'House Special Chow Mein', p:'€11.80', a:[1,2,3,6,14]},
      {n:'Spicy Singapore Chow Mein', d:'Chicken, pork, ham, shrimp & peas', p:'€12.00', a:[1,2,3,6,14]}
    ]},
    { id:'extras', title:'Extra Portions', sub:'配菜', icon:'extras', items:[
      {n:'Chips', p:'(S) €3.00 / (L) €4.00'},
      {n:'Spicy Chips', p:'(S) €3.00 / (L) €4.50'},
      {n:'Boiled Rice', p:'(S) €2.80 / (L) €3.80'},
      {n:'Fried Rice', p:'(S) €3.00 / (L) €4.00', a:[3,6]},
      {n:'Fried Noodles', p:'(S) €5.00 / (L) €6.00', a:[1,3,6,14]},
      {n:'Curry Chips', p:'(L) €4.50', a:[1,9]},
      {n:'Curry Boiled Rice', p:'(L) €4.50', a:[1,9]},
      {n:'Curry Fried Rice', p:'(L) €4.50', a:[1,3,6,9]},
      {n:'Curry Noodles', p:'(L) €7.00', a:[1,3,6,9,14]},
      {n:'3 in 1', p:'(L) €5.50', a:[1,3,6,9]},
      {n:'Chicken or Beef 4 in 1', p:'(L) €7.50', a:[1,3,6,9]},
      {n:'Smoked Chicken 4 in 1', p:'(L) €8.50', a:[1,3,9]},
      {n:'Prawn Crackers', p:'€2.00', a:[2]},
      {n:'Sausage (each)', p:'€1.00'},
      {n:'Chicken Nuggets (6)', p:'€3.50'},
      {n:'Chicken Balls (8)', p:'€7.00'},
      {n:'Fried Mixed Vegetable', p:'€7.00'},
      {n:'Deep Fried Onion Rings (12)', p:'€4.00'},
      {n:'Choice of Sauce', p:'(S) €2.50 / (L) €3.50'},
      {n:'Soft Drink', d:'Coke, Diet Coke, 7up or Orange', p:'(Can) €2.00 / (Large) €4.00'}
    ]},
    { id:'snack-boxes', title:'Snack Boxes', sub:'小食盒', icon:'snackbox', items:[
      {n:'Chicken Balls (8), Chips & Choice of Sauce', p:'€10.80'},
      {n:'Spicy Bag', d:'Smoked Chicken, Spicy Chips', p:'€8.30'},
      {n:'Spicy Bag Plus', d:'Smoked Chicken, 2 Chicken Balls, Spicy Chips', p:'€9.30'},
      {n:'Munchie Box 12"', d:'Smoked Chicken, Chicken Balls, Chicken Wings, Ribs, Sauce, Spicy Chips & a Drink', p:'€22.00'}
    ]}
  ];

  const WOK_PROTEINS = [
    {n:'A. Chicken', p:'€10.80'}, {n:'B. Beef', p:'€10.80'}, {n:'C. King Prawn', p:'€12.00'},
    {n:'D. House Special', p:'€12.00'}, {n:'E. Duck', p:'€13.00'}, {n:'F. Just Veg', p:'€9.50'},
    {n:'G. Cha Siu Roast Pork', p:'€10.80'}
  ];
  const WOK_SAUCES = [
    {n:'Black Bean', d:'Chilli, garlic & onion in a zesty, sharp black bean sauce', a:[6,14]},
    {n:'Kung Po', d:'Stir-fried chilli & garlic with mixed vegetables & cashew nuts', a:[8]},
    {n:'Szechuan', d:'Hot and spicy sauce that tingles the palate', a:[1]},
    {n:'Satay', d:'Rich, savoury peanut sauce', a:[5]},
    {n:'Hot Garlic', d:'Stir-fried with fresh hot garlic in sauce', a:[6,14]},
    {n:'Mushroom', d:'Mushroom & vegetable in oyster sauce', a:[6,14]},
    {n:'Chop Suey', d:'Mixed vegetables in oyster sauce', a:[6,14]},
    {n:'Cashew Nuts', a:[6,8]},
    {n:'Ginger & Scallion', a:[6,14]},
    {n:'Sweet Chilli Sauce', d:'Traditional recipe, spicy yet delicate', a:[9]},
    {n:'Black Pepper Sauce', a:[6,14]},
    {n:'Oyster Sauce', a:[6,14]},
    {n:'King Do Sauce', d:'Sweet, sour & spicy', a:[9]},
    {n:'Fruity Sauce', a:[9]},
    {n:'Orange Sauce', a:[9]},
    {n:'Lemon Sauce', a:[9]},
    {n:'Plum Sauce', a:[9]}
  ];

  function renderItemRow(item, index){
    const allergenHtml = (item.a && item.a.length)
      ? `<span class="item-allergens"><span class="aller-label">Contains</span>${item.a.map(n => `<a href="#allergen-${n}" class="allergen-link" data-a="${n}" title="${ALLERGEN_NAMES[n] || ''}">${n}</a>`).join('')}</span>`
      : '';
    return `<div class="item-row"${index != null ? ` id="item-${index}"` : ''}${item.a ? ` data-allergens="${item.a.join(',')}"` : ''}>
      <span class="num">${index != null ? index : ''}</span>
      <span class="item-main">
        <span class="item-name">${item.n}</span>
        ${item.d ? `<span class="item-desc">${item.d}</span>` : ''}
        ${allergenHtml}
      </span>
      <span class="price">${item.p || ''}</span>
    </div>`;
  }

  const counter = { n: 0 };
  function nextNum(){ counter.n += 1; return counter.n; }

  function renderCategory(cat){
    const start = counter.n + 1;
    let rows = cat.items.map(it => renderItemRow(it, nextNum())).join('');
    const end = counter.n;
    return {
      html: `<div class="wrap menu-cat collapsed" id="${cat.id}">
        <button class="cat-header cat-header-toggle" type="button" aria-expanded="false">
          <span class="icon">${ICONS[cat.icon]}</span>
          <h2>${cat.title}</h2>
          <span class="cat-sub chinese">${cat.sub}</span>
          <span class="cat-chevron">&#9662;</span>
        </button>
        <div class="cat-body"><div>
        <div class="item-list">${rows}</div>
        </div></div>
      </div>`,
      range: [start, end]
    };
  }

  function renderWok(){
    const proteinRows = WOK_PROTEINS.map(it => renderItemRow(it, null)).join('');
    const start = counter.n + 1;
    const sauceRows = WOK_SAUCES.map(it => renderItemRow(it, nextNum())).join('');
    const end = counter.n;
    return {
      html: `<div class="wrap menu-cat collapsed" id="wok">
        <button class="cat-header cat-header-toggle" type="button" aria-expanded="false">
          <span class="icon">${ICONS.wok}</span>
          <h2>Straight From Wok</h2>
          <span class="cat-sub chinese">鑊氣</span>
          <span class="cat-chevron">&#9662;</span>
        </button>
        <div class="cat-body"><div>
        <p class="cat-note">Pick your protein, then choose a sauce to go with it &mdash; priced by the protein below.</p>
        <div class="sub-heading">Choose Your Protein</div>
        <div class="item-list">${proteinRows}</div>
        <div class="sub-heading">Choose Your Sauce</div>
        <div class="item-list">${sauceRows}</div>
        </div></div>
      </div>`,
      range: [start, end]
    };
  }

  const root = document.getElementById('menuRoot');
  const order = ['appetizers','soups','curry','sweet-sour','wok','chef-specials','thai','fried-rice','chow-mein','extras','snack-boxes'];
  const catMeta = [];
  let html = '';
  order.forEach(id => {
    if(id === 'wok'){
      const { html: h, range } = renderWok();
      html += h;
      catMeta.push({ id:'wok', title:'Straight From Wok', range });
      return;
    }
    const cat = MENU.find(c => c.id === id);
    if(cat){
      const { html: h, range } = renderCategory(cat);
      html += h;
      catMeta.push({ id: cat.id, title: cat.title, range });
    }
  });
  root.innerHTML = html;
  catMeta.push({ id:'set-dinners', title:'Special Set Dinners', range:null });
  catMeta.push({ id:'catering', title:'Catering Services', range:null });

  document.querySelectorAll('.icon[data-icon]').forEach(el => {
    el.innerHTML = ICONS[el.dataset.icon] || '';
  });

  function initAccordions(){
    document.querySelectorAll('.menu-cat > .cat-header-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.closest('.menu-cat');
        const collapsed = section.classList.toggle('collapsed');
        btn.setAttribute('aria-expanded', String(!collapsed));
      });
    });
  }
  initAccordions();

  function openSectionFor(el){
    const section = el.closest('.menu-cat');
    if(section && section.classList.contains('collapsed')){
      section.classList.remove('collapsed');
      const btn = section.querySelector('.cat-header-toggle');
      if(btn) btn.setAttribute('aria-expanded', 'true');
    }
  }

  const quickNav = document.getElementById('quickNav');
  quickNav.innerHTML = catMeta.map(c => {
    const numLabel = c.range ? `<span class="qn-num">${c.range[0]}&ndash;${c.range[1]}</span>` : '';
    return `<a class="qn-pill" href="#${c.id}" data-id="${c.id}">${numLabel}${c.title}</a>`;
  }).join('');

  const qnToggle = document.getElementById('qnToggle');
  const qnToggleVisual = document.getElementById('qnToggleVisual');
  const qnPanel = document.getElementById('qnPanel');
  const qnCurrent = document.getElementById('qnCurrent');

  function setPanelOpen(open){
    qnPanel.classList.toggle('open', open);
    qnToggle.setAttribute('aria-expanded', open);
    if(open) setSearchOpen(false);
    if(qnToggleVisual) qnToggleVisual.setAttribute('aria-expanded', open);
  }
  qnToggle.addEventListener('click', () => {
    setPanelOpen(!qnPanel.classList.contains('open'));
  });
  if(qnToggleVisual){
    qnToggleVisual.style.cursor = 'pointer';
    qnToggleVisual.addEventListener('click', () => {
      setPanelOpen(!qnPanel.classList.contains('open'));
    });
  }

  const qnSearchBtn = document.getElementById('qnSearchBtn');
  const qnSearchWrap = document.getElementById('qnSearchWrap');
  const qnSearchInput = document.getElementById('qnSearchInput');
  const qnSearchResults = document.getElementById('qnSearchResults');

  function setSearchOpen(open){
    qnSearchWrap.classList.toggle('open', open);
    qnSearchBtn.classList.toggle('active', open);
    qnSearchBtn.setAttribute('aria-expanded', open);
    if(open){
      setPanelOpen(false);
      requestAnimationFrame(() => qnSearchInput.focus());
    } else {
      qnSearchInput.value = '';
      qnSearchResults.innerHTML = '';
    }
  }
  qnSearchBtn.addEventListener('click', () => {
    setSearchOpen(!qnSearchWrap.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.quick-nav')) setSearchOpen(false);
  });
  qnSearchInput.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') setSearchOpen(false);
  });

  const SEARCH_INDEX = [];
  (function buildSearchIndex(){
    document.querySelectorAll('.item-row').forEach(row => {
      const numEl = row.querySelector('.num');
      const nameEl = row.querySelector('.item-name');
      if(!numEl || !nameEl || !numEl.textContent.trim()) return;
      const cat = row.closest('.menu-cat');
      const catTitleEl = cat ? cat.querySelector('h2') : null;
      const allergensAttr = row.dataset.allergens;
      SEARCH_INDEX.push({
        num: numEl.textContent.trim(),
        name: nameEl.textContent.trim(),
        rowId: row.id,
        catTitle: catTitleEl ? catTitleEl.textContent.trim() : '',
        allergens: allergensAttr ? allergensAttr.split(',').map(n => n.trim()) : []
      });
    });
  })();

  function jumpToRow(rowId){
    const row = document.getElementById(rowId);
    if(!row) return;
    openSectionFor(row);
    setSearchOpen(false);
    requestAnimationFrame(() => {
      setNavHeight();
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.remove('item-row');
      void row.offsetWidth;
      row.classList.add('item-row');
      history.replaceState(null, '', '#' + rowId);
    });
  }

  function renderSearchResults(query){
    const q = query.trim();
    if(!q){ qnSearchResults.innerHTML = ''; return; }

    let matches = [];
    if(/^[a-zA-Z0-9]{1,3}$/.test(q)){
      matches = SEARCH_INDEX.filter(item => item.num.toLowerCase() === q.toLowerCase());
      if(matches.length){
        renderList(matches);
        return;
      }
    }
    const qLower = q.toLowerCase();
    matches = SEARCH_INDEX.filter(item => item.name.toLowerCase().includes(qLower));
    if(/^\d+$/.test(q)){
      const numMatches = SEARCH_INDEX.filter(item => item.num.includes(q) && !matches.includes(item));
      matches = matches.concat(numMatches);
    }
    renderList(matches);
  }

  function renderList(matches){
    if(!matches.length){
      qnSearchResults.innerHTML = '<div class="qn-search-empty">No dishes found. Try a different name or number.</div>';
      return;
    }
    qnSearchResults.innerHTML = matches.slice(0, 25).map(m => {
      const allergenBadges = m.allergens.length
        ? `<span class="qn-result-allergens">${m.allergens.map(n => `<span class="allergen-link" data-a="${n}" title="${ALLERGEN_NAMES[n] || ''}">${n}</span>`).join('')}</span>`
        : '';
      return `
      <button type="button" class="qn-result" data-row="${m.rowId}">
        <span class="qn-result-num">${m.num}</span>
        <span class="qn-result-name">${m.name}</span>
        ${allergenBadges}
        <span class="qn-result-cat">${m.catTitle}</span>
      </button>
    `;
    }).join('');
    qnSearchResults.querySelectorAll('.qn-result').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const allergenHit = e.target.closest('.allergen-link');
        if(allergenHit){
          e.stopPropagation();
          return;
        }
        jumpToRow(btn.dataset.row);
      });
    });
  }

  qnSearchInput.addEventListener('input', () => renderSearchResults(qnSearchInput.value));
  qnSearchInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      const first = qnSearchResults.querySelector('.qn-result');
      if(first) jumpToRow(first.dataset.row);
    }
  });
  quickNav.querySelectorAll('.qn-pill').forEach(a => {
    a.addEventListener('click', (e) => {
      setPanelOpen(false);
      const target = document.getElementById(a.dataset.id);
      if(target) openSectionFor(target);
    });
  });
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.quick-nav')) setPanelOpen(false);
  });

  const pills = Array.from(quickNav.querySelectorAll('.qn-pill'));
  const sections = catMeta.map(c => document.getElementById(c.id)).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const meta = catMeta.find(c => c.id === entry.target.id);
        pills.forEach(p => p.classList.toggle('active', p.dataset.id === entry.target.id));
        if(meta) qnCurrent.textContent = meta.title;
      }
    });
  }, { rootMargin: '-160px 0px -70% 0px', threshold: 0 });
  sections.forEach(s => spy.observe(s));

  const heroGallery = document.getElementById('heroGallery');
  const heroDots = document.getElementById('heroDots');
  if(heroGallery && FEATURED.length){
    heroGallery.innerHTML = FEATURED.map((f, i) => `
      <a class="hero-slide${i === 0 ? ' active' : ''}" href="#item-${f.num}" data-i="${i}">
        <img src="${f.img}" alt="${f.name}" loading="${i === 0 ? 'eager' : 'lazy'}">
        <span class="hero-slide-caption">${f.caption}</span>
      </a>`).join('');
    heroDots.innerHTML = FEATURED.map((f, i) =>
      `<button class="hero-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Show ${f.name}"></button>`
    ).join('');

    const slides = Array.from(heroGallery.querySelectorAll('.hero-slide'));
    const dots = Array.from(heroDots.querySelectorAll('.hero-dot'));
    let heroIndex = 0;

    function showSlide(i){
      heroIndex = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle('active', idx === heroIndex));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === heroIndex));
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let heroTimer = null;
    function startAutoplay(){
      if(reduceMotion || slides.length < 2) return;
      stopAutoplay();
      heroTimer = setInterval(() => showSlide(heroIndex + 1), 3800);
    }
    function stopAutoplay(){
      if(heroTimer){ clearInterval(heroTimer); heroTimer = null; }
    }

    dots.forEach(d => d.addEventListener('click', () => {
      showSlide(Number(d.dataset.i));
      startAutoplay();
    }));

    const galleryWrap = document.querySelector('.hero-gallery');
    galleryWrap.addEventListener('mouseenter', stopAutoplay);
    galleryWrap.addEventListener('mouseleave', startAutoplay);
    galleryWrap.addEventListener('focusin', stopAutoplay);
    galleryWrap.addEventListener('focusout', startAutoplay);

    let touchStartX = 0, touchStartY = 0, touchDX = 0, touchDY = 0, isSwiping = false;
    const SWIPE_THRESHOLD = 40;

    heroGallery.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchDX = 0; touchDY = 0;
      isSwiping = false;
      stopAutoplay();
    }, { passive: true });

    heroGallery.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      touchDX = t.clientX - touchStartX;
      touchDY = t.clientY - touchStartY;
      if(Math.abs(touchDX) > Math.abs(touchDY)) isSwiping = true;
    }, { passive: true });

    heroGallery.addEventListener('touchend', () => {
      if(isSwiping && Math.abs(touchDX) > SWIPE_THRESHOLD){
        showSlide(heroIndex + (touchDX < 0 ? 1 : -1));
      }
      startAutoplay();
    });

    heroGallery.addEventListener('click', (e) => {
      if(isSwiping && Math.abs(touchDX) > SWIPE_THRESHOLD){
        e.preventDefault();
        isSwiping = false;
      }
    }, true);

    startAutoplay();
  }

  slides: {
    heroGallery && heroGallery.querySelectorAll('.hero-slide').forEach(s => {
      s.addEventListener('click', () => {
        const target = document.querySelector(s.getAttribute('href'));
        if(target) openSectionFor(target);
      });
    });
  }

  if(location.hash){
    const target = document.querySelector(location.hash);
    if(target){
      openSectionFor(target);
      requestAnimationFrame(() => {
        setNavHeight();
        target.scrollIntoView();
      });
    }
  }