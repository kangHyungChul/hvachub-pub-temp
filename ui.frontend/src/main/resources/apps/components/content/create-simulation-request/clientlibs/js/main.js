//  파일 첨부시 파일명 30글자 초과일 경우 앞자리 10 / 뒷자리 10 외 글자 말줄임

function ellipsis() {
  const fileElements = document.querySelectorAll(".file-list-box .file-list__el .file-name");
  fileElements.forEach(function (fileElement) {
    const originalName = fileElement.textContent;
    const shortenedName = shortenFilename(originalName);
    fileElement.textContent = shortenedName;
  });
}
function shortenFilename(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  const name = lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex);
  const ext = lastDotIndex === -1 ? "" : filename.slice(lastDotIndex);
  if (name.length > 30) {
    return `${name.slice(0, 10)}...${name.slice(-10)}${ext}`;
  }
  return filename;
}

// height Calc
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
  const Popups = document.querySelectorAll(".popup-id");

  Popups.forEach((popup) => {
    const box = popup.querySelector(".popup-id .list-body");
    const footer = popup.querySelector(".popup-id .popup__footer");
    if (box) {
      heightCalc(box, footer);
    }
  });
}
// popup open시 높이 계산
function selectPopupOpen() {
  const popupActive = document.querySelectorAll(".popup-id");
  popupActive.forEach((popup) => {
    const observer = new MutationObserver(() => {
      if (popup.classList.contains("active")) {
        scrollShadow();
      }
    });
    const config = { attributes: true, attributeFilter: ["class"] };
    observer.observe(popup, config);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  ellipsis();
  selectPopupOpen();
});
window.addEventListener("resize", scrollShadow);
