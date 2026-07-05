// ===============================
// OVERVIEW ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".scroll-animation");

    // Page Load Animation
    setTimeout(() => {
        items.forEach((item) => {
            item.classList.add("show");
        });
    }, 200);

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            } else {

                entry.target.classList.remove("show");

            }

        });

    }, {
        threshold: 0.20
    });

    items.forEach((item) => {
        observer.observe(item);
    });

});






/*=========================================
        APPROACH IMAGE POPUP
==========================================*/

const approachImages=document.querySelectorAll(".approach-image-item img");

const approachPopup=document.getElementById("approachPopup");

const approachPopupImage=document.getElementById("approachPopupImage");

const approachClose=document.querySelector(".approach-popup-close");


approachImages.forEach(function(image){

    image.addEventListener("click",function(){

        approachPopup.classList.add("show");

        approachPopupImage.src=this.src;

    });

});


approachClose.addEventListener("click",function(){

    approachPopup.classList.remove("show");

});


approachPopup.addEventListener("click",function(e){

    if(e.target===approachPopup){

        approachPopup.classList.remove("show");

    }

});


/*=========================================
        SCROLL ANIMATION
==========================================*/

const approachObserver=new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:.2
});


document.querySelectorAll(".approach-image-item").forEach(function(item,index){

    item.style.transitionDelay=(index*0.15)+"s";

    approachObserver.observe(item);

});