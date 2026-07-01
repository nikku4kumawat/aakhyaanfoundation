document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Banner Slider Start
    ========================= */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let currentSlide = 0;

    function typeHeading(element) {
        const text = element.getAttribute("data-text") || "";
        element.textContent = "";

        let i = 0;

        const typing = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(typing);
            }
        }, 70);
    }

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        const heading = slides[index].querySelector("h1");
        const para = slides[index].querySelector("p");

        if (heading) {
            typeHeading(heading);
        }

        if (para) {
            para.style.animation = "none";
            void para.offsetWidth;
            para.style.animation = "zoomText .8s .4s forwards";
        }
    }

    function nextSlide() {
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (nextBtn) {
        nextBtn.addEventListener("click", nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", prevSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    if (slides.length > 0) {
        showSlide(0);
        setInterval(nextSlide, 8000);
    }

    /* =========================
       Upcoming Event Fetch Start
    ========================= */

    const bannerEventText = document.getElementById("bannerEventText");
    const bannerLocationText = document.getElementById("bannerLocationText");
    const bannerEventTrack = document.getElementById("bannerEventTrack");

    async function fetchBannerUpcomingEvent() {
        try {
            const res = await fetch(API_PATHS.UPCOMING_EVENT);
            const data = await res.json();

            if (!res.ok) {
                setDefaultUpcomingEvent();
                return;
            }

            renderBannerUpcomingEvent(data);

        } catch (error) {
            console.error("Upcoming event fetch error:", error);
            setDefaultUpcomingEvent();
        }
    }

    function renderBannerUpcomingEvent(data) {
        let eventText = "No upcoming event added yet";
        let locationText = "Location will appear here";

        if (data && data.events && data.events.length > 0) {
            eventText = data.events
                .map((item) => item.text)
                .join("  ✦  ");
        }

        if (data && data.location) {
            locationText = data.location;
        }

        if (bannerEventText) {
            bannerEventText.textContent = eventText;
        }

        if (bannerLocationText) {
            bannerLocationText.textContent = locationText;
        }

        restartEventAnimation();
    }

    function setDefaultUpcomingEvent() {
        if (bannerEventText) {
            bannerEventText.textContent = "No upcoming event added yet";
        }

        if (bannerLocationText) {
            bannerLocationText.textContent = "Location will appear here";
        }

        restartEventAnimation();
    }

    function restartEventAnimation() {
        if (!bannerEventTrack) return;

        bannerEventTrack.style.animation = "none";
        void bannerEventTrack.offsetWidth;
        bannerEventTrack.style.animation = "";
    }

    fetchBannerUpcomingEvent();

    /* =========================
       Upcoming Event Fetch End
    ========================= */

});