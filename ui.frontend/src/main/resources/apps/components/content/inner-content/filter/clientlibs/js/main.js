// seleced filter children check
function observeChildren() {
  const element = document.querySelector(".filter-wrap__result .filter-center");
  if (element) {
    checkChildClass(element);
    const observer = new MutationObserver(() => {
      checkChildClass(element);
    });
    observer.observe(element, { childList: true });
  }
}
function checkChildClass(element) {
  if (element.children.length === 0) {
    element.classList.add("no-child");
  } else {
    element.classList.remove("no-child");
  }
}

// plp
function plpFilterBtn() {
  const filterBtn = document.querySelector(".filter-wrap .filter-wrap__top .btn-filter");
  if (!filterBtn) return;

  filterBtn.addEventListener("click", function () {
    const filterCont = document.querySelector(".filter-wrap .filter-wrap__cont");
    const isActive = filterCont.classList.contains("on-filter");

    if (isActive) {
      filterBtn.classList.remove("on");
      filterCont.classList.remove("on-filter");
    } else {
      filterBtn.classList.add("on");
      filterCont.classList.add("on-filter");
      if (window.innerWidth <= 768) {
        document.documentElement.classList.add("layer-open");
      }
    }
  });
}

// 모바일 분기
let isMobile = false;
function FilterisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

// mo common filter
function plpFilterIcon(enable) {
  const filters = document.querySelectorAll(".filter-wrap");
  filters.forEach((filter) => {
    const btnPlpFilter = filter.querySelector(".filter-wrap__top .btn-filter");
    if (!btnPlpFilter) return;
    if (enable) {
      btnPlpFilter.classList.remove("on");
    } else {
      btnPlpFilter.classList.add("on");
    }
  });
}

// mo common filter
function filterContReset(enable) {
  const filters = document.querySelectorAll(".filter-wrap");
  filters.forEach((filter) => {
    const reset = filter.querySelector(".filter-wrap__cont");
    if (enable) {
      reset.classList.remove("on-filter");
    } else {
      reset.classList.add("on-filter");
    }
  });
}

// mo common filter close
function filterListClose(enable) {
  const filters = document.querySelectorAll(".filter-wrap__menu");
  filters.forEach((filter) => {
    const CloseBtn = filter.querySelector(".filter-wrap__menu .mo-filter-tit-box .icon-close");
    const parent = CloseBtn.closest(".filter-wrap__cont");
    if (!CloseBtn) return;
    if (enable) {
      CloseBtn.addEventListener("click", () => {
        parent.classList.remove("on-filter");
        document.documentElement.classList.remove("layer-open");
      });
    }
  });
}

// mo common filter scroll
function filterListScroll(enable) {
  const filters = document.querySelectorAll(".filter-wrap__menu");
  filters.forEach((filter) => {
    const scrollCont = filter.querySelector(".filter-list");
    const constTit = filter.querySelector(".mo-filter-tit-box");
    if (!constTit) return;
    if (enable) {
      scrollCont.addEventListener("scroll", () => {
        if (scrollCont.scrollTop > 0) {
          constTit.classList.add("shadow");
        } else {
          constTit.classList.remove("shadow");
        }
      });
    }
  });
}

// Plp 외 click
function moFilterBtn(enable) {
  const filters = document.querySelectorAll(".filter-wrap");
  filters.forEach((filter) => {
    const filterCont = filter.querySelector(".filter-wrap__cont");
    const filterOpen = filter.querySelector(".filter-left .filter-btn");
    if (!filterOpen) return;
    if (enable) {
      filterOpen.addEventListener("click", function () {
        filterCont.classList.add("on-filter");
        document.documentElement.classList.add("layer-open");
      });
    }
  });
}

// PC, MO
function filterEvent() {
  observeChildren();
  plpFilterBtn();
}

// MO
function filterMoEvent() {
  const currentIsMobile = FilterisMobile();

  if (isMobile !== currentIsMobile) {
    isMobile = currentIsMobile;
    plpFilterIcon(isMobile);
    filterContReset(isMobile);
    filterListClose(isMobile);
    filterListScroll(isMobile);
    moFilterBtn(isMobile);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  filterEvent();
  filterMoEvent();
});
window.addEventListener("resize", filterMoEvent);
