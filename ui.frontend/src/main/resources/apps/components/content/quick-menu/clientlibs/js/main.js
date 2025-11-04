const scrollTopBtn = document.getElementById("gotop-btn");

if (scrollTopBtn) {
    function scrollFunction() {
        window.requestAnimationFrame(() => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', scrollFunction);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}