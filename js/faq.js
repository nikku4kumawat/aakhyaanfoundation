// FAQ Accordion
const akhFaqItems = document.querySelectorAll(".akh-faq-item");

akhFaqItems.forEach((item) => {
    const question = item.querySelector(".akh-faq-question");
    const icon = item.querySelector(".akh-faq-question i");

    question.addEventListener("click", () => {

        akhFaqItems.forEach((faq) => {
            if (faq !== item) {
                faq.classList.remove("akh-active");

                const faqIcon = faq.querySelector(".akh-faq-question i");
                faqIcon.classList.remove("fa-chevron-up");
                faqIcon.classList.add("fa-chevron-down");
            }
        });

        item.classList.toggle("akh-active");

        if (item.classList.contains("akh-active")) {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
        } else {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
        }

    });
});

// First FAQ Open By Default
if (akhFaqItems.length > 0) {
    akhFaqItems[0].classList.add("akh-active");

    const firstIcon = akhFaqItems[0].querySelector(".akh-faq-question i");
    firstIcon.classList.remove("fa-chevron-down");
    firstIcon.classList.add("fa-chevron-up");
}

// Reveal Animation
const akhRevealElements = document.querySelectorAll(
    ".akh-reveal-left, .akh-reveal-bottom, .akh-reveal-top"
);

const akhFaqObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("akh-show");
        }
    });
}, {
    threshold: 0.2
});

akhRevealElements.forEach((element) => {
    akhFaqObserver.observe(element);
});