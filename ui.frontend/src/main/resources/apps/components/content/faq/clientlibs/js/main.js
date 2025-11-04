const faqComponent = (function () {

  const faqTabTitMargin = function() {
    const { faqFirstTabSwiper } = window.hvachubFunc.setTabList('.faq .tab-list-box', () => {}, 
    { 
        spaceBetween: 0,
        breakpoints: {
            769: {
                spaceBetween: 0,
            },
          },
    });
  }
  

  const bind = function () {
    faqTabTitMargin();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
  };
})();

$(document).ready(function () {
  faqComponent.init();
});