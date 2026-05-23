/* ============================================
   RAFAEL ALIF RAMADHAN — Personal Branding
   script.js
   ============================================ */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-cat, .porto-card, .kontak-card, .interest-chip').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.6)';
    ring.style.width  = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = 'var(--neon-pink)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'var(--neon-cyan)';
  });
});

/* ── TYPING ANIMATION ──
   Ganti isi array 'phrases' untuk mengubah teks yang diketik */
const phrases = [
  'Pelajar SMK yang Bersemangat',
  'Pecinta Teknologi & Desain',
  'Content Creator Muda',
  'Selalu Belajar, Selalu Bertumbuh',
  'Rafael Alif Ramadhan 🚀'
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const cur = phrases[pi];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ci + 1);
    ci++;
    if (ci === cur.length) { setTimeout(() => { deleting = true; type(); }, 2000); return; }
    setTimeout(type, 68);
  } else {
    typedEl.textContent = cur.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, 35);
  }
}
setTimeout(type, 800);

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .15 });
reveals.forEach(r => revealObs.observe(r));

/* ── SKILL BAR ANIMATION ── */
const bars = document.querySelectorAll('.skill-bar-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
}, { threshold: .3 });
bars.forEach(b => barObs.observe(b));

/* ── NAV ACTIVE HIGHLIGHT ── */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + cur;
    a.style.color       = isActive ? 'var(--neon-cyan)' : '';
    a.style.borderColor = isActive ? 'var(--neon-cyan)' : 'transparent';
    a.style.background  = isActive ? 'rgba(0,245,255,.06)' : '';
  });
});

/* ── SEND BUTTON ── */
function handleSend() {
  const btn = document.getElementById('send-btn');
  btn.textContent = 'Terkirim! ✓';
  btn.style.borderColor = 'var(--neon-green)';
  btn.style.color       = 'var(--neon-green)';
  setTimeout(() => {
    btn.textContent = 'Kirim Pesan →';
    btn.style.borderColor = '';
    btn.style.color = '';
  }, 3000);
}

/* ── FOTO UPLOAD ──
   Klik label "Pasang Foto Profil" → pilih foto dari komputer
   Foto langsung tampil di orb hero.
   Untuk foto permanen: letakkan file foto di folder yang sama,
   lalu di index.html ganti isi #orb-photo dengan:
   <img src="foto.jpg" alt="Rafael Alif Ramadhan" /> */
const fotoInput  = document.getElementById('foto-upload');
const fotoStatus = document.getElementById('foto-status');
const orbPhoto   = document.getElementById('orb-photo');

fotoInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    orbPhoto.innerHTML = `<img src="${e.target.result}" alt="Rafael Alif Ramadhan" />`;
    fotoStatus.textContent = '✓ Foto terpasang!';
    fotoStatus.style.color = 'var(--neon-green)';
    setTimeout(() => { fotoStatus.textContent = ''; }, 3000);
  };
  reader.readAsDataURL(file);
});

/* ── NEON PARTICLE ON CLICK ── */
document.addEventListener('click', e => {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-purple)', 'var(--neon-green)'];
    const c = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * 360;
    const dist  = 40 + Math.random() * 40;
    Object.assign(p.style, {
      position: 'fixed',
      left: e.clientX + 'px', top: e.clientY + 'px',
      width: '6px', height: '6px',
      background: c, borderRadius: '50%',
      boxShadow: `0 0 6px ${c}`,
      pointerEvents: 'none', zIndex: '9999',
      transform: 'translate(-50%,-50%)',
      transition: 'all .6s ease-out',
    });
    document.body.appendChild(p);
    const rad = angle * (Math.PI / 180);
    setTimeout(() => {
      p.style.left    = (e.clientX + Math.cos(rad) * dist) + 'px';
      p.style.top     = (e.clientY + Math.sin(rad) * dist) + 'px';
      p.style.opacity = '0';
    }, 10);
    setTimeout(() => p.remove(), 620);
  }
});

