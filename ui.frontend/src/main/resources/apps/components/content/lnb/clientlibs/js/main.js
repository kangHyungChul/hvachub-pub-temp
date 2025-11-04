const lnb = (function () {
  const $2depth = $(".item-2depth");
  const $3depth = $(".item-3depth");
  const $4depth = $(".item-4depth");

  const clickedEvent = function () {
    //click 이벤트 시, .clicked 클래스 추가되며 텍스트 강조 효과
    $2depth.each(function () {
      $(this)
        .find("a")
        .on("click", function () {
          $2depth.removeClass("clicked");
          $3depth.removeClass("clicked");
          $4depth.removeClass("clicked");
          if ($(this).parent().hasClass("lock") == false) {
            $(this).parent().addClass("clicked");
          }
        });
    });

    $3depth.each(function () {
      $(this)
        .find("a")
        .click(function () {
          $2depth.removeClass("clicked");
          $3depth.removeClass("clicked");
          $4depth.removeClass("clicked");
          if ($(this).parent().hasClass("lock") == false) {
            $(this).parent().addClass("clicked");
          }
        });

      if ($(this).find(".item-4depth__wrap").length == 0) {
        $(this)
          .parent(".item-3depth__wrap")
          .css("border-bottom", "1px solid #ddd");
      } else {
        $(this).parent(".item-3depth__wrap").css("border-bottom", "none");
      }
    });

    $4depth.each(function () {
      $(this)
        .find("a")
        .click(function () {
          $2depth.removeClass("clicked");
          $3depth.removeClass("clicked");
          $4depth.removeClass("clicked");
          if ($(this).parent().hasClass("lock") == false) {
            $(this).parent().addClass("clicked");
          }
        });
    });
  };

  const bind = function () {
    clickedEvent();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  lnb.init();
});
