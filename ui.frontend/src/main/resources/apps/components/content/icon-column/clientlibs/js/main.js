const iconColumn = (function () {
  const $colBoxTxtWrap = $(".icon-column-box .txt-wrap");
  const $iconSwiperSlide = $(".icon-col-swiper .swiper-slide");
  const $iconColSwiper = $(".icon-col-swiper");

  //욥션 관련하여 영역 유무에 따른 style 처리 이벤트
  const autoHeight = function () {
    let $windowWidth = $(window).width();
    $colBoxTxtWrap.each(function () {
      if ($(this).find(".icon-column-box__title").length == 0) {
        if ($windowWidth > 1440) {
          $(this).find(".icon-column-box__desc").css({
            "padding-top": "64px",
          });
        } else if (768 <= $windowWidth && $windowWidth <= 1440) {
          $(this).find(".icon-column-box__desc").css({
            "padding-top": "4.444vw",
          });
        } else if ($windowWidth < 768) {
          $(this).find(".icon-column-box__desc").css({
            "padding-top": "0",
          });
        }
      }
    });
  };

  //mo carousel 옵션 일 경우
  const moSwiper = function () {
    $iconColSwiper.each(function () {
      if ($(this).hasClass("mo-swiper")) {
        const iconColswiper = initSwiper(this);
        iconColswiper.on("resize", function () {
          if (this.width >= 768) {
            destroySwiper(this);
          }
        });
      }
    });
  };

  //mo일때 slide 높이 맞추기
  const swiperSlideH = function () {
    $iconColSwiper.each(function () {
      if ($(window).width() > 768) {
        //desc 영역 높이 초기화
        $(this).find(".icon-column-box__cont").height("auto");
        $(this).find(".icon-column-box__desc").height("auto");
        $(this).find(".btn-block").css({
          position: "relative",
          marginTop: "unset",
          marginBottom: "unset",
        });

        let heightArr = $(this)
          .find(".icon-column-box__desc")
          .map(function () {
            return $(this).height();
          })
          .get();
        let maxHeight = Math.max.apply(Math, heightArr);
        let descMarginBottom = parseInt(
          $(this).find(".icon-column-box__desc").css("margin-bottom")
        );

        $(this).find(".icon-column-box__desc").height(maxHeight);

        $(this)
          .find(".swiper-slide")
          .each(function () {
            if ($(this).find(".icon-column-box__desc").length == 0) {
              $(this)
                .find(".icon-column-box__title")
                .css({
                  paddingBottom: maxHeight + descMarginBottom,
                });
            }
          });
      } else {
        $iconSwiperSlide.each(function () {
          $(".icon-column-box__desc").height("auto");
          $(this).find(".btn-block").css({
            position: "absolute",
          });

          if ($(this).find(".icon-column-box__desc").height() > 72) {
            $(this).find(".btn-block").css({
              position: "unset",
              marginTop: "32px",
              marginBottom: "48px",
            });
          }
          if ($(this).parents(".icon-col-swiper").hasClass("mo-swiper")) {
            let heightArr = $iconSwiperSlide
              .map(function () {
                return $(this).find(".icon-column-box__cont").height();
              })
              .get();
            let maxHeight = Math.max.apply(Math, heightArr);
            $(this).find(".icon-column-box__cont").height(maxHeight);
          }
        });
      }
    });
  };

  const initSwiper = function (el) {
    const $iconColSwiper = $(".icon-col-swiper .swiper-button-wrap");
    const a11yOptions1 = getA11yOptions($iconColSwiper);

    return new Swiper(el, {
      direction: "horizontal",
      navigation: {
        nextEl: el.querySelector(".swiper-button-next"),
        prevEl: el.querySelector(".swiper-button-prev"),
      },
      a11y: {
        enabled: true,
        prevSlideMessage: a11yOptions1.prevSlideMessage,
        nextSlideMessage: a11yOptions1.nextSlideMessage,
      },
      resizeObserver: true,
      allowTouchMove: true,
      spaceBetween: 24,
      slidesPerView: 1,
    });
  };

  const destroySwiper = function (el) {
    el.destroy(true, true);
  };

  const bind = function () {
    autoHeight();
    moSwiper();
    swiperSlideH();
  };

  const init = function () {
    bind();
  };

  return {
    autoHeight: autoHeight,
    moSwiper: moSwiper,
    init: init,
    swiperSlideH: swiperSlideH,
  };
})();

$(document).ready(function () {
  iconColumn.init();

  $(window).resize(function () {
    iconColumn.autoHeight();
    iconColumn.swiperSlideH();

    if ($(window).width() < 768) {
      iconColumn.moSwiper();
      $(".swiper-button-wrap > div").show();
    } else {
      $(".swiper-button-wrap > div").hide();
    }
  });
});
