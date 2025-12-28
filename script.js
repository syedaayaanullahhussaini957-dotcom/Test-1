let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {

    const start = (x, y) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevX = x;
      this.prevY = y;
    };

    const move = (x, y) => {
      if (!this.holdingPaper) return;
      this.currentX += x - this.prevX;
      this.currentY += y - this.prevY;
      this.prevX = x;
      this.prevY = y;

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    };

    const end = () => this.holdingPaper = false;

    paper.addEventListener("mousedown", e => start(e.clientX, e.clientY));
    document.addEventListener("mousemove", e => move(e.clientX, e.clientY));
    document.addEventListener("mouseup", end);

    paper.addEventListener("touchstart", e => {
      e.preventDefault();
      start(e.touches[0].clientX, e.touches[0].clientY);
    });

    document.addEventListener("touchmove", e => {
      e.preventDefault();
      move(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    document.addEventListener("touchend", end);
  }
}

document.querySelectorAll(".paper").forEach(paper => {
  new Paper().init(paper);
});

// ❤️ HEART – SIMPLE & FIXED
const lastPaper = document.querySelector(".last-paper");
const heart = document.getElementById("heartButton");

let shown = false;

function revealHeart() {
  if (shown) return;
  shown = true;

  heart.style.opacity = "1";
  heart.style.pointerEvents = "auto";
}

// Desktop
lastPaper.addEventListener("mousedown", revealHeart);

// Mobile
lastPaper.addEventListener("touchstart", revealHeart);

