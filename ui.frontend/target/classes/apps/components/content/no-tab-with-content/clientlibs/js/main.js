const noTabWithContent = (function () {
  const noTabSwiper = function () {
    $(".no-tab-with-content__swiper").each(function (i, item) {
      $(".no-tab-with-content__swiper").addClass(i);

      const $tabWithSwiper = $(".no-tab-with-content__swiper").eq(i);
      const a11yOptions1 = getA11yOptions($tabWithSwiper);

      const tabWithContSwiper = new Swiper(item, {
        loop: true,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          clickable: true,
          el: item.querySelector('.swiper-pagination'),
        },
        // observer: true,
        // observeParents: true,
  
        navigation: {
          nextEl: item.querySelector('.swiper-button-next'),
          prevEl: item.querySelector('.swiper-button-prev'),
        },
        a11y: {
          enabled: true,
          prevSlideMessage: a11yOptions1.prevSlideMessage,
          nextSlideMessage: a11yOptions1.nextSlideMessage,
        },
      });
  
      //autoplay control button 동작 관련
      const tb1aAutoplayBtn = $(
        ".no-tab-with-content__swiper .swiper-button-autoplay"
      );
      const pauseText = 'pause';
      const autoplayText = 'play';
      
      if ($(".no-tab-with-content__swiper .swiper-pagination-bullet").length > 1) {
        tb1aAutoplayBtn.eq(i).on("click", function () {
          if (tb1aAutoplayBtn.eq(i).hasClass("stop")) {
            tb1aAutoplayBtn.eq(i).removeClass("stop");
            tabWithContSwiper.autoplay.start();
            tb1aAutoplayBtn.eq(i).find('.txt-blind').text(pauseText);
            return false;
          }
          tb1aAutoplayBtn.eq(i).addClass("stop");
          tabWithContSwiper.autoplay.stop();
          tb1aAutoplayBtn.eq(i).find('.txt-blind').text(autoplayText);
          return false;
        });
      } else {
        tb1aAutoplayBtn.eq(i).css({ display: "none" });
      }     
    });
  };
  
  const bind = function () {
    noTabSwiper()
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  noTabWithContent.init();
});
