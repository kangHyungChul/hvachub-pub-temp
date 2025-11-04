function FavisMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}
function FavSearchOpen(enable) {
    const $Btns = document.querySelectorAll('.icon-mo-folded');
    $Btns.forEach(btn => {     
        const clickHandler = FavhandleClick.bind(null, btn)
        if(btn._clickHandler) {
            btn.removeEventListener('click', btn._clickHandler)
        }
        if(enable) {
            btn.addEventListener('click', clickHandler)
            btn._clickHandler = clickHandler
        }
    });
}
function FavhandleClick(btn) {
    const parent = btn.closest('.fav-field-box')
    parent.classList.toggle('mo-active');
}
function FavDeviceChange() {
    FavSearchOpen(FavisMobile());
}
function FavInitialize() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    FavDeviceChange();
    mediaQuery.addEventListener('change', FavDeviceChange);
    document.addEventListener('DOMContentLoaded', FavDeviceChange);
    window.addEventListener('resize', FavDeviceChange);
}
FavInitialize()