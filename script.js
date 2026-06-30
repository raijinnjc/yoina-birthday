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
const petalChars = ['❀','✿','♡','✦'];
for(let i=0;i<16;i++){
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petalChars[Math.floor(Math.random()*petalChars.length)];
  p.style.left = Math.random()*100+'%';
  p.style.fontSize = (12+Math.random()*14)+'px';
  p.style.animationDuration = (10+Math.random()*10)+'s';
  p.style.animationDelay = (Math.random()*12)+'s';
  ambient.appendChild(p);
}
for(let i=0;i<40;i++){
  const s = document.createElement('div');
  s.className = 'sparkle';
  const size = Math.random()*2.6+1;
  s.style.width = size+'px';
  s.style.height = size+'px';
  s.style.top = Math.random()*100+'%';
  s.style.left = Math.random()*100+'%';
  s.style.animationDelay = (Math.random()*3.5)+'s';
  s.style.animationDuration = (2.5+Math.random()*3)+'s';
  ambient.appendChild(s);
}

/* ============ ANIMASI BUKA KADO (SEBELUM PINDAH KE LAYAR 2) ============ */
function spawnSparkleBurst(originEl){
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;

  for(let i=0;i<18;i++){
    const dot = document.createElement('div');
    dot.className = 'gift-sparkle-burst';
    const angle = (Math.PI*2) * (i/18);
    const dist = 70 + Math.random()*60;
    dot.style.setProperty('--bx', Math.cos(angle)*dist + 'px');
    dot.style.setProperty('--by', Math.sin(angle)*dist + 'px');
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
    dot.style.position = 'fixed';
    dot.style.zIndex = '50';
    document.body.appendChild(dot);
    setTimeout(()=>dot.remove(), 850);
  }
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

  // 2) sedikit jeda, lalu mainkan animasi kado terbuka + kilauan
  setTimeout(() => {
    giftWrap.classList.add('opening');
    spawnSparkleBurst(giftBox);
  }, 250);

  // 3) setelah animasi kado selesai, baru pindah ke layar 2
  setTimeout(() => {
    goTo(2);
  }, 250 + 950);
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
  if(n === 6) launchHearts();
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
`Untuk Yoina Doverianingtyas Pardosi,

Selamat ulang tahun, sayangku. Di hari yang spesial ini, aku ingin kamu tahu betapa berartinya kamu untukku.

Setiap hari bersamamu adalah hadiah, dan hari ini adalah giliranku untuk merayakanmu sepenuhnya. Terima kasih sudah menjadi tempat pulang yang paling hangat, paling tenang, dan paling jujur yang pernah aku miliki.

Aku berdoa tahun ini membawakanmu kebahagiaan yang tak pernah putus, kesehatan yang selalu terjaga, dan mimpi-mimpi yang perlahan menjadi nyata. Semoga setiap langkahmu dipenuhi cahaya, dan setiap malammu dipenuhi ketenangan.

Terima kasih sudah memilih untuk tetap ada, di hari biasa maupun hari istimewa. Aku menyayangimu lebih dari kata-kata yang bisa kutuliskan di sini.

Selamat ulang tahun, cintaku. Tetaplah bersinar seperti biasanya.

Dengan seluruh cinta yang kupunya,
Rifqi`;

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
  const chars = ['♡','❤','✦','❀'];

  function spawnHeart(){
    const h = document.createElement('div');
    h.className = 'heart-fly';
    h.textContent = chars[Math.floor(Math.random()*chars.length)];
    h.style.left = Math.random()*100+'%';
    h.style.fontSize = (14+Math.random()*16)+'px';
    h.style.setProperty('--dx', (Math.random()*80-40)+'px');
    h.style.animationDuration = (5+Math.random()*4)+'s';
    burst.appendChild(h);
    setTimeout(()=>h.remove(), 10000);
  }

  spawnHeart();
  const heartInterval = setInterval(spawnHeart, 350);
  setTimeout(()=>clearInterval(heartInterval), 30000);
}

/* ============ MUSIK LATAR: PIRINGAN HITAM ============ */
const bgMusic = document.getElementById('bg-music');
const vinylToggle = document.getElementById('vinyl-toggle');
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
