const spotlight = document.querySelector('.spotlight');
spotlight.style.width = spotlight.style.height = '450px';
let pointerX = 0, pointerY = 0, framePending = false;
window.addEventListener('pointermove', e => { pointerX = e.clientX; pointerY = e.clientY; if (!framePending) { framePending = true; requestAnimationFrame(() => { spotlight.style.left = pointerX + 'px'; spotlight.style.top = pointerY + 'px'; framePending = false; }); } });
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 25));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), {threshold:.13});
document.querySelectorAll('.reveal,.fade-up').forEach((el, index) => { el.style.transitionDelay = Math.min(index * 65, 360) + 'ms'; observer.observe(el); });

document.querySelectorAll('a[href^="http"]').forEach(link => { link.target = '_blank'; link.rel = 'noopener noreferrer'; });

const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('menu-open'); menuToggle.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.nav nav a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

const categoryFor = title => title.includes('Movie') || title.includes('Cyclone') || title.includes('Telecom') || title.includes('Car Price') ? 'ml' : title.includes('Email') || title.includes('Sentiment') ? 'nlp' : 'data';
const projects = [...document.querySelectorAll('.project')];
projects.forEach(project => { project.dataset.category = categoryFor(project.querySelector('h2').textContent); });
document.querySelectorAll('.filter[data-filter]').forEach(filter => filter.addEventListener('click', () => { const choice = filter.dataset.filter; document.querySelectorAll('.filter[data-filter]').forEach(button => button.classList.toggle('active', button === filter)); projects.forEach(project => project.classList.toggle('is-filtered', choice !== 'all' && project.dataset.category !== choice)); }));

const navLinks = [...document.querySelectorAll('.nav nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)); }), {rootMargin:'-35% 0px -55% 0px', threshold:0});
sections.forEach(section => activeObserver.observe(section));
