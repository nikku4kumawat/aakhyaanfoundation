// ===============================
// OVERVIEW ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".scroll-animation");

    // Page Load Animation
    setTimeout(() => {
        items.forEach((item) => {
            item.classList.add("show");
        });
    }, 200);

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            } else {

                entry.target.classList.remove("show");

            }

        });

    }, {
        threshold: 0.20
    });

    items.forEach((item) => {
        observer.observe(item);
    });

});