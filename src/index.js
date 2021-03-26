'use strict';

// This script opens menu and modal windows at the page
const openMenu = () => {

    const btnChooseClub = document.querySelector('.club-select'),
          listChooseClub = btnChooseClub.querySelector('ul'),
          popupFreeVisitForm = document.getElementById('free_visit_form'),
          popupCallbackForm = document.getElementById('callback_form');

    document.body.addEventListener('click', (event) => {

        let target = event.target;

        // Choose club menu logic
        if ( target.closest('.club-select') ) {
            listChooseClub.style.display = 'block';
        } else if ( !target.closest('.club-select') ) {
            listChooseClub.style.display = 'none';
        }

        // Modal window "free visit form" logic
        if ( target.closest('[data-popup="#free_visit_form"]') ) {
            popupFreeVisitForm.style.display = 'block';
        } else if ( ( target.closest('.close-form') ) || ( !target.closest('.form-wrapper') ) ) {
            popupFreeVisitForm.style.display = 'none';
        }

        // Modal window "callback form" logic
        if ( target.closest('[data-popup="#callback_form"]') && !(target.closest('form')) ) {
            popupCallbackForm.style.display = 'block';
        } else if ( ( target.closest('.close-form') ) || ( !target.closest('.form-wrapper') ) ) {
            popupCallbackForm.style.display = 'none';
        }


    });
};

openMenu();

