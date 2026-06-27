/*=====================================
      CORE VALUES ANIMATION
======================================*/

document.addEventListener("DOMContentLoaded", function () {

    const heading = document.querySelector(".cv-heading");
    const cards = document.querySelectorAll(".value-card");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                /* Heading */

                if (entry.target.classList.contains("cv-heading")) {

                    entry.target.classList.add("show");

                }

                /* Cards */

                if (entry.target.classList.contains("value-card")) {

                    const index = [...cards].indexOf(entry.target);

                    setTimeout(() => {

                        entry.target.classList.add("show");

                    }, index * 180);

                }

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.2

    });

    observer.observe(heading);

    cards.forEach(card => {

        observer.observe(card);

    });

});