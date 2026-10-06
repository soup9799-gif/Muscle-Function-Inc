const S = window.SITE;
document.querySelectorAll('[data-c]').forEach(e => {
  e.textContent = e.dataset.c.split('.').reduce((o, k) => o && o[k], S) || '';
});
const A = document.getElementById('assess');
if (A) A.innerHTML = S.assessments.map(([t, d, p]) =>
  `<div class="card reveal"><svg viewBox="0 0 24 24"><path d="${p}"/></svg><h3>${t}</h3><p>${d}</p></div>`).join('');
const N = document.getElementById('newsList');
if (N) N.innerHTML = S.news.map(n =>
  `<li class="reveal"><time>${n.date}</time><span class="t">${n.tag}</span><span>${n.title}</span></li>`).join('');

const nav = document.querySelector('nav');
document.querySelector('.burger').onclick = () => nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a => a.onclick = () => nav.classList.remove('open'));

const countUp = c => {
  const t = +c.dataset.n, s = performance.now();
  (function f(n) {
    const p = Math.min((n - s) / 1400, 1);
    c.textContent = Math.round(t * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(f);
  })(s);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('on');
  e.target.querySelectorAll('[data-n]').forEach(countUp);
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('.reveal,.chartbox').forEach(e => io.observe(e));

const f = document.querySelector('form');
if (f) f.onsubmit = e => {
  e.preventDefault();
  alert('문의가 접수되었습니다. (데모: 실제 전송은 백엔드 연동 후 활성화됩니다)');
  f.reset();
};
