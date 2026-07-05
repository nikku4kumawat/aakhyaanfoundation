/*=========================================
    OUR PROGRAMMES ANIMATION
=========================================*/

// Heading Animation
const titleObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }else{

            entry.target.classList.remove("show");

        }

    });

},{
    threshold:0.3
});

document.querySelectorAll(".zoom-title").forEach(title=>{

    titleObserver.observe(title);

});



// Grid Animation (Focus Area & Target Group Alag Alag)

const gridObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        const cards = entry.target.querySelectorAll(".animate-card");

        if(entry.isIntersecting){

            cards.forEach((card,index)=>{

                setTimeout(()=>{

                    card.classList.add("show");

                },index*180);

            });

        }else{

            cards.forEach(card=>{

                card.classList.remove("show");

            });

        }

    });

},{
    threshold:0.25
});


// Focus Area Grid Observe
document.querySelectorAll(".focus-grid").forEach(grid=>{

    gridObserver.observe(grid);

});


// Target Group Grid Observe
document.querySelectorAll(".target-grid").forEach(grid=>{

    gridObserver.observe(grid);

});