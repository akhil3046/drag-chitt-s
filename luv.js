let highestZ = 1;

class Paper {
  holdingPaper = false;
  offsetX = 0;
  offsetY = 0;

  init(paper) {
    const movePaper = (e) => {
      if (this.holdingPaper) {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const touchX = clientX - this.offsetX;
        const touchY = clientY - this.offsetY;

        paper.style.transform = `translate(${touchX}px, ${touchY}px)`;
      }
    };

    const startDragging = (e) => {
      if (this.holdingPaper) return;

      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      const rect = paper.getBoundingClientRect();
      this.offsetX = e.clientX - rect.left || e.touches[0].clientX - rect.left;
      this.offsetY = e.clientY - rect.top || e.touches[0].clientY - rect.top;

      document.addEventListener('mousemove', movePaper);
      document.addEventListener('touchmove', movePaper);
    };

    const stopDragging = () => {
      if (this.holdingPaper) {
        this.holdingPaper = false;
        document.removeEventListener('mousemove', movePaper);
        document.removeEventListener('touchmove', movePaper);
      }
    };

    paper.addEventListener('mousedown', startDragging);
    paper.addEventListener('touchstart', startDragging);

    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
