function swiperEvent() {
  const tsSwiper = document.querySelectorAll(".ts-pop__swiper-box .swiper");
  tsSwiper.forEach((swiperItem) => {
    const a11yOptions0 = getA11yOptions(swiperItem);
    new Swiper(swiperItem, {
      loop : true,
      navigation: {
        nextEl: [swiperItem.querySelector(".swiper-button-next"), swiperItem.querySelector(".swiper-pagination-button-next")],
        prevEl: [swiperItem.querySelector(".swiper-button-prev"), swiperItem.querySelector(".swiper-pagination-button-prev")],
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      a11y: {
        enabled: true,
        prevSlideMessage: a11yOptions0.prevSlideMessage,
        nextSlideMessage: a11yOptions0.nextSlideMessage,
      },
    });
  });
}
document.addEventListener("DOMContentLoaded", swiperEvent);