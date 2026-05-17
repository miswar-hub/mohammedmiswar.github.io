// BigPlanetarium — script.js  |  All planet content lives in index.html


// ── 1. STAR CANVAS ───────────────────────────────────────────────
var canvas = document.getElementById('starCanvas');
var ctx = canvas.getContext('2d');
var stars = [];

// Fit canvas to window, rebuild star positions
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function buildStars() {
  stars = [];
  for (var i = 0; i < 260; i++) {
    stars.push({ x: Math.random() * canvas.width,  y: Math.random() * canvas.height,
                 size: Math.random() * 1.8 + 0.3,  speed: Math.random() * 0.4 + 0.1,
                 phase: Math.random() * Math.PI * 2 });
  }
}

// Sine wave gives every star its own twinkling rhythm
function animateStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(function(s) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (0.2 + 0.8 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase))) + ')';
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}

resizeCanvas(); buildStars(); requestAnimationFrame(animateStars);
window.addEventListener('resize', function() { resizeCanvas(); buildStars(); });


// ── 2. HAMBURGER MENU ────────────────────────────────────────────
var hamburger = document.getElementById('hamburger');
var navLinks  = document.querySelector('.nav-links');

// Toggle mobile nav open/closed and update aria-expanded for screen readers
hamburger.addEventListener('click', function() {
  hamburger.setAttribute('aria-expanded', String(navLinks.classList.toggle('open')));
});
navLinks.querySelectorAll('a').forEach(function(a) {
  a.addEventListener('click', function() { navLinks.classList.remove('open'); });
});


// ── 3. SCROLL REVEAL ─────────────────────────────────────────────
// Hide every section first, then fade it in when it enters the viewport
document.querySelectorAll('.section').forEach(function(sec) {
  sec.style.opacity = '0'; sec.style.transform = 'translateY(28px)';
  sec.style.transition = 'opacity .7s ease, transform .7s ease';
});
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section').forEach(function(s) { obs.observe(s); });


// ── 4. SATURN TABS ───────────────────────────────────────────────
// Clicking a tab activates it and shows only its matching panel
document.querySelectorAll('.tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.tab-content').forEach(function(p) {
      p.id === 'tab-' + tab.dataset.tab ? p.classList.remove('hidden') : p.classList.add('hidden');
    });
  });
});


// ── 5. PLANET PICKER ─────────────────────────────────────────────
// Planet info cards are already written in HTML. JS just shows the right one.
document.querySelectorAll('.picker-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.picker-btn').forEach(function(b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    var prompt = document.getElementById('cardPrompt');
    if (prompt) prompt.style.display = 'none'; // hide the placeholder text
    document.querySelectorAll('.planet-info-panel').forEach(function(p) {
      p.id === btn.getAttribute('data-target') ? p.classList.remove('hidden') : p.classList.add('hidden');
    });
  });
});