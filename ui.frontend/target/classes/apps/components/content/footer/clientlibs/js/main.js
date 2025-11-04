function setParentHeight() {
  const parent = document.querySelector(".footer-wrap .footer-sitemap__inner");

  if (parent) {
    const children = parent.querySelectorAll(".sitemap__item");
    let maxHeight = Math.max(...Array.from(children, (child) => child.offsetHeight));
    children?.forEach((child) => {
      const childHeight = child.offsetHeight;
      if (childHeight > maxHeight) {
        maxHeight = childHeight;
      }
    });
    heightCalculate(parent, maxHeight);
  }
}
function heightCalculate(element, maxHeight) {
  const viewtW = window.innerWidth;
  if (window.innerWidth >= 1440) {
    element.style.height = `${maxHeight}px`;
  } else if (window.innerWidth > 768 && window.innerWidth <= 1440) {
    const viewportWidth = window.innerWidth;
    const WdithVw = (maxHeight / viewportWidth) * 100;
    element.style.height = `${WdithVw}vw`;
  } else {
    element.style.height = "auto";
  }
}

let WindowWidthResize = window.innerWidth;
function handleWindowSizeChangeFooter() {
  const windowWidth = window.innerWidth;

  // 브레이크포인트가 변경된 경우 기존 height 삭제
  if (windowWidth !== WindowWidthResize) {
    WindowWidthResize = windowWidth;
    const parent = document.querySelector(".footer-wrap .footer-sitemap__inner");
    if (parent) {
      const children = parent.querySelectorAll(".sitemap__item");
      parent.style.removeProperty("height");
    }
  }
}

// 모바일
function FooterMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function FooterOpen(enable) {
  const $items = document.querySelectorAll(".footer-sitemap__inner .sitemap__item");
  $items?.forEach((item) => {
    const menu = item.querySelector(".sitemap-tit");
    const isLock = menu.classList.contains("is-lock");
    const hasChild = item.querySelector(".sitemap__item-inner");

    if (hasChild && !isLock) {
      const menuClickHandler = FooterHandle.bind(null, item);
      const linkClickHandler = (event) => {
        event.preventDefault();
      };
      if (item._menuClickHandler) {
        menu.removeEventListener("click", item._menuClickHandler);
      }
      if (item._linkClickHandler) {
        item.querySelector("a").removeEventListener("click", item._linkClickHandler);
      }

      if (enable) {
        menu.addEventListener("click", menuClickHandler);
        item.querySelector("a").addEventListener("click", linkClickHandler);
        item._menuClickHandler = menuClickHandler;
        item._linkClickHandler = linkClickHandler;
      }
    }
  });
}
function FooterHandle(item) {
  item.classList.toggle("m-active");
}
function FooterDeviceChange() {
  FooterOpen(FooterMobile());
  setParentHeight();
}
function FooterInitialize() {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  FooterDeviceChange();
  mediaQuery.addEventListener("change", FooterDeviceChange);
  window.addEventListener("resize", FooterDeviceChange);
  document.addEventListener("DOMContentLoaded", FooterDeviceChange);
}

document.addEventListener("DOMContentLoaded", FooterInitialize);
window.addEventListener("resize", () => {
  FooterInitialize();
  handleWindowSizeChangeFooter();
});

// scroll top btn
const scrollTopBtn = document.getElementById("gotop-btn");
if (scrollTopBtn) {
  function scrollFunction() {
    window.requestAnimationFrame(() => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    });
  }
  window.addEventListener("scroll", scrollFunction);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
