const thirdPartyDetail = (function () {
  const $moreCodeBtn = $(".more-code__btn");
  const $modelCodeItem = $(".model-code__item");
  const $uploadInput = $(".upload-input");
  const $typeRadio = $(".type-box .btn-radio");
  const $tabTitWrap = $(".tab-tit-wrap");
  const $tabTitWrapA = $(".tab-tit-wrap.type-a");
  const $tabTitWrapB = $(".tab-tit-wrap.type-b");
  const $tabTitWrapC = $(".tab-tit-wrap.type-c");
  const $resultList = $(".pod .result-list");
  const $resultListA = $(".pod .result-list.type-a");
  const $resultListB = $(".pod .result-list.type-b");
  const $resultListC = $(".pod .result-list.type-c");
  const $fileNameBtn = $(".file-name-btn");
  // const $accordionWrapInner = $(".accordion-wrap__inner");
  // const $accordionTit = $(".accordion__tit");

  //콘텐츠 제작 요청 박스 모델코드 더보기 이벤트
  const viewMoreDetail = function () {
    $moreCodeBtn.on("click", function () {
      $modelCodeItem.toggleClass("active");
      $moreCodeBtn.toggleClass("active");
    });
  };

  //파일 업로드 관련 이벤트
  const uploadFile = function () {
    $(".file-input-wrap").each(function () {
      $(this).on("change", ".upload-input", function () {
        let fileName = $(this).val().split("/").pop().split("\\").pop();
        let prev = $(this).data("val");

        $(this).parents(".input-box").find(".file-name").text(fileName);
        $(this).data("val", $(this).val());

        if ($(this).parents(".input-box").find(".file-name").text() == "") {
          let modifyPrev = prev.split("/").pop().split("\\").pop();
          $(this).parents(".input-box").find(".file-name").text(modifyPrev);
        }
      });
    });
  };

  //type POD 타입 선택 관련 이벤트 (radio 버튼 클릭시 해당 타입의 POD 리스트 보여주기)
  const changeList = function () {
    $typeRadio.on("click", function () {
      $tabTitWrap.removeClass("active");
      $resultList.removeClass("active");

      if ($(this).find(".btn-radio__input").val() == "A") {
        $tabTitWrapA.addClass("active");
        $resultListA.addClass("active");
      } else if ($(this).find(".btn-radio__input").val() == "B") {
        $tabTitWrapB.addClass("active");
        $resultListB.addClass("active");
      } else if ($(this).find(".btn-radio__input").val() == "C") {
        $tabTitWrapC.addClass("active");
        $resultListC.addClass("active");
      }
    });
  };

  //파일명 삭제 클릭 이벤트
  const deleteFile = function () {
    $fileNameBtn.each(function () {
      $fileNameBtn.eq(i).on("click", function () {
        $(this).parent(".input-box").removeClass("active");
      });
    });
  };

  // 2025-03-07 필요 없음으로 삭제 예정
  //아코디언 박스 스크롤 관련 style 변경 이벤트
  // const autoScrollWidth = function () {
  //   $accordionWrapInner.each(function () {
  //     if ($(this).height() > 576) {
  //       $(this)
  //         .parents(".accordion-box__wrap")
  //         .css({ overflowY: "scroll", width: "272px" });
  //     } else {
  //       $(this).parents(".accordion-box__wrap").css("overflow-y", "unset");
  //     }
  //   });

  //   $accordionTit.each(function () {
  //     $(this).on("click", function () {
  //       if ($(this).parents(".accordion-wrap__inner").height() > 576) {
  //         $(this)
  //           .parents(".accordion-box__wrap")
  //           .css({ overflowY: "scroll", width: "272px" });
  //       } else {
  //         $(this).parents(".accordion-box__wrap").css("overflow-y", "unset");
  //       }
  //     });
  //   });
  // };

  //콘텐츠 제작 요청 관련 모델코드 아코디언 관련 높이 조절 이벤트
  const modelCdeAccordion = function () {
    const $moreCodeBtn = $(".more-code__btn");

    $moreCodeBtn.on("click", function () {
      if ($(this).hasClass("active")) {
        $(".third-party-detail .model-code__wrap .info__cont").css(
          "max-height",
          "unset"
        );
        $(".third-party-detail .model-code__wrap").css(
          "align-items",
          "flex-start"
        );
      } else {
        $(".third-party-detail .model-code__wrap .info__cont").css(
          "max-height",
          "24px"
        );
        $(".third-party-detail .model-code__wrap").css("align-items", "center");
      }
    });
  };

  //페이지 전체 스크롤 생성 이벤트
  const pageScroll = function () {
    if ($(window).width() < 1440) {
      $(document).find("html").css("overflow-x", "scroll");
    }
  };

  const bind = function () {
    viewMoreDetail();
    uploadFile();
    changeList();
    deleteFile();
    // autoScrollWidth();
    modelCdeAccordion();
    pageScroll();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  $(window).resize(function () {
    if ($(window).width() < 1440) {
      $(document).find("html").css("overflow-x", "scroll");
    }
  });
  thirdPartyDetail.init();
});
