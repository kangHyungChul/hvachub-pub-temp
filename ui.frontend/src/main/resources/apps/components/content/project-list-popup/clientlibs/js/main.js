// common Search selected
function shipSelected() {
  const btns = document.querySelectorAll(".prj-sh-list .sh-list-item .list-item__right .btn-block");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((etc) => {
        etc.classList.remove("type2");
      });
      btn.classList.add("type2");
    });
  });
}

// common height Calc
function heightCalc(itHeight, iTshadow) {
  let isScrollNeeded = false;

  if (itHeight.scrollHeight > itHeight.offsetHeight) {
    isScrollNeeded = true;
  }
  if (isScrollNeeded) {
    iTshadow.classList.add("inshadow");
  } else {
    iTshadow.classList.remove("inshadow");
  }
}

// Jobsite Location Search - height calc
function JobsiteCheckScrollShadow() {
  const boxs = document.querySelectorAll('.job-ls-popup .tab-wrap .tab-wrap__contents [role="tabpanel"]');
  boxs.forEach((box) => {
    const panel = box.querySelector(".tab-cont__inner");
    const footer = box.querySelector(".tab-cont__btn");
    heightCalc(panel, footer);
  });
}
// Jobsite Location Search - popup open시 높이 계산
function JobsitePopupOpen() {
  const popupActive = document.querySelector(".job-ls-popup");
  const observer = new MutationObserver(() => {
    if (popupActive.classList.contains("active")) {
      JobsiteCheckScrollShadow();
    }
  });
  const config = { attributes: true, attributeFilter: ["class"] };
  observer.observe(popupActive, config);
}
// Jobsite Location Search - Tab Click시 높이 계산
function tabActive() {
  const tabs = document.querySelectorAll(".job-ls-popup .tab-wrap .tab-list__tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      JobsiteCheckScrollShadow();
    });
  });
}
// Jobsite Location Search ship to code
function shipToBoxOpen() {
  const btn = document.querySelector(".ship-to-code-box .ship-to__top .btn-block");
  btn.addEventListener("click", () => {
    const parent = btn.closest(".ship-to-code-box");
    parent.classList.toggle("active");
  });
}

// customer company search - height calc
function customerCheckScrollShadow() {
  const box = document.querySelector(".customer-sh-area .prj-sh-list-area");
  const footer = document.querySelector(".customer-sh-area .popup__footer");
  if (box) {
    heightCalc(box, footer);
  }
}
// customer company search - popup open시 높이 계산
function customerPopupOpen() {
  const popupActive = document.querySelector(".customer-sh-popup");
  const observer = new MutationObserver(() => {
    if (popupActive.classList.contains("active")) {
      customerCheckScrollShadow();
    }
  });
  const config = { attributes: true, attributeFilter: ["class"] };
  observer.observe(popupActive, config);
}

// customer : company info - height calc
function compInfoCheckScrollShadow() {
  const box = document.querySelector(".company-info-area .popup__container");
  const footer = document.querySelector(".company-info-area .popup__footer");
  if (box) {
    heightCalc(box, footer);
  }
}
// customer : company search - height calc
function compshCheckScrollShadow() {
  const box = document.querySelector(".company-sh-area .basic-list__result .list-body-box");
  const footer = document.querySelector(".company-sh-area .popup__footer");
  if (box) {
    heightCalc(box, footer);
  }
}
// customer : contact info - height calc
function contactInfoCheckScrollShadow() {
  const box = document.querySelector(".contact-info-area .basic-list__result .list-body-box");
  const footer = document.querySelector(".contact-info-area .popup__footer");
  if (box) {
    heightCalc(box, footer);
  }
}

// customer company search - 버튼 클릭
function companyInfoOpen() {
  const customerPop = document.querySelector(".customer-sh-popup");

  // customer
  const customerShArea = customerPop.querySelector(".customer-sh-area");
  // const newBtn = customerShArea.querySelector(".prj-sh-top .btn-company-new");
  const searchBtn = customerShArea.querySelector(".prj-sh-top .btn-company-sh");

  // company info
  const compInfoArea = customerPop.querySelector(".company-info-area");
  const compInfoClose = compInfoArea.querySelector(".popup__header .icon-close");

  // company search
  const compShArea = customerPop.querySelector(".company-sh-area");
  const compShClose = compShArea.querySelector(".popup__header .icon-close");
  const selecBtns = compShArea.querySelectorAll(".prj-company-list .btn-contac-info");

  // contact info
  const contInfoArea = customerPop.querySelector(".contact-info-area");
  const contInfoClose = contInfoArea.querySelector(".popup__header .icon-close");
  const contInfoSh = contInfoArea.querySelector(".basic-list__top .top__left .icon-search");

  // company info open
  // newBtn.addEventListener("click", () => {
  //   customerShArea.style.display = "none";
  //   compInfoArea.style.display = "block";
  //   compInfoCheckScrollShadow();
  // });
  // company info close
  compInfoClose.addEventListener("click", () => {
    customerShArea.style.display = "block";
    compInfoArea.style.display = "none";
    customerCheckScrollShadow();
  });
  // company search open
  searchBtn.addEventListener("click", () => {
    customerShArea.style.display = "none";
    compShArea.style.display = "block";
    compshCheckScrollShadow();
  });
  // company search close
  compShClose.addEventListener("click", () => {
    customerShArea.style.display = "block";
    compShArea.style.display = "none";
    customerCheckScrollShadow();
  });
  // contact info open
  selecBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      compShArea.style.display = "none";
      contInfoArea.style.display = "block";
      contactInfoCheckScrollShadow();
    });
  });
  // contact info close
  contInfoClose.addEventListener("click", () => {
    compShArea.style.display = "block";
    contInfoArea.style.display = "none";
    compshCheckScrollShadow();
  });
  // contact info seach
  contInfoSh.addEventListener("click", () => {
    compShArea.style.display = "block";
    contInfoArea.style.display = "none";
    compshCheckScrollShadow();
  });
}

