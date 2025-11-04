const imgTxtSwiper = (function () {
  const imgWithTxtSwiper = function () {
    $(".img-with-txt__swiper").each(function (i, item) {
      $(".img-with-txt__swiper").addClass(i);

      const $imgWithTxtSwiper = $(".img-with-txt__swiper").eq(i);
      const a11yOptions1 = getA11yOptions($imgWithTxtSwiper);
      let pauseText = "pause";
      let autoplayText = "autoplay";

      const imgWithTxtSwiper = new Swiper(item, {
        direction: "horizontal",
        loop: true,
        allowTouchMove: true,

        autoplay: {
          delay: 5000,
        },

        pagination: {
          el: item.querySelector(".swiper-pagination"),
          clickable: true,
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

      //autoplay control button 동작 관련
      if ($(this).find(".swiper-pagination-bullet").length > 1) {
        $(this)
          .find(".swiper-button-autoplay")
          .on("click", function () {
            if ($(this).hasClass("stop")) {
              $(this).removeClass("stop");
              imgWithTxtSwiper.autoplay.start();
              $(this).find(".txt-blind").text(pauseText);
              return false;
            }
            $(this).addClass("stop");
            imgWithTxtSwiper.autoplay.stop();
            $(this).find(".txt-blind").text(autoplayText);
            return false;
          });
      } else {
        $(this).find(".swiper-pagination-wrap").css("display", "none");
      }

      if ($(this).find(".img-with-txt__title").length == 0) {
        $(this).find(".img-with-txt__desc").css("margin-top", "68px");
      }
    });
  };

  const bind = function () {
    imgWithTxtSwiper();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  imgTxtSwiper.init();
});
