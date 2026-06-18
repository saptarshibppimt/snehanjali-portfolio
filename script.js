/* ═══════════════════════════════════════════════════════
   SNEHANJALI DAS — PORTFOLIO  |  script.js
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ─── PARTICLES ─────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 700 ? 18 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${(Math.random()*6+5).toFixed(1)}s;
      --delay:${(Math.random()*6).toFixed(1)}s;
      opacity:0;
    `;
    container.appendChild(p);
  }
}

/* ─── NAVBAR SCROLL ─────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function onScroll() {
    // Scrolled state
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Active link highlight
    const scrollMid = window.scrollY + window.innerHeight / 2;
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      const bot = top + sec.offsetHeight;
      if (scrollMid >= top && scrollMid < bot) {
        links.forEach(l => l.classList.remove('active'));
        const match = navbar.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (match) match.classList.add('active');
      }
    });

    // Back-to-top visibility
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── MOBILE HAMBURGER ──────────────────────────────────── */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('nav-links');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    // Animate hamburger to X
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      const spans = btn.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ─── REVEAL ON SCROLL ──────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ─── HERO GREETING ANIMATION ───────────────────────────── */
function initHeroAnimations() {
  // Stagger hero elements
  const greeting = document.querySelector('.hero-greeting');
  const name     = document.querySelector('.hero-name');
  if (greeting) setTimeout(() => { greeting.style.transition = 'opacity .8s ease, transform .8s ease'; greeting.style.opacity = '1'; }, 400);
  if (name)     setTimeout(() => { name.style.transition = 'opacity 1s ease, transform 1s ease'; name.style.opacity = '1'; name.style.transform = 'none'; }, 700);
}

/* ─── ANIMATED COUNTERS ─────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const isFloat = String(target).includes('.');
      const decimals = isFloat ? 2 : 0;
      const duration = 1800;
      const start    = performance.now();

      function tick(now) {
        const elapsed = Math.min(now - start, duration);
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = current.toFixed(decimals) + suffix;
        if (elapsed < duration) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─── SKILL BARS ────────────────────────────────────────── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const width = el.dataset.width + '%';
      setTimeout(() => { el.style.width = width; }, 150);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
}

/* ─── SMOOTH SCROLL FOR HERO SCROLL BUTTON ──────────────── */
function initScrollDown() {
  const btn = document.getElementById('scroll-down');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ─── BACK TO TOP ───────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── CONTACT FORM ──────────────────────────────────────── */
function initContactForm() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#cf-name').value.trim();
    const email   = form.querySelector('#cf-email').value.trim();
    const message = form.querySelector('#cf-message').value.trim();

    if (!name || !email || !message) {
      feedback.textContent = '⚠️ Please fill in your name, email, and message.';
      feedback.style.color = '#e07a8f';
      return;
    }

    const submitBtn = document.getElementById('form-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // Simulate form submission (replace with real service like Formspree)
    setTimeout(() => {
      feedback.textContent = '✅ Thank you! Your message has been sent. I will get back to you soon.';
      feedback.style.color = '#1eb8b8';
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message ✉️';
    }, 1400);
  });
}

/* ─── TYPING EFFECT ON SUBTITLE ─────────────────────────── */
function initTyping() {
  const roles = ['Educator', 'Author', 'Classical Vocalist', 'Researcher', 'Literary Scholar'];
  const el = document.querySelector('.hero-name');
  if (!el) return; // skip, not using typing on name here
}

/* ─── CURSOR GLOW ───────────────────────────────────────── */
function initCursorGlow() {
  if (window.innerWidth < 700) return; // desktop only
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:300px; height:300px; border-radius:50%;
    background:radial-gradient(circle, rgba(30,184,184,0.04) 0%, transparent 70%);
    pointer-events:none; transform:translate(-50%,-50%);
    transition:left .12s ease,top .12s ease;
    z-index:9999;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ─── PROFILE IMAGE HOVER TILT ──────────────────────────── */
function initTilt() {
  const img = document.getElementById('profile-img');
  if (!img || window.innerWidth < 700) return;

  const wrap = img.closest('.hero-avatar-wrap');
  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    wrap.style.transform = `perspective(600px) rotateY(${dx*10}deg) rotateX(${-dy*10}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = '';
  });
}

/* ─── CARD TILT ─────────────────────────────────────────── */
function initCardTilt() {
  if (window.innerWidth < 700) return;
  document.querySelectorAll('.hobby-card, .cert-card, .award-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ─── SECTION HIGHLIGHT ON ENTER ────────────────────────── */
function initSectionHighlight() {
  const lines = document.querySelectorAll('.section-line');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = '120px';
        entry.target.style.transition = 'width 1s ease';
      }
    });
  }, { threshold: 0.8 });
  lines.forEach(l => {
    l.style.width = '0';
    observer.observe(l);
  });
}

/* ─── INIT ALL ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initHamburger();
  initReveal();
  initHeroAnimations();
  initCounters();
  initSkillBars();
  initScrollDown();
  initBackToTop();
  initContactForm();
  initCursorGlow();
  initTilt();
  initCardTilt();
  initSectionHighlight();
});
