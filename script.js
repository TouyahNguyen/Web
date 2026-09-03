/* ============================================
   LOVE PAGE - Pale Neon Pink Theme
   Silky Smooth 60fps & Graceful Motion
   ============================================ */

// === Falling text (Chữ rơi màu Hồng Neon ngọt ngào) ===
const fallingTexts = [
  "Yêu em 💕",
  "Mãi bên nhau 🌸",
  "Hạnh phúc 🥰",
  "Nhớ em 💗",
  "My Love 💖",
  "Forever 💓",
  "Yêu thương 💝",
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
  if (heartsContainer.childElementCount > 40) return;

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
  if (heartsContainer.childElementCount > 40) return;

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
// KHUNG TRÁI TIM 3D DÂY RỖNG (3D Wireframe Neon Heart)
// Hoàn toàn không đặc full, chỉ có khung viền 3D phát sáng xoay 360°
// ============================================
let trigger3DHeartThump = null;

function setup3DHeartWireframe() {
  const canvas = document.getElementById('heart-3d-canvas');
  const centerHeart = document.getElementById('center-heart');
  if (!canvas || !centerHeart) return;

  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let cx = 0;
  let cy = 0;
  let baseScale = 1;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    w = rect.width;
    h = rect.height;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    cx = w / 2;
    cy = h / 2;
    // Tỉ lệ vừa vặn và cân đối trong khung
    baseScale = Math.min(w, h) / 38;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 1. Tạo tập điểm đường viền trái tim 2D chuẩn Fourier
  const SAMPLES = 60;
  const baseHeart = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    // Căn giữa trục Y để tim xoay cân đối quanh tâm (0, 0)
    baseHeart.push({ x, y: y - 2.2 });
  }

  // 2. Dựng các nan khung dọc (Meridian Ribs) xoay quanh trục Y
  const NUM_RIBS = 10;
  const ribs3D = [];
  for (let m = 0; m < NUM_RIBS; m++) {
    const phi = (m / NUM_RIBS) * Math.PI;
    const rib = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const pt = baseHeart[i];
      rib.push({
        x: pt.x * Math.cos(phi),
        y: pt.y,
        z: pt.x * Math.sin(phi) * 0.52 // Độ dày Z thanh thoát tạo phom tim 3D
      });
    }
    ribs3D.push(rib);
  }

  // 3. Dựng các vòng đai khung ngang (Latitude Hoops) liên kết các nan dọc
  const hoopIndices = [6, 12, 18, 24, 30, 36, 42, 48];
  const hoops3D = [];
  for (let k = 0; k < hoopIndices.length; k++) {
    const idx = hoopIndices[k];
    const pt = baseHeart[idx];
    const hoop = [];
    const HOOP_SAMPLES = 28;
    for (let s = 0; s <= HOOP_SAMPLES; s++) {
      const theta = (s / HOOP_SAMPLES) * Math.PI * 2;
      hoop.push({
        x: Math.abs(pt.x) * Math.cos(theta),
        y: pt.y,
        z: Math.abs(pt.x) * Math.sin(theta) * 0.52
      });
    }
    hoops3D.push(hoop);
  }

  // Biến điều khiển chuyển động 3D
  let rotY = 0;
  const tiltX = 0.22; // Góc nghiêng 12.6 độ nhìn từ trên xuống để thấy rõ khoảng rỗng bên trong
  let time = 0;
  let extraSpin = 0;
  let thump = 1;

  // Chiếu điểm 3D sang màn hình 2D với phối cảnh chiều sâu
  const fov = 350;
  function project(p3, scaleFactor) {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const x1 = p3.x * cosY - p3.z * sinY;
    const z1 = p3.x * sinY + p3.z * cosY;

    const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
    const y2 = p3.y * cosX - z1 * sinX;
    const z2 = p3.y * sinX + z1 * cosX;

    const p = fov / (fov + z2);
    return {
      x: cx + x1 * scaleFactor * p,
      y: cy + y2 * scaleFactor * p,
      z: z2,
      proj: p
    };
  }

  // Vòng lặp vẽ khung dây 3D
  function render3DHeart() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter'; // Hòa trộn phát sáng neon rực rỡ

    time += 0.038;
    rotY += (0.011 + extraSpin);
    extraSpin *= 0.94;
    thump = 1 + (thump - 1) * 0.88;

    // Nhịp đập trái tim tự nhiên (lub-dub)
    const cycle = (time * 2.5) % (Math.PI * 2);
    let beat = 1;
    if (cycle < 0.28) {
      beat = 1 + Math.sin(cycle / 0.28 * Math.PI) * 0.08;
    } else if (cycle > 0.36 && cycle < 0.6) {
      beat = 1 + Math.sin((cycle - 0.36) / 0.24 * Math.PI) * 0.04;
    }

    const currentScale = baseScale * beat * thump;

    // 1. Vẽ các vòng đai khung ngang (nằm ở lớp nền khung rỗng)
    for (let hIdx = 0; hIdx < hoops3D.length; hIdx++) {
      const hoop = hoops3D[hIdx];
      ctx.beginPath();
      for (let s = 0; s < hoop.length; s++) {
        const pt2d = project(hoop[s], currentScale);
        if (s === 0) ctx.moveTo(pt2d.x, pt2d.y);
        else ctx.lineTo(pt2d.x, pt2d.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 20, 147, 0.32)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }

    // 2. Chiếu và sắp xếp các nan dọc theo chiều sâu Z
    const renderedRibs = [];
    for (let m = 0; m < ribs3D.length; m++) {
      const rib = ribs3D[m];
      const pts2d = [];
      let sumZ = 0;
      for (let i = 0; i < rib.length; i++) {
        const p2 = project(rib[i], currentScale);
        pts2d.push(p2);
        sumZ += p2.z;
      }
      renderedRibs.push({
        pts: pts2d,
        avgZ: sumZ / rib.length
      });
    }

    // Sắp xếp vẽ các nan ở xa (Z dương) trước, nan ở gần (Z âm) sau
    renderedRibs.sort((a, b) => b.avgZ - a.avgZ);

    for (let r = 0; r < renderedRibs.length; r++) {
      const item = renderedRibs[r];
      const pts = item.pts;
      const isFront = item.avgZ < 0;

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }

      if (isFront) {
        // Nan phía trước: Viền Hồng Neon phát sáng đậm nét
        ctx.strokeStyle = 'rgba(255, 20, 147, 0.45)';
        ctx.lineWidth = 3.2;
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 51, 153, 0.95)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Đường lõi sáng trắng hồng
        ctx.strokeStyle = 'rgba(255, 200, 235, 0.8)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else {
        // Nan phía sau: Viền mờ dịu mắt, thể hiện độ trong suốt nhìn xuyên qua
        ctx.strokeStyle = 'rgba(217, 0, 108, 0.3)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    // 3. Điểm phát sáng lấp lánh tại các mắt lưới phía trước (Constellation Nodes)
    for (let r = 0; r < renderedRibs.length; r++) {
      const item = renderedRibs[r];
      if (item.avgZ < 0) {
        for (let k = 0; k < hoopIndices.length; k += 2) {
          const pt = item.pts[hoopIndices[k]];
          if (pt) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.8 * pt.proj, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 235, 248, 0.9)';
            ctx.fill();
          }
        }
      }
    }

    requestAnimationFrame(render3DHeart);
  }

  render3DHeart();

  // Xử lý chạm / click vào khung tim 3D
  trigger3DHeartThump = function() {
    extraSpin = 0.085;
    thump = 1.35;
  };

  centerHeart.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    if (trigger3DHeartThump) trigger3DHeartThump();

    const rect = centerHeart.getBoundingClientRect();
    const heartCx = rect.left + rect.width / 2;
    const heartCy = rect.top + rect.height / 2;

    // Bắn chùm pháo hoa rực rỡ ngay tâm khung tim
    explodeAt(heartCx, heartCy);

    // Bung 6 trái tim bay xung quanh
    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnHeart(), i * 80);
    }
  });
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
  setup3DHeartWireframe();
  animateFireworks();

  // Nhịp độ rơi trái tim êm đềm: 650ms/trái tim (rất mượt mà)
  setInterval(spawnHeart, 650);

  // Nhịp độ thông điệp rơi chậm rãi: 2.8 giây/thông điệp (dễ đọc, thư thái)
  setInterval(spawnFallingMessage, 2800);

  // Pháo hoa tự động phát sáng êm dịu mỗi 4.2 giây
  setInterval(() => {
    launchFirework();
  }, 4200);

  // Hiệu ứng ban đầu khi vừa tải trang
  setTimeout(() => {
    for (let i = 0; i < 5; i++) setTimeout(() => spawnHeart(), i * 160);
    setTimeout(() => launchFirework(), 300);
    setTimeout(() => spawnFallingMessage(), 500);
  }, 200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
