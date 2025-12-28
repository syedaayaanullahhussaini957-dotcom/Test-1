let highestZ = 1;
let movedCount = 0;
const papers = document.querySelectorAll(".paper");
const finalHeart = document.getElementById("finalHeart");

class Paper {
  holding = false;
  prevX = 0;
  prevY = 0;
  x = 0;
  y = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.addEventListener("mousedown", e => {
      this.holding = true;
      paper.style.zIndex = highestZ++;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    document.addEventListener("mousemove", e => {
      if (!this.holding) return;
      this.x += e.clientX - this.prevX;
      this.y += e.clientY - this.prevY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
      paper.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    });

    document.addEventListener("mouseup", () => {
      if (this.holding) movedCount++;
      this.holding = false;
      checkHeart();
    });
  }
}

papers.forEach(p => new Paper().init(p));

function checkHeart() {
  if (movedCount >= papers.length - 1) {
    finalHeart.classList.add("show");
  }
}
