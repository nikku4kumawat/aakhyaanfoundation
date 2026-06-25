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





