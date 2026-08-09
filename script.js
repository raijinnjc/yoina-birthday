/* ============================================================
   MODE PREVIEW
   Tambahkan ?preview di akhir URL untuk:
   - Melewati countdown (kado langsung muncul)
   - Memunculkan panel kecil di bawah layar untuk lompat
     ke layar mana pun secara instan (1–6)

   Contoh: index.html?preview
   Hapus parameter ini (buka index.html biasa) saat sudah
   siap dikirim ke Yoina, supaya countdown berjalan normal.
   ============================================================ */
const PREVIEW_MODE = new URLSearchParams(window.location.search).has('preview');

/* ============ AMBIENT BACKGROUND ============ */
const ambient = document.getElementById('ambient');

/* --- Aurora Glow Orbs --- */
const auroraColors = [
  'rgba(255,107,157,.18)',   // pink
  'rgba(120,80,220,.2)',     // purple
  'rgba(232,160,176,.15)',   // rose gold
  'rgba(240,194,127,.1)',    // warm gold
];
for(let i = 0; i < 4; i++){
  const orb = document.createElement('div');
  orb.className = 'aurora-orb';
  const size = 200 + Math.random() * 250;
  orb.style.width = size + 'px';
  orb.style.height = size + 'px';
  orb.style.background = auroraColors[i % auroraColors.length];
  orb.style.top = (Math.random() * 80) + '%';
  orb.style.left = (Math.random() * 80) + '%';
  orb.style.setProperty('--ax', (Math.random() * 200 - 100) + 'px');
  orb.style.setProperty('--ay', (Math.random() * 200 - 100) + 'px');
  orb.style.animationDuration = (15 + Math.random() * 15) + 's';
  orb.style.animationDelay = (Math.random() * 8) + 's';
  ambient.appendChild(orb);
}

/* --- Floating Petals (with rose-gold tones) --- */
const petalChars = ['❀','✿','♡','✦','❁'];
const petalColors = ['#ffa0c4','#e8a0b0','#f5d9a0','#b896cc','#ff6b9d'];
for(let i = 0; i < 18; i++){
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petalChars[Math.floor(Math.random()*petalChars.length)];
  p.style.left = Math.random()*100+'%';
  p.style.fontSize = (12+Math.random()*14)+'px';
  p.style.color = petalColors[Math.floor(Math.random()*petalColors.length)];
  p.style.animationDuration = (10+Math.random()*10)+'s';
  p.style.animationDelay = (Math.random()*12)+'s';
  ambient.appendChild(p);
}

/* --- Fireflies --- */
for(let i = 0; i < 50; i++){
  const f = document.createElement('div');
  f.className = 'firefly';
  const size = Math.random() * 3 + 1.5;
  f.style.width = size + 'px';
  f.style.height = size + 'px';
  f.style.top = Math.random() * 100 + '%';
  f.style.left = Math.random() * 100 + '%';
  f.style.background = Math.random() > 0.5 ? '#ffa0c4' : '#e8a0b0';
  f.style.animationDelay = (Math.random() * 5) + 's';
  f.style.animationDuration = (2 + Math.random() * 4) + 's';
  ambient.appendChild(f);
}

