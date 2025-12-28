let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {

    const start = (x, y) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      if (paper.classList.contains("last-paper")) {
        document.getElementById("finalBtn").style.display = "block";
      }

      this.prevX = x;
      this.prevY = y;
    };

    const move = (x, y) => {
      if (!this.holdingPaper) return;

      const dx = x - this.prevX;
      const dy = y - this.prevY;

      this.currentX += dx;
      this.currentY += dy;

      this.prevX = x;
      this.prevY = y;

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    };

    const end = () => {
      this.holdingPaper = false;
    };

    // Mouse
    paper.addEventListener("mousedown", e => start(e.clientX, e.clientY));
    document.addEventListener("mousemove", e => move(e.clientX, e.clientY));
    document.addEventListener("mouseup", end);

    // Touch
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

// ❤️ Button action
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("finalBtn").onclick = () => {
    alert("I Love You Forever ❤️");
  };
});
