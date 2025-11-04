const announcementMainSwiper = (function () {
  let pauseText = "pause";
  let autoplayText = "autoplay";

  const announceMainSwiper = function () {
    $(".announce-main__swiper").each(function (i, item) {
      $(".announce-main__swiper").addClass(i);

      const $announceMSwiper = $(
        ".announce-main__swiper .swiper-control__wrap"
      ).eq(i);
      const a11yOptions1 = getA11yOptions($announceMSwiper);

      const announceMainSwiper = new Swiper(item, {
        direction: "horizontal",
        loop: true,

        autoplay: {
          delay: 5000,
        },

        pagination: {
          clickable: true,
          el: item.querySelector(".swiper-pagination"),
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
      if ($(".swiper-slide").length > 1) {
        $(this)
          .find(".swiper-button-autoplay")
          .on("click", function () {
            if ($(this).hasClass("stop")) {
              $(this).removeClass("stop");
              announceMainSwiper.autoplay.start();
              $(this).find(".txt-blind").text(announcementMainSwiper.pauseText);
              return false;
            }
            $(this).addClass("stop");
            announceMainSwiper.autoplay.stop();
            $(this)
              .find(".txt-blind")
              .text(announcementMainSwiper.autoplayText);
            return false;
          });
      } else {
        $(this).css({ display: "none" });
      }
    });
  };

  const bind = function () {
    announceMainSwiper();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
    pauseText: pauseText,
    autoplayText: autoplayText,
  };
})();

$(document).ready(function () {
  if ($(".announce-main .swiper-slide").length > 0) {
    announcementMainSwiper.init();
  }
});
