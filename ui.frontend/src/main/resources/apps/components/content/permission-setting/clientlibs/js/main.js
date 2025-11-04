// 드래그 가로스크롤 
const scrollContainer = document.querySelectorAll('.role-setting .list-check');
scrollContainer.forEach( scrollC =>{
    let isDown = false;
    let startX;
    let scrollLeft;
    const startDragging = (e) => {
        isDown = true;
        startX = e.pageX - scrollC.offsetLeft;
        scrollLeft = scrollC.scrollLeft;
    };
    const stopDragging = () => { isDown = false; };
    const drag = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollC.offsetLeft;
        scrollC.scrollLeft = scrollLeft - (x - startX) * 3;
    };
    scrollC.addEventListener('mousedown', startDragging);
    scrollC.addEventListener('mouseleave', stopDragging);
    scrollC.addEventListener('mouseup', stopDragging);
    scrollC.addEventListener('mousemove', drag);
})    

// 다국어 menu name 너비 변경
function MenuNameEvent() {
    const tooltipBtn = document.querySelectorAll(".tooltip-btn-box .icon-tootip");
    tooltipBtn.forEach((btn) => {
      btn.addEventListener("click", calculateMaxWidth);
    });
  }


  function calculateMaxWidth() {
    const boxs = document.querySelectorAll(".menu-desc-popup .basic-list__result .el__menu");
    const texts = document.querySelectorAll(".menu-desc-popup .basic-list__result .el__menu > p");
    let maxWidth = 0;
  
    texts.forEach((txt) => {
      const txtWidth = txt.getBoundingClientRect().width;
      if (txtWidth > maxWidth) {
        maxWidth = txtWidth;
      }
    });
    boxs.forEach((box) => {
      if (window.innerWidth >= 1440) {
        box.style.width = `${maxWidth}px`;
      } else if (window.innerWidth > 768 && window.innerWidth <= 1440) {
        const viewportWidth = window.innerWidth;
        const WdithVw = (maxWidth / viewportWidth) * 100;
        box.style.width = `${WdithVw}vw`;
      } else {
        box.style.width = `${maxWidth}px`;
      }
    });
  }
  
  // list li에 data-index 적용
  function rowHeightChange() {
    const roleLists = document.querySelectorAll(".permission-setting .role-list");
    roleLists.forEach((list) => {
      const listMenu = list.querySelectorAll(".list-menu .menu-row");
      listMenu.forEach((li, index) => {
        li.setAttribute("data-index", index);
      });
      const listCheckBox = list.querySelectorAll(".list-check .list-check__role");
      listCheckBox.forEach((checkBox) => {
        const listCheck = checkBox.querySelectorAll(".list-check__inner .list__item");
        listCheck.forEach((li, index) => {
          li.setAttribute("data-index", index);
        });
      });
      setDataIndex(list, "li[data-index]");
    });
  }
  
  // 동일 data-index 중 가장 큰 높이 찾기
  function setDataIndex(parentElement, selector) {
    const elements = parentElement.querySelectorAll(selector);
    const allDataIndexes = new Set();
    elements.forEach((element) => {
      const index = element.getAttribute("data-index");
      allDataIndexes.add(index);
    });
    allDataIndexes.forEach((dataIndex) => {
      const elements = parentElement.querySelectorAll(`li[data-index="${dataIndex}"]`);
      let maxHeight = 0;
      elements.forEach((element) => {
        const elementHeight = element.offsetHeight;
        const styleHeight = parseInt(getComputedStyle(element).minHeight, 10);
        maxHeight = Math.max(maxHeight, elementHeight, styleHeight);
      });
      updateBoxHeight(elements, maxHeight);
    });
  }
  
  // 동일 data-index 중 가장 큰 높이를 동일 data-index 에 모두 적용
  function updateBoxHeight(elements, maxHeight) {
    elements.forEach((element) => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1440) {
        element.style.height = `${maxHeight}px`;
      } else if (windowWidth > 768 && windowWidth < 1440) {
        const vwHeight = (maxHeight / windowWidth) * 100;
        element.style.height = `${vwHeight}vw`;
      } else {
        element.style.height = `${maxHeight}px`;
      }
    });
  }
  
  // 화면 크기 변경 시 height 재계산
  let previousWindowWidth = window.innerWidth;
  function handleWindowSizeChange() {
    const windowWidth = window.innerWidth;
  
    // 브레이크포인트가 변경된 경우에만 재계산
    if (windowWidth !== previousWindowWidth) {
      previousWindowWidth = windowWidth;
      const roleLists = document.querySelectorAll(".role-setting .role-list");
      roleLists.forEach((element) => {
        const resetHeight = element.querySelectorAll("li[data-index]");
        resetHeight.forEach((reset) => {
          reset.style.removeProperty("min-height");
        });
      });
      roleLists.forEach((list) => {
        setDataIndex(list, "li[data-index]");
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    MenuNameEvent();
    rowHeightChange();
  });
  window.addEventListener("resize", () => {
    MenuNameEvent();
    handleWindowSizeChange();
  })