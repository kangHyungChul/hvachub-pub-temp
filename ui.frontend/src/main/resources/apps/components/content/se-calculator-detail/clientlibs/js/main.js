function SeisMobile() {
   return window.matchMedia("(max-width: 768px)").matches;
}
function moBtnShow(enable){
   const moResultClose = document.querySelectorAll('.result-head .icon-close') 
   if (enable){
      moResultClose.forEach(function(close){
         close.addEventListener('click', function(){
            close.closest('.result-area').classList.remove('active')
            
            const btnPdf = document.querySelector('.detail-header .pdf-btn')
            const btnSave = document.querySelector('.detail-header .save-calc-btn')
            const btnView = document.querySelector('.detail-header .view-result-btn')
            
            if ( btnPdf.style.display === 'flex') {
               btnPdf.style.display = 'none'
               btnSave.style.display = 'flex'
               btnView.style.display = 'flex'
            } else {
               btnPdf.style.display = 'flex'
               btnSave.style.display = 'none'
               btnView.style.display = 'none'
            }
         })
      })
   }
}
function SedDeviceChange() {
   moBtnShow(SeisMobile());
}
document.addEventListener('DOMContentLoaded',SedDeviceChange);
window.addEventListener('resize', SedDeviceChange);