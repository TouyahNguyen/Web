/* ============================================
   LOVE PAGE - Minimal JS
   Stars + Hearts + Messages + Fireworks
   ============================================ */

// === Love Messages (center) ===
const loveMessages = [
  "Em là điều tuyệt vời nhất đến trong cuộc đời anh ...",
  "Yêu em nhiều hơn ngày hôm qua, nhưng ít hơn ngày mai ...",
  "Cảm ơn em đã luôn ở bên anh ...",
  "Em là nắng ấm trong ngày đông lạnh giá ...",
  "Trái tim anh chỉ đập vì em thôi ...",
  "Mỗi ngày bên em là một ngày hạnh phúc ...",
  "Em là giấc mơ đẹp nhất mà anh không muốn tỉnh dậy ...",
  "Gặp em là điều may mắn nhất đời anh ...",
  "Yêu em từ cái nhìn đầu tiên đến mãi mãi ...",
  "Em là lý do anh mỉm cười mỗi ngày ...",
  "Bên em, thời gian như ngừng trôi ...",
  "Anh muốn cùng em đi đến cuối con đường ...",
  "Em xinh đẹp nhất khi em cười ...",
  "Dù có nắng hay mưa mai sau ...",
];

// === Falling text ===
const fallingTexts = [
  "Yêu em ❤️",
  "Mãi bên nhau 💕",
  "Hạnh phúc 🥰",
  "Nhớ em 💗",
  "My love 💖",
  "Forever 💓",
  "Yêu thương 💝",
  "Ngọt ngào 🌸",
  "Mãi yêu 💘",
  "I love you 💕",
];

// === Heart colors ===
const heartColors = [
  '#ff2d75', '#ff4d6d', '#ff758f', '#ff8fa3',
  '#ffb3c1', '#ff0a54', '#ff477e', '#ff69b4',
  '#ff1493', '#e05780', '#ff6b9d', '#c9184a'
];

// === Create heart SVG ===
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
// TWINKLING STARS (pink-ish dots)
// ============================================
const starsCanvas = document.getElementById('stars-canvas');
const starsCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStarsCanvas() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  createStars();
}

function createStars() {
  stars = [];
  const count = Math.floor((starsCanvas.width * starsCanvas.height) / 2400);
  // Bầu trời sao lấp lánh với tông trắng, hồng phấn nhạt và xanh thiên thanh
  const starPalette = ['#ffffff', '#ffffff', '#ffccd5', '#bae6fd', '#fed7e2'];
  for (let i = 0; i < count; i++) {
    const starColor = starPalette[Math.floor(Math.random() * starPalette.length)];
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 1.3 + 0.2,
      alpha: Math.random(),
      alphaSpeed: Math.random() * 0.015 + 0.003,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: starColor
    });
  }
}

function animateStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

  stars.forEach(star => {
    star.alpha += star.alphaSpeed * star.direction;
    if (star.alpha >= 1) { star.alpha = 1; star.direction = -1; }
    else if (star.alpha <= 0.05) { star.alpha = 0.05; star.direction = 1; }

    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    if (star.color === '#ffffff') {
      starsCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    } else {
      const r = parseInt(star.color.slice(1, 3), 16);
      const g = parseInt(star.color.slice(3, 5), 16);
      const b = parseInt(star.color.slice(5, 7), 16);
      starsCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.alpha})`;
    }
    starsCtx.fill();
  });

  requestAnimationFrame(animateStars);
}

resizeStarsCanvas();
window.addEventListener('resize', resizeStarsCanvas);
animateStars();

// ============================================
// FALLING HEARTS
// ============================================
const heartsContainer = document.getElementById('hearts-container');

function spawnHeart() {
  const heart = document.createElement('div');
  heart.classList.add('falling-heart');

  const size = Math.random() * 24 + 12;
  const color = heartColors[Math.floor(Math.random() * heartColors.length)];
  const left = Math.random() * 92 + 2;
  const duration = Math.random() * 5 + 4;

  heart.style.left = `${left}%`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.opacity = Math.random() * 0.45 + 0.5;

  heart.appendChild(createHeartSVG(color, size));
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) heart.parentNode.removeChild(heart);
  }, duration * 1000 + 300);
}

// ============================================
// FALLING MESSAGES (Tối ưu cho điện thoại & đổi màu xanh/hồng)
// ============================================
function spawnFallingMessage() {
  const el = document.createElement('div');
  el.classList.add('falling-message');
  el.textContent = fallingTexts[Math.floor(Math.random() * fallingTexts.length)];

  // Trên điện thoại giới hạn vị trí từ 5% đến 68% để chữ to không bị tràn khỏi màn hình
  const isMobile = window.innerWidth < 640;
  const left = isMobile ? (Math.random() * 62 + 5) : (Math.random() * 75 + 5);
  const duration = Math.random() * 5 + 5.5;

  el.style.left = `${left}%`;
  // duration rơi và duration đổi màu xanh/hồng lệch nhịp tự nhiên
  el.style.animationDuration = `${duration}s, 8s`;
  el.style.animationDelay = `0s, -${(Math.random() * 8).toFixed(1)}s`;

  heartsContainer.appendChild(el);

  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, duration * 1000 + 300);
}

// ============================================
// CENTER MESSAGE CYCLE
// ============================================
const centerMsg = document.getElementById('center-message');
let msgIndex = 0;

function cycleMessage() {
  centerMsg.classList.add('fade-out');
  centerMsg.classList.remove('fade-in');

  setTimeout(() => {
    msgIndex = (msgIndex + 1) % loveMessages.length;
    centerMsg.textContent = loveMessages[msgIndex];
    centerMsg.classList.remove('fade-out');
    centerMsg.classList.add('fade-in');
  }, 600);
}

// ============================================
// FIREWORKS
// ============================================
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');
let fireworks = [];
let particles = [];

function resizeFwCanvas() {
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}
resizeFwCanvas();
window.addEventListener('resize', resizeFwCanvas);

// Nổ pháo hoa ngay tại vị trí ngẫu nhiên (màu vàng neon nhẹ)
function explodeAt(x, y) {
  const count = 40 + Math.floor(Math.random() * 30);
  // Bảng màu vàng neon nhẹ ấm áp
  const neonYellowColors = [
    '#fff9db', // vàng trắng ngà phát sáng
    '#fff3a1', // vàng pastel neon
    '#ffea79', // vàng neon êm dịu
    '#ffd43b', // vàng neon rực rỡ nhẹ
    '#ffe066', // vàng kem ánh sáng
    '#ffffff'  // lấp lánh trắng nhẹ
  ];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const speed = Math.random() * 4.2 + 1.2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.008,
      color: neonYellowColors[Math.floor(Math.random() * neonYellowColors.length)],
      size: Math.random() * 2.2 + 0.8,
      gravity: 0.022 + Math.random() * 0.015
    });
  }
}

function animateFireworks() {
  // Xóa sạch canvas hoàn toàn mỗi frame - KHÔNG để lại bất kỳ vệt đen hay vết nổ nào
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  fwCtx.globalCompositeOperation = 'lighter';

  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += p.gravity; p.vx *= 0.99;
    p.alpha -= p.decay;
    if (p.alpha <= 0) return false;

    fwCtx.globalAlpha = p.alpha;
    fwCtx.shadowBlur = 6;
    fwCtx.shadowColor = 'rgba(255, 235, 120, 0.6)';

    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fwCtx.fillStyle = p.color;
    fwCtx.fill();

    return true;
  });

  fwCtx.shadowBlur = 0;
  fwCtx.globalAlpha = 1;

  requestAnimationFrame(animateFireworks);
}

function launchFirework() {
  // Nổ ngẫu nhiên ở giữa màn hình
  const x = Math.random() * fwCanvas.width * 0.6 + fwCanvas.width * 0.2;
  const y = Math.random() * fwCanvas.height * 0.5 + fwCanvas.height * 0.1;
  explodeAt(x, y);
}

// ============================================
// TAP / TOUCH - Tối ưu cho người dùng điện thoại
// Chạm vào màn hình sẽ nổ pháo hoa ngay tại vị trí ngón tay
// ============================================
let lastTapTime = 0;
function handleUserTouch(x, y) {
  const now = Date.now();
  if (now - lastTapTime < 180) return;
  lastTapTime = now;

  for (let i = 0; i < 5; i++) {
    setTimeout(() => spawnHeart(), i * 70);
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
// INIT
// ============================================
function init() {
  animateFireworks();

  // Hearts
  setInterval(spawnHeart, 350);

  // Falling text - tần suất cao hơn
  setInterval(spawnFallingMessage, 1200);

  // Center message cycle
  setInterval(cycleMessage, 5000);

  // Auto fireworks - nổ ngẫu nhiên liên tục
  setInterval(() => {
    for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
      setTimeout(() => launchFirework(), i * 300);
    }
  }, 3500);

  // Initial burst
  setTimeout(() => {
    for (let i = 0; i < 8; i++) setTimeout(() => spawnHeart(), i * 100);
    for (let i = 0; i < 3; i++) setTimeout(() => launchFirework(), i * 400);
    for (let i = 0; i < 4; i++) setTimeout(() => spawnFallingMessage(), i * 300);
  }, 300);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
