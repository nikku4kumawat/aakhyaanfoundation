
const programmeElements = document.querySelectorAll(
    '.animate-title, .animate-text, .programme-card'
);

const programmeObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

        } else {

            
            entry.target.classList.remove('show');
        }

    });

}, {
    threshold: 0.25
});

programmeElements.forEach((element) => {
    programmeObserver.observe(element);
});




