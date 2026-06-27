/*=========================================
        CORE VALUES ANIMATION
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    const heading = document.querySelector(".cv-heading");
    const cards = document.querySelectorAll(".cv-card");

    const observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.2

    });

    if(heading){

        observer.observe(heading);

    }

    cards.forEach(function(card){

        observer.observe(card);

    });

});


/*=========================================
        CARD MOUSE MOVE EFFECT
=========================================*/

const allCards = document.querySelectorAll(".cv-card");

allCards.forEach(function(card){

    card.addEventListener("mousemove",function(e){

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -10;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        card.style.transform =
        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-12px)`;

    });

    card.addEventListener("mouseleave",function(){

        card.style.transform="";

    });

});


/*=========================================
      ICON PULSE EFFECT
=========================================*/

setInterval(function(){

    document.querySelectorAll(".cv-icon").forEach(function(icon){

        icon.classList.add("pulse");

        setTimeout(function(){

            icon.classList.remove("pulse");

        },700);

    });

},3500);



/*=========================================
      SMOOTH SCROLL REVEAL
=========================================*/

window.addEventListener("scroll",function(){

    const section=document.querySelector(".core-values-section");

    if(!section) return;

    const top=section.getBoundingClientRect().top;

    const trigger=window.innerHeight-150;

    if(top<trigger){

        section.classList.add("active");

    }

});