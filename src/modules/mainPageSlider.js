const mainPageSlider = () => {
    
    const slides = document.querySelector('.main-slider').children;

    let currentSlide = 0;

    const autoPlay = () => {
        // Hide prev slide
        slides[currentSlide].style.display = 'none';
        // Refresh counter
        currentSlide++;
        // Reset counter
        if ( currentSlide >= slides.length ) {
            currentSlide = 0;
        }
        // Show next counter
        slides[currentSlide].style.display = 'flex';

    };

    setInterval(autoPlay, 3000);

};

export default mainPageSlider;