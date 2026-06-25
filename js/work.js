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

