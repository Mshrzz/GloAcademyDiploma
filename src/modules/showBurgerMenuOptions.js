const showBurgerMenuOptions = () => {

    document.addEventListener('click', (event) => {
        if (event.target.closest('.top-menu .hidden-large')) {
            document.querySelector('.popup-menu').style.display = 'flex';
        } else if (event.target.closest('.scroll') || event.target.closest('.close-menu-btn')) {
            document.querySelector('.popup-menu').style.display = 'none';
        }
    });
};

export default showBurgerMenuOptions;