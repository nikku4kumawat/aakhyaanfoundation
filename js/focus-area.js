/*=========================================
        FOCUS AREA ANIMATION
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach((entry)=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.3

    });

    document.querySelectorAll(".focus-image,.focus-content").forEach((el)=>{

        observer.observe(el);

    });

});