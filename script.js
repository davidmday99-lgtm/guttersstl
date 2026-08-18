const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.textContent = open ? 'Close' : 'Menu';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    if (navToggle) navToggle.textContent = 'Menu';
  });
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.querySelector('select[name="service"]');
    if (select) select.value = link.dataset.service;
  });
});

const form = document.querySelector('#quote-form');
const formNote = document.querySelector('#form-note');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const email = data.get('email');
  const location = data.get('location') || 'Not provided';
  const service = data.get('service');
  const details = data.get('details') || 'No additional details provided.';
  const subject = `Estimate request: ${service} — ${name}`;
  const body = [
    'Hi Elevated Eddie,',
    '',
    `I would like an estimate for: ${service}`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Property address or ZIP: ${location}`,
    '',
    'Project details:',
    details,
    '',
    'Please contact me about next steps.'
  ].join('\n');

  if (formNote) formNote.textContent = 'Your email app is opening with the request filled in.';
  window.location.href = `mailto:GuttersSTL@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
