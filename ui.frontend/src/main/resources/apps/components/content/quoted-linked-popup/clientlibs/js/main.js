const quotedLinkedPop = (function () {
  const $popup = $(".quote-linked-popup .popup-wrap__inner");
  const $popupHeader = $(".quote-linked-popup .popup__header");
  const $popupFooter = $(".quote-linked-popup .popup__footer");
  const $popupContainer = $(".quote-linked-popup .popup__container");
  const $tabList = $(".tab-list .tab-list__tab");
  const $lastTabList = $(".tab-list .tab-list__tab:last-of-type");
  const $searchlist = $('.after-search .list-data .list__el')
  const $complete = $(".select-proj-complete");
  const $searchOpenBtn = $(".search-open-btn");
  const $searchBar = $(".quote-linked-popup .search-bar");

  //content 내용에 따른 popup footer show/hide 이벤트
  const displayPopFooter = function () {
    $tabList.on("click", function () {
      footerChange()
    });
  };
  const listClick = function () {
    $(document).on("click", '.after-search .list-data .list__el',  function () {
      console.log('list click')
      $(this).closest('.after-search').removeClass('active')
      $complete.addClass('active')
      footerChange()
    });
  };
  function footerChange(){
    $popupFooter.css("display", 
      ($lastTabList.hasClass("active") && ! $complete.hasClass("active")) ? "none" : "flex"
    );
    adjustContainerHeight();
  }
  function adjustContainerHeight() {
    const headerHeight = $popupHeader.outerHeight();
    const footerHeight = $popupFooter.css('display') === 'flex' ? $popupFooter.outerHeight() : 0;
    const contentHeight = $popup.height();
    const totalHeight = contentHeight - headerHeight - footerHeight ;
    $popupContainer.css('height', totalHeight );
  }


  //quote linked 팝업 search 영역 accordion 이벤트
  const quoteLinkedSearch = function () {
    $searchOpenBtn.on("click", function () {
      $searchBar.toggleClass("active");
    });
  };

  const bind = function () {
    displayPopFooter();

    quoteLinkedSearch();
    listClick();
  };

  const init = function () {
    bind();
  };

  return {
    init: init,
    displayPopFooter: displayPopFooter,
  };
})();

$(document).ready(function () {
  $(window).resize(function () {
    quotedLinkedPop.displayPopFooter();
  });
  quotedLinkedPop.init();
});
