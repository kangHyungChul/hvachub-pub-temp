// All check table
checkAll()
function checkAll() {
  const checkList = document.querySelector(".quote-list-box .quote-list");
  const allcheck = checkList.querySelector('.list-head .btn-checkbox input');
  const check = checkList.querySelectorAll(".list-body .btn-checkbox input");

  allcheck.addEventListener("change", () => {
    check.forEach((checkbox) => {
      checkbox.checked = allcheck.checked;
    });
  });
  check.forEach((el) => {
    el.addEventListener("change", () => {
      const allChecked = Array.from(check).every((cb) => cb.checked);
      allcheck.checked = allChecked;
    });
  });
}