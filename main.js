/* ============================================================
   MAANERA — Ultra-Premium Luxury Real Estate
   JavaScript — Interactions, Animations & Functionality
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ——— Loading Screen ———
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2200);
    document.body.style.overflow = 'hidden';
  }

  // ——— Custom Cursor ———
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');

  if (cursor && cursorDot) {
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    });

    function animateCursor() {
      dotX += (cursorX - dotX) * 0.15;
      dotY += (cursorY - dotY) * 0.15;
      cursor.style.left = dotX + 'px';
      cursor.style.top = dotY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover expansion on interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, select, .property-card, .neighborhood-card, .feature-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ——— Navbar Scroll ———
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ——— Hamburger Menu ———
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ——— Scroll Reveal (Intersection Observer) ———
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ——— Animated Stats Counter ———
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = el.getAttribute('data-target');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const targetNum = parseInt(target);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetNum * eased);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ——— Testimonial Slider ———
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(i);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // ——— Property Save / Heart Toggle ———
  document.querySelectorAll('.property-save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('saved');
      btn.innerHTML = btn.classList.contains('saved') ? '♥' : '♡';
    });
  });

  // ——— Property Gallery (Property Details Page) ———
  const gallery = document.querySelector('.property-gallery');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  if (gallery && prevBtn && nextBtn) {
    let galleryIndex = 0;
    const gallerySlides = gallery.querySelectorAll('.gallery-slide');

    prevBtn.addEventListener('click', () => {
      galleryIndex = (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
      gallery.scrollTo({
        left: gallerySlides[galleryIndex].offsetLeft,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      galleryIndex = (galleryIndex + 1) % gallerySlides.length;
      gallery.scrollTo({
        left: gallerySlides[galleryIndex].offsetLeft,
        behavior: 'smooth'
      });
    });
  }

  // ——— Enquiry Modal ———
  const modalOverlay = document.querySelector('.modal-overlay');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('.modal-close');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalOverlay) {
        modalOverlay.style.display = 'flex';
        requestAnimationFrame(() => { modalOverlay.classList.add('active'); });
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
        setTimeout(() => { modalOverlay.style.display = 'none'; }, 500);
        document.body.style.overflow = '';
      }
    });
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        setTimeout(() => { modalOverlay.style.display = 'none'; }, 500);
        document.body.style.overflow = '';
      }
    });
  }

  // ——— Property Filter (Properties Page) ———
  const filterBtn = document.querySelector('.filter-apply');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      // Simulated filter — in production would call API
      const cards = document.querySelectorAll('.property-card');
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
      });
      setTimeout(() => {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 100);
        });
      }, 300);
    });
  }

  // ——— Form Submission Handler ———
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Sent Successfully';
        btn.style.backgroundColor = 'var(--gold)';
        btn.style.color = 'var(--black)';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.backgroundColor = '';
          btn.style.color = '';
          form.reset();
        }, 2500);
      }
    });
  });

  // ——— Parallax on Hero Image ———
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `scale(${1 + scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
    });
  }

  // ——— Smooth scroll for anchor links ———
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
