const fixBurgerMenu = () => {

    const topMenu = document.querySelector('.top-menu'),
          burgerMenu = document.querySelector('.top-menu .hidden-large');

    document.addEventListener('scroll', () => {
        if (getComputedStyle(burgerMenu).getPropertyValue('display') === 'block') {
            if (pageYOffset >= 240) {
                topMenu.style.position = 'fixed';
            } else if (pageYOffset < 240) {
                topMenu.style.position = 'static';
            }
        }
    });
};

export default fixBurgerMenu;