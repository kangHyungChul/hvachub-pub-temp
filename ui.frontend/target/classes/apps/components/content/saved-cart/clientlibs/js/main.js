const savedCart = (function (){
  // checkbox
  listCheck = function () {
    // check all
    $('.saved-cart .checkbox-all').on('click', function() {
      if($(this).is(":checked")) $("input[name=selectList]").prop("checked", true);
      else $("input[name=selectList]").prop("checked", false);
    });

    // list checkbox 선택시 checkbox all 체크 여부
    $(".saved-cart input[name=selectList]").click(function() {
      let total = $(".saved-cart input[name=selectList]").length;
      let checked = $(".saved-cart input[name=selectList]:checked").length;
      const $selectAll = $(".saved-cart .checkbox-all");
      
      if(total != checked) $selectAll.prop("checked", false);
      else $selectAll.prop("checked", true); 
    });
  };

  // accordion
  savedCartAccor = function() {
    $('.saved-cart-accor__tit .accor-arrow').on('click', function(){
      $(this).toggleClass('open');
      $(this).parents('.saved-cart-accor__wrap').toggleClass('accor-open');
    });
  };

  const bind = function () {
    listCheck();
    savedCartAccor();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  savedCart.init();
});