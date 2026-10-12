const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    }
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
