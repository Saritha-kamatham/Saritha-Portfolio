/* ==========================================================================
   SARITHA KAMATHAM PORTFOLIO - CORE LOGIC & ANIMATIONS (main.js)
   Integrates typing sequences, stats telemetry counters, 3D tilt grids,
   navigation trackers, category filters, and form handlers.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ------------------------------------------------------------------------
  // 1. HERO TYPING ANIMATION
  // ------------------------------------------------------------------------
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const roles = ["Java Developer", "Full Stack Developer", "AI Engineer", "Generative AI Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 150;

    const typeRole = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        delay = 75;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        delay = 150;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        delay = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
      }

      setTimeout(typeRole, delay);
    };

    setTimeout(typeRole, 1000);
  }

  // ------------------------------------------------------------------------
  // 2. STATS TELEMETRY COUNTER (SCROLL-TRIGGERED)
  // ------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter');
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
      const duration = 2000;
      const startTime = performance.now();
      
      const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easeProgress = progress * (2 - progress);
        const currentValue = easeProgress * target;
        
        counter.textContent = currentValue.toFixed(decimals);
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      };
      
      requestAnimationFrame(updateNumber);
    });
  };

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // ------------------------------------------------------------------------
  // 3. DYNAMIC SCROLL REVEALS
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ------------------------------------------------------------------------
  // 4. 3D TILT PARALLAX EFFECT
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  if (tiltCards.length > 0 && window.innerWidth > 992) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        
        const xRel = (cardX / cardRect.width) - 0.5;
        const yRel = (cardY / cardRect.height) - 0.5;
        
        const tiltMaxDeg = 8;
        const rotateY = xRel * tiltMaxDeg;
        const rotateX = -yRel * tiltMaxDeg;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // Java Cyber Terminal Interactive Run Action
  const runJavaBtn = document.getElementById('run-java-code-btn');
  const termCard = document.querySelector('.terminal-card');
  if (runJavaBtn && termCard) {
    runJavaBtn.addEventListener('click', () => {
      runJavaBtn.style.transform = 'scale(0.92)';
      termCard.style.boxShadow = '0 0 35px rgba(0, 242, 254, 0.7)';
      setTimeout(() => {
        runJavaBtn.style.transform = 'none';
        termCard.style.boxShadow = '';
      }, 350);
    });
  }

  // ------------------------------------------------------------------------
  // 5. PROJECT CATEGORY FILTERS
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filter === 'all' || categories.includes(filter)) {
            card.classList.remove('hide-card');
          } else {
            card.classList.add('hide-card');
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. SCROLL ROUTING NAV TRACKER
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120;
    
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // ------------------------------------------------------------------------
  // 7. MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        const isMenu = icon.getAttribute('data-lucide') === 'menu';
        icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
        lucide.createIcons();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. CONTACT FORM TRANSMISSION HANDLER
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form') || document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]') || document.getElementById('form-submit-btn');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Transmitting...</span> <i data-lucide="loader" class="spin"></i>`;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.innerHTML = `<div class="status-success"><i data-lucide="check-circle"></i> Message Transmitted Successfully! Saritha will get back to you shortly.</div>`;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        contactForm.reset();
        
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 1200);
    });
  }

  // ------------------------------------------------------------------------
  // 9. AUTOMATIC HOVER & CLICK EXPAND FOR SKILL CARDS
  // ------------------------------------------------------------------------
  const skillCards = document.querySelectorAll('.skill-card-box');
  skillCards.forEach(card => {
    const label = card.querySelector('.btn-label');
    
    card.addEventListener('mouseenter', () => {
      if (label) label.textContent = 'View Less';
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('expanded') && label) {
        label.textContent = 'View More';
      }
    });
  });
});

// Interactive Skill Card View More / View Less Toggle (On Click)
window.toggleSkillCard = function(btn) {
  const card = btn.closest('.skill-card-box');
  if (!card) return;
  
  const expandGroup = card.querySelector('.skill-expand-group');
  const label = btn.querySelector('.btn-label');
  
  if (!expandGroup) return;
  
  const isExpanded = card.classList.toggle('expanded');
  
  if (label) {
    label.textContent = isExpanded || card.matches(':hover') ? 'View Less' : 'View More';
  }
};
