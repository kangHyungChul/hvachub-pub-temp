const createInquiry = (function () {
  // file list 노출 여부에 따른 margin 설정
  const fileListMargin = function () {
    const $windowWidth = $(window).width();

    if($('.create-inquiry .file-list__el').length > 0){
      if($windowWidth > 768 && $windowWidth <= 1440){
        $('.create-inquiry .file-list__wrap').css('margin-bottom', '1.111vw');  
      } else if ($windowWidth <= 768) {
        $('.create-inquiry .file-list__wrap').css('margin-bottom', '0'); 
      } else {
        $('.create-inquiry .file-list__wrap').css('margin-bottom', '16px');
      }
    } else {
      $('.create-inquiry .file-list__wrap').css('margin-bottom', '0'); 
    }
  };

  // mobile combo open / close toggle btn
  const moComboToggle = function () {
    $('.pop-prd-select__cont .select-prd-wrap .arrow-btn').on('click', function () {
      $(this).parents('.select-prd-wrap').toggleClass('open');
    });
  };

  // file명 30byte 초과 시 파일명 자르기
  const fildeNameEllipsis = function(){
    $('.create-inquiry .file-list__el .file-name').each(function(){
      if($(this).text().length > 30) {
        let fileName = $(this).text();
        let fileDot = fileName.lastIndexOf(".") //마지막 . 위치
        let fileExtension = fileName.substring(fileDot, fileName.length); //파일 확장자
        // 파일 확장자를 제외한 파일명
        let baseFileName = fileName.substring(0, fileDot);
  
        // 파일명을 줄이고 확장자를 붙임
        let cutFileName =
          baseFileName.substring(0, 10) +
          "..." +
          baseFileName.substr(baseFileName.length - 10) +
          fileExtension;

        $(this).text(cutFileName);
      }
    });
  };

  const bind = function () {
    fileListMargin();
    moComboToggle();
    fildeNameEllipsis();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
    fileListMargin: fileListMargin,
  };
})();

$(document).ready(function () {
  createInquiry.init();

  $(window).resize(function () {
    createInquiry.fileListMargin();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".accordion__tit");

  headers.forEach(header => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const isActive = item.classList.contains("active");     

      // 모든 항목 닫기
      document.querySelectorAll(".accordion-box .btn-icon").forEach(i => {      
        console.log(i.parentElement.parentElement.classList.remove("active"));      
        // i.parentElement.classList.remove("active");
      });

      // 클릭한 항목 열기 (단, 이미 열려있으면 다시 닫지 않음)
      if (isActive) {
        item.classList.add("active");
      }
    });
  });
});