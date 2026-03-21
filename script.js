/* ============================================================
   W ASSETS — script.js
   ============================================================ */

'use strict';

/* ---------- Header scroll effect ---------- */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Hamburger / Mobile Nav ---------- */
(function () {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  nav.querySelectorAll('.mob-link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });
})();

/* ---------- Reveal on scroll (IntersectionObserver) ---------- */
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el, i) {
    // Stagger delay for siblings
    const parent = el.parentElement;
    const siblings = parent ? Array.from(parent.querySelectorAll('.reveal')) : [];
    const idx = siblings.indexOf(el);
    if (idx > 0) {
      el.style.transitionDelay = (idx * 0.1) + 's';
    }
    observer.observe(el);
  });
})();

/* ---------- Hero reveal on load ---------- */
(function () {
  window.addEventListener('load', function () {
    document.querySelectorAll('.hero .reveal').forEach(function (el) {
      setTimeout(function () {
        el.classList.add('visible');
      }, 200);
    });
  });
})();

/* ---------- Active nav highlight ---------- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--white)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(function (sec) { observer.observe(sec); });
})();

/* ---------- Contact form (placeholder handler) ---------- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('必須項目（お名前・メールアドレス・メッセージ）をご入力ください。');
      return;
    }

    // Placeholder: show success message
    btn.textContent = '送信しました';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'default';

    // Reset after 4s
    setTimeout(function () {
      btn.textContent = '送信する';
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.cursor = '';
      form.reset();
    }, 4000);
  });
})();
