const marginSetting = (function () {
// 스크롤 생성 이벤트
  function categoryBoxAutoScroll() {
    const $ResultWrap = $(".result-list__wrap .list__el-box");

    $ResultWrap.each(function() {
      let itemWrapH = 0;

      const $items = $(this).find(".list__el")
      $items.each(function (index) {
        if (index < 10) {
          itemWrapH += $(this).outerHeight();
        }
      });
      if ( $items.length > 9) {
        $(this).css("max-height", itemWrapH);
      }       
    });
  };


  const onResizeWindow = function () {
    $(window).resize(function () {
      categoryBoxAutoScroll();
    });
  };

  const bind = function () {
    categoryBoxAutoScroll();
    onResizeWindow();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
    marginSetting.init();
});