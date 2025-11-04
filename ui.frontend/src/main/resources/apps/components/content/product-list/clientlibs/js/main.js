function heightChange(){
    const prdListFlag = document.querySelectorAll('.product-list__result .pdp-product-list .pdp-product__tit .flag-area')
    let maxHeight = 0;

    prdListFlag.forEach(flag => {
        const boxHeight = flag.offsetHeight;
        if (boxHeight > maxHeight) {
            maxHeight = boxHeight;
        }
    });
    prdListFlag.forEach(flag => {
        if (window.innerWidth >= 1440) {
            flag.style.height = maxHeight + 'px'
        } else if (window.innerWidth > 768 && window.innerWidth <= 1440 ) {
            const viewportWidth = window.innerWidth;
            const maxHeightVw = (maxHeight / viewportWidth) * 100;
            flag.style.height = maxHeightVw + 'vw'
        } else {
            flag.style.height = 'auto'
        }
    }) ;
}

function DeviceChange() {
    heightChange();
}
document.addEventListener('DOMContentLoaded', DeviceChange);
window.addEventListener('resize', DeviceChange);