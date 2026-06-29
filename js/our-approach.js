/*==================================================
            OUR APPROACH ANIMATION
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:0.2

    });



    /* Left Image */

    const image = document.querySelector(".approach-image");

    if(image){
        observer.observe(image);
    }



    /* Right Content */

    const content = document.querySelector(".approach-content");

    if(content){
        observer.observe(content);
    }



    /* Cards */

    const cards = document.querySelectorAll(".pillar-card");

    cards.forEach(function(card,index){

        card.style.transitionDelay = (index * 0.2) + "s";

        observer.observe(card);

    });

});


/*==================================================
            PARALLAX IMAGE EFFECT
==================================================*/

window.addEventListener("scroll",function(){

    const image = document.querySelector(".image-box img");

    if(image){

        let value = window.scrollY;

        image.style.transform = "translateY(" + value * 0.05 + "px)";

    }

});


/*==================================================
            CARD HOVER GLOW EFFECT
==================================================*/

const cards = document.querySelectorAll(".pillar-card");

cards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        card.style.boxShadow="0 25px 60px rgba(17,135,201,.25)";

    });

    card.addEventListener("mouseleave",function(){

        card.style.boxShadow="0 10px 35px rgba(0,0,0,.06)";

    });

});


/*==================================================
            BUTTON ARROW ANIMATION
==================================================*/

const buttons = document.querySelectorAll(".pillar-card a");

buttons.forEach(function(btn){

    btn.addEventListener("mouseenter",function(){

        const icon=this.querySelector("i");

        if(icon){

            icon.style.transform="translateX(8px)";

        }

    });

    btn.addEventListener("mouseleave",function(){

        const icon=this.querySelector("i");

        if(icon){

            icon.style.transform="translateX(0px)";

        }

    });

});


/*==================================================
            IMAGE HOVER EFFECT
==================================================*/

const imageBox=document.querySelector(".image-box");

if(imageBox){

    imageBox.addEventListener("mousemove",function(){

        imageBox.style.transform="translateY(-6px)";

    });

    imageBox.addEventListener("mouseleave",function(){

        imageBox.style.transform="translateY(0px)";

    });

}


/*==================================================
            HEADING ZOOM EFFECT
==================================================*/

const heading=document.querySelector(".approach-content h2");

if(heading){

    heading.style.transition="all .8s ease";

    window.addEventListener("scroll",function(){

        const top=heading.getBoundingClientRect().top;

        const screen=window.innerHeight;

        if(top<screen-100){

            heading.style.transform="scale(1)";
            heading.style.opacity="1";

        }else{

            heading.style.transform="scale(.8)";
            heading.style.opacity=".3";

        }

    });

}