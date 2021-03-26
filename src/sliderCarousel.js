// 'use strict';

// // Carousel slider
// class SliderCarousel {

//     constructor({
//         main, 
//         wrap, 
//         next, 
//         prev, 
//         infinity = false, 
//         position = 0, 
//         slidesToShow = 3, 
//         responsive = []
//     }) {

//         if ( !main || !wrap ) {
//             console.warn(`Carousel-slider error: lost properties: "main" or "wrap"`);
//         }

//         this.main = document.querySelector(main);
//         this.wrap = document.querySelector(wrap);
//         this.slides = document.querySelector(wrap).children;
//         this.next = document.querySelector(next);
//         this.prev = document.querySelector(prev);
//         this.slidesToShow = slidesToShow;
//         this.options = {
//             position,
//             infinity,
//             widthSlide: Math.floor(100 / this.slidesToShow)
//         };
//         this.responsive = responsive;
//     }

//     init() {
//         this.addCarouselClass();
//         this.addStyles();

//         if (this.prev && this.next) {
//             this.controlSlider();
//         } else {
//             this.addArrow();
//             this.controlSlider();
//         }

//         if ( this.responsive ) {
//             this.responseInit();
//         }
//     }

//     addCarouselClass() {
//         this.main.classList.add('carousel-slider');
//         this.wrap.classList.add('carousel-slider__wrap');
//         for (const slide of this.slides) {
//             slide.classList.add('carousel-slider__slide');
//         }
//     }

//     addStyles() {

//         let style = document.getElementById('sliderCarousel-style');

//         if (!style){
//             style = document.createElement('style');
//             style.id = 'sliderCarousel-style';
//         }

//         style.textContent= `

//             .carousel-slider {
//                 position: relative;
//                 overflow: hidden;
//             }

//             .carousel-slider__wrap {
//                 display: flex;
//                 transition: transform 0.5s;
//                 will-change: transform;
//             }

//             .carousel-slider__slide {
//                 flex: 0 0 ${this.options.widthSlide}%;
//                 margin: auto 0;
//             }

//         `;

//         document.head.appendChild(style);
//     }

//     controlSlider() {
//         this.prev.addEventListener('click', this.prevSlider.bind(this));
//         this.next.addEventListener('click', this.nextSlider.bind(this));
//     }

//     prevSlider() {
//         if ( this.options.infinity || (this.options.position > 0) ) {
//             --this.options.position;
            
//             if ( this.options.position < 0 ) {
//                 this.options.position = this.slides.length - this.slidesToShow;
//             }

//             this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
//         }
//     }

//     nextSlider() {
//         if ( this.options.infinity || (this.options.position < this.slides.length - this.slidesToShow) ) {
//             ++this.options.position;

//             if ( this.options.position > this.slides.length - this.slidesToShow) {
//                 this.options.position = 0;
//             }

//             this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
//         }
//     }

//     addArrow() {
//         this.prev = document.createElement('button');
//         this.next = document.createElement('button');

//         this.prev.textContent = '<';
//         this.next.textContent = '>';

//         this.prev.style.cssText = `position: absolute;
//                                    top: 0;
//                                    bottom: 0;
//                                    margin: auto 0;
//                                    left: 0;
//                                    display: block;
//                                    width: 35px;
//                                    height: 35px;
//                                    background-color: #ffd11a;
//                                    border-radius: 50px;
//                                    color: #000000;
//                                    border: none;
//                                    font-size: 20px;`;
        
//         this.next.style.cssText = `position: absolute;
//                                    top: 0;
//                                    bottom: 0;
//                                    margin: auto 0;
//                                    right: 0;
//                                    display: block;
//                                    width: 35px;
//                                    height: 35px;
//                                    background-color: #ffd11a;
//                                    border-radius: 50px;
//                                    color: #000000;
//                                    border: none;
//                                    font-size: 20px;`;

//         this.prev.className = 'carousel-slider__prev';
//         this.next.className = 'carousel-slider__next';

//         this.main.appendChild(this.prev);
//         this.main.appendChild(this.next);
//     }

//     responseInit() {
//         const slidesToShowDefault = this.slidesToShow,
//               allResponse = this.responsive.map(item => item.breakpoint),
//               maxResponse = Math.max(...allResponse),
//               checkResponse = () => {
                  
//                 const widthWindow = document.documentElement.clientWidth;

//                   if (widthWindow < maxResponse) {
//                       for (let i = 0; i < allResponse.length; i++) {
//                           if (widthWindow < allResponse[i]) {
//                               this.slidesToShow = this.responsive[i].slideToShow;
//                               this.options.widthSlide = Math.floor(100/this.slidesToShow);
//                               this.addStyles();
//                           }
//                       }
//                   } else {
//                       this.slidesToShow = slidesToShowDefault;
//                       this.options.widthSlide = Math.floor(100/this.slidesToShow);
//                       this.addStyles();
//                   }
//               };

//               checkResponse();

//               window.addEventListener('resize', checkResponse);
//     }

// }