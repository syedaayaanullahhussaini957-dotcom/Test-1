const papers = document.querySelectorAll(".paper");
const lastPaper = document.getElementById("lastPaper");
const finalHeart = document.getElementById("finalHeart");

let activePaper = null;
let offsetX = 0;
let offsetY = 0;
let lastMoved = false;

papers.forEach(paper => {
  paper.addEventListener("mousedown", (e) => {
    activePaper = paper;
    offsetX = e.clientX - paper.offsetLeft;
    offsetY = e.clientY - paper.offsetTop;

    if (paper === lastPaper) {
      lastMoved = true;
    }
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activePaper) return;

  activePaper.style.left = e.clientX - offsetX + "px";
  activePaper.style.top = e.clientY - offsetY + "px";
});

document.addEventListener("mouseup", () => {
  activePaper = null;

  if (lastMoved) {
    finalHeart.classList.add("show");
  }
});
