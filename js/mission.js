/*==========================================
        MISSION & VISION JS
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
            SCROLL ANIMATION
    ==========================================*/

    const cards = document.querySelectorAll(".mv-card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {

                    entry.target.classList.add("show");

                }, index * 250);

            }

        });

    }, {
        threshold: 0.25
    });

    cards.forEach(card => observer.observe(card));



    /*==========================================
            ICON FLOAT ANIMATION
    ==========================================*/

    const icons = document.querySelectorAll(".mv-icon");

    icons.forEach((icon, index) => {

        icon.animate(
            [
                {
                    transform: "translateY(0px)"
                },
                {
                    transform: "translateY(-8px)"
                },
                {
                    transform: "translateY(0px)"
                }
            ],
            {
                duration: 2000 + (index * 300),
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );

    });



    /*==========================================
            CARD HOVER EFFECT
    ==========================================*/

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 8;
            const rotateX = ((y / rect.height) - 0.5) * -8;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0px)
            `;

        });

    });



    /*==========================================
            IMAGE HOVER EFFECT
    ==========================================*/

    const images = document.querySelectorAll(".mv-image img");

    images.forEach(img => {

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.08)";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "scale(1)";

        });

    });



    /*==========================================
            SHINE EFFECT
    ==========================================*/

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
            radial-gradient(circle at ${x}px ${y}px,
            rgba(17,135,201,.12),
            #ffffff 45%)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "#ffffff";

        });

    });



    /*==========================================
            CARD POP EFFECT
    ==========================================*/

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.animate([
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(1.02)"
                },
                {
                    transform: "scale(1)"
                }
            ], {

                duration: 500,
                easing: "ease"

            });

        });

    });

});



/*==========================================
        PARALLAX BACKGROUND
==========================================*/

window.addEventListener("scroll", () => {

    const section = document.querySelector(".mv-section");

    if (!section) return;

    const scroll = window.pageYOffset;

    section.style.backgroundPositionY = `${scroll * 0.08}px`;

});