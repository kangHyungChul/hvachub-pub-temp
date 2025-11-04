
fileMaxheight()
function fileMaxheight(){
    const fileBox = document.querySelectorAll('.lib-file-down-box')
    fileBox.forEach( Box => {
        const fileItems = Box.querySelectorAll('.lib-file__download')

        let totalHeight = 0;
        for (let i = 0; i < 3 && i < fileItems.length; i++) {
            totalHeight += fileItems[i].offsetHeight;
            if (i > 0) {
                totalHeight += 16;
            }
        }
        Box.style.maxHeight = totalHeight + 1 + 'px';
    })
}


  const AppSwiper = document.querySelector('.lib-application-box .mySwiper');
  const a11yOptions0 = getA11yOptions(AppSwiper);
  new Swiper(AppSwiper, {
    navigation: {
      clickable: true,
      nextEl: AppSwiper.querySelector('.swiper-button-next'),
      prevEl: AppSwiper.querySelector('.swiper-button-prev'),
    },
    pagination: {
      clickable: true,
      el: ".swiper-pagination",
    },
    a11y: {
      enabled: true,
      prevSlideMessage: a11yOptions0.prevSlideMessage,
      nextSlideMessage: a11yOptions0.nextSlideMessage,
    },
  });


  window.addEventListener('resize',fileMaxheight)