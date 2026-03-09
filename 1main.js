/**
 * BLCK Specialty Coffee — Loader, nav, section highlighting (grouped menu)
 */
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sectionNavBtns = document.querySelectorAll('.section-nav-btn');
  const menuGroups = document.querySelectorAll('.menu-group');

  // ——— Loader ———
  const loaderProgress = document.querySelector('.loader-progress');
  const hideLoader = () => {
    if (loader) {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  if (loaderProgress) {
    loaderProgress.addEventListener('animationend', () => {
      setTimeout(hideLoader, 200);
    });
  } else {
    setTimeout(hideLoader, 1200);
  }

  if (loader) document.body.style.overflow = 'hidden';

  // ——— Footer year ———
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ——— Mobile menu ———
  function closeMenu() {
    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleMenu() {
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !e.target.closest('.nav')) {
        closeMenu();
      }
    });
  }

  // ——— Section nav: highlight active group on scroll ———
  function updateActiveSection() {
    const scrollY = window.scrollY;
    const headerOffset = 140;

    let current = null;
    menuGroups.forEach((group) => {
      const top = group.getBoundingClientRect().top + scrollY - headerOffset;
      const height = group.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = group.id;
      }
    });

    sectionNavBtns.forEach((btn) => {
      const href = btn.getAttribute('href');
      const id = href ? href.slice(1) : '';
      btn.classList.toggle('active', id === current);
    });
  }

  if (sectionNavBtns.length && menuGroups.length) {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  }
});
