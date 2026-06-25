
const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-bottom, .reveal-top"
);

const faqObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });

}, {
    threshold: 0.2
});

revealElements.forEach((element) => {
    faqObserver.observe(element);
});





