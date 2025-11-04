const templateSetting = (function () {
  const $fileNameBtn = $(".file-name-btn");
  const $hiddenFileInput = $(".hidden-file-input");

  //파일 업로드 관련 이벤트
  const uploadFile = function () {
    $hiddenFileInput.each(function (i) {
      $(this).on("change", function () {
        let fileName = $(this).val().split("/").pop().split("\\").pop();
        let prev = $(this).data("val");

        $(this).parents(".input-box").addClass("active");
        $(this).parents(".input-box").find(".file-name").text(fileName);
        $(this).data("val", $(this).val());
        $(this)
          .parents(".input-box")
          .find(".file-name-btn")
          .css("display", "block");
        if ($(this).parents(".input-box").find(".file-name").text() == "") {
          let modifyPrev = prev.split("/").pop().split("\\").pop();
          $(this).parents(".input-box").find(".file-name").text(modifyPrev);
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
    });
  };

  //파일명 삭제 클릭 이벤트
  const deleteFile = function () {
    $fileNameBtn.each(function (i) {
      $fileNameBtn.eq(i).on("click", function () {
        $(this).parent(".input-box").find(".hidden-file-input").val("");
        $(this).parent(".input-box").removeClass("active");
      });
    });
  };

  const bind = function () {
    uploadFile();
    deleteFile();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  templateSetting.init();
});
