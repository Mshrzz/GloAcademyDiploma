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

export default controlData;