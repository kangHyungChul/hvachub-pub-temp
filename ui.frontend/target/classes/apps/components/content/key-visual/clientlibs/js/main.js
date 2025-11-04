const keyVisual = (function () {
  const keyVisualSwiper = function () {
    $(".keyVisual__swiper").each(function (i, item) {
      $(".keyVisual__swiper").addClass(i);

      const $kvSwiper = $(item).find(".swiper-button-wrap");
      const a11yOptions1 = getA11yOptions($kvSwiper);
      let pauseText = "pause";
      let autoplayText = "autoplay";

      const keyVisualSwiper = new Swiper(item, {
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
              keyVisualSwiper.autoplay.start();
              $(this).find(".txt-blind").text(pauseText);
              return false;
            }
            $(this).addClass("stop");
            keyVisualSwiper.autoplay.stop();
            $(this).find(".txt-blind").text(autoplayText);
            return false;
          });
      } else {
        $(this).find(".swiper-button-autoplay").css({ display: "none" });
        $(this).find(".swiper-pagination-wrap").css("display", "none");
      }

      //콘텐츠 영역 유무에 따른 높이 조절 이벤트
      if ($(this).find(".keyVisual__title").length == 0) {
        let $windowWidth = $(window).width();

        $(this).find(".keyVisual__desc").css("padding-top", "8.125vw");

        if ($windowWidth < 768) {
          $(this).find(".keyVisual__desc").css({
            "padding-top": "151px",
          });
        }
      }

      //swiper 콘텐츠 높이에 따른 배경 이미지 높이 자동 조절 이벤트
      const $kvContent = $(".keyVisual__cont");
      const $kvBg = $(".keyVisual__bg");
      let $kvContentH = $kvContent.outerHeight();

      $kvBg.height($kvContentH);
    });
  };

  const bind = function () {
    keyVisualSwiper();
    kvResizing();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

const kvResizing = function () {
  //텍스트 정렬관련 버튼 정렬 변경 이벤트
  const btnAlign = function () {
    $(".keyVisual").each(function () {
      if ($(window).width() <= 768) {
        if ($(this).find(".keyVisual__cont").hasClass("tal-center") == true) {
          $(this).find(".btn-box .keyVisual__btn").css("margin", "0 auto");
        } else if (
          $(this).find(".keyVisual__cont").hasClass("tal-left") == true
        ) {
          $(this).find(".btn-box .keyVisual__btn").css("margin-right", "auto");
        } else if (
          $(this).find(".keyVisual__cont").hasClass("tal-right") == true
        ) {
          $(this).find(".btn-box .keyVisual__btn").css("margin-left", "auto");
        }
        $(this)
          .find(".btn-box .keyVisual__btn + .keyVisual__btn")
          .css("margin-top", "16px");
      } else {
        $(this)
          .find(".btn-box .keyVisual__btn + .keyVisual__btn")
          .css("margin-left", "20px");
      }
    });
  };
  btnAlign();

  //swiper 콘텐츠 높이에 따른 배경 이미지 높이 자동 조절 이벤트
  $(window).resize(function () {
    const $kvContent = $(".keyVisual__cont");
    const $kvBg = $(".keyVisual__bg");
    let $kvContentH = $kvContent.outerHeight();

    $kvBg.height($kvContentH);

    btnAlign();
  });
};

$(document).ready(function () {
  kvResizing();

  keyVisual.init();
});
