const papersMobile = document.querySelectorAll(".paper");

papersMobile.forEach(paper => {
  paper.addEventListener("touchstart", (e) => {
    activePaper = paper;
    const touch = e.touches[0];
    offsetX = touch.clientX - paper.offsetLeft;
    offsetY = touch.clientY - paper.offsetTop;

    if (paper === lastPaper) {
      lastMoved = true;
    }
  });
});

document.addEventListener("touchmove", (e) => {
  if (!activePaper) return;

  const touch = e.touches[0];
  activePaper.style.left = touch.clientX - offsetX + "px";
  activePaper.style.top = touch.clientY - offsetY + "px";
});

document.addEventListener("touchend", () => {
  activePaper = null;

  if (lastMoved) {
    finalHeart.classList.add("show");
  }
});
