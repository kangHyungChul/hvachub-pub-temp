const offeringSetting = (function () {
  const $fileNameBtn = $(".file-name-btn");
  const $hiddenFileInput = $(".hidden-file-input");
  const $radioInput = $(".offering .popup-wrap .btn-radio__input");
  const $singleItemInput = $(".single-item-input");
  const $bulkUpload = $(".bulk-upload");
  const $tab = $(".tab-list__tab");

  //파일 업로드 관련 이벤트
  const uploadFile = function () {
    $hiddenFileInput.each(function (i) {
      $(this).on("change", function () {
        let fileName = $(this).val().split("/").pop().split("\\").pop();
        let prev = $(this).data("val");

        $(this).parents(".input-box").addClass("active");

        updateUploadBtnMargin($(this));

        $(this).parents(".input-box").find(".file-name").text(fileName);
        $(this).data("val", $(this).val());
        $(this)
          .parents(".input-box")
          .find(".file-name-btn")
          .css("display", "block");

        if ($(this).parents(".input-box").find(".file-name").text() == "") {
          let modifyPrev = prev.split("/").pop().split("\\").pop();
          $(this).parents(".input-box").find(".file-name").text(modifyPrev);

          updateUploadBtnMargin($(this));
        }

        //30byte 초과 시 파일명 자르기
        if (
          $(this).parents(".input-box").find(".file-name").text().length > 30
        ) {
          let fileName = $(this)
            .parents(".input-box")
            .find(".file-name")
            .text();

          let fileDot = fileName.lastIndexOf("."); //마지막 . 위치
          let fileExtension = fileName.substring(fileDot, fileName.length); //파일 확장자

          // 파일 확장자를 제외한 파일명
          let baseFileName = fileName.substring(0, fileDot);

          // 파일명을 줄이고 확장자를 붙임
          let cutFileName =
            baseFileName.substring(0, 10) +
            "..." +
            baseFileName.substr(baseFileName.length - 10) +
            fileExtension;

          $(this).parents(".input-box").find(".file-name").text(cutFileName);
        }
      });
      if (
        $(this).parents(".field-box").find(".upload-btn").hasClass("disabled")
      ) {
        $(this).prop("disabled", true);
        updateUploadBtnMargin($(this));
      }
    });
  };

  const updateUploadBtnMargin = function ($element) {
    if ($(window).width() > 1440) {
      if ($singleItemInput.hasClass("hidden")) {
        $element
          .parents(".field-box")
          .find(".upload-btn")
          .css("margin-bottom", "24px");
      } else if ($element.find(".method-box").length === 0) {
        $element
          .parents(".field-box")
          .find(".upload-btn")
          .css("margin-bottom", "16px");
      } else {
        $element
          .parents(".field-box")
          .find(".upload-btn")
          .css("margin-bottom", "16px");
      }
    } else if ($(window).width() <= 1440 && $(window).width() > 768) {
      if ($singleItemInput.hasClass("hidden")) {
        $element
          .parents(".field-box")
          .find(".upload-btn")
          .css("margin-bottom", "1.667vw");
      } else if ($element.find(".method-box").length === 0) {
        $element
          .parents(".field-box")
          .find(".upload-btn")
          .css("margin-bottom", "1.111vw");
      } else {
        $element
          .parents(".field-box")
          .find(".upload-btn")
          .css("margin-bottom", "1.111vw");
      }
    }
  };

  //파일명 삭제 클릭 이벤트
  const deleteFile = function () {
    $fileNameBtn.each(function (i) {
      $fileNameBtn.eq(i).on("click", function () {
        $(this).parent(".input-box").find(".hidden-file-input").val("");
        $(this).parent(".input-box").removeClass("active");
        if ($(window).width() > 1440) {
          $(this)
            .parents(".field-box")
            .find(".upload-btn")
            .css("margin-bottom", "24px");
        } else if ($(window).width() <= 1440 && $(window).width() > 768) {
          $(this)
            .parents(".field-box")
            .find(".upload-btn")
            .css("margin-bottom", "1.667vw");
        }
      });
    });
  };

  //setting popup 관련 라디오 클릭시 컨텐츠 변경 이벤트
  const popupContChange = function () {
    $radioInput.each(function (i) {
      $(this).on("click", function () {
        $singleItemInput.removeClass("hidden");
        $bulkUpload.addClass("hidden");
        if ($(this).val() == "bulk_upload") {
          $(this)
            .parents(".popup__container")
            .find(".single-item-input")
            .addClass("hidden");
          $(this)
            .parents(".popup__container")
            .find(".bulk-upload")
            .removeClass("hidden");
        }
      });
    });
  };

  //category box 내부 list auto 스크롤 생성 이벤트
  const categoryBoxAutoScroll = function () {
    const $ResultWrap = $(".result-list__wrap .list__el-box");

    $ResultWrap.each(function() {
      let itemWrapH = 0;

      const $items = $(this).find(".list__el")
      $items.each(function (index) {
        if (index < 5) {
          itemWrapH += $(this).outerHeight();
        }
      });
      if ( $items.length > 4) {
        $(this).css("max-height", itemWrapH);
      }       
    });
  };

  const onResizeWindow = function () {
    $(window).resize(function () {
      categoryBoxAutoScroll();
      $hiddenFileInput.each(function () {
        updateUploadBtnMargin($(this));
      });
      deleteFile();
    });
  };

  const onClickTab = function () {
    $tab.on("click", function () {
      categoryBoxAutoScroll();
    });
  };

  const bind = function () {
    uploadFile();
    deleteFile();
    popupContChange();
    categoryBoxAutoScroll();
    onResizeWindow();
    onClickTab();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  offeringSetting.init();
});
