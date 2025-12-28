// 1. CONFIGURATION: Set her birthday here (Year, Month-1, Day)
const BIRTH_DATE = new Date(2000, 0, 1); 

let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevX = 0; prevY = 0;
  currentX = 0; currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    const start = (x, y) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevX = x; this.prevY = y;
    };

    const move = (x, y) => {
      if (!this.holdingPaper) return;
      this.currentX += x - this.prevX;
      this.currentY += y - this.prevY;
      this.prevX = x; this.prevY = y;
      paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
    };

    const end = () => this.holdingPaper = false;

    // Desktop
    paper.addEventListener('mousedown', e => start(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => move(e.clientX, e.clientY));
    window.addEventListener('mouseup', end);

    // Mobile
    paper.addEventListener('touchstart', e => start(e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener('touchmove', e => move(e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener('touchend', end);
  }
}

document.querySelectorAll('.paper').forEach(p => new Paper().init(p));

// 2. TRANSITION LOGIC
const heartBtn = document.getElementById('heartButton');

heartBtn.addEventListener('click', () => {
  document.getElementById('paper-wrapper').classList.add('hidden');
  const section = document.getElementById('birthday-section');
  section.style.display = 'flex';
  
  startTree();
  setInterval(updateTimer, 1000);
});

function updateTimer() {
  const diff = new Date() - BIRTH_DATE;
  document.getElementById('days').innerText = Math.floor(diff / 86400000);
  document.getElementById('hours').innerText = Math.floor((diff / 3600000) % 24);
  document.getElementById('mins').innerText = Math.floor((diff / 60000) % 60);
}

function startTree() {
  const canvas = document.getElementById('garden');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth > 600 ? 600 : window.innerWidth;
  canvas.height = 450;
  let petals = [];
  const points = [];
  
  // Heart math
  for (let i = 0; i < 30; i += 0.1) {
    let x = 16 * Math.pow(Math.sin(i), 3);
    let y = 13 * Math.cos(i) - 5 * Math.cos(2*i) - 2 * Math.cos(3*i) - Math.cos(4*i);
    points.push([x * 10 + (canvas.width/2), -y * 10 + 180]);
  }

  function draw() {
    if (petals.length < 500) {
      for(let i=0; i<3; i++) {
        const p = points[Math.floor(Math.random() * points.length)];
        petals.push({x: p[0], y: p[1], r: Math.random() * 3 + 1, s: 0});
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff4d6d";
    petals.forEach(p => {
      if (p.s < p.r) p.s += 0.05;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
