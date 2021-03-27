const showBurgerMenu = () => {

    const burgerMenu = document.querySelector('.top-menu .hidden-large');
    
    document.addEventListener('resize', () => {

        const widthWindow = document.documentElement.clientWidth;

        if (widthWindow <= 768) {
            burgerMenu.style.display = 'block';
        } else if (widthWindow > 768) {
            burgerMenu.style.display = 'none';
        }
    });
};

export default showBurgerMenu;