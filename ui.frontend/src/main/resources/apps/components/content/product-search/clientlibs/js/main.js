// container 높이 구하기
let shResultH;
function containerHeight() {

    const shContainer = document.querySelector(".prd-sh-wrap .popup__container");
    const shShearch = shContainer.querySelector(".prd-sh__search");
    const shResult = shContainer.querySelector(".prd-sh__result");

    const shContainerH = shContainer.getBoundingClientRect().height - 24;
    const shShearchH = shShearch.getBoundingClientRect().height;

    // shResultH = shContainerH - shShearchH;

    if (window.innerWidth >= 1440) {
      shResult.style.height = shResultH + "px";
    } else if (window.innerWidth > 768 && window.innerWidth <= 1440) {
      const viewportWidth = window.innerWidth;
      const maxHeightVw = (shResultH / viewportWidth) * 100;
      shResult.style.height = maxHeightVw + "vw";
    } else {
      shResult.style.height = "auto";
    }
 
}

// 초기 filter 열기
function filterShow(el) {
  const parent = el.closest(".prd-sh__search");
  // parent.classList.add("active");
  $(".prd-filter-box").removeClass("filter-hide"); // 240905 개발 요청 추가
  containerHeight();
}
// 240717 개발 요청 사항으로 인한 추가 - jueun
$(document).ready(function () {
  // search 영역 filter Folded
  const filterField = document.querySelector(".prd-sh__search .field-area");
  const filterFoled = document.querySelector(".filter-close-box .icon-arrow-bottom"); 

  if (filterFoled) {
    filterFoled.addEventListener("click", function (e) {
      const filter = e.target.closest(".prd-filter-box");
      filter.classList.toggle("filter-hide");
      containerHeight();
    });
  }
 
  //multiCombo 관련(2025-04-10 추가)
  const multiCombo = document.querySelectorAll(".multi-combo-box-wrap .multi-combo-box .multi-combo-box__txt");
  multiCombo.forEach( button =>{     
    $(button).click(function() {
      if($(this).parent().hasClass("active")) {
        $(this).parent().removeClass("active");        
      } else {
        $(multiCombo).parent().removeClass("active");
        $(this).parent().addClass("active");
      }
    });
  })


  //multiCombo 안에 apply Button 클릭시(2025-04-10 추가)
  const applyButton = document.querySelectorAll(".multi-combo-box-wrap .multi-combo-box .btn-block.type2"); 
  applyButton.forEach ( applayBtn => {
     $(applayBtn).click(function() {
        var checkedValue = [];

        $(this).parent().find('input[type="checkbox"]:checked').each(function(){
          checkedValue.push($(this).siblings(".btn-checkbox__txt").text().trim())
        })

        if(checkedValue.length > 0) {
          console.log($(this).parent().prev().text(checkedValue.join(',')));          
        }

        $(this).parent().parent().removeClass("active");
     })
  })

});

function prdPopupOpen() {
  const popupActive = document.querySelector(".prd-sh-wrap");
  const observer = new MutationObserver(() => {
    if (popupActive.classList.contains("active")) {
      containerHeight();
    }
  });
  const config = { attributes: true, attributeFilter: ["class"] };
  observer.observe(popupActive, config);
}

// list 영역 list Folded
function listHideEvent() {
  const listFoldBtn = document.querySelectorAll(".prd-detail__top .fold-btn-box .icon-arrow-bottom");
  listFoldBtn.forEach((el) => {
    el.addEventListener("click", function (e) {
      const listParent = e.target.closest(".prd-list__item-detail");
      const unfold = listParent.classList.contains("list-hide");

      if (unfold) {
        listParent.classList.remove("list-hide");
      } else {
        listParent.classList.add("list-hide");
      }
    });
  });
}

// Capacity
function capacity() {
  window.hvachubFunc.setDefaultSwiper({
    container: ".capacity-swiper",
    swiperOptions: {
      slidesPerView: "auto",
      spaceBetween: 6,
      // loop: true,
      navigation: {
        nextEl: ".capa__next-btn",
        prevEl: ".capa__prev-btn",
      },
      breakpoints: {
        769: {
          spaceBetween: 8,
        },
      },
    },

    slides: ".swiper-slide.capa__item",
    activeClass: "active",
  });
}

let isMobilePrd = false;
function prdSearchisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function prdSearchMoClose() {
  const moShBox = document.querySelector(".prd-sh__search");
  const moShClose = document.querySelector(".prd-sh__tit .icon-close");
  const moShOpen = document.querySelector(".mo-ord-sh__search .btn-block");
  if (moShOpen) {
    moShOpen.addEventListener("click", () => {
      moShBox.classList.add("mo-active");
      document.documentElement.classList.add("layer-open");
    });
  }
  if (moShClose) {
    moShClose.addEventListener("click", () => {
      moShBox.classList.remove("mo-active");
      document.documentElement.classList.remove("layer-open");
    });
  }
}

// PC, MO
function prdSearchEvent() {
  capacity();
  listHideEvent();
  prdPopupOpen();
}

// MO
function prdSearchMoEvent() {
  const currentIsMobile = prdSearchisMobile();
  if (isMobilePrd !== currentIsMobile) {
    isMobilePrd = currentIsMobile;
    prdSearchMoClose(isMobilePrd);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  prdSearchEvent();
  prdSearchMoEvent();
});
window.addEventListener("resize", function () {
  prdSearchEvent();
  prdSearchMoEvent();
  containerHeight();
});
