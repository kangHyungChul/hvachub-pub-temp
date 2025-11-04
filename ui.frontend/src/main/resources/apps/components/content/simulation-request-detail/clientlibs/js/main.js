function ellipsis() {
  const fileElements = document.querySelectorAll(".simulation-request-detail .txt-file-name");
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

function boxheight() {
  const boxH = document.querySelector(".subject-info-list .list-item .desc-box");
  const child = boxH.querySelector(".txt-p4 ");
  if (child.offsetHeight > boxH.offsetHeight) {
    boxH.classList.add("view");
  }

  const btn = document.querySelector(".subject-info-list .list-item .desc-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      btn.closest('.el-cont').classList.toggle('show')
    });
  }
}

// 251023 추가
function tableMore() {
  const table = document.querySelector(".subject-info-list .list-item .table-box");
  const more = document.querySelector(".subject-info-list .list-item .table-btn");
  if (more) {
    more.addEventListener("click", () => {
      table.closest('.el-cont').classList.toggle('show')
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ellipsis();
  boxheight();
  tableMore();
});
