const profileManagement = (function () {
  const $menuitem = $(".combo-box__menu-list > li");
  const $radio = $(".optional-radio-wrap .btn-radio");
  const $compInfoCont = $(".comp-info-cont");
  const $selectBtn = $(".popup__footer .select-btn");
  const $saveBtn = $(".popup__footer .save-btn");
  const $backBtn = $(".popup__footer .back-btn");
  const $newBtn = $(".popup__footer .new-btn");
  const $compContInner = $(".comp-cont-inner");
  const $newContWrap = $(".new-cont-wrap");

  //city 영역에서 others 선택 시 input box show 이벤트
  const cityFieldShow = function () {
    $menuitem.each(function () {
      $(this).on("click", function () {
        if ($(this).hasClass("others") == true) {
          $(this)
            .parents(".city-box")
            .find(".other-input-box")
            .addClass("active");
        } else {
          $(this)
            .parents(".city-box")
            .find(".other-input-box")
            .removeClass("active");
        }
      });
    });
  };

  //address 영역 auto 스크롤 생성 이벤트
  const addrAutoScroll = function () {
    let itemWrapH = 0;

    const $addressBoxItems = $(".address-box__itemWrap .address-box__item");
    const $addressBox = $addressBoxItems.closest('.address-area')

    // 처음 4개의 아이템 높이만 더하기
    $addressBoxItems.each(function (item) {
      if (item < 4) {
        itemWrapH += $(this).outerHeight();
      }
    });
  
    // address-area의 max-height 설정
    if ($addressBoxItems.length > 4) {
      $addressBox.css("max-height", itemWrapH);
    }
  };

  //address management popup에서 company information 영역 필드 display 이벤트
  const companyInfoFieldDisplay = function () {
    $radio.each(function () {
      $(this).on("click", function () {
        if ($(this).find("input").val() == "input") {
          $compInfoCont.addClass("active");
        } else if ($(this).find("input").val() == "not-input") {
          $compInfoCont.removeClass("active");
        }
      });
    });
  };

  //company search popup 탭 선택에 따라 footer 버튼 disabled 제거 및 show/hide 이벤트
  const companySearchfooBtn = function () {
    const $searchBtn = $(".comp-cont-inner .btn-wrap button");
    const $searchTitle = $(
      ".company-search-popup .popup__header .search-title"
    );
    const $infoTitle = $(".company-search-popup .popup__header .info-title");

    if ($newBtn.prop("disabled") == false) {
      $newBtn.on("click", function () {
        $infoTitle.addClass("active");
        $searchTitle.removeClass("active");
        $backBtn.addClass("active");
        $saveBtn.addClass("active");
        $selectBtn.removeClass("active");
        $newBtn.removeClass("active");
        $compContInner.addClass("hidden");
        $newContWrap.addClass("active");
      });
    }
    $backBtn.on("click", function () {
      $infoTitle.removeClass("active");
      $searchTitle.addClass("active");
      $backBtn.removeClass("active");
      $saveBtn.removeClass("active");
      $selectBtn.addClass("active");
      $newBtn.addClass("active");
      $compContInner.removeClass("hidden");
      $newContWrap.removeClass("active");
    });
  };

  const bind = function () {
    cityFieldShow();
    addrAutoScroll();
    companyInfoFieldDisplay();
    companySearchfooBtn();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
    addrAutoScroll: addrAutoScroll,
  };
})();

$(document).ready(function () {
  profileManagement.init();
  $(window).resize(function () {
    profileManagement.addrAutoScroll();
  });
});
