const showGift = () => {
    const giftFrame = document.getElementById('gift'),
          giftBtn = document.querySelector('.fixed-gift');

    if (document.getElementById('gift')) {
        document.body.addEventListener('click', (event) => {
            if ( event.target.closest('.fixed-gift') ) {
                giftFrame.style.display = 'block';
                giftBtn.style.display = 'none';
            } else if ( ( ( event.target.closest('.close-form') ) || ( !event.target.closest('.form-wrapper') || ( event.target.matches('.close-btn') ) ) ) && !(event.target.closest('#card_order')) ) {
                giftFrame.style.display = 'none';
            }
        });
    }

};

export default showGift;