/* ============================================
   LOVE PAGE - Pale Neon Pink Theme
   Silky Smooth 60fps & Graceful Motion
   ============================================ */

// === Falling text (Chữ rơi màu Hồng Neon ngọt ngào) ===
const fallingTexts = [
  "Mãi bên nhau 🌸",
  "Hạnh phúc 🥰",
  "Nhớ bà 💗",
  "My Love 💖",
  "Forever 💓",
  "Yêu 💝",
  "Ngọt ngào ✨",
  "Mãi yêu 💘",
  "I Love You 💕",
  "Bình yên 🌷",
];

// === Bảng màu trái tim rơi: Hồng Neon Rực Rỡ (Vibrant Neon Pink) ===
const heartColors = [
  '#ff1493', '#ff007f', '#ff3399', '#ff66b2',
  '#ff4d94', '#ff2a85', '#ff529a', '#e60073',
  '#ff80bf', '#ff99cc', '#ffa6d8', '#ff3b9d'
];

// === Tạo SVG trái tim mượt mà ===
function createHeartSVG(color, size) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('fill', color);
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
  svg.appendChild(path);
  return svg;
}

// ============================================
// BẦU TRỜI SAO LẤP LÁNH (Tối ưu hiệu năng 60 FPS)
// ============================================
const starsCanvas = document.getElementById('stars-canvas');
const starsCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStarsCanvas() {
  const dpr = window.devicePixelRatio || 1;
  starsCanvas.width = window.innerWidth * dpr;
  starsCanvas.height = window.innerHeight * dpr;
  starsCtx.scale(dpr, dpr);
  createStars();
}

function hexToRgb(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function createStars() {
  stars = [];
  const w = window.innerWidth;
  const h = window.innerHeight;
  // Giới hạn số lượng sao tối ưu cho màn hình di động mượt mà
  const count = Math.min(180, Math.floor((w * h) / 3400));
  const starPalette = ['#ffffff', '#fff0f7', '#ffd6ed', '#ffbade', '#ffe6f4'];

  for (let i = 0; i < count; i++) {
    const starHex = starPalette[Math.floor(Math.random() * starPalette.length)];
    const rgb = hexToRgb(starHex);
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random(),
      alphaSpeed: Math.random() * 0.012 + 0.003,
      direction: Math.random() > 0.5 ? 1 : -1,
      r: rgb.r,
      g: rgb.g,
      b: rgb.b
    });
  }
}

