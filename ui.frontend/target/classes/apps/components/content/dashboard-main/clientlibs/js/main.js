const dashboardMain = (function () {
  const $dashboardTit = $(".dashboard-box__tit");

  const autoHeight = function () {
    //.dashboard-box__tit 텍스트 라인수 변경에 따른 .date-list style 변경 이벤트
    $dashboardTit.each(function () {
      if ($(this).height() >= 88) {
        $(this).find(".tit-name").addClass("short-tit");
        $(this)
          .parents(".dashboard-box")
          .find(".full-date-list, .half-date-list, .project-list .dashboard-box__list")
          .addClass("short");
      }
    });

    //.dashboard__bg 리사이징 시, 높이 조절 이벤트
    $(window).resize(function () {
      const $dashContent = $(".dashboard__cont");

      $dashContent.each(function () {
        $(this).parent().find(".dashboard__bg").height($(this).outerHeight());
      });
    });
  };

  const bind = function () {
    autoHeight();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  const $dashContent = $(".dashboard__cont");

  $dashContent.each(function () {
    $(this).parent().find(".dashboard__bg").height($(this).outerHeight());
  });

  dashboardMain.init();
});
