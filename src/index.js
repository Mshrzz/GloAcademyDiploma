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

        if ( target.matches('[name="name"]') ) {
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

