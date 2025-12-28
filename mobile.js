papers.forEach(paper => {
  let x = 0, y = 0, prevX = 0, prevY = 0, holding = false;

  paper.addEventListener("touchstart", e => {
    holding = true;
    paper.style.zIndex = highestZ++;
    prevX = e.touches[0].clientX;
    prevY = e.touches[0].clientY;
  });

  document.addEventListener("touchmove", e => {
    if (!holding) return;
    e.preventDefault();
    x += e.touches[0].clientX - prevX;
    y += e.touches[0].clientY - prevY;
    prevX = e.touches[0].clientX;
    prevY = e.touches[0].clientY;
    paper.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive:false });

  document.addEventListener("touchend", () => {
    if (holding) movedCount++;
    holding = false;
    checkHeart();
  });
});
