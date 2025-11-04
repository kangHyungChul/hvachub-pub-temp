function pcListFlexBasis() {
  const elements = document.querySelectorAll(`.supp-sim-request-sect .basic-list__result .list-body .el-status`);

  let maxWidth = 0;
  elements.forEach((element) => {
    const elementWidth = element.offsetWidth;
    if (elementWidth > maxWidth) {
      maxWidth = elementWidth;
    }
  });

  elements.forEach((element) => {
    if (window.innerWidth >= 1440) {
      element.style.flexBasis = maxWidth + "px";
    } else if (window.innerWidth > 768 && window.innerWidth <= 1440) {
      const viewportWidth = window.innerWidth;
      const maxWidthVW = (maxWidth / viewportWidth) * 100;
      element.style.flexBasis = maxWidthVW + "vw";
    } else {
      element.style.flexBasis = "auto";
    }
  });
}

function SppisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function SppMoEvent(enable) {
  const $Btn = document.querySelector(".supp-sim-request__sh .icon-mo-folded");
  const active = enable ? "addEventListener" : "removeEventListener";
  $Btn[active]("click", SppFoldedHandle);

  //   const $listEls = document.querySelectorAll(".supp-sim-request-sect .basic-list__result .list-body .list-row");
  //   $listEls.forEach((listEl) => {
  //     const suppId = listEl.querySelector(".el-id");
  //     const suppStat = listEl.querySelector(".el-status").offsetWidth;
  //     if (enable) suppId.style.left = suppStat + "px";
  //   });
}
function SppFoldedHandle() {
  const parent = this.closest(".supp-sim-request__sh");
  parent.classList.toggle("mo-active");
}
function SppDeviceChange() {
  SppMoEvent(SppisMobile());
  pcListFlexBasis();
}
document.addEventListener("DOMContentLoaded", SppDeviceChange);
window.addEventListener("resize", SppDeviceChange);
