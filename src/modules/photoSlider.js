const photoSlider = () => {
    const sliderWrap = document.querySelector('.gallery-bg .wrapper'),
          slider = sliderWrap.querySelector('.gallery-slider'),
          slide = sliderWrap.querySelectorAll('.slide');
    
    let interval;
    
    let currentSlide = 0;

    let dotContainer,
        dot;
    
    const initStyles = () => {
        const style = document.createElement('style');
        style.id = 'photoSliderStyles';
        
        style.textContent = `
            
            .gallery-slider {
                position: relative;
            }

            .gallery-slider .slide {
                display: none;
            }

            .gallery-slider .slide-active {
                display: block;
            }

            .dot-container {
                position: absolute;
                bottom: 20px;
                left: 0;
                right: 0;
                margin: auto;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }

            .arrow {
                position: absolute;
                margin: auto 0;
                top: 0;
                bottom: 0;
                width: 30px;
                height: 30px;
                border: none;
                border-radius: 30px;
                background-color: #ffd11a;
                font-size: 20px;
            }

            #leftArrow {
                left: 40px;
            }

            #rightArrow {
                right: 40px;
            }

            .dot {
                width: 30px;
                height: 10px;
                background-color: #fff;
                margin-right: 5px;
                cursor: pointer;
            }

            .dot-active {
                background-color: #ffd11a;
            }

        `;

        document.head.append(style);
    };

    initStyles();

    const addArrow = () => {
        const leftArrow = document.createElement('button'),
              rightArrow = document.createElement('button');

        leftArrow.textContent = '<';
        rightArrow.textContent = '>';

        leftArrow.classList.add('arrow');
        rightArrow.classList.add('arrow');

        leftArrow.id = 'leftArrow';
        rightArrow.id = 'rightArrow';

        slider.append(leftArrow);
        slider.append(rightArrow);
    };

    addArrow();

    const addDots = () => {

        if ( !dotContainer ) {
            dotContainer = document.createElement('div');
            dotContainer.classList.add('dot-container');
            slider.append(dotContainer);
        }

        for (let i = 0; i < slide.length; i++) {
            let dotElem = document.createElement('div');
            dotElem.classList.add('dot');
            dotContainer.append(dotElem);
        }

        dot = document.querySelectorAll('.dot');
        dot[0].classList.add('dot-active');

        // Make first slide active at init
        slide[0].classList.add('slide-active');
    };

    addDots();

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

        prevSlide(slide, currentSlide, 'slide-active');
        prevSlide(dot, currentSlide, 'dot-active');

        currentSlide++;

        if ( currentSlide >= slide.length ) {
            currentSlide = 0;
        }

        nextSlide(slide, currentSlide, 'slide-active');
        nextSlide(dot, currentSlide, 'dot-active');

    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {

        event.preventDefault();

        let target = event.target;

        if ( !target.matches('.arrow, .dot') ) {
            return;
        }

        prevSlide(slide, currentSlide, 'slide-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if ( target.matches('#rightArrow') ) {

            currentSlide++;

        } else if ( target.matches('#leftArrow') ) {

            currentSlide--;

        } else if ( target.matches('.dot') ) {

            dot.forEach( (item, index) => {

                if ( item === target ) {

                    currentSlide = index;

                }

            });
        }

        if ( currentSlide >= slide.length ) {
            currentSlide = 0;
        }

        if ( currentSlide < 0 ) {
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'slide-active');
        nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
        if ( event.target.matches('.arrow') || event.target.matches('.dot') ) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (  event.target.matches('.arrow') || event.target.matches('.dot') ) {
            startSlide(1500);
        }
    });


    startSlide(1500);

};

export default photoSlider;