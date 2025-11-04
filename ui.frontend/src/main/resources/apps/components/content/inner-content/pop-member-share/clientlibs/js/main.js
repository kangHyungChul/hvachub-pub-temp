const memberSharePop = (function () {
  // member & share popup content height
  const memberSharePopupHeight = function () {

    const heightCalculation = function () {
      const $bodyInner = $('.pop-member-share__cont .body__inner');
      let popContHeight = $('.pop-member-share-wrap .popup__container').height();
      let contTitHeight = $('.pop-member-share__cont > article > strong').height();
      let listHeadHeight = $('.pop-member-share__cont .table-head').height()
      const listBody = $('.pop-member-share__cont .table-body');
      let contentPadding = parseInt($('.pop-member-share__cont > article').css('padding-top').split('px')[0]);
      let listMargin = parseInt($('.pop-member-share__cont .member-table').css('margin-top').split('px')[0]);

      let listContHeihgt = popContHeight - contTitHeight - listHeadHeight - (contentPadding * 2) - listMargin;
      let molistContHeight = popContHeight - 49;

      if($(window).width() > 768) {
        listBody.css({'min-height':listContHeihgt, 'max-height':listContHeihgt});

        // table scroll시 table header 여백 추가
        $bodyInner.each(function(i) {
          if($bodyInner.eq(i).height() > listContHeihgt) {
            $(this).parents('.member-table').find('.table-head').css('padding-right', '8px');
          }
        });
      } else {
        $('.pop-member-share__cont > article').css({'min-height':molistContHeight, 'max-height':molistContHeight});
      }
    }

    $(document).on('click', '.icon-member', function(){
      $(window).on('resize', function(){heightCalculation()});
      heightCalculation();
    })
  }

  const moTab = function () {
    // memnber & share popup content on/of
    $('.pop-member-share-wrap .mo-tab-wrap').each(function(){
      $(this).find('.tab-tit').on('click', function(){
        $(this).addClass('active');
        $(this).parents('.mo-tab-wrap').find('.tab-tit').not($(this)).removeClass('active');
        if($(this).hasClass('second-tit')) {
          $(this).parents('.pop-member-share-wrap').addClass('prj-open');
        } else {
          $(this).parents('.pop-member-share-wrap').removeClass('prj-open');
        }
      })
    });
  };

  // checkbox
  const listCheck = function () {
    const $checkboxWrap = $('.pop-member-share-wrap .checkbox-list__wrap');
    // check all
    $checkboxWrap.each(function(i){
      $checkboxWrap.eq(i).find('.checkbox-all').on('click', function(){
        if($(this).is(":checked")) {
          $(this).parents('.checkbox-list__wrap').find('input[name=selectList]').not('input:disabled').prop('checked', true);
        } else {
          $(this).parents('.checkbox-list__wrap').find('input[name=selectList]').prop('checked', false);
        }
      });

      // list checkbox 선택시 checkbox all 체크 여부
      $checkboxWrap.eq(i).find('input[name=selectList]').click(function() {
        let total = $checkboxWrap.eq(i).find('input[name=selectList]').length;
        let checked = $checkboxWrap.eq(i).find('input[name=selectList]:checked').length;
        const $selectAll = $(this).parents('.checkbox-list__wrap').find('.checkbox-all');
        
        if(total != checked) $selectAll.prop('checked', false);
        else $selectAll.prop('checked', true); 
      });
    });
  };
  
  const bind = function () {
    memberSharePopupHeight()
    moTab();
    listCheck()
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
    listCheck: listCheck,
  };
})();

$(document).ready(function () {
  memberSharePop.init();
});