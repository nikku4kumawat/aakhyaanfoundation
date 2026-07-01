// QUICK LINKS JS
document.querySelectorAll(".quick-card").forEach((card) => {
  card.addEventListener("click", function () {
    const link = this.getAttribute("href");

    if (link && link !== "#") {
      window.location.href = link;
    }
  });
});