/* ======================================================
   KRISHAL POUDEL — PORTFOLIO INTERACTIONS
   ====================================================== */

(function () {
  'use strict';

  // ===== LOADER =====
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 1600);
  });

  // ===== AOS INIT =====
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 0,
    });
  }

  // ===== VANILLA TILT =====
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 8,
      speed: 800,
      glare: true,
      'max-glare': 0.15,
      perspective: 1000,
      scale: 1.02,
    });
  }

  // ===== CUSTOM CURSOR =====
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect for interactive elements
    const interactives = 'a, button, input, textarea, [data-tilt], .skill-card, .interest-card, .project-card, .contact-item, .timeline-content';
    document.querySelectorAll(interactives).forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ===== NAVIGATION =====
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Scroll effects
  window.addEventListener('scroll', () => {
    // Nav background
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Scroll progress
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = progress + '%';
    }

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Active nav link based on section
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // Active section detection
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.id;
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Back to top click
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== TYPED ROLES ANIMATION =====
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    const roles = [
      'AI Enthusiast',
      'Market Analyst',
      'Lifelong Learner',
      'Trading & Data Analyst',
      'Prompt Engineer'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let pauseTime = 0;

    function typeLoop() {
      const current = roles[roleIdx];
      if (pauseTime > 0) {
        pauseTime--;
        setTimeout(typeLoop, 40);
        return;
      }

      if (!isDeleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          pauseTime = 40; // pause at full word
        }
      } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          pauseTime = 8;
        }
      }

      setTimeout(typeLoop, isDeleting ? 40 : 90);
    }
    typeLoop();
  }

  // ===== STAT COUNTERS =====
  const statNums = document.querySelectorAll('.stat-num');
  const animatedStats = new Set();

  function animateCount(el) {
    if (animatedStats.has(el)) return;
    animatedStats.add(el);
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + (target >= 100 ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + (target >= 100 ? '+' : '');
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNums.forEach(s => statObserver.observe(s));

  // ===== PARTICLES BACKGROUND =====
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];
    const PARTICLE_COUNT = window.innerWidth < 768 ? 35 : 70;
    const colors = ['#22d3ee', '#a855f7', '#ec4899'];
    let mouseParticleX = -1000;
    let mouseParticleY = -1000;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
      mouseParticleX = e.clientX;
      mouseParticleY = e.clientY;
    });

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
        this.baseOpacity = this.opacity;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = this.x - mouseParticleX;
        const dy = this.y - mouseParticleY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
          this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
        } else {
          this.opacity += (this.baseOpacity - this.opacity) * 0.05;
        }

        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 130) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ===== CONTACT FORM (mailto) =====
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const mobile = form.mobile.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        formNote.textContent = 'Please fill all required fields.';
        formNote.className = 'form-note error';
        return;
      }

      const body = `Hi Krishal,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A---%0D%0AFrom: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0AMobile: ${encodeURIComponent(mobile || 'N/A')}`;
      const mailto = `mailto:krishalp660812@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${body}`;

      window.location.href = mailto;
      formNote.textContent = '✓ Opening your email client...';
      formNote.className = 'form-note success';

      setTimeout(() => {
        form.reset();
        formNote.textContent = '';
        formNote.className = 'form-note';
      }, 4000);
    });
  }

  // ===== KEYBOARD NAV (Escape closes mobile menu) =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  // ===== PARALLAX ON HERO IMAGE =====
  const hexContainer = document.querySelector('.hex-container');
  if (hexContainer && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      hexContainer.style.setProperty('--mx', x + 'px');
      hexContainer.style.setProperty('--my', y + 'px');
    });
  }

  // ===== INITIAL ACTIVE STATE =====
  setTimeout(updateActiveNavLink, 200);

  console.log('%c✦ Krishal Poudel Portfolio ✦', 'font-size:16px;font-weight:bold;background:linear-gradient(90deg,#22d3ee,#a855f7);-webkit-background-clip:text;color:transparent;padding:6px');
  console.log('%cCrafted with passion in Chitwan, Nepal 🇳🇵', 'color:#22d3ee');
})();
