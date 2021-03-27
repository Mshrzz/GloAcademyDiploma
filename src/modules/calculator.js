const calculator = () => {

    const calculateForm = document.getElementById('card_order');

    const calculateTotal = () => {

        const clubs = document.querySelectorAll('.club'),
              timesWrap = calculateForm.querySelector('.time'),
              promocode = calculateForm.querySelector('.price-message'),
              totalPrice = document.getElementById('price-total');

        if (times) {
            times = 0;
        }
        
        let times = timesWrap.querySelectorAll('input');
        

        let selectedTime,
            selectedClub,
            isPromo = promocode.querySelector('input');

        const clubPrice = {
            mozaika: {
                '1m': 2999,
                '6m': 14990,
                '9m': 21990,
                '12m': 24990  
            },
            schelkovo: {
                '1m': 1999,
                '6m': 9900,
                '9m': 13900,
                '12m': 19900
            }
        };

        times.forEach(time => time.checked ? selectedTime = time.value : false);
        clubs.forEach(club => club.querySelector('input').checked ? selectedClub = club.querySelector('input').value : false);

        if (isPromo.value === 'ТЕЛО2020') {
            totalPrice.textContent = Math.floor(+clubPrice[selectedClub][selectedTime] - (+clubPrice[selectedClub][selectedTime] * 0.3));
        } else {
            totalPrice.textContent = clubPrice[selectedClub][selectedTime];
        }

    };

    calculateForm.addEventListener('input', (event) => {
        if ( (event.target.matches('[name="card-type"]') || event.target.matches('[name="club-name"]')) &&
             (document.querySelector('#card_order').querySelector('.club')) ) {

            calculateTotal();

        }

    });

    if ( calculateForm.querySelector('.price-message') ) {
        calculateForm.querySelector('.price-message').querySelector('input').addEventListener('blur', calculateTotal);
    }
};

export default calculator;