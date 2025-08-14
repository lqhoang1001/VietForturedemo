(function(){
  // Year
  document.getElementById('y').textContent = new Date().getFullYear();

  // Header height sync (in case of font changes)
  const header = document.querySelector('.site-header');
  const setH = ()=> document.documentElement.style.setProperty('--header-h', (header.offsetHeight||80)+ 'px');
  window.addEventListener('resize', setH); setH();

  // Tabs
  const tabButtons = Array.from(document.querySelectorAll('.tab'));
  const views = {
    gioithieu: document.getElementById('view-gioithieu'),
    dichvu: document.getElementById('view-dichvu'),
    tuyendung: document.getElementById('view-tuyendung'),
    tintuc: document.getElementById('view-tintuc'),
    tindung: document.getElementById('view-tindung'),   // tab mới
    kitucxa: document.getElementById('view-kitucxa')    // tab mới
  };

  function show(el){ el.classList.add('is-visible'); }
  function hide(el){ el.classList.remove('is-visible'); }

  function runStagger(selector) {
    document.querySelectorAll(selector).forEach((el,i)=>{
      el.classList.remove('show');
      setTimeout(()=> el.classList.add('show'), 100*i);
    });
  }

  function activateTab(name){
    // update header tabs state (chỉ áp dụng cho 4 nút chính)
    tabButtons.forEach(b=> b.classList.toggle('is-active', b.dataset.nav===name));

    // switch views
    Object.entries(views).forEach(([k,el])=> el && (k===name ? show(el) : hide(el)));

    // per-tab animations
    if (name==='dichvu') runStagger('#view-dichvu .svc-card');
    if (name==='tintuc') runStagger('#view-tintuc .item');
    if (name==='tindung') {
      // counters
      document.querySelectorAll('#view-tindung [data-counter]').forEach(el=>{
        const goal = parseInt(el.getAttribute('data-counter'),10)||0;
        let cur = 0;
        const step = Math.max(1, Math.floor(goal/50));
        const iv = setInterval(()=>{ cur += step; if (cur>=goal){ cur=goal; clearInterval(iv);} el.textContent = cur; }, 20);
      });
      runStagger('#view-tindung .step');
    }
    if (name==='kitucxa') runStagger('#view-kitucxa .f-card');

    // update hash for deep link
    if (location.hash !== '#'+name) history.replaceState(null, '', '#'+name);
  }

  // Click brand -> giới thiệu
  document.getElementById('brandHome').addEventListener('click', (e)=>{ e.preventDefault(); activateTab('gioithieu'); });

  // Click 4 tabs header
  tabButtons.forEach(btn=> btn.addEventListener('click', ()=> activateTab(btn.dataset.nav)));

  // Any element with data-nav switches tab
  document.querySelectorAll('[data-nav]').forEach(el=>{
    if (!el.classList.contains('tab')) el.addEventListener('click', ()=> activateTab(el.dataset.nav));
  });

  // Keyboard shortcuts: 1–6
  window.addEventListener('keydown', (e)=>{
    if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key==='1') activateTab('gioithieu');
    if (e.key==='2') activateTab('dichvu');
    if (e.key==='3') activateTab('tuyendung');
    if (e.key==='4') activateTab('tintuc');
    if (e.key==='5') activateTab('tindung');
    if (e.key==='6') activateTab('kitucxa');
  });

  // Init
  const initial = (location.hash||'#gioithieu').replace('#','');
  activateTab(initial);

  // Dragon background blast on logo click
  const logo = document.querySelector('.logo');
  const dragonBg = document.getElementById('dragonBg');
  function blast(){ if (!dragonBg) return; dragonBg.classList.remove('blast'); void dragonBg.offsetWidth; dragonBg.classList.add('blast'); }
  logo?.addEventListener('click', blast);
})();