// document popup all check
function documentAllchecked() {
  const docxBox = document.querySelector(".pu-documents .basic-list__result");
  const headCheckes = docxBox.querySelectorAll(".list-head .list-el .btn-checkbox__input");
  const bodyRows = docxBox.querySelectorAll(".list-body .list-row");

  headCheckes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const isChecked = checkbox.checked;
      const className = checkbox.closest(".list-el").classList[1];
      const bodyCheckes = document.querySelectorAll(".list-body ." + className + " .btn-checkbox__input");
      bodyCheckes.forEach(function (bodyChecke) {
        bodyChecke.checked = isChecked;
      });
    });
  });

  bodyRows.forEach(function (row) {
    const bodyCheckes = row.querySelectorAll(".list-el .btn-checkbox__input");
    bodyCheckes.forEach(function (bodyCheck) {
      bodyCheck.addEventListener("change", function () {
        const className = bodyCheck.closest(".list-el").classList[1];
        const relatedHeadCheck = document.querySelector(".list-head ." + className + " .btn-checkbox__input");
        const allBodyCheckes = document.querySelectorAll(".list-body ." + className + " .btn-checkbox__input");
        const anyUnchecked = Array.from(allBodyCheckes).some(function (cb) {
          return !cb.checked;
        });
        if (anyUnchecked) {
          if (relatedHeadCheck) {
            relatedHeadCheck.checked = false;
          }
        } else {
          if (relatedHeadCheck) {
            relatedHeadCheck.checked = true;
          }
        }
      });
    });
  });
}

// 파일 첨부시 파일명 30글자 초과일 경우 앞자리 10 / 뒷자리 10 외 글자 말줄임 
function ellipsis(){
  const fileElements = document.querySelectorAll('.upload__list .upload-list__item .file-name')
  fileElements.forEach(function(fileElement) {
      const originalName = fileElement.textContent;
      const shortenedName = shortenFilename(originalName);
      fileElement.textContent = shortenedName;
  });
}
function shortenFilename(filename) {
  const lastDotIndex = filename.lastIndexOf('.');
  const name = lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex);
  const ext = lastDotIndex === -1 ? '' : filename.slice(lastDotIndex);
  if (name.length > 30) {
      return `${name.slice(0, 10)}...${name.slice(-10)}${ext}`;
  }
  return filename;
}

// multi order pop folded
function activeMultiOrderFolded() {
  const btnFolded = document.querySelector(".multi-po-popup .search-area .icon-folded");
  btnFolded.addEventListener("click", () => {
    const parent = btnFolded.closest(".multi-po-popup .search-area");
    parent.classList.toggle("active");
  });
}

// 25-09-25 아코디언 클릭시 스크롤 위치 변경 추가
const multiOrderAccordion = document.querySelectorAll(".multi-po-popup .basic-list__result .list-row .icon-accordion");

multiOrderAccordion.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const headHeight = document.querySelector(".multi-po-popup .basic-list__result .list-head").offsetHeight;
    const scrollWrap = document.querySelector(".multi-po-popup .popup__container");
    const parent = accordion.closest(".multi-po-popup .basic-list__result .list-content");
    const isActive = parent.classList.contains("active");
    
      if(isActive) {
        const parentRect = parent.getBoundingClientRect();
        const scrollWrapRect = scrollWrap.getBoundingClientRect();
        
        const relativeTop = parentRect.top - scrollWrapRect.top;
        
        if(scrollWrap && scrollWrap.scrollHeight > scrollWrap.clientHeight) {
          const newScrollTop = scrollWrap.scrollTop + relativeTop;
          scrollWrap.scrollTop = newScrollTop - headHeight;
        }
      }
  });
});
// 25-09-25 아코디언 클릭시 스크롤 위치 변경 추가 끝

document.addEventListener("DOMContentLoaded", () => {
  // shipToBoxOpen();
  JobsitePopupOpen();
  customerPopupOpen();
  shipSelected();
  tabActive();
  companyInfoOpen();
  documentAllchecked();
  ellipsis()
  activeMultiOrderFolded()
});
window.addEventListener("resize", () => {
  JobsiteCheckScrollShadow();
  customerCheckScrollShadow();
  compInfoCheckScrollShadow();
  compshCheckScrollShadow();
  contactInfoCheckScrollShadow();
  tabActive();
});
