'use strict';

// Carousel slider
class SliderCarousel {

    constructor({main, wrap, next, prev, position = 0}) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.options = {
            position
        }
    }

    init() {
        this.addCarouselClass();
        this.addStyles();
    }

    addCarouselClass() {
        this.main.classList.add('carousel-slider');
        this.wrap.classList.add('carousel-slider__wrap');
        for (const slide of this.slides) {
            slide.classList.add('carousel-slider__slide');
        }
    }

    addStyles() {
        const style = document.createElement('style');
        style.id = 'sliderCarousel-style';
        style.textContent= `
            
            .carousel-slider {
                overflow: hidden;
            }

            .carousel-slider__wrap {
                display: flex;
                transition: transform 0.5s;
                will-change: transform;
            }

            .carousel-slider__slide {
                flex: 0 0 20%;
                margin: auto 0;
            }

        `;
        document.head.appendChild(style);
    }
}