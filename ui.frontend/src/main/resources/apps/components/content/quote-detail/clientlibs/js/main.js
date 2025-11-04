// all check
function Allchecked() {
  const Boxs = document.querySelectorAll(".quote-prd-list .list-area .basic-list-wrap");
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

// bulk discount popup 선택한 option에 따른 input 노출
function bulkSelectOptCont() {
  const opts = document.querySelectorAll(".bulk-discount .discount .combo-box__menu-list li");
  opts.forEach((opt, i) => {
    const product = document.querySelector(".bulk-discount .opt-product-discount");
    const amount = document.querySelector(".bulk-discount .opt-amount-discount");
    opt.addEventListener("click", () => {
      if (i === 0) {
        product.style.display = "flex";
        amount.style.display = "none";
      } else {
        product.style.display = "none";
        amount.style.display = "block";
      }
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
function QuoteisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function quoteHandleClick(className) {
  const parent = this.closest(`.${className}`);
  parent.classList.toggle("mo-active");
}

//  title More Btn
function quoteMoreOpen(enable) {
  const moreBtn = document.querySelector(".quote-detail > .tit-area .tit__right .icon-more");
  if (!moreBtn) return; 

  if (enable) {
    moreBtn.addEventListener("click", handleMoreClick);
  } else {
    moreBtn.removeEventListener("click", handleMoreClick);
  }
}
function handleMoreClick() {
  quoteHandleClick.call(this, "tit__right");
}

//  info folded
function activeFolded(enable) {
  const btnFolded = document.querySelector(".quote-detail-info .icon-folded");
  if (!btnFolded) return; 

  if (enable) {
    btnFolded.addEventListener("click", handleFoldedClick);
  } else {
    btnFolded.removeEventListener("click", handleFoldedClick);
  }
}
function handleFoldedClick() {
  quoteHandleClick.call(this, "quote-detail-info");
}

// quote btn combo box
function quoteComboBoxOpen(enable) {
  const quoteBtn = document.querySelector(".quote-btn-box .quote-btn__placeholder");
  if (!quoteBtn) return; 

  if (enable) {
    quoteBtn.addEventListener("click", handleComboClick);
  } else {
    quoteBtn.removeEventListener("click", handleComboClick);
  }
}
function handleComboClick() {
  quoteHandleClick.call(this, "quote-btn-box");
}

// product list  add combo box
function quoteAddBoxOpen(enable) {
  const addBtn = document.querySelector(".add-btn-box .add-btn__placeholder");
  if (!addBtn) return; 

  if (enable) {
    addBtn.addEventListener("click", handleAddBoxClick);
  } else {
    addBtn.removeEventListener("click", handleAddBoxClick);
  }
}
function handleAddBoxClick() {
  quoteHandleClick.call(this, "add-btn-box");
}


// PC, MO
function quoteEvent() {
  Allchecked();
  bulkSelectOptCont();
  excelFileUpload();
}

// MO
function moOnlyEvent() {
  const currentIsMobile = QuoteisMobile();

  if (isMobile !== currentIsMobile) {
    isMobile = currentIsMobile;
    quoteMoreOpen(isMobile);
    activeFolded(isMobile);
    quoteComboBoxOpen(isMobile);
    quoteAddBoxOpen(isMobile);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  quoteEvent();
  moOnlyEvent();
});
window.addEventListener("resize", moOnlyEvent);
