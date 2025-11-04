document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".accordion__tit");

  headers.forEach(header => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const isActive = item.classList.contains("active");     

      // 모든 항목 닫기
      document.querySelectorAll(".accordion-box .btn-icon").forEach(i => {      
        console.log(i.parentElement.parentElement.classList.remove("active"));      
        // i.parentElement.classList.remove("active");
      });

      // 클릭한 항목 열기 (단, 이미 열려있으면 다시 닫지 않음)
      if (isActive) {
        item.classList.add("active");
      }
    });
  });
});