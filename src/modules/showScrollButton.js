const showScrollButton = () => {

    const scrollButton = document.getElementById('totop');
    scrollButton.style.display = 'none';

    document.addEventListener('scroll', () => {
        if (pageYOffset >= 740) {
            scrollButton.style.display = 'block';
        } else if (pageYOffset < 740) {
            scrollButton.style.display = 'none';
        }
    });
};

export default showScrollButton;