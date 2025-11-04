const columnCarouselSwiper = (function () {
  const $listBox = $(".list-box");
  const $colSwiperslide = $(".col-carousel__swiper .swiper-slide");

  const colCarouselSwiper = function () {
    $(".col-carousel__swiper").each(function (i, item) {
      $(".col-carousel__swiper").addClass(i);

      const $colCarouselSwiper = $(".col-carousel__swiper").eq(i);
      const a11yOptions1 = getA11yOptions($colCarouselSwiper);

      const carouselSwiper = new Swiper(item, {
        direction: "horizontal",
        slidesPerView: 1.281,
        spaceBetween: 16,
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

  const swiperSlideH = function () {
    $colSwiperslide.height("auto"); // reset height

    let heightArr = $colSwiperslide
      .map(function () {
        return $(this).height();
      })
      .get();
    let maxHeight = Math.max.apply(Math, heightArr);

    $colSwiperslide.height(maxHeight);
  };

  const changeOption = function () {
    $listBox.each(function () {
      const $windowWidth = $(window).width();
      //title 없을 경우 style 변경 이벤트
      if ($(this).find(".title").length == 0) {
        if ($windowWidth > 1440) {
          $(this).find(".desc").css("margin-top", "45px");
        } else if (768 <= $windowWidth && $windowWidth <= 1440) {
          $(this).find(".desc").css("margin-top", "3.125vw");
        } else if ($windowWidth < 768) {
          $(this).find(".desc").css("margin-top", "0");
        }
      }
      //desc 없을 경우 style 변경 이벤트
      if ($(this).find(".desc").length == 0) {
        $(this).find(".title").css("margin-bottom", "0");
      }
    });
  };

  const bind = function () {
    colCarouselSwiper();
    changeOption();
    swiperSlideH();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
    changeOption: changeOption,
    swiperSlideH: swiperSlideH,
  };
})();

$(document).ready(function () {
  columnCarouselSwiper.init();
  $(window).on("resize", function () {
    columnCarouselSwiper.changeOption();
    columnCarouselSwiper.swiperSlideH();
  });
});
