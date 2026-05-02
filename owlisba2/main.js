// ==============================
// OWLISBA - MAIN JAVASCRIPT
// ==============================

// -- Custom Cursor --
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursor) {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;

  if (cursorTrail) {
    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;
  }

  requestAnimationFrame(animateTrail);
}

animateTrail();

document.querySelectorAll('a, button, .video-card, .game-card, .social-card, .special-card, .lane-card, .product-card, .quick-action, .special-quote').forEach((element) => {
  element.addEventListener('mouseenter', () => {
    if (cursor) {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
    }

    if (cursorTrail) {
      cursorTrail.style.width = '50px';
      cursorTrail.style.height = '50px';
    }
  });

  element.addEventListener('mouseleave', () => {
    if (cursor) {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
    }

    if (cursorTrail) {
      cursorTrail.style.width = '32px';
      cursorTrail.style.height = '32px';
    }
  });
});

// -- Navbar Scroll Effect --
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// -- Hamburger Menu --
const sidebarToggle = document.getElementById('sidebarToggle');
const sidePanel = document.getElementById('sidePanel');
const sidePanelBackdrop = document.getElementById('sidePanelBackdrop');

function setSidebarState(isOpen) {
  if (!sidebarToggle || !sidePanel) return;

  document.body.classList.toggle('sidebar-open', isOpen);
  sidePanel.setAttribute('aria-hidden', String(!isOpen));
  sidebarToggle.setAttribute('aria-expanded', String(isOpen));
  sidebarToggle.setAttribute('aria-label', isOpen ? 'Sag paneli kapat' : 'Sag paneli ac');
}

if (sidebarToggle && sidePanel) {
  sidebarToggle.addEventListener('click', () => {
    setSidebarState(!document.body.classList.contains('sidebar-open'));
  });

  if (sidePanelBackdrop) {
    sidePanelBackdrop.addEventListener('click', () => setSidebarState(false));
  }

  sidePanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setSidebarState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
      setSidebarState(false);
    }
  });
}

// -- Particles --
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
  const PARTICLE_COUNT = 40;

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 6 + 6;
    const opacity = Math.random() * 0.4 + 0.1;
    const colors = ['#ff5f1f', '#ff8c42', '#ffe600', '#39ff14', '#00b4ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      bottom: -10px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      opacity: ${opacity};
      animation: floatUp ${duration}s ${delay}s infinite linear;
    `;

    particlesContainer.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0%   { transform: translateY(0) translateX(0); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 60 + 20}px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// -- Scroll Reveal --
const revealElements = document.querySelectorAll('.reveal, .video-card, .game-card, .social-card, .schedule-day, .stat-item, .server-box');
revealElements.forEach((element) => element.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// -- Counter Animation --
function animateCounter(element, target, duration = 2000) {
  const start = performance.now();

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - ((1 - progress) ** 3);
    const value = Math.round(eased * target);
    element.textContent = value.toLocaleString('tr-TR');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const target = parseInt(element.dataset.target, 10);
      animateCounter(element, target);
      counterObserver.unobserve(element);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach((element) => counterObserver.observe(element));

// -- Copy IP Button --
document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const code = button.previousElementSibling;

    if (!code) return;

    navigator.clipboard.writeText(code.textContent.trim()).then(() => {
      const original = button.textContent;
      button.textContent = 'Kopyalandi!';
      button.style.background = 'var(--green)';
      button.style.color = '#000';
      button.style.borderColor = 'var(--green)';

      setTimeout(() => {
        button.textContent = original;
        button.style.background = '';
        button.style.color = '';
        button.style.borderColor = '';
      }, 2000);
    });
  });
});

// -- Filter Tabs --
document.querySelectorAll('.filter-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const group = tab.closest('.filter-tabs');
    group?.querySelectorAll('.filter-tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    const cards = document.querySelectorAll('.video-card[data-game], .game-card');

    cards.forEach((card) => {
      if (filter === 'all' || card.dataset.game === filter || !card.dataset.game) {
        card.style.display = '';
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// -- Active Nav Link --
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .side-panel-nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// -- Demo Session + Auth Forms --
const DEMO_SESSION_KEY = 'owlisbaDemoSession';

function readDemoSession() {
  try {
    const raw = sessionStorage.getItem(DEMO_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function writeDemoSession(session) {
  try {
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    // Session storage ulasilamazsa demo akis yine de devam eder.
  }
}

function clearDemoSession() {
  try {
    sessionStorage.removeItem(DEMO_SESSION_KEY);
  } catch (error) {
    // Session storage ulasilamazsa demo akis yine de devam eder.
  }
}

function setAuthMessage(target, message, type = 'success') {
  if (!target) return;

  target.textContent = message;
  target.classList.remove('is-error', 'is-success', 'visible');
  target.classList.add('visible', type === 'error' ? 'is-error' : 'is-success');
}

function formatLoginTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Az once';

  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

const loginForm = document.querySelector('[data-auth-form][data-auth-mode="login"]');

if (loginForm) {
  const loginStatus = loginForm.querySelector('[data-auth-status]');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginForm.querySelector('input[name="email"]')?.value.trim() || 'demo@owlisba.net';
    const password = loginForm.querySelector('input[name="password"]')?.value.trim() || '';

    if (!password) {
      setAuthMessage(loginStatus, 'Sifre alanini doldurman gerekiyor.', 'error');
      return;
    }

    const username = email
      .split('@')[0]
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Demo Kullanici';

    writeDemoSession({
      username,
      email,
      loginAt: new Date().toISOString()
    });

    setAuthMessage(loginStatus, 'Demo giris basarili. Panel aciliyor...', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 700);
  });
}

const registerForm = document.querySelector('[data-auth-form][data-auth-mode="register"]');
const verificationPanel = document.querySelector('[data-email-verification]');

if (registerForm && verificationPanel) {
  const registerStatus = registerForm.querySelector('[data-auth-status]');
  const emailInput = registerForm.querySelector('input[name="email"]');
  const passwordInput = registerForm.querySelector('input[name="password"]');
  const repeatInput = registerForm.querySelector('input[name="password-repeat"]');
  const verifyEmail = verificationPanel.querySelector('[data-verify-email]');
  const codeInputs = Array.from(verificationPanel.querySelectorAll('[data-code-digit]'));
  const verifyButton = verificationPanel.querySelector('[data-verify-submit]');
  const resendButton = verificationPanel.querySelector('[data-resend-code]');
  const verificationStatus = verificationPanel.querySelector('[data-verification-status]');
  const getCodeValue = () => codeInputs.map((input) => input.value).join('');

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (passwordInput && repeatInput && passwordInput.value !== repeatInput.value) {
      setAuthMessage(registerStatus, 'Sifre alanlari ayni degil. Lutfen tekrar kontrol et.', 'error');
      verificationPanel.classList.remove('visible');
      verificationPanel.setAttribute('aria-hidden', 'true');
      return;
    }

    if (verifyEmail) {
      verifyEmail.textContent = emailInput?.value || 'eposta@ornek.com';
    }

    verificationPanel.classList.add('visible');
    verificationPanel.setAttribute('aria-hidden', 'false');
    setAuthMessage(registerStatus, 'Kayit talebi alindi. E-postaya 6 haneli dogrulama kodu gonderildi varsayiliyor.', 'success');
    codeInputs[0]?.focus();
  });

  codeInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 1);
      if (input.value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !input.value && index > 0) {
        codeInputs[index - 1].focus();
      }

      if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        codeInputs[index - 1].focus();
      }

      if (event.key === 'ArrowRight' && index < codeInputs.length - 1) {
        event.preventDefault();
        codeInputs[index + 1].focus();
      }
    });

    input.addEventListener('paste', (event) => {
      event.preventDefault();
      const pasted = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, codeInputs.length);
      if (!pasted) return;

      pasted.split('').forEach((char, pastedIndex) => {
        if (codeInputs[pastedIndex]) {
          codeInputs[pastedIndex].value = char;
        }
      });

      codeInputs[Math.min(pasted.length, codeInputs.length - 1)]?.focus();
    });
  });

  verifyButton?.addEventListener('click', () => {
    const codeValue = getCodeValue();

    if (codeValue.length !== 6) {
      setAuthMessage(verificationStatus, 'Lutfen 6 haneli kodun tamamini gir.', 'error');
      return;
    }

    setAuthMessage(verificationStatus, 'Kod dogrulandi varsayiliyor. Backend baglandiginda kayit akisi tamamlanabilir.', 'success');
  });

  resendButton?.addEventListener('click', () => {
    codeInputs.forEach((input) => {
      input.value = '';
    });
    setAuthMessage(verificationStatus, 'Yeni 6 haneli kod gonderildi varsayiliyor. Kutucuklara yeni kodu girebilirsin.', 'success');
    codeInputs[0]?.focus();
  });
}

// -- Dashboard Session Sync --
const dashboardRoot = document.querySelector('[data-dashboard-root]');

if (dashboardRoot) {
  const session = readDemoSession();
  const activeSession = session || {
    username: 'Demo Kullanici',
    email: 'demo@owlisba.net',
    loginAt: null
  };

  document.querySelectorAll('[data-user-name]').forEach((node) => {
    node.textContent = activeSession.username;
  });

  document.querySelectorAll('[data-user-email]').forEach((node) => {
    node.textContent = activeSession.email;
  });

  document.querySelectorAll('[data-login-time]').forEach((node) => {
    node.textContent = activeSession.loginAt ? formatLoginTime(activeSession.loginAt) : 'Demo modu';
  });

  document.querySelectorAll('[data-session-state]').forEach((node) => {
    node.textContent = session ? 'Aktif oturum' : 'Demo onizleme';
  });

  const sessionMessage = dashboardRoot.querySelector('[data-session-message]');
  if (sessionMessage) {
    sessionMessage.textContent = session
      ? 'Login sonrasi asil panel acildi. Buradan icerik, yayin ve topluluk alanlarini yonetebilirsin.'
      : 'Bu ekran login sonrasi deneyimin ornek panelidir. Formdan giris yapinca kullanici bilgileriyle acilir.';
  }
}

document.querySelectorAll('[data-logout-button]').forEach((button) => {
  button.addEventListener('click', () => {
    clearDemoSession();
    window.location.href = 'login.html';
  });
});