/* ============ ANIMASI BUKA KADO ============ */
function spawnConfettiExplosion(originEl){
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;

  const confettiColors = ['#ff6b9d','#ffa0c4','#e8a0b0','#f0c27f','#f5d9a0','#b896cc','#fff8f2','#9b6bb5'];
  const festiveChars = ['✨','💖','🎉','✦','🎊','💝','🌟','⭐'];

  // Emoji burst
  for(let i = 0; i < 25; i++){
    const dot = document.createElement('div');
    dot.className = 'gift-sparkle-burst';
    dot.textContent = festiveChars[Math.floor(Math.random() * festiveChars.length)];
    dot.style.background = 'transparent';
    dot.style.fontSize = (14 + Math.random() * 20) + 'px';

    const angle = (Math.PI * 2) * Math.random();
    const dist = 80 + Math.random() * 180;
    dot.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    dot.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
    dot.style.position = 'fixed';
    dot.style.zIndex = '50';
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 1200);
  }

  // Confetti rectangles
  for(let i = 0; i < 40; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const w = 4 + Math.random() * 6;
    const h = 8 + Math.random() * 12;
    piece.style.width = w + 'px';
    piece.style.height = h + 'px';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

    const angle = (Math.PI * 2) * Math.random();
    const dist = 100 + Math.random() * 250;
    piece.style.setProperty('--cx', Math.cos(angle) * dist + 'px');
    piece.style.setProperty('--cy', (Math.sin(angle) * dist - Math.random() * 100) + 'px');
    piece.style.setProperty('--cr', (Math.random() * 720 - 360) + 'deg');
    piece.style.left = cx + 'px';
    piece.style.top = cy + 'px';
    piece.style.animationDuration = (1 + Math.random() * 0.8) + 's';
    piece.style.animationDelay = (Math.random() * 0.3) + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }

  // Glowing dots
  for(let i = 0; i < 20; i++){
    const dot = document.createElement('div');
    dot.className = 'gift-sparkle-burst';
    const s = 3 + Math.random() * 5;
    dot.style.width = s + 'px';
    dot.style.height = s + 'px';
    dot.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    dot.style.boxShadow = `0 0 6px 2px ${confettiColors[Math.floor(Math.random() * confettiColors.length)]}`;

    const angle = (Math.PI * 2) * Math.random();
    const dist = 60 + Math.random() * 140;
    dot.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    dot.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
    dot.style.position = 'fixed';
    dot.style.zIndex = '50';
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 1200);
  }
}

function triggerCameraShake(){
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 500);
}

let giftOpening = false;
function openGift(){
  if(giftOpening) return;
  giftOpening = true;

  const screen1 = document.getElementById('screen-1');
  const giftWrap = document.getElementById('gift-wrap');
  const giftBox = giftWrap.querySelector('.gift-box');

  // 1) semua tulisan di layar 1 fade out dulu, biar fokus ke kado
  screen1.querySelectorAll('.eyebrow, h1, .subtitle').forEach(el => {
    el.classList.add('fade-out-text');
  });

  // 2) sedikit jeda, lalu mainkan animasi kado terbuka
  setTimeout(() => {
    giftWrap.classList.add('opening');
  }, 250);

  // 3) di tengah animasi, trigger confetti + camera shake
  setTimeout(() => {
    spawnConfettiExplosion(giftBox);
    triggerCameraShake();
  }, 250 + 800);

  // 4) setelah animasi kado selesai, baru pindah ke layar 2
  setTimeout(() => {
    goTo(2);
  }, 250 + 1600);
}

/* ============ NAVIGATION (NO SCROLL, CLICK ONLY) ============ */
let currentScreen = 1;
function goTo(n){
  const current = document.getElementById('screen-'+currentScreen);
  const next = document.getElementById('screen-'+n);
  if(!next) return;
  current.classList.remove('active');
  next.classList.add('active');
  currentScreen = n;

  if(n === 3) startTypewriter();
  if(n === 6){ launchHearts(); startFireworks(); }
  if(n === 1) resetGiftState();
}

function resetGiftState(){
  giftOpening = false;
  const screen1 = document.getElementById('screen-1');
  const giftWrap = document.getElementById('gift-wrap');
  screen1.querySelectorAll('.fade-out-text').forEach(el => el.classList.remove('fade-out-text'));
  giftWrap.classList.remove('opening');
}

/* ============ COUNTDOWN -> GIFT BOX ============ */
const targetDate = new Date('2026-08-16T00:00:00+07:00').getTime();
let countdownInterval;

function showGiftBox(){
  document.getElementById('countdown').style.display = 'none';
  document.getElementById('gift-wrap').classList.add('show');
}

function updateCountdown(){
  const now = new Date().getTime();
  const diff = targetDate - now;

  if(diff <= 0){
    showGiftBox();
    clearInterval(countdownInterval);
    return;
  }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const m = Math.floor((diff % (1000*60*60)) / (1000*60));
  const s = Math.floor((diff % (1000*60)) / 1000);

  document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-seconds').textContent = String(s).padStart(2,'0');
}

