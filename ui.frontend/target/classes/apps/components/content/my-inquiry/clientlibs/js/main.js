const myInquiry = (function (){
  
  // mobile  add class
  const moStyle = function () {
    const $windowWidth = $(window).width();
    const $comboBox = $('.my-inquiry-search__wrap .combo-box');
    const $dateBox = $('.my-inquiry-search__wrap .input-datepicker');
    const $searchBox = $('.my-inquiry-search__wrap .input-search');
    const $createBtn = $('.my-result__wrap .result__num-btn .btn-block');

    if($windowWidth <= 768) {
      $comboBox.addClass('box-type');
      $dateBox.addClass('box-type');
      $searchBox.addClass('box-type');
      $createBtn.addClass('type2')
    } else {
      $comboBox.removeClass('box-type');
      $dateBox.removeClass('box-type');
      $searchBox.removeClass('box-type');
      $createBtn.removeClass('type2')
    }
  };

  // mobile field open / close toggle btn
  const moFieldToggle = function () {
    $('.my-inquiry-search__wrap .arrow-btn').on('click', function () {
      $(this).parents('.my-inquiry-search__wrap').toggleClass('open');
    });
  };

  // status head, list width match
  const listWidthMatch = function () {
    if($(window).width() > 768) {
      $('.my-inquiry-result__wrap .list-status').css('min-width', 'auto');
      let statusWidthArray = $('.my-inquiry .result-list__wrap .list-status').map(function(){
        return $(this).width();
      }).get();
  
      let statusMaxWidth = Math.max.apply(Math, statusWidthArray);
  
      $('.my-inquiry-result__wrap .list-status').css('min-width', statusMaxWidth);
    }
  }

  const bind = function () {
    moStyle();
    moFieldToggle();
    listWidthMatch();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
    moStyle: moStyle,
    listWidthMatch: listWidthMatch,
  };
})();

$(document).ready(function () {
  myInquiry.init();

  $(window).resize(function () {
    myInquiry.moStyle();
    myInquiry.listWidthMatch();
  });
});