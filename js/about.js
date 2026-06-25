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




