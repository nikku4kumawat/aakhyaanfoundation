/*==================================================
        TARGET GROUP SECTION ANIMATION
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    // All animated elements
   const animatedElements = document.querySelectorAll(
".target-content, .target-right, .target-image, .work-approach, .work-approach-image, .dignity-content, .dignity-image, .component-image, .section-title"
);

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.20
    });

    animatedElements.forEach(function (element) {

        observer.observe(element);

    });

});


/*==================================================
        IMAGE FLOAT EFFECT
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const images = document.querySelectorAll(
        ".target-image img, .small-image img, .dignity-image img, .component-image img"
    );

    images.forEach(function (img) {

        img.addEventListener("mouseenter", function () {

            img.style.transform = "translateY(-8px) scale(1.02)";

        });

        img.addEventListener("mouseleave", function () {

            img.style.transform = "translateY(0px) scale(1)";

        });

    });

});


/*==================================================
        WORK APPROACH IMAGE
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const workImage = document.querySelector(".work-approach-image img");

    if (workImage) {

        workImage.addEventListener("mouseenter", function () {

            workImage.style.transform = "scale(1.02)";

        });

        workImage.addEventListener("mouseleave", function () {

            workImage.style.transform = "scale(1)";

        });

    }

});


/*==================================================
        PARALLAX EFFECT (Desktop Only)
==================================================*/

if (window.innerWidth > 992) {

    window.addEventListener("scroll", function () {

        const scrollTop = window.pageYOffset;

        document.querySelectorAll(".target-image img, .dignity-image img").forEach(function (img) {

            img.style.transform = `translateY(${scrollTop * 0.03}px)`;

        });

    });

}