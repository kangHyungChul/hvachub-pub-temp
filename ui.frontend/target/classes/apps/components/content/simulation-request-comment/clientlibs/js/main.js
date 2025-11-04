const simulationReqComment = (function () {

  // file list 노출 여부에 따른 margin 설정
  const fileListMargin = function () {
    const $fileListWrap = $('.simulation-request-comment .file-list__wrap');
    if($('.simulation-request-comment .file-list__el').length > 0){
      if($(window).width() >= 1440){
        $fileListWrap.css('margin-bottom', '16px');
      } else if($(window).width() <= 768){
        $fileListWrap.css('margin-bottom', '8px');
      } else {
        $fileListWrap.css('margin-bottom', '1.111vw');
      }
    } else {
      $fileListWrap.css('margin-bottom', '0'); 
    }
  };

  const fildeNameEllipsis = function(){
    $('.simulation-request-comment .file-list__el .file-name').each(function(){
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
  simulationReqComment.init();
  $(window).on('resize', function(){
    simulationReqComment.fileListMargin();
  })
});