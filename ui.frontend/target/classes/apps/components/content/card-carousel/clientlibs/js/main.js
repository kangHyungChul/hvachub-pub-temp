const cardCarouselSwiper = (function () {
  const $swiper = $(".card-carousel__swiper");

  const cardCarouselSwiper = function () {
    $(".card-carousel__swiper").each(function (i, item) {
      $(".card-carousel__swiper").addClass(i);

      const $cardCarouselSwiper = $(".card-carousel__swiper").eq(i);
      const a11yOptions1 = getA11yOptions($cardCarouselSwiper);

      const cardCarouselSwiper = new Swiper(item, {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
        navigation: {
          nextEl: item.querySelector(".swiper-button-next"),
          prevEl: item.querySelector(".swiper-button-prev"),
        },
        a11y: {
          enabled: true,
          prevSlideMessage: a11yOptions1.prevSlideMessage,
          nextSlideMessage: a11yOptions1.nextSlideMessage,
        },
      });
    });
  };

  const bind = function () {
    cardCarouselSwiper();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  cardCarouselSwiper.init();
});
