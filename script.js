// ==================== Custom Cursor ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .feature, .contact-item');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
});

// Show default cursor on interactive elements for accessibility
interactiveElements.forEach(el => {
  el.style.cursor = 'pointer';
});

// ==================== Navbar Scroll Effect ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==================== Counter Animation ====================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 50;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// ==================== Scroll Animations ====================
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counter animation when stats become visible
      if (entry.target.querySelector('.stat-number')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe all sections for fade-in
document.querySelectorAll('section, .project-card, .skill-card, .feature').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ==================== Smooth Scroll for Nav Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==================== Form Submission ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Loading state
  submitBtn.innerHTML = '发送中...';
  submitBtn.disabled = true;

  // Simulate submission
  setTimeout(() => {
    showToast('消息已发送！感谢您的联系。');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    contactForm.reset();
  }, 1500);
});

// ==================== Toast Notification ====================
function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==================== Typing Animation Reset ====================
const typingLine = document.querySelector('.terminal-line.typing');
if (typingLine) {
  const phrases = [
    '持续学习中...',
    '探索 AI Agent 应用...',
    '编写高质量代码...',
    '深入研究技术...',
    '期待新的挑战...'
  ];
  let phraseIndex = 0;

  setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    const typingText = typingLine.querySelector('.typing-text');
    if (typingText) {
      typingText.style.opacity = '0';
      setTimeout(() => {
        typingText.textContent = phrases[phraseIndex];
        typingText.style.opacity = '1';
      }, 200);
    }
  }, 3000);
}

// ==================== Parallax Effect for Hero Shapes ====================
window.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  shapes.forEach((shape, i) => {
    const factor = (i + 1) * 0.5;
    shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

console.log('%c 侯靖清 %c Portfolio ',
  'background:#6c5ce7;color:white;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:bold;',
  'background:#00d4aa;color:black;padding:4px 8px;border-radius:0 4px 4px 0;font-weight:bold;'
);
