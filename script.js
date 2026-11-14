// ═══════════════════════════════════════════════
//  JERALD SOH — PORTFOLIO SCRIPT
// ═══════════════════════════════════════════════

(function () {
  'use strict';

  /* ── Navbar scroll effect ── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });

  /* ── Active nav link highlighting ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(
    '.section__header, .about__card, .about__text, .skill-card, .project-card, .work-feature, .timeline__item, .cert-item, .contact__wrapper, .about__info-item'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ── Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Animated counter for hero stats ── */
  const animateCounter = (el, target, duration = 1200) => {
    const isDecimal = target % 1 !== 0;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const value = eased * target;
      el.textContent = isDecimal ? value.toFixed(2) : Math.floor(value) + '+';
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isDecimal ? target.toFixed(2) : target + '+';
    };
    requestAnimationFrame(update);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.hero__stat-num');
        const targets = [3.73, 4, 7];
        nums.forEach((num, i) => animateCounter(num, targets[i]));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero__stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ── Tag hover glow effect ── */
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.boxShadow = '0 0 12px rgba(232,213,176,0.3)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.boxShadow = '';
    });
  });

  /* ── Cursor trailing glow (subtle) ── */
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,213,176,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.4s ease, top 0.4s ease;
  `;
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  /* ── Console easter egg ── */
  console.log(
    '%c👋 Hey there! Curious about the code? Let\'s connect!',
    'color: #e8d5b0; font-size: 14px; font-weight: bold; padding: 8px 0;'
  );
  console.log(
    '%c📧 sjiale8@gmail.com | 🔗 linkedin.com/in/jerald-soh-853682373',
    'color: #9a8f7e; font-size: 12px;'
  );

})();

