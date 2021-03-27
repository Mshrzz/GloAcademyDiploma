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

        // If club radio button exists
        if ( event.target.querySelector('[name="club-name"]') ) {
            
            const clubNamesCheck = event.target.querySelectorAll('[name="club-name"]');

            let isSomeChecked;

            clubNamesCheck.forEach(clubInput => clubInput.checked ? isSomeChecked = true : false);

            if (!isSomeChecked) {
                const radioBlock = event.target,
                      radioMessBlock = document.createElement('p');
                
                radioMessBlock.style.cssText = 'color: red; font-size: 1.2em; margin: 5px 0;';
                radioMessBlock.textContent = 'Вы должны выбрать клуб';

                radioBlock.append(radioMessBlock);

                event.target.querySelector('[type="submit"]').disabled = true;

                setTimeout(() => {
                    radioMessBlock.style.display = 'none';
                    event.target.querySelector('[type="submit"]').disabled = false;
                }, 1000);

                return;

            }

        }

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

        // Validation for name
        if ( ( (event.target.querySelector('[name="name"]')) && (event.target.querySelector('[name="name"]').value.trim().length < 2) ) ) {

            const inputName = event.target.querySelector('[name="name"]');

            if (inputName.placeholder === 'Промокод') {
                inputName.setCustomValidity('');
            } else {
                inputName.setCustomValidity('Недостаточно символов для имени');
                inputName.addEventListener('blur', function() { this.value.trim().length >= 2 && this.setCustomValidity(''); }, false);
                return;
            }
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

                    formInputs.forEach((item) => {
                        
                        if ( item.name === 'club-name' ) {
                            item.value = item.value;
                        } else if (item.name === 'card-type') {
                            item.value = item.value;
                        } else {
                            item.value = '';
                        }

                    });
                    
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

                    formInputs.forEach((item) => {
                        
                        if ( item.name === 'club-name' ) {
                            item.value = item.value;
                        } else if (item.name === 'card-type') {
                            item.value = item.value;
                        } else {
                            item.value = '';
                        }

                    });

                    // Style input for success input and put success message
                    event.target.querySelectorAll('input').forEach((item) => item.style.border = '2px solid green');
                    statusMessage.textContent = successMessage;
                    
                    // Clearn succes style for input after 1500ms
                    setTimeout(() => event.target.querySelectorAll('input').forEach((item) => {
                        
                        item.style.border = 'none';

                        if (event.target.closest('#card_order')) {
                            item.style.border = '1px solid #b7b7b7';
                        }

                    }), 1500);

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

                    formInputs.forEach((item) => {
                        
                        if ( item.name === 'club-name' ) {
                            item.value = item.value;
                        } else if (item.name === 'card-type') {
                            item.value = item.value;
                        } else {
                            item.value = '';
                        }

                    });

                    // Style input for error input and put error message
                    event.target.querySelectorAll('input').forEach((item) => item.style.border = '2px solid red');
                    statusMessage.textContent = errorMessage;
                    // Clear error style for input after 1500ms
                    setTimeout(() => event.target.querySelectorAll('input').forEach((item) => {

                        item.style.border = 'none';

                        if (event.target.closest('#card_order')) {
                            item.style.border = '1px solid #b7b7b7';
                        }

                }), 1500);
                    
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

                // Reset checkbox
                if (event.target.querySelector('[type="checkbox"]')) {
                    event.target.querySelector('[type="checkbox"]').checked = false;
                }

                if (event.target.querySelector('[name="club-name"]')) {

                    if (document.getElementById('price-total')) {
                        document.getElementById('price-total').textContent = '2999';
                    }

                    event.target.querySelectorAll('[name="club-name"]').forEach(clubInput => clubInput.checked = false);
                    event.target.querySelectorAll('[name="club-name"]')[0].checked = true;
                }

                if (event.target.querySelector('[name="card-type"]')) {
                    
                    if (document.getElementById('price-total')) {
                        document.getElementById('price-total').textContent = '2999';
                    }

                    event.target.querySelectorAll('[name="card-type"]').forEach(cardType => cardType.checked = false);
                    event.target.querySelectorAll('[name="card-type"]')[0].checked = true;
                }

                setTimeout(() => {

                    statusMessage.textContent = '';
                    document.body.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');

                }, 1500);
            });
    });
};

export default sendForm;