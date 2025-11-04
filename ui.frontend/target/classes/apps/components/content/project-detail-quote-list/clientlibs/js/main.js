// 접기/ 펼치기
function activeFolded() {
  const btnFolded = document.querySelector(".prj-detail .icon-folded");
  btnFolded.addEventListener("click", () => {
    const parent = btnFolded.closest(".prj-detail");
    parent.classList.toggle("active");
  });
}

// 모바일 이벤트
let isMobile = false;
function PDisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function PDhandleClick(className) {
  const parent = this.closest(`.${className}`);
  parent.classList.toggle("mo-active");
}

// title More Btn
function PDMoreOpen(enable) {
  const moreBtn = document.querySelector(".project-detail-quote-list .tit-area .tit__right .icon-more");
  if (!moreBtn) return;

  if (enable) {
    moreBtn.addEventListener("click", handlePDMoreClick);
  } else {
    moreBtn.removeEventListener("click", handlePDMoreClick);
  }
}
function handlePDMoreClick() {
  PDhandleClick.call(this, "tit__right");
}

// quote btn combo box
function PDComboBoxOpen(enable) {
  const quoteBtn = document.querySelectorAll(".quote-btn-box .quote-btn__placeholder");
  if (quoteBtn.length === 0) return;
  quoteBtn.forEach((btn) => {
    if (enable) {
      btn.addEventListener("click", handlePDComboClick);
    } else {
      btn.removeEventListener("click", handlePDComboClick);
    }
  });
}
function handlePDComboClick() {
  PDhandleClick.call(this, "quote-btn-box");
}

// MO
function projectDetailMo() {
  const currentIsMobile = PDisMobile();
  if (isMobile !== currentIsMobile) {
    isMobile = currentIsMobile;

    PDMoreOpen(isMobile);
    PDComboBoxOpen(isMobile);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  activeFolded();
  projectDetailMo();
});
window.addEventListener("resize", projectDetailMo);
