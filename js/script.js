// ==================navbar section ====================
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

/* Open Menu */
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
});

/* Close Menu */
function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
}

closeBtn.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);

/* Sticky Navbar */
window.addEventListener("scroll", () => {

    const navbar = document.getElementById("navbar");

    if (window.scrollY > 120) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

});

/* Mobile Dropdown */
document.querySelectorAll(".mobile-dropdown .mobile-link").forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const parent = this.parentElement;
        const submenu = parent.querySelector(":scope > .mobile-submenu");
        const icon = this.querySelector(".mobile-toggle");

        if (!submenu) return;

        submenu.classList.toggle("active");

        if (icon) {
            icon.textContent =
                submenu.classList.contains("active")
                ? "−"
                : "+";
        }

    });

});




//==============baneer section=================
document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let currentSlide = 0;

    function typeHeading(element){

        const text = element.getAttribute("data-text") || "";

        element.textContent = "";

        let i = 0;

        const typing = setInterval(() => {

            element.textContent += text.charAt(i);

            i++;

            if(i >= text.length){
                clearInterval(typing);
            }

        },70);
    }

    function showSlide(index){

        slides.forEach(slide=>{
            slide.classList.remove("active");
        });

        dots.forEach(dot=>{
            dot.classList.remove("active");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        const heading = slides[index].querySelector("h1");
        const para = slides[index].querySelector("p");

        if(heading){
            typeHeading(heading);
        }

        if(para){
            para.style.animation = "none";
            void para.offsetWidth;
            para.style.animation = "zoomText .8s .4s forwards";
        }
    }

    function nextSlide(){

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    function prevSlide(){

        currentSlide--;

        if(currentSlide < 0){
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if(nextBtn){
        nextBtn.addEventListener("click", nextSlide);
    }

    if(prevBtn){
        prevBtn.addEventListener("click", prevSlide);
    }

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            currentSlide = index;
            showSlide(currentSlide);

        });

    });

    showSlide(0);

    setInterval(nextSlide,8000);

});




// ===================== impact section======================

const cards = document.querySelectorAll(".impact-card");
const counters = document.querySelectorAll(".counter");

function startCounter(){

    const duration = 2500; // sab ek sath rukenge

    counters.forEach(counter=>{

        const target = +counter.getAttribute("data-target");

        let start = null;

        function update(timestamp){

            if(!start) start = timestamp;

            const progress = Math.min(
                (timestamp - start) / duration,
                1
            );

            const value = Math.floor(progress * target);

            counter.innerText = value.toLocaleString();

            if(progress < 1){
                requestAnimationFrame(update);
            }else{
                counter.innerText = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);

    });

}

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{


        if(entry.isIntersecting){

    // Mobile
    if(window.innerWidth <= 576){

        cards.forEach(card=>{
            card.classList.add("show");
        });

        startCounter(); // sirf counter animation

    }

    // Desktop & Tablet
    else{

        cards.forEach((card,index)=>{

            setTimeout(()=>{
                card.classList.add("show");
            },index * 150);

        });

        startCounter();

    }

}
else{

    cards.forEach(card=>{
        card.classList.remove("show");
    });

    counters.forEach(counter=>{
        counter.innerText = "0";
    });

}

    });

},{
    threshold:0.4
});

observer.observe(
    document.querySelector(".impact-section")
);



// ===================== ABOUT section======================
const aboutObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

    if(entry.isIntersecting){

        entry.target.classList.add("show");

    }else{

        entry.target.classList.remove("show");

    }

});

},{
    threshold:0.2
});

document.querySelectorAll(
'.about-content h2, .about-content p, .about-box, .img-large, .img-small'
).forEach((el)=>{

    aboutObserver.observe(el);

});





// ===================== our programs section======================

const programmeElements = document.querySelectorAll(
    '.animate-title, .animate-text, .programme-card'
);

const programmeObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

        } else {

            
            entry.target.classList.remove('show');
        }

    });

}, {
    threshold: 0.25
});

programmeElements.forEach((element) => {
    programmeObserver.observe(element);
});





 // ===================== FAQ START =====================
// FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach((faq) => {

            faq.classList.remove("active");

            faq.querySelector("i").classList.remove("fa-chevron-up");
            faq.querySelector("i").classList.add("fa-chevron-down");

        });

        if (!isActive) {

            item.classList.add("active");

            item.querySelector("i").classList.remove("fa-chevron-down");
            item.querySelector("i").classList.add("fa-chevron-up");

        }

    });

});




// ============= how WE WORK ANIMATION ===================
const howRevealElements = document.querySelectorAll(".how-reveal");

function howRevealOnScroll(){
    howRevealElements.forEach((element)=>{
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if(elementTop < windowHeight - revealPoint){
            element.classList.add("how-active");
        }
    });
}

window.addEventListener("scroll", howRevealOnScroll);
window.addEventListener("load", howRevealOnScroll);





// ============= FAQ SCROLL ANIMATION ===================

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





 // ===================== OUR BRABD START =====================
const columns = document.querySelectorAll('.logo-track');

columns.forEach(track => {

    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

});