// This script send form at server by fetch
const sendForm = () => {
    const errorMessage = 'Что-то пошло не так.',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы с вами свяжемся.';
    
    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 1.5em; margin-top: 5px; margin-bottom: 5px;`;

    document.body.addEventListener('submit', (event) => {

        event.preventDefault();

        // If checkbox exists and not checked
        if ( event.target.querySelector('[type="checkbox"]') && !event.target.querySelector('[type="checkbox"]').checked ) {
            
            const checkboxBlock = event.target.querySelector('.personal-data'),
                  checkboxMessBlock = document.createElement('p');
            // Set text and styles for checkbox error message
            checkboxMessBlock.style.cssText = 'color: red; font-size: 1.2em; margin: 5px 0;';
            checkboxMessBlock.textContent = 'Вы должны подтвердить согласие';
            // Push it to the checkbox block
            checkboxBlock.append(checkboxMessBlock);
            // Block send button for 1,5s (if button pressed N times, you can see only 1 checkboxMessBlock)
            event.target.querySelector('[type="submit"]').disabled = true;
            // After 1,5s hide checkboxMessBlock and enable send button
            setTimeout(() => {
                checkboxMessBlock.style.display = 'none';
                event.target.querySelector('[type="submit"]').disabled = false;
            }, 1000);
            return;
        }

        // Set events for validation. Its simplifies the code
        let currentPhoneInput = event.target.querySelector('[type="tel"]'),
            isStartPlusAndLess12 = currentPhoneInput.value.match(/^\+/) && currentPhoneInput.value.length < 12,
            isStartNumAndLess11 = currentPhoneInput.value.match(/^(7|8)/) && currentPhoneInput.value.length < 11,
            isNoStartAndLess11 = currentPhoneInput.value.length < 11;

        if ( isStartPlusAndLess12 || isStartNumAndLess11 || isNoStartAndLess11 ) {
            // Set custom error validity message
            event.target.querySelector('[type="tel"]').setCustomValidity('Недостаточно символов для номера телефона');
            // Check error fix
            event.target.querySelector('[type="tel"]').addEventListener('blur', function() { this.value.length === 12 && this.setCustomValidity(''); }, false);
            return;
        }

        statusMessage.style.color = '#ffd11a';

        event.target.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(event.target);
        const body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Network status is not 200');
                }
            })
            .then(() => {

                if ( event.target.closest('.form-content') ) {
                    // Clear form's inputs
                    let formInputs = event.target.querySelectorAll('input');
                    formInputs.forEach(item => item.value = '');
                    
                    // Hide form
                    event.target.closest('form').style.display = 'none';

                    // Create and style form success message
                    const successBlock = document.createElement('div'),
                          imgSuccessBlock = document.createElement('img');
                    
                    successBlock.style.cssText = `display: block; color: #fff; margin: auto; margin-top: 50px; font-size: 1.5em; max-width: 200px;`;
                    imgSuccessBlock.src = './images/success.svg';
                    imgSuccessBlock.style.cssText = `display: block; width: 100px; height: 100px; margin: auto; margin-bottom: 10px;`;
                    successBlock.append(imgSuccessBlock);
                    successBlock.append(successMessage);

                    // Append this success form into modal window
                    event.target.closest('.form-content').appendChild(successBlock);

                    // When 3 seconds have passed, hide this message and reset the form
                    setTimeout(() => {
                        successBlock.style.display = 'none';
                        event.target.closest('form').style.display = 'block';
                    }, 1500);
                } else {

                    // Clear form's inputs
                    let formInputs = event.target.querySelectorAll('input');
                    formInputs.forEach(item => item.value = '');
                    // Style input for success input and put success message
                    event.target.querySelectorAll('input').forEach((item) => item.style.border = '2px solid green');
                    statusMessage.textContent = successMessage;
                    // Clearn succes style for input after 1500ms
                    setTimeout(() => event.target.querySelectorAll('input').forEach((item) => item.style.border = 'none'), 1500);
                    // Open thanks frame
                    document.getElementById('thanks').style.display = 'flex';
                    // Close event listener for this thanks frame
                    document.body.addEventListener('click', (event) => {
                        if ( ( event.target.closest('.close-form') ) || ( !event.target.closest('.form-wrapper') || ( event.target.matches('.close-btn') ) ) ) {
                            document.getElementById('thanks').style.display = 'none';
                        }
                    });
                }

            })
            .catch((err) => {

                if ( event.target.closest('.form-content') ) {
                    // Clear form's inputs
                    let formInputs = event.target.querySelectorAll('input');
                    formInputs.forEach(item => item.value = '');

                    // Hide form
                    event.target.closest('form').style.display = 'none';

                    // Create and style form error message
                    const errorBlock = document.createElement('div'),
                        imgErrorBlock = document.createElement('img');
                
                    errorBlock.style.cssText = `display: block; color: #fff; margin: auto; margin-top: 50px; font-size: 1.5em; max-width: 200px;`;
                    imgErrorBlock.src = './images/warning.svg';
                    imgErrorBlock.style.cssText = `display: block; width: 100px; height: 100px; margin: auto; margin-bottom: 10px;`;
                    errorBlock.append(imgErrorBlock);
                    errorBlock.append(errorMessage);

                    // Append this error form into modal window
                    event.target.closest('.form-content').appendChild(errorBlock);

                    // When 3 seconds have passed, hide this message and reset the form
                    setTimeout(() => {
                        errorBlock.style.display = 'none';
                        event.target.closest('form').style.display = 'block';
                    }, 1500);
                } else {

                    // Clear form's inputs
                    let formInputs = event.target.querySelectorAll('input');
                    formInputs.forEach(item => item.value = '');
                    // Style input for error input and put error message
                    event.target.querySelectorAll('input').forEach((item) => item.style.border = '2px solid red');
                    statusMessage.textContent = errorMessage;
                    // Clear error style for input after 1500ms
                    setTimeout(() => event.target.querySelectorAll('input').forEach((item) => item.style.border = 'none'), 1500);
                    
                    // Create error message and put it to thanks modal window
                    const thanksErrHeader = document.createElement('h4'),
                          thanksErrContent = document.createElement('p');

                    thanksErrHeader.textContent = 'Произошла ошибка!';
                    thanksErrContent.innerHTML = 'Данные не получилось отправить.<br>Попробуйте ещё раз.';

                    thanksErrHeader.classList.add('error-message-head');
                    thanksErrContent.classList.add('error-message-content');

                    document.getElementById('thanks').querySelector('h4').style.display = 'none';
                    document.getElementById('thanks').querySelector('p').style.display = 'none';

                    document.getElementById('thanks').querySelector('.form-content').insertAdjacentElement('afterbegin', thanksErrContent);
                    document.getElementById('thanks').querySelector('.form-content').insertAdjacentElement('afterbegin', thanksErrHeader);

                    // Open thanks frame
                    document.getElementById('thanks').style.display = 'flex';
                    
                    // Close event listener for this thanks frame
                    document.body.addEventListener('click', (event) => {
                        if ( ( event.target.closest('.close-form') ) || ( !event.target.closest('.form-wrapper') || ( event.target.matches('.close-btn') ) ) ) {
                            document.getElementById('thanks').style.display = 'none';
                            // Reset styles
                            thanksErrHeader.remove();
                            thanksErrContent.remove();
                            document.getElementById('thanks').querySelector('h4').style.display = 'block';
                            document.getElementById('thanks').querySelector('p').style.display = 'block';
                        }
                    });
                }
                // Put in log error message
                console.error(err);
            })
            .finally(() => {
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 1500);
            });
    });
};

sendForm();

// This script control typed data by regular expressions
const controlData = () => {
    document.body.addEventListener('input', (event) => {
        let target = event.target;

        if ( target.closest('.price-message') ) {
            target.value = target.value.replace(/[^0-9а-яё\- ]/gi, '');
        }

        if ( target.matches('[name="name"]') && !target.closest('.price-message') ) {
            target.value = target.value.replace(/[^а-яё\-\ ]/gi, '');
        }

        if ( target.matches('[name="phone"]') ) {

            if ( target.value.match(/^\+/) ) {
                target.value = target.value.substring(0,12);
            }

            if ( target.value.match(/^(7|8)/) ) {
                target.value = target.value.substring(0,11);
            }

            target.value = target.value.replace(/[^\d\(\)\-\+]/, '');

        }
    });
};

controlData();

// This script show gift
const showGift = () => {
    const giftFrame = document.getElementById('gift'),
          giftBtn = document.querySelector('.fixed-gift');

    document.body.addEventListener('click', (event) => {
        if ( event.target.closest('.fixed-gift') ) {
            giftFrame.style.display = 'block';
            giftBtn.style.display = 'none';
        } else if ( ( event.target.closest('.close-form') ) || ( !event.target.closest('.form-wrapper') || ( event.target.matches('.close-btn') ) ) ) {
            giftFrame.style.display = 'none';
        }
    });
};