if(PREVIEW_MODE){
  // langsung tampilkan kado, tidak perlu menunggu tanggal asli
  showGiftBox();
} else {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

/* ============ TYPEWRITER LETTER ============ */
const letterText =
`Untuk Sayangkuuuuu Yoina Doverianingtyas Pardosi,

Selamat ulang tahun, sayangku, cintaku, cantikku, duniakuuuu.

Aku ngerasa makasihh banyak ya sayangg buat selama ini udah mau nemenin akuuu, susah seneng bareng, tau sendiri kan kita dari awal secapek apa dan se ditolak apa. Aku seneng kamu sadar kalau kita itu bisa ngelewatin semuanya

Aku berdoa tahun ini, semoga Tuhan Yesus selalu memberkati hidup kamuuu, jalanmu dimudahin dan kamu selalu bisa menerima arah dari Tuhan sayangg. Aku tau mungkin ini berat tapi ini doa aku buat kamu biar kamu bisa selalu sadar akan hal tersebut

Terima kasih sudah memilih untuk tetap ada, saat kita berantem, saat kita ga lagi baik-baik aja, saat kita hampir mau selesai, kita, aku dan kamu masih memilih untuk bertahan dan menurunkan ego kita

Aku harapp kamu sadarr betapa berharganya dirimu, betapa bernilainyaa kamuu di mataku dan aku gamau kamu kehilangan value yang udah kamu bangun sejak awal hanya karena hal-hal sepele

Di umur yang ke 21, aku harapp kamu bisa jadi lebih dewasaaa, bisa lebih bijak menghadapi semuanya dan memutuskan segala hall, bisa memilah mana yang baik dan buruk tanpa kamu harus mengorbankan dan kehilangan dirimu sekali lagi

Selamat ulang tahun, cintaku. Semogaaa kamu selaluuu baahagiiaaa selalu senyum selalu happy di manapun kamu berada, next kita di pelaminan ya sayangg semogaaa.

Dari orang yang paling sayang kamuuuu di dunia ini setelah keluargamu,
Qiqi<3`;

let typewriterStarted = false;
function startTypewriter(){
  if(typewriterStarted) return;
  typewriterStarted = true;

  const el = document.getElementById('typewriter-text');
  const btn = document.getElementById('letter-btn');
  el.innerHTML = '';
  let i = 0;

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '\u00A0';

  // di mode preview, ketikan dipercepat supaya tidak perlu menunggu lama
  const charDelay = PREVIEW_MODE ? 2 : (18 + Math.random()*22);

  function typeChar(){
    if(i < letterText.length){
      el.textContent = letterText.substring(0, i+1);
      el.appendChild(cursor);
      i++;
      const delay = PREVIEW_MODE ? charDelay : (18 + Math.random()*22);
      setTimeout(typeChar, delay);
    } else {
      cursor.remove();
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }
  }
  typeChar();
}

/* ============ FINAL SCREEN HEART BURST ============ */
let heartsLaunched = false;
function launchHearts(){
  if(heartsLaunched) return;
  heartsLaunched = true;

  const burst = document.getElementById('heart-burst');
  const chars = ['♡','❤','✦','❀','💕','💖','🌸','✨'];
  const colors = ['#ffa0c4','#e8a0b0','#f0c27f','#f5d9a0','#b896cc','#ff6b9d'];

  function spawnHeart(){
    const h = document.createElement('div');
    h.className = 'heart-fly';
    h.textContent = chars[Math.floor(Math.random()*chars.length)];
    h.style.left = Math.random()*100+'%';
    h.style.fontSize = (14+Math.random()*18)+'px';
    h.style.color = colors[Math.floor(Math.random()*colors.length)];
    h.style.setProperty('--dx', (Math.random()*80-40)+'px');
    h.style.animationDuration = (5+Math.random()*4)+'s';
    burst.appendChild(h);
    setTimeout(()=>h.remove(), 10000);
  }

  spawnHeart();
  const heartInterval = setInterval(spawnHeart, 250);
  setTimeout(()=>clearInterval(heartInterval), 30000);
}

/* ============ FIREWORKS (CANVAS) ============ */
let fireworksStarted = false;
function startFireworks(){
  if(fireworksStarted) return;
  fireworksStarted = true;

  const canvas = document.getElementById('fireworks-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const fireworkColors = ['#ff6b9d','#ffa0c4','#e8a0b0','#f0c27f','#f5d9a0','#b896cc','#fff8f2'];

  class Particle {
    constructor(x, y, color, vx, vy, life){
      this.x = x; this.y = y;
      this.color = color;
      this.vx = vx; this.vy = vy;
      this.life = life;
      this.maxLife = life;
      this.radius = 2 + Math.random() * 2;
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.03; // gravity
      this.vx *= 0.99;
      this.life--;
    }
    draw(ctx){
      const alpha = this.life / this.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * alpha, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      // glow
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * alpha * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createFirework(){
    const x = Math.random() * canvas.width;
    const y = canvas.height * (0.15 + Math.random() * 0.4);
    const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
    const count = 30 + Math.floor(Math.random() * 30);

    for(let i = 0; i < count; i++){
      const angle = (Math.PI * 2) * (i / count) + Math.random() * 0.2;
      const speed = 1.5 + Math.random() * 3;
      particles.push(new Particle(
        x, y, color,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        60 + Math.floor(Math.random() * 40)
      ));
    }
  }

  let frameCount = 0;
  function animate(){
    if(currentScreen !== 6){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = particles.length - 1; i >= 0; i--){
      particles[i].update();
      particles[i].draw(ctx);
      if(particles[i].life <= 0) particles.splice(i, 1);
    }

    frameCount++;
    if(frameCount % 90 === 0){
      createFirework();
    }

    requestAnimationFrame(animate);
  }

  createFirework();
  setTimeout(createFirework, 300);
  setTimeout(createFirework, 700);
  animate();
}

/* ============ MUSIK LATAR: PIRINGAN HITAM ============ */
const bgMusic = document.getElementById('bg-music');
const vinylToggle = document.getElementById('vinyl-toggle');
const musicPopup = document.getElementById('music-popup');
let musicPlaying = false;

function toggleMusic(){
  if(musicPlaying){
    bgMusic.pause();
    vinylToggle.classList.remove('playing');
  } else {
    bgMusic.play().catch(()=>{
      // browser memblokir autoplay sebelum interaksi; klik ini sudah jadi interaksi jadi seharusnya aman
    });
    vinylToggle.classList.add('playing');
    if(musicPopup) musicPopup.classList.add('hide');
  }
  musicPlaying = !musicPlaying;
}

vinylToggle.addEventListener('click', toggleMusic);
vinylToggle.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    toggleMusic();
  }
});

/* ============ VIDEO: MATIKAN MUSIK SAAT VIDEO DIPUTAR ============ */
const giftVideo = document.querySelector('.video-frame video');
let musicWasPlayingBeforeVideo = false;

if(giftVideo){
  giftVideo.addEventListener('play', () => {
    if(musicPlaying){
      musicWasPlayingBeforeVideo = true;
      bgMusic.pause();
      vinylToggle.classList.remove('playing');
      musicPlaying = false;
    } else {
      musicWasPlayingBeforeVideo = false;
    }
  });

  function resumeMusicAfterVideo(){
    if(musicWasPlayingBeforeVideo){
      bgMusic.play().catch(()=>{});
      vinylToggle.classList.add('playing');
      musicPlaying = true;
      musicWasPlayingBeforeVideo = false;
    }
  }

  giftVideo.addEventListener('pause', () => {
    // 'ended' juga memicu 'pause', jadi cukup tangani di sini saja
    resumeMusicAfterVideo();
  });
}

/* ============ PANEL PREVIEW: LOMPAT KE LAYAR MANA PUN ============ */
if(PREVIEW_MODE){
  const panel = document.getElementById('preview-panel');
  panel.classList.add('show');

  const labels = ['1 Countdown','2 Special Day','3 Letter','4 Gallery','5 Video','6 Penutup'];
  labels.forEach((label, idx) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = () => goTo(idx+1);
    panel.appendChild(btn);
  });
}
