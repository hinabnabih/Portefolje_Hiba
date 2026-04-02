// ===== GSAP Animation Library =====
// GSAP loaded from CDN in index.html

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinks');

if (navToggle && navLinksMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
    document.body.style.overflow = navLinksMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinksMenu.contains(e.target) && navLinksMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinksMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===== ANIMATED COUNTERS =====
function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(element);
}

const projectCount = document.getElementById('projectCount');
const expCount = document.getElementById('expCount');

if (projectCount) animateCounter(projectCount, 6, 1500);
if (expCount) animateCounter(expCount, 8, 1500);

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== PROJECT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length && projectCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.skill-card, .project-card, .about-text, .timeline-item, .education-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(15px)';
      setTimeout(() => {
        entry.target.style.transition = 'all 0.5s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 50);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== TIMELINE ANIMATIONS =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const dot = entry.target.querySelector('.timeline-dot');
      if (dot) {
        dot.style.transform = 'scale(1.2)';
        setTimeout(() => {
          dot.style.transform = 'scale(1)';
        }, 200);
      }
      
      const card = entry.target.querySelector('.timeline-card');
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-10px)';
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
        }, 100);
      }
      
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ===== HOVER EFFECTS =====
const techTags = document.querySelectorAll('.tech-tag, .skill-tags span, .timeline-tags span, .project-tags span');
techTags.forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-1px)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'translateY(0)';
  });
});

// ===== CONTACT CARD HOVER =====
const contactCard = document.querySelector('.contact-card');
if (contactCard) {
  contactCard.addEventListener('mouseenter', () => {
    contactCard.style.transform = 'translateY(-2px)';
    contactCard.style.transition = 'all 0.2s ease';
  });
  contactCard.addEventListener('mouseleave', () => {
    contactCard.style.transform = 'translateY(0)';
  });
}

// ===== STATS HOVER EFFECT =====
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
  stat.addEventListener('mouseenter', () => {
    const number = stat.querySelector('.stat-number');
    if (number) {
      number.style.transform = 'scale(1.05)';
      number.style.transition = 'transform 0.2s ease';
    }
  });
  stat.addEventListener('mouseleave', () => {
    const number = stat.querySelector('.stat-number');
    if (number) {
      number.style.transform = 'scale(1)';
    }
  });
});

// ===== DYNAMIC YEAR IN FOOTER =====
const footerYear = document.querySelector('.footer p');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroLeft = document.querySelector('.hero-left');
  if (heroLeft && window.innerWidth > 768) {
    heroLeft.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});

// ===== COPY EMAIL TO CLIPBOARD =====
const emailElement = document.querySelector('.contact-item:first-child span');
if (emailElement) {
  emailElement.style.cursor = 'pointer';
  emailElement.addEventListener('click', () => {
    const email = emailElement.textContent;
    navigator.clipboard.writeText(email).then(() => {
      const tooltip = document.createElement('div');
      tooltip.textContent = 'Kopiert!';
      tooltip.style.position = 'fixed';
      tooltip.style.bottom = '100px';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.background = 'var(--text-dark)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '0.4rem 0.9rem';
      tooltip.style.borderRadius = '50px';
      tooltip.style.fontSize = '0.75rem';
      tooltip.style.zIndex = '10000';
      tooltip.style.animation = 'fadeOut 1.8s ease forwards';
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 1800);
    });
  });
}

const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  @keyframes fadeOut {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    70% { opacity: 1; }
    100% { opacity: 0; transform: translateX(-50%) translateY(-15px); }
  }
`;
document.head.appendChild(fadeStyle);

// ===== PAGE LOAD =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  setTimeout(() => {
    document.querySelectorAll('.hero-left, .hero-right').forEach(el => {
      if (el) el.style.opacity = '1';
    });
  }, 100);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp') {
    window.scrollBy({ top: -window.innerHeight * 0.7, behavior: 'smooth' });
  }
  if (e.key === 'Home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (e.key === 'End') {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  z-index: 10001;
  transition: width 0.08s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + '%';
});

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn-primary, .filter-btn, .social-link');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: rippleAnim 0.5s linear;
    pointer-events: none;
  }
  
  @keyframes rippleAnim {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ===== TIMELINE VISIBILITY ON SCROLL =====
const timelineSection = document.querySelector('.timeline-section');
if (timelineSection) {
  const timelineScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const timeline = document.querySelector('.timeline');
        if (timeline) {
          timeline.classList.add('in-view');
        }
      }
    });
  }, { threshold: 0.2 });
  
  timelineScrollObserver.observe(timelineSection);
}

// ===== CONSOLE MESSAGE =====
console.log('Portefølje - Hiba Leena Nabih');
console.log('IT-student og Service Operations Engineer hos Tet Digital');

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
  });
  
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-10px)';
  });
  
  setTimeout(() => {
    if (document.querySelector('.about-text')) {
      revealObserver.observe(document.querySelector('.about-text'));
    }
  }, 100);
  
  setTimeout(() => {
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        if (item.getBoundingClientRect().top < window.innerHeight) {
          const dot = item.querySelector('.timeline-dot');
          if (dot) {
            dot.style.transform = 'scale(1.15)';
            setTimeout(() => {
              dot.style.transform = 'scale(1)';
            }, 200);
          }
        }
      }, index * 80);
    });
  }, 400);
});