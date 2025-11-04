

// compare model scroll event
const comparePopCont = document.querySelector('.compare-models-popup .popup__container')
// const el = comparePopCont.querySelector('.compare-models-list');
comparePopCont.addEventListener('scroll', () => {
  scrollevent();
  minScroll();
});

function scrollevent() {  
  if (comparePopCont.scrollTop > 0) {
    comparePopCont.classList.add('is-compress');
  } else {
    comparePopCont.classList.remove('is-compress');
  }
}

function minScroll() {
  const containerH = comparePopCont.offsetHeight
  const content = comparePopCont.querySelectorAll('.model-detail')
  content.forEach(item => {
    const elHeight = item.offsetHeight
    if (elHeight < containerH) {
      item.closest('.models__item').style.paddingBottom = (containerH - elHeight - 150) + 'px'
    }
  })
}

// compare model info 높이 통일.
function compareHeight() {
  const infoBoxs = document.querySelectorAll(".compare-models-popup .models__item .model-info");
  const maxHeight = Math.max(...Array.from(infoBoxs, box => box.offsetHeight));
  infoBoxs.forEach(box => updateBoxHeight(box, maxHeight));
}

function ariaLabelHeight() {
  const listItems = document.querySelectorAll('.model-detail .item-row');
  const labelGroups = {};

  listItems.forEach(item => {
    const label = item.getAttribute('aria-label');
    if (label) {
      if (!labelGroups[label]) {
        labelGroups[label] = [];
      }
      labelGroups[label].push(item);
    }
  });

  for (const label in labelGroups) {
    if (labelGroups.hasOwnProperty(label)) {
      const group = labelGroups[label];
      const maxHeight = Math.max(...Array.from(group, item => item.offsetHeight));
      group.forEach(item => updateBoxHeight(item, maxHeight));
    }
  }
};

// customer company search - popup open시 높이 계산
function comparePopupOpen() {
  const popupActive = document.querySelector(".compare-models-popup");
  const observer = new MutationObserver(() => {
    if (popupActive.classList.contains("active")) {
      compareHeight();
      ariaLabelHeight();
      observer.disconnect();
    }
  });
  const config = { attributes: true, attributeFilter: ["class"] };
  observer.observe(popupActive, config);
}
// 높이 계산산
function updateBoxHeight(element, maxHeight) {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 1440) {
    element.style.height = `${maxHeight}px`;
  } else if (windowWidth > 768 && windowWidth < 1440) {
    const vwHeight = (maxHeight / windowWidth) * 100;
    element.style.height = `${vwHeight}vw`;
  } else {
    element.style.height = `${maxHeight}px`;
  }
}
// 사이즈 변화시에 높이 재계산
let WWidthResize = window.innerWidth;
let resizeTimeout;
function handleWindowSizeChangeFooter() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth !== WWidthResize) {
      // WWidthResize = windowWidth;
      // const infoBoxs = document.querySelectorAll(".compare-models-popup .models__item .model-info");
      // infoBoxs.forEach(box => box.style.removeProperty("height"));
      // compareHeight();

      const ariaLabels = document.querySelectorAll('.model-detail .item-row')
      ariaLabels.forEach(label => label.style.removeProperty("height"));
      ariaLabelHeight();
    }
  }, 50);
}

function CompareisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function cpDeviceChecked(enable) {
  const cpOpenBtn = document.querySelector('.compare-add-list-box .compare-add-list-box__inner .icon-mo-folded')
  if (enable) {
    cpOpenBtn.addEventListener('click', cpSelectedOpen);

    let CompareMdswiper;
    CompareMdswiper = new Swiper(".compare-models-swiper", {
      slidesPerView: "auto",
    });

  } else {
    cpOpenBtn.removeEventListener('click', cpSelectedOpen);
  }
}
function cpSelectedOpen() {
  const parent = this.closest('.compare-add-list-box__inner')
  parent.classList.toggle('mo-active')
}
function CompareDeviceChange() {
  cpDeviceChecked(CompareisMobile());

}
document.addEventListener('DOMContentLoaded', () => {  
  CompareDeviceChange();
  comparePopupOpen()
});;
window.addEventListener('resize', () => {
  CompareDeviceChange();
  handleWindowSizeChangeFooter();
});