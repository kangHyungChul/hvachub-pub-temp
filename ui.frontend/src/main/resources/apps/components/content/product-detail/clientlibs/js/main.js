document.addEventListener("DOMContentLoaded", function () {
  const spyLinks = document.querySelectorAll(".pdp-nav-swiper .pdp-nav .pdp-nav__tit a");
  const spySects = document.querySelectorAll(".product-detail-sect > section.sec-pdp-box__sec");
  const sticky = document.querySelector(".product-detail-sect > .sticky-area");
  const CmHeader = document.querySelector("#wrap .header-wrap");
  const breadcrumb = document.querySelector("#wrap .breadcrumb"); 
  const buttonRect = document.querySelector(".sec-product-box__detail > .btn-box .btn-block");   
  const titButton = document.querySelector(".pdp-tit-box > .sec-pdp-box__sec .btn-box");
  const rect = buttonRect.getBoundingClientRect();  
  const docY = rect.top  + window.pageYOffset; //buttonRect 버튼 위치 계산


  let swiperInstance; // Swiper 전역 선언
  let isMobile = window.innerWidth < 768;

  function initializeSwiper() {
    if (isMobile && !swiperInstance) {
      const PdpNavSwiper = document.querySelector(".pdp-nav-swiper");
      const a11yOptions0 = getA11yOptions(PdpNavSwiper);
      swiperInstance = new Swiper(PdpNavSwiper, {
        slidesPerView: "auto",
        spaceBetween: 24,
        freeMode: true,
        freeModeMomentum: false,
        navigation: {
          nextEl: PdpNavSwiper.querySelector(".pdp-nav__next"),
          prevEl: PdpNavSwiper.querySelector(".pdp-nav__prev"),
        },
        a11y: {
          enabled: true,
          prevSlideMessage: a11yOptions0.prevSlideMessage,
          nextSlideMessage: a11yOptions0.nextSlideMessage,
        },
      });
    }
  }

  // Swiper 제거
  function destroySwiper() {
    if (swiperInstance) {
      swiperInstance.destroy();
      swiperInstance = null;
    }
  }

  // 리사이즈 처리
  function handleResize() {
    const currentIsMobile = window.innerWidth < 768;

    if (currentIsMobile !== isMobile) {
      isMobile = currentIsMobile;

      if (isMobile) {
        initializeSwiper();
      } else {
        destroySwiper();
      }
    }
  }

  window.addEventListener("resize", handleResize);
  initializeSwiper();

  const button = document.querySelector(".product-detail-sect .pdp-tit-box .sec-pdp-box__sec .btn-box");

  window.addEventListener("scroll", function () {    
    let currentSec = "";
    spySects.forEach((Sec) => {
      const sectTop = Sec.offsetTop;
      const offsetSticky = sticky.offsetHeight;

      if (pageYOffset >= sectTop - offsetSticky) {
        currentSec = Sec.getAttribute("id");
      }
    });

    // 페이지 맨 아래에 도달했을 때 
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      const lastSect = spySects[spySects.length - 1];
      currentSec = lastSect.getAttribute("id");
    }

    spyLinks.forEach((link) => {
      const linkPr = link.closest(".pdp-nav__tit");
      linkPr.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSec) {
        linkPr.classList.add("active");
        scrollSwiperToLink(link);
      }
    });      

    if (window.pageYOffset >= docY ) {  
      titButton.classList.add('visible');      
    } else { 
      titButton.classList.remove('visible');   
    }
  });



  spyLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSect = document.getElementById(targetId);
      const elPosition = targetSect.offsetTop;
      const offsetSticky = sticky.offsetHeight;
      const offPosition = elPosition - offsetSticky;

      window.scrollTo({
        top: offPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        scrollSwiperToLink(this);
      }, 500);
    });
  });

  function scrollSwiperToLink(link) {
    if (swiperInstance) {
      const sectionId = link.getAttribute("href").substring(1);
      const slide = Array.from(swiperInstance.slides).find((slide) => slide.querySelector("a").getAttribute("href").substring(1) === sectionId);

      if (slide) {
        const slideIndex = swiperInstance.slides.indexOf(slide);
        if (slideIndex !== -1) {
          swiperInstance.slideTo(slideIndex, 300, false);
        }
      }
    }
  }
});
