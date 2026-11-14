// ===== 히어로 타이핑 효과 =====
(function typeHero() {
  const pre = document.querySelector('.hero-pre');
  const full = pre.textContent;
  pre.textContent = '';
  const cursor = document.createElement('span');
  cursor.textContent = '▌';
  cursor.style.animation = 'blink 1s steps(1) infinite';
  pre.appendChild(cursor);
  let i = 0;
  const t = setInterval(() => {
    if (i >= full.length) { clearInterval(t); return; }
    cursor.before(full[i++]);
  }, 70);
})();

// ===== 모드 전환 =====
const siteMode = document.getElementById('siteMode');
const gameMode = document.getElementById('gameMode');
const playToggle = document.getElementById('playToggle');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const panel = document.getElementById('gamePanel');
const panelTitle = document.getElementById('panelTitle');
const panelDesc = document.getElementById('panelDesc');

let gameActive = false;
let rafId = null;

playToggle.addEventListener('click', () => (gameActive ? exitGame() : enterGame()));

function enterGame() {
  gameActive = true;
  siteMode.hidden = true;
  gameMode.hidden = false;
  document.body.style.overflow = 'hidden';
  resize();
  resetPlayer();
  loop();
}

function exitGame() {
  gameActive = false;
  closePanel();
  gameMode.hidden = true;
  siteMode.hidden = false;
  document.body.style.overflow = '';
  cancelAnimationFrame(rafId);
}

// ===== 게임 데이터 =====
// 프로젝트 자리: 나중에 여기만 채우면 게임 모드에도 반영됨
const spots = [
  { name: 'PROJECT 01', desc: '프로젝트 설명이 들어갈 자리입니다.' },
  { name: 'PROJECT 02', desc: '프로젝트 설명이 들어갈 자리입니다.' },
  { name: 'PROJECT 03', desc: '프로젝트 설명이 들어갈 자리입니다.' },
  {
    name: 'CONTACT',
    html: '메일 보내기: <a href="mailto:jihwan5580@gmail.com">jihwan5580@gmail.com</a><br>' +
          'GitHub: <a href="#" target="_blank" rel="noopener">github.com/아이디</a>',
  },
];

const GROUND_H = 120;
const player = { x: 0, y: 0, w: 22, h: 30, vx: 0, vy: 0, onGround: false, face: 1 };
const keys = {};
let panelOpen = false;
let nearSpot = null;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => { if (gameActive) resize(); });

function resetPlayer() {
  player.x = 80;
  player.y = canvas.height - GROUND_H - player.h;
  player.vx = 0;
  player.vy = 0;
}

function spotX(i) {
  // 화면 가로에 균등 배치
  const margin = 180;
  const span = canvas.width - margin * 2;
  return margin + (span / (spots.length - 1)) * i;
}

// ===== 입력 =====
window.addEventListener('keydown', (e) => {
  if (!gameActive) return;
  keys[e.code] = true;

  if (e.code === 'Escape') {
    if (panelOpen) closePanel();
    else exitGame();
  }
  if (e.code === 'KeyE') {
    if (panelOpen) closePanel();
    else if (nearSpot !== null) openPanel(nearSpot);
  }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

function openPanel(i) {
  panelOpen = true;
  panelTitle.textContent = spots[i].name;
  if (spots[i].html) panelDesc.innerHTML = spots[i].html; // 신뢰된 로컬 데이터만
  else panelDesc.textContent = spots[i].desc;
  panel.hidden = false;
}
function closePanel() {
  panelOpen = false;
  panel.hidden = true;
}

// ===== 루프 =====
function loop() {
  update();
  draw();
  rafId = requestAnimationFrame(loop);
}

function update() {
  const SPEED = 4.2;
  const GRAVITY = 0.7;
  const JUMP = -13;

  if (!panelOpen) {
    const left = keys['KeyA'] || keys['ArrowLeft'];
    const right = keys['KeyD'] || keys['ArrowRight'];
    player.vx = (right ? SPEED : 0) - (left ? SPEED : 0);
    if (player.vx > 0) player.face = 1;
    if (player.vx < 0) player.face = -1;

    if ((keys['KeyW'] || keys['ArrowUp'] || keys['Space']) && player.onGround) {
      player.vy = JUMP;
      player.onGround = false;
    }
  } else {
    player.vx = 0;
  }

  player.vy += GRAVITY;
  player.x += player.vx;
  player.y += player.vy;

  const floor = canvas.height - GROUND_H - player.h;
  if (player.y >= floor) {
    player.y = floor;
    player.vy = 0;
    player.onGround = true;
  }
  player.x = Math.max(10, Math.min(canvas.width - player.w - 10, player.x));

  // 근접 체크
  nearSpot = null;
  const cx = player.x + player.w / 2;
  for (let i = 0; i < spots.length; i++) {
    if (Math.abs(cx - spotX(i)) < 50) { nearSpot = i; break; }
  }
  if (panelOpen && nearSpot === null) closePanel();
}

function draw() {
  const W = canvas.width, H = canvas.height;
  const css = getComputedStyle(document.documentElement);
  const ACCENT = css.getPropertyValue('--accent').trim();
  const DIM = css.getPropertyValue('--fg-dim').trim();
  const LINE = css.getPropertyValue('--line').trim();

  ctx.clearRect(0, 0, W, H);

  // 배경 격자
  ctx.strokeStyle = '#141414';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }

  // 바닥
  const groundY = H - GROUND_H;
  ctx.strokeStyle = LINE;
  ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();
  ctx.fillStyle = '#0d0d0d';
  ctx.fillRect(0, groundY, W, GROUND_H);

  // 스팟(프로젝트 포탈)
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  for (let i = 0; i < spots.length; i++) {
    const x = spotX(i);
    const active = nearSpot === i;
    const h = 64;

    ctx.strokeStyle = active ? ACCENT : DIM;
    ctx.lineWidth = active ? 2 : 1;
    ctx.strokeRect(x - 26, groundY - h, 52, h);

    // 깜빡이는 코어
    if (Math.floor(performance.now() / 500) % 2 === 0 || active) {
      ctx.fillStyle = active ? ACCENT : DIM;
      ctx.fillRect(x - 4, groundY - h / 2 - 4, 8, 8);
    }

    ctx.fillStyle = active ? ACCENT : DIM;
    ctx.fillText(spots[i].name, x, groundY + 24);
    if (active && !panelOpen) {
      ctx.fillStyle = ACCENT;
      ctx.fillText('[ E ]', x, groundY - h - 14);
    }
  }

  // 플레이어 (단순 픽셀 캐릭터)
  const p = player;
  ctx.fillStyle = ACCENT;
  ctx.fillRect(p.x, p.y, p.w, p.h);               // 몸
  ctx.fillStyle = '#0a0a0a';
  const eyeX = p.face === 1 ? p.x + p.w - 8 : p.x + 4; // 눈
  ctx.fillRect(eyeX, p.y + 7, 4, 4);

  // 타이틀
  ctx.fillStyle = DIM;
  ctx.textAlign = 'left';
  ctx.fillText('// portfolio.exe — walk around, press E', 24, H - 24);
}
