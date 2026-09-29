const BARS='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>', XMARK='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
// ===== Mobile navigation =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.innerHTML = open ? XMARK : BARS;
});

// ===== Header: glass on scroll + hero parallax =====
const hd = document.querySelector('.hd'), heroBg = document.getElementById('heroBg');
function onScroll() {
  hd.classList.toggle('scrolled', scrollY > 60);
  if (scrollY < innerHeight) heroBg.style.setProperty('--py', scrollY * .18 + 'px');
}
addEventListener('scroll', onScroll, {passive: true}); onScroll();

// ===== Smooth scroll + close mobile menu =====
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); burger.innerHTML = BARS;
}));

// ===== Tour data & render (filter tabs) =====
const IMG = 'https://images.unsplash.com/';
const tours = [
  {n:'Tour 3 đảo Nha Trang',d:'Đi về trong ngày',p:'599.000đ',o:'720.000đ',r:'4.9',c:286,f:'island',t:'Lặn ngắm san hô',b:'Bán chạy',i:'photo-1519046904884-53103b34b206',k:'tour-3-dao'},
  {n:'Tour Hòn Mun',d:'Đi về trong ngày',p:'650.000đ',o:'',r:'4.8',c:190,f:'island',t:'Khu bảo tồn biển',b:'',i:'photo-1544551763-46a013bb70d5',k:'hon-mun'},
  {n:'City Tour Nha Trang',d:'1 ngày',p:'499.000đ',o:'',r:'4.7',c:142,f:'city',t:'Văn hóa – lịch sử',b:'',i:'photo-1476514525535-07fb3b4ae5f1',k:'city-tour'},
  {n:'Tour Hòn Tằm',d:'Đi về trong ngày',p:'850.000đ',o:'',r:'4.8',c:98,f:'island',t:'Nghỉ dưỡng đảo',b:'Mới',i:'photo-1506929562872-bb421503ef21',k:'hon-tam'},
  {n:'Tắm bùn khoáng & suối nóng',d:'Nửa ngày',p:'390.000đ',o:'450.000đ',r:'4.8',c:175,f:'exp',t:'Thư giãn',b:'-13%',i:'photo-1507525428034-b723cf961d3e',k:'mud-bath'},
  {n:'Lặn biển ngắm san hô',d:'Nửa ngày',p:'720.000đ',o:'',r:'4.9',c:121,f:'exp',t:'Trải nghiệm',b:'Hot',i:'photo-1544551763-46a013bb70d5',k:'snorkeling'},
  {n:'Tour đảo dành cho gia đình',d:'Đi về trong ngày',p:'550.000đ',o:'',r:'4.7',c:83,f:'family',t:'Có ưu đãi trẻ em',b:'',i:'photo-1519046904884-53103b34b206',k:'family-tour'},
  {n:'Vui chơi & tham quan Nha Trang',d:'1 ngày',p:'620.000đ',o:'690.000đ',r:'4.6',c:64,f:'family',t:'Vui chơi',b:'',i:'photo-1506929562872-bb421503ef21',k:'fun-nha-trang'}
];
const grid = document.getElementById('tourGrid');
function renderTours(f) {
  grid.innerHTML = tours.filter(t => f === 'all' || t.f === f).map(t => `
    <article class="tc reveal">
      <div class="tc__img"><div class="image-wrapper"><img src="assets/images/${t.k}.jpg" data-fb="${IMG}${t.i}?w=600&q=70" alt="${t.n}" loading="lazy" decoding="async"></div>${t.b ? `<span class="badge">${t.b}</span>` : ''}</div>
      <span class="tag">${t.t}</span>
      <h3>${t.n}</h3>
      <p class="meta">${t.d} · <i class="fa-solid fa-star"></i> ${t.r} (${t.c})</p>
      <div class="pr">${t.p}${t.o ? `<del>${t.o}</del>` : ''}<a href="#cta">Xem chi tiết <span class="ar">→</span></a></div>
    </article>`).join('');
  observe();
}
document.getElementById('tabs').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('on', x === b));
  renderTours(b.dataset.f);
});

// ===== Scroll reveal =====
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .12});
function observe() { document.querySelectorAll('.reveal:not(.in),.big,.sm,.lg,.cb,.why__grid>div,.bt,.rv blockquote,.stats,.about__img,.pn').forEach(el => { el.classList.add('reveal'); io.observe(el); }); }
renderTours('all');

// ===== Counter animation =====
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, dec = +el.dataset.dec || 0, t0 = performance.now();
  (function tick(t) {
    const k = Math.min((t - t0) / 1400, 1);
    el.textContent = (end * k).toLocaleString('vi-VN', {minimumFractionDigits: dec, maximumFractionDigits: dec});
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
  co.unobserve(el);
}), {threshold: .5});
document.querySelectorAll('[data-count]').forEach(el => co.observe(el));
