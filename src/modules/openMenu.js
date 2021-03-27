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

export default openMenu;