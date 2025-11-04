$(document).ready(function() {

    //상단 combo box button click
    $(document).on("click", ".tab-wrap.combo .mo-tab-list__tab", function() {     
      if($(this).parent().hasClass("active")) {
        $(this).parent().removeClass("active");
      } else {
        $(this).parent().addClass("active");
      }
    });

    
    $(document).on("click", ".tab-wrap.combo .tab-list .tab-list__tab", function() { 
      const tabTxt = $(this).children().text();    
      $('.mo-tab-list__tab .tab-list__tab-txt').text('');
      $('.mo-tab-list__tab .tab-list__tab-txt').text(tabTxt);      
      $(this).parent().parent().removeClass('active');       
    });

 
});