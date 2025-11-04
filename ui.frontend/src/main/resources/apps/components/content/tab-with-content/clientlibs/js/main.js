const tabWithContent = (function () {
  const tabSwiper = function () {
    $(".tab-with-content__swiper").each(function (i, item) {
      $(".tab-with-content__swiper").addClass(i);

      const $tabWithSwiper = $(".tab-with-content__swiper").eq(i);
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
        ".tab-with-content__swiper .swiper-button-autoplay"
      );
      const pauseText = 'pause';
      const autoplayText = 'play';
      
      if ($(".tab-with-content__swiper .swiper-pagination-bullet").length > 1) {
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
      // tab click시 swiper 초기화
      $(".tab-with-content .tab-list__tab").each(function () {
        $(this).on('click', function(){
          // $tabWithSwiper.find('.tab-with-content__cont').css('height', 'auto');
          // descriptionHeight();
          tabWithContSwiper.slideTo(0,0, false);
          tabWithContSwiper.autoplay.start();
          tb1aAutoplayBtn.removeClass("stop");
  
          if($('.tab-with-content__swiper').eq(i).find('.swiper-pagination-bullet').length > 1){
            tb1aAutoplayBtn.eq(i).css({ display: "block" });
          } else {
            tb1aAutoplayBtn.eq(i).css({ display: "none" });
          }
        });
      }); 

      // Description height 조절
      // const descriptionHeight = function() {
      //   if($(window).width() <= 768) {
      //     // Description height 담는 array
      //     let arryTest = [];

      //     $tabWithSwiper.find('.swiper-slide').each(function(){
      //       $(this).find('.tab-with-content__cont');
      //       arryTest.push($(this).find('.tab-with-content__cont').outerHeight());
      //     });

      //     let newArry = arryTest.filter((item) => item !== undefined);
    
      //     const max = Math.max.apply(null, newArry);

      //     $tabWithSwiper.find('.tab-with-content__cont').css('height', max); 
      //   }
      // }
      // descriptionHeight();
    });
  };
  
  const bind = function () {
    tabSwiper()
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  tabWithContent.init();
});
