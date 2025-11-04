// 모바일 이벤트
function InvisMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}
function InvMoSearchOpen(enable) {
    const $Btn = document.querySelector('.ord-list-search .icon-mo-folded')    
    const active = enable ? 'addEventListener' : 'removeEventListener';
    $Btn[active]('click', InvhandleClick);
}
function InvhandleClick() {
    const parent = this.closest('.ord-list-search')
    parent.classList.toggle('mo-active');
}
function InvDeviceChange() {
    InvMoSearchOpen(InvisMobile());
}
document.addEventListener('DOMContentLoaded', InvDeviceChange);
window.addEventListener('resize', InvDeviceChange);