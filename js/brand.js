const columns = document.querySelectorAll('.logo-track');

columns.forEach(track => {

    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

});