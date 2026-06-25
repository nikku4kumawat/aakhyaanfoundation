
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

