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




/*=========================================
      ABOUT SVG ANIMATION
=========================================*/

const aboutSection = document.querySelector(".about-circle-wrapper");

const path = document.getElementById("aboutPath");
const progress = document.getElementById("aboutProgress");
const dot = document.getElementById("movingDot");

if (aboutSection && path && progress && dot) {

    const pathLength = path.getTotalLength();

    // Progress line initially hidden
    progress.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progress.style.strokeDashoffset = pathLength;

    let animationId = null;
    let startTime = null;
    const duration = 7000; // 7 sec

    function animate(time){

        if(!startTime) startTime = time;

        const elapsed = time - startTime;

        let progressValue = elapsed / duration;

        if(progressValue > 1){

            startTime = time;
            progressValue = 0;

            // restart line
            progress.style.strokeDashoffset = pathLength;
        }

        const length = progressValue * pathLength;

        // Moving Dot
        const point = path.getPointAtLength(length);

        dot.setAttribute("cx", point.x);
        dot.setAttribute("cy", point.y);

        // Reveal Solid Line
        progress.style.strokeDashoffset = pathLength - length;

        animationId = requestAnimationFrame(animate);
    }

    function startAnimation(){

        cancelAnimationFrame(animationId);

        startTime = null;

        progress.style.strokeDashoffset = pathLength;

        animationId = requestAnimationFrame(animate);
    }

    function stopAnimation(){

        cancelAnimationFrame(animationId);

    }

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                startAnimation();

            }else{

                stopAnimation();

            }

        });

    },{

        threshold:0.35

    });

    observer.observe(aboutSection);

}