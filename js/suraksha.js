/*==================================================
            SURAKSHA SECTION JS
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=========================================
            SCROLL REVEAL
    =========================================*/

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: 0.20

    });

    document.querySelectorAll(".reveal, .reveal-left").forEach((item) => {

        revealObserver.observe(item);

    });



    /*=========================================
            COUNTER
    =========================================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                startCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.50

    });

    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });

    function startCounter(counter) {

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const increment = target / 120;

        function updateCounter() {

            count += increment;

            if (count < target) {

                counter.innerHTML = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                if (target >= 1000) {

                    counter.innerHTML = target.toLocaleString() + "+";

                } else {

                    counter.innerHTML = target + "+";

                }

            }

        }

        updateCounter();

    }



    /*=========================================
            FEATURE HOVER
    =========================================*/

    document.querySelectorAll(".feature-box").forEach((box) => {

        box.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-8px)";

        });

        box.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

    });



    /*=========================================
            PILLAR CARD HOVER
    =========================================*/

    document.querySelectorAll(".pillar-card").forEach((card) => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

    });



    /*=========================================
            STATS HOVER
    =========================================*/

    document.querySelectorAll(".stat-box").forEach((box) => {

        box.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-6px)";

        });

        box.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

    });



    /*=========================================
            IMAGE PARALLAX
    =========================================*/

    const image = document.querySelector(".suraksha-image img");

    if (image) {

        window.addEventListener("mousemove", function (e) {

            let x = (window.innerWidth / 2 - e.clientX) / 90;

            let y = (window.innerHeight / 2 - e.clientY) / 90;

            image.style.transform =
                `translate(${-x}px, ${-y}px)`;

        });

    }



    /*=========================================
            FLOATING SHAPE
    =========================================*/

    const shape = document.querySelector(".image-shape");

    if (shape) {

        let up = true;

        setInterval(() => {

            if (up) {

                shape.style.transform = "translateY(-8px)";

            } else {

                shape.style.transform = "translateY(0px)";

            }

            up = !up;

        }, 1500);

    }



    /*=========================================
            TITLE PULSE
    =========================================*/

    const title = document.querySelector(".zoom-title");

    if (title) {

        setInterval(() => {

            title.style.transform = "scale(1.03)";

            setTimeout(() => {

                title.style.transform = "scale(1)";

            }, 350);

        }, 4000);

    }



    /*=========================================
            SMOOTH CARD SHADOW
    =========================================*/

    document.querySelectorAll(".pillar-card").forEach((card) => {

        card.addEventListener("mousemove", function (e) {

            const rect = this.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            this.style.setProperty("--x", x + "px");

            this.style.setProperty("--y", y + "px");

        });

    });

});