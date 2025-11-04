const lccDetail = (function () {
   const $samsungRadio = $(".samsung-popup .select-wrap .btn-radio");
   const $samsungMenuItem = $(".samsung-popup .select-wrap .combo-box__menu-list li");
   const $noticeArea = $(".product-area-wrap .notice-area");
   const $productArea = $(".product-area-wrap .product-area");
   const $dvmProductArea = $(".product-area-wrap .product-area.dvm");
   const $quotedProductArea = $(".product-area-wrap .product-area.quoted");
   const $singleProductArea = $(".product-area-wrap .product-area.single");
   const $moResultClose = $('.result-head .icon-close')

   const SamsungFieldChange = function () {
      $samsungRadio.each(function () {
         $(this).on("click", function () {
            $noticeArea.css("display", "none");

            if ($(this).index() === 0) {
               $productArea.css("display", "none");
               $dvmProductArea.css("display", "flex");
            } else if ($(this).index() === 1) {
               $productArea.css("display", "none");
               $quotedProductArea.css("display", "flex");
            } else if ($(this).index() === 2) {
               $productArea.css("display", "none");
               $singleProductArea.css("display", "flex");
            }
         });
      });

      $samsungMenuItem.each(function () {
         $(this).on("click", function () {
            $noticeArea.css("display", "none");
            if ($(this).index() === 0) {
               $productArea.css("display", "none");
               $dvmProductArea.css("display", "flex");
            } else if ($(this).index() === 1) {
               $productArea.css("display", "none");
               $quotedProductArea.css("display", "flex");
            } else if ($(this).index() === 2) {
               $productArea.css("display", "none");
               $singleProductArea.css("display", "flex");
            }
         });
      });
   };

   const lccTabTitMargin = function () {
      const { lccTabSwiper } = window.hvachubFunc.setTabList(
         ".lcc-simul-detail .tab-list-box",
         () => {},
         {
            spaceBetween: 24,
            breakpoints: {
               768: {
                  spaceBetween: 0,
               },
            },
         }
      );
   };

   //mobile 화면일 경우 samsung popup 리스트 show/hide 제어 관련
   const moSystemDetail = function () {
      if ($(window).width() < 768) {
         // $(".lcc-detail-inner").removeClass("before-count");
         $(".system-item button").on("click", function () {
            $(this)
               .parents(".product-area")
               .find(".product-list")
               .addClass("active");
            $(this).parents(".product-area").find(".system-list").hide();
         });
         $(".icon-prev").on("click", function () {
            $(this)
               .parents(".product-area")
               .find(".product-list")
               .removeClass("active");
            $(this).parents(".product-area").find(".system-list").show();
         });
      } else if ($(window).width() > 768) {
         $(".system-list").show();
      }
   };


   // mobile result-area close
   const moResultClose = function () {
      if ($moResultClose) {
         $moResultClose.on("click", function () {
            $(this).closest('.result-area').removeClass('active')

            const $btnPdf = $('.detail-header .pdf-btn')
            const $btnSave = $('.detail-header .save-calc-btn')
            const $btnView = $('.detail-header .view-result-btn')
            
            if ( $btnPdf.css('display', 'flex')) {
               $btnPdf.css('display', 'none');
               $btnSave.css('display', 'flex');
               $btnView.css('display', 'flex');
            } else {
               $btnPdf.css('display', 'flex');
               $btnSave.css('display', 'none');
               $btnView.css('display', 'none');
            }
         })
      }
   }

   const bind = function () {
      SamsungFieldChange();
      lccTabTitMargin();
      moSystemDetail();
      moResultClose();
   };

   const init = function () {
      bind();
   };

   return {
      init: init,
      moSystemDetail: moSystemDetail,
   };
})();

$(document).ready(function () {
   $(window).resize(function () {
     lccDetail.moSystemDetail();
   });
 
   lccDetail.init();
 });