const blogList = (function () {

  // recommended swiper
  recommSwiper = function () {
    const $blogListSwiper = document.querySelector(".blog-list__recomm .blog-item-list");
    const a11yOptions1 = getA11yOptions($blogListSwiper);
    const blogSwiper = new Swiper($blogListSwiper, {
      direction: "horizontal",
      // autoplay: {
      //   delay: 3500,
      // },
      loop: true,
      pagination: {
        el: $blogListSwiper.querySelector('.swiper-pagination'),
      },
      navigation: {
        nextEl: $blogListSwiper.querySelector('.swiper-button-next'),
        prevEl: $blogListSwiper.querySelector('.swiper-button-prev'),
      },
      a11y: {
        enabled: true,
        prevSlideMessage: a11yOptions1.prevSlideMessage,
        nextSlideMessage: a11yOptions1.nextSlideMessage,
      },
      // breakpoints: {
      //   768: {
      //     autoplay: false,
      //   },
      // }
    });

    // 240731 [HVCHB-1006] autoplay btn 관련 함수 제거

    //slide length가 1개일 경우 pagination 숨김
    if($blogListSwiper.querySelector('.swiper-wrapper').childElementCount <= 1) {
      $blogListSwiper.querySelector('.swiper-pagination-wrap').style.display = 'none';
    } else {
      $blogListSwiper.querySelector('.swiper-pagination-wrap').style.display = 'block';
    }

    window.addEventListener('resize', function() {
      // blogSwiper.destroy();
    })
  };

  const bind = function () {
    recommSwiper();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };

})();

$(document).ready(function () {
  blogList.init();

  // $(window).resize(function () {
  //   blogList.init();
  // });
});
