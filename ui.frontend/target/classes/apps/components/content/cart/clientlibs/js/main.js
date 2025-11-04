// all check
function cartAllchecked() {
  const Box = document.querySelector(".cart-list-box");
  const AllCheck = Box.querySelector(".cart-list-top .btn-checkbox input");
  const check = Box.querySelectorAll(".cart-list .list-item-inner .el-checkbox .btn-checkbox input");
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

document.addEventListener("DOMContentLoaded", cartAllchecked);