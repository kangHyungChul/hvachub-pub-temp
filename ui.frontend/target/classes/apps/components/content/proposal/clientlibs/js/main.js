// all check
function proposalAllchecked() {
  const Box = document.querySelector(".proposal-prd-list .others-list-wrap");
  const AllCheck = Box.querySelector(".list-head .el-checkbox .btn-checkbox input");
  const check = Box.querySelectorAll(".list-body .list-row .el-checkbox .btn-checkbox input");
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
}

// add offering all check
function addOfferingAllchecked() {
  const Boxs = document.querySelectorAll(".add-offering .basic-list__result");
  Boxs.forEach((box) => {
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

// bulk margin popup 선택한 option에 따른 input 노출
function bulkSelectOptCont() {
  const opts = document.querySelectorAll(".bulk-margin .margin .combo-box__menu-list li");
  opts.forEach((opt, i) => {
    const product = document.querySelector(".bulk-margin .opt-product-margin");
    const amount = document.querySelector(".bulk-margin .opt-amount-margin");
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

// 모바일 이벤트
let isMobile = false;
function proposalisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function proposalhandleClick(className) {
  const parent = this.closest(`.${className}`);
  parent.classList.toggle("mo-active")
}

// title More Btn
function proposalMoreOpen(enable) {
  const moreBtn = document.querySelector(".proposal-sect .tit-area-box .tit__right .icon-more");
  if (!moreBtn) return; 

  if (enable) {
    moreBtn.addEventListener("click", handleProposalMoreClick);
  } else {
    moreBtn.removeEventListener("click", handleProposalMoreClick);
  }
}
function handleProposalMoreClick() {
  proposalhandleClick.call(this, "tit__right");
}

// info folded
function proposalFolded(enable) {
  const foldedBtn = document.querySelector(".proposal-detail-info .icon-folded");
  if (!foldedBtn) return; 

  if (enable) {
    foldedBtn.addEventListener("click", handleProposalFoldedClick);
  } else {
    foldedBtn.removeEventListener("click", handleProposalFoldedClick);
  }
}
function handleProposalFoldedClick() {
  proposalhandleClick.call(this, "proposal-detail-info");
}

// proposal setting
function settingAcc(enable) {
  const accBtn = document.querySelectorAll(".proposal-setting .mo-acc-box .txt-sub-tit");
  if (accBtn.length === 0) return; 

  accBtn.forEach((btn) => {
    if (enable) {
      btn.addEventListener("click", handleSettingAccClick);
    } else {
      btn.removeEventListener("click", handleSettingAccClick);
    }
  });
}
function handleSettingAccClick() {
  proposalhandleClick.call(this, "mo-acc-box");
}


// PC, MO
function proposalEvent() {
  proposalAllchecked();
  bulkSelectOptCont();
  addOfferingAllchecked();
}

// MO
function proposalMo() {
  const currentIsMobile = proposalisMobile();
  
  if (isMobile !== currentIsMobile) { 
    isMobile = currentIsMobile;

    proposalMoreOpen(isMobile);
    proposalFolded(isMobile);
    settingAcc(isMobile);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  proposalEvent();
  proposalMo();
});
window.addEventListener("resize", proposalMo);