showGift();

// Main page slider
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

mainPageSlider();

// ...
const carouselSliderFunc = () => {
    // Carousel class
    class SliderCarousel {

        constructor({
            main, 
            wrap, 
            next, 
            prev, 
            infinity = false, 
            position = 0, 
            slidesToShow = 3, 
            responsive = []
        }) {

            if ( !main || !wrap ) {
                console.warn(`Carousel-slider error: lost properties: "main" or "wrap"`);
            }

            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.slides = document.querySelector(wrap).children;
            this.next = document.querySelector(next);
            this.prev = document.querySelector(prev);
            this.slidesToShow = slidesToShow;
            this.options = {
                position,
                infinity,
                widthSlide: Math.floor(100 / this.slidesToShow)
            };
            this.responsive = responsive;
        }

        init() {
            this.addCarouselClass();
            this.addStyles();

            if (this.prev && this.next) {
                this.controlSlider();
            } else {
                this.addArrow();
                this.controlSlider();
            }

            if ( this.responsive ) {
                this.responseInit();
            }
        }

        addCarouselClass() {
            this.main.classList.add('carousel-slider');
            this.wrap.classList.add('carousel-slider__wrap');
            for (const slide of this.slides) {
                slide.classList.add('carousel-slider__slide');
            }
        }

        addStyles() {

            let style = document.getElementById('sliderCarousel-style');

            if (!style){
                style = document.createElement('style');
                style.id = 'sliderCarousel-style';
            }

            style.textContent= `

                .carousel-slider {
                    position: relative;
                    overflow: hidden;
                }

                .carousel-slider__wrap {
                    display: flex;
                    transition: transform 0.5s;
                    will-change: transform;
                }

                .carousel-slider__slide {
                    flex: 0 0 ${this.options.widthSlide}%;
                    margin: auto 0;
                }

            `;

            document.head.appendChild(style);
        }

        controlSlider() {
            this.prev.addEventListener('click', this.prevSlider.bind(this));
            this.next.addEventListener('click', this.nextSlider.bind(this));
        }

        prevSlider() {
            if ( this.options.infinity || (this.options.position > 0) ) {
                --this.options.position;
                
                if ( this.options.position < 0 ) {
                    this.options.position = this.slides.length - this.slidesToShow;
                }

                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }
        }

        nextSlider() {
            if ( this.options.infinity || (this.options.position < this.slides.length - this.slidesToShow) ) {
                ++this.options.position;

                if ( this.options.position > this.slides.length - this.slidesToShow) {
                    this.options.position = 0;
                }

                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }
        }

        addArrow() {
            this.prev = document.createElement('button');
            this.next = document.createElement('button');

            this.prev.textContent = '<';
            this.next.textContent = '>';

            this.prev.style.cssText = `position: absolute;
                                    top: 0;
                                    bottom: 0;
                                    margin: auto 0;
                                    left: 0;
                                    display: block;
                                    width: 35px;
                                    height: 35px;
                                    background-color: #ffd11a;
                                    border-radius: 50px;
                                    color: #000000;
                                    border: none;
                                    font-size: 20px;`;
            
            this.next.style.cssText = `position: absolute;
                                    top: 0;
                                    bottom: 0;
                                    margin: auto 0;
                                    right: 0;
                                    display: block;
                                    width: 35px;
                                    height: 35px;
                                    background-color: #ffd11a;
                                    border-radius: 50px;
                                    color: #000000;
                                    border: none;
                                    font-size: 20px;`;

            this.prev.className = 'carousel-slider__prev';
            this.next.className = 'carousel-slider__next';

            this.main.appendChild(this.prev);
            this.main.appendChild(this.next);
        }

        responseInit() {
            const slidesToShowDefault = this.slidesToShow,
                allResponse = this.responsive.map(item => item.breakpoint),
                maxResponse = Math.max(...allResponse),
                checkResponse = () => {
                    
                    const widthWindow = document.documentElement.clientWidth;

                    if (widthWindow < maxResponse) {
                        for (let i = 0; i < allResponse.length; i++) {
                            if (widthWindow < allResponse[i]) {
                                this.slidesToShow = this.responsive[i].slideToShow;
                                this.options.widthSlide = Math.floor(100/this.slidesToShow);
                                this.addStyles();
                            }
                        }
                    } else {
                        this.slidesToShow = slidesToShowDefault;
                        this.options.widthSlide = Math.floor(100/this.slidesToShow);
                        this.addStyles();
                    }
                };

                checkResponse();

                window.addEventListener('resize', checkResponse);
        }

    }

    const carousel = new SliderCarousel({
        main: '#services .wrapper',
        wrap: '.services-slider',
        slidesToShow: 4,
        infinity: true,
        responsive: [{
                breakpoint: 1024,
                slideToShow: 3
            },
            {
                breakpoint: 768,
                slideToShow: 2
            },
            {
                breakpoint: 576,
                slideToShow: 1
            }
        ]
    });

    carousel.init();
};

carouselSliderFunc();