/* ==========================================================================
   LIBERTY GYM - JAVASCRIPT INTERACTION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLiveHours();
  initCalculator();
  initSmoothScroll();
});

/* 1. Navbar Scroll Effect & Mobile Menu */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 2. Live Opening Hours Indicator */
function initLiveHours() {
  const statusBadge = document.getElementById('liveStatus');
  if (!statusBadge) return;

  const now = new Date();
  const day = now.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + minute / 60;

  // Gym Hours:
  // Mon-Fri: 07:00 - 22:00
  // Sat: 09:00 - 14:00
  // Sun: Closed
  let isOpen = false;

  if (day >= 1 && day <= 5) {
    if (currentTime >= 7.0 && currentTime < 22.0) {
      isOpen = true;
    }
  } else if (day === 6) {
    if (currentTime >= 9.0 && currentTime < 14.0) {
      isOpen = true;
    }
  }

  if (isOpen) {
    statusBadge.className = 'status-badge open';
    statusBadge.innerHTML = '<span class="pulse-dot"></span> ABIERTO AHORA • Ven a Entrenar';
  } else {
    statusBadge.className = 'status-badge closed';
    statusBadge.innerHTML = '<span class="pulse-dot"></span> CERRADO AHORA • Abre mañana a las 7:00 a.m.';
  }
}

/* 3. Interactive Goal & Plan Calculator for WhatsApp */
function initCalculator() {
  const goalBtns = document.querySelectorAll('[data-goal]');
  const scheduleBtns = document.querySelectorAll('[data-schedule]');
  const waBtn = document.getElementById('calcWaBtn');
  const summaryGoal = document.getElementById('summaryGoal');
  const summarySchedule = document.getElementById('summarySchedule');

  let selectedGoal = 'Entrenamiento Personalizado Guiado';
  let selectedSchedule = 'Horario Flexible (Mañana / Tarde)';

  goalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goalBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedGoal = btn.getAttribute('data-goal');
      if (summaryGoal) summaryGoal.textContent = selectedGoal;
      updateWaLink();
    });
  });

  scheduleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scheduleBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSchedule = btn.getAttribute('data-schedule');
      if (summarySchedule) summarySchedule.textContent = selectedSchedule;
      updateWaLink();
    });
  });

  function updateWaLink() {
    if (!waBtn) return;
    const phone = '56996585310';
    const message = `¡Hola Liberty Gym! 👋 Me gustaría agendar mi clase de prueba / evaluación.
🎯 Mi objetivo principal: ${selectedGoal}
⏰ Mi preferencia de horario: ${selectedSchedule}
📍 Vía sitio web official.`;

    const encoded = encodeURIComponent(message);
    waBtn.href = `https://wa.me/${phone}?text=${encoded}`;
  }

  updateWaLink();
}

/* 4. Smooth Scroll for Navigation */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
