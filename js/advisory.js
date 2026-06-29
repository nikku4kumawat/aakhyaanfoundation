/*=========================================
        ADVISORY SECTION ANIMATION
=========================================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});


/* Heading */

document.querySelectorAll(".reveal-title").forEach((el)=>{

    observer.observe(el);

});


/* Cards */

document.querySelectorAll(".reveal-card").forEach((card,index)=>{

    card.style.transitionDelay = `${index * 150}ms`;

    observer.observe(card);

});