function animateStars() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  starsCtx.clearRect(0, 0, w, h);

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    star.alpha += star.alphaSpeed * star.direction;
    if (star.alpha >= 1) { star.alpha = 1; star.direction = -1; }
    else if (star.alpha <= 0.08) { star.alpha = 0.08; star.direction = 1; }

    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starsCtx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${star.alpha})`;
    starsCtx.fill();
  }

  requestAnimationFrame(animateStars);
}

resizeStarsCanvas();
window.addEventListener('resize', resizeStarsCanvas);
animateStars();

// ============================================
// TRÁI TIM RƠI BỒNG BỀNH (Smooth Drift)
// ============================================
const heartsContainer = document.getElementById('hearts-container');

function spawnHeart() {
  // Tránh dồn quá nhiều phần tử DOM cùng lúc
  if (heartsContainer.childElementCount > 65) return;

  const heart = document.createElement('div');
  heart.classList.add('falling-heart');

  const size = Math.random() * 22 + 14;
  const color = heartColors[Math.floor(Math.random() * heartColors.length)];
  const left = Math.random() * 92 + 3;
  // Thời gian rơi chậm rãi, thướt tha (7.5s - 12s)
  const duration = Math.random() * 4.5 + 7.5;
  // Độ lắc nhẹ nhàng tự nhiên qua lại (-30px đến 30px)
  const drift = (Math.random() - 0.5) * 55;
  const rot = (Math.random() - 0.5) * 40;

  heart.style.left = `${left}%`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.opacity = Math.random() * 0.35 + 0.6;
  heart.style.setProperty('--drift', `${drift}px`);
  heart.style.setProperty('--rot', `${rot}deg`);

  heart.appendChild(createHeartSVG(color, size));
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) heart.parentNode.removeChild(heart);
  }, duration * 1000 + 200);
}

// ============================================
// CHỮ YÊU THƯƠNG RƠI CHẬM RÃI (Pale Neon Pink)
// ============================================
function spawnFallingMessage() {
  if (heartsContainer.childElementCount > 55) return;

  const el = document.createElement('div');
  el.classList.add('falling-message');
  el.textContent = fallingTexts[Math.floor(Math.random() * fallingTexts.length)];

  const isMobile = window.innerWidth < 640;
  const left = isMobile ? (Math.random() * 60 + 6) : (Math.random() * 74 + 6);
  // Rơi êm đềm từ 8.5s đến 12.5s
  const duration = Math.random() * 4 + 8.5;
  const driftMsg = (Math.random() - 0.5) * 35;

  el.style.left = `${left}%`;
  el.style.animationDuration = `${duration}s, 4s`;
  el.style.setProperty('--drift-msg', `${driftMsg}px`);

  heartsContainer.appendChild(el);

  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, duration * 1000 + 200);
}



// ============================================
// PHÁO HOA HỒNG NEON (High Performance Canvas)
// ============================================
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');
let particles = [];

function resizeFwCanvas() {
  const dpr = window.devicePixelRatio || 1;
  fwCanvas.width = window.innerWidth * dpr;
  fwCanvas.height = window.innerHeight * dpr;
  fwCtx.scale(dpr, dpr);
}
resizeFwCanvas();
window.addEventListener('resize', resizeFwCanvas);

// Bảng màu pháo hoa: Hồng neon rực rỡ kết hợp trắng kim cương
const neonPinkFwColors = [
  '#ffffff', // trắng ngọc phát sáng
  '#fff0f8', // hồng ngà pha trắng
  '#ff3399', // hồng neon rực rỡ
  '#ff1493', // hồng neon đậm
  '#ff007f', // hồng neon thắm
  '#ff66b2', // hồng neon sáng
  '#ff85c8', // hồng neon dịu
  '#ffd4ec'  // ánh sáng lấp lánh
];

function explodeAt(x, y) {
  // Số hạt vừa phải để giữ vững 60 FPS mượt mà tuyệt đối
  const count = 32 + Math.floor(Math.random() * 18);

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
    const speed = Math.random() * 3.4 + 1.2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay: Math.random() * 0.012 + 0.009,
      color: neonPinkFwColors[Math.floor(Math.random() * neonPinkFwColors.length)],
      size: Math.random() * 2.2 + 0.9,
      gravity: 0.025 + Math.random() * 0.012
    });
  }
}

function animateFireworks() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  fwCtx.clearRect(0, 0, w, h);
  fwCtx.globalCompositeOperation = 'lighter';

  // Lặp qua mảng hạt với hiệu năng cao, không dùng shadowBlur gây lag
  particles = particles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.988;
    p.alpha -= p.decay;

    if (p.alpha <= 0) return false;

    fwCtx.globalAlpha = p.alpha;
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fwCtx.fillStyle = p.color;
    fwCtx.fill();

    return true;
  });

  fwCtx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

function launchFirework() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = Math.random() * w * 0.7 + w * 0.15;
  const y = Math.random() * h * 0.5 + h * 0.12;
  explodeAt(x, y);
}

// ============================================
// CHẠM / TƯƠNG TÁC (Tối ưu cho cả điện thoại & máy tính)
// ============================================
let lastTapTime = 0;
function handleUserTouch(x, y) {
  const now = Date.now();
  if (now - lastTapTime < 180) return;
  lastTapTime = now;

  // Thả 2-3 trái tim nhẹ nhàng
  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnHeart(), i * 110);
  }

  if (typeof x === 'number' && typeof y === 'number' && x > 0 && y > 0) {
    explodeAt(x, y);
  } else {
    launchFirework();
  }
}

document.addEventListener('pointerdown', (e) => {
  handleUserTouch(e.clientX, e.clientY);
});

// ============================================
// KHỞI ĐỘNG CÁC VÒNG LẶP (Chu kỳ êm dịu, không giật lag)
// ============================================
function init() {
  animateFireworks();

  // Nhịp độ rơi trái tim: tăng tần suất 10% (585ms/trái tim)
  setInterval(spawnHeart, 585);

  // Nhịp độ thông điệp rơi: tăng tần suất 29% (~2.15 giây/thông điệp)
  setInterval(spawnFallingMessage, 2150);

  // Pháo hoa tự động phát sáng êm dịu mỗi 4.2 giây
  setInterval(() => {
    launchFirework();
  }, 4200);

  // Hiệu ứng ban đầu khi vừa tải trang
  setTimeout(() => {
    for (let i = 0; i < 5; i++) setTimeout(() => spawnHeart(), i * 160);
    setTimeout(() => launchFirework(), 300);
    setTimeout(() => spawnFallingMessage(), 400);
    setTimeout(() => spawnFallingMessage(), 1200);
  }, 200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
