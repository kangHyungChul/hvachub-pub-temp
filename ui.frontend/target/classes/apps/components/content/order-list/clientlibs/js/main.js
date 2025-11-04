// 모바일 이벤트
function OrderisMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}
function OthersMoSearchOpen(enable) {
    const $Btn = document.querySelector('.ord-list-search .icon-mo-folded ')    
    const active = enable ? 'addEventListener' : 'removeEventListener';
    $Btn[active]('click', OrderhandleClick);
}
function OrderhandleClick() {
    const parent = this.closest('.ord-list-search')
    parent.classList.toggle('mo-active');
}
function OthersDeviceChange() {
    OthersMoSearchOpen(OrderisMobile());
   
}
document.addEventListener('DOMContentLoaded', OthersDeviceChange);
window.addEventListener('resize', OthersDeviceChange);