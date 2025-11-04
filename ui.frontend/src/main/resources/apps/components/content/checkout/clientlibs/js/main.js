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
function scrollShadow() {
  const box = document.querySelector(".pop-select-address .address-list");
  const footer = document.querySelector(".pop-select-address .popup__footer");
  if (box) {
    heightCalc(box, footer);
  }
}
// popup open시 높이 계산
function selectPopupOpen() {
  const popupActive = document.querySelector(".pop-select-address");
  const observer = new MutationObserver(() => {
    if (popupActive.classList.contains("active")) {
      scrollShadow();
    }
  });
  const config = { attributes: true, attributeFilter: ["class"] };
  observer.observe(popupActive, config);
}

document.addEventListener("DOMContentLoaded", selectPopupOpen);
window.addEventListener("resize", scrollShadow);
