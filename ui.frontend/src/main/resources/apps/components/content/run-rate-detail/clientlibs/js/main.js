// all check
function Allchecked() {
  const Boxs = document.querySelectorAll(".run-rate-prd-list .list-area .basic-list-wrap");
  Boxs?.forEach((box) => {
    const AllCheck = box.querySelector(".list-head .el-checkbox .btn-checkbox input");
    const check = box.querySelectorAll(".list-body .list-row .el-checkbox .btn-checkbox input");

    AllCheck.addEventListener("change", () => {
      check.forEach((checkbox) => {
        if (!checkbox.disabled) {
          checkbox.checked = AllCheck.checked;
        }
      });
    });
    check.forEach((el) => {
      el.addEventListener("change", () => {
        const allChecked = Array.from(check).every((cb) => cb.disabled || cb.checked);
        AllCheck.checked = allChecked;
      });
    });
  });
}

// Upload Excel File alert
function excelFileUpload() {
  const fileInput = document.querySelector(".excel-file-box .upload-btn-box .hidden-file-input");
  const fileName = document.querySelector(".excel-file-box .file-name .txt-p6");
  const fileDelete = document.querySelector(".excel-file-box .file-name .file-name-btn");

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      fileName.textContent = file.name;
    }
  });
  if (fileDelete) {
    fileDelete.addEventListener("click", () => {
      fileName.textContent = "";
    });
  }
}

// 모바일 이벤트
let isMobile = false;
function runRateisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function runRatehandleClick(className) {
  const parent = this.closest(`.${className}`);
  parent.classList.toggle("mo-active");
}

// title More Btn
function runRateMoreOpen(enable) {
  const moreBtn = document.querySelector(".run-rate-detail .tit-area .tit__right .icon-more");
  if (!moreBtn) return;

  if (enable) {
    moreBtn.addEventListener("click", handleRunRateMoreClick);
  } else {
    moreBtn.removeEventListener("click", handleRunRateMoreClick);
  }
}
function handleRunRateMoreClick() {
  runRatehandleClick.call(this, "tit__right");
}

// product list add combo box
function runRateAddBoxOpen(enable) {
  const addBtn = document.querySelector(".add-btn-box .add-btn__placeholder");
  if (!addBtn) return;

  if (enable) {
    addBtn.addEventListener("click", handleRunRateAddClick);
  } else {
    addBtn.removeEventListener("click", handleRunRateAddClick);
  }
}
function handleRunRateAddClick() {
  runRatehandleClick.call(this, "add-btn-box");
}

// PC, MO
function runRateEvent() {
  Allchecked();
  excelFileUpload();
}

// MO
function runRateMoEvent() {
  const currentIsMobile = runRateisMobile();

  if (isMobile !== currentIsMobile) {
    isMobile = currentIsMobile;

    runRateMoreOpen(isMobile);
    runRateAddBoxOpen(isMobile);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  runRateEvent();
  runRateMoEvent();
});
window.addEventListener("resize", runRateMoEvent);
