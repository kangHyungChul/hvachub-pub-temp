const inquiryDetail = (function (){
  // file명 30byte 초과 시 파일명 자르기
  const fildeNameEllipsis = function(){
    $('.inquiry-detail .el-file').each(function(){
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

  const bind = function(){
    fildeNameEllipsis();
  };

  const init = function(){
    bind();
  };

  return {
    init: init,
  };

})();

$(document).ready(function(){
  inquiryDetail.init();
});
