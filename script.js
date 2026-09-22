const spotlight = document.querySelector('.spotlight');
window.addEventListener('pointermove', e => { spotlight.style.left = e.clientX + 'px'; spotlight.style.top = e.clientY + 'px'; });
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 25));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), {threshold:.13});
document.querySelectorAll('.reveal,.fade-up').forEach((el, index) => { el.style.transitionDelay = Math.min(index * 65, 360) + 'ms'; observer.observe(el); });
