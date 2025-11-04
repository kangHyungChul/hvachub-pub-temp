function CountryMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}
function CountryOpen(enable) {
    const $Boxs = document.querySelectorAll('.select-country-box');
    $Boxs.forEach( Box => {   
        const country = Box.querySelector('.country-name')    
        const clickHandler = CountryHandle.bind(null,Box)
        if(Box._clickHandler) {
            country.removeEventListener('click', Box._clickHandler)
        }
        if(enable){
            country.addEventListener('click',clickHandler)
            Box._clickHandler = clickHandler
        }
    });
}
function CountryHandle(Box) {
    Box.classList.toggle('active');
}
function CountryDeviceChange() {
    CountryOpen(CountryMobile());
}
function CountryInitialize() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    CountryDeviceChange();
    mediaQuery.addEventListener('change', CountryDeviceChange);
    window.addEventListener('resize', CountryDeviceChange);
    document.addEventListener('DOMContentLoaded', CountryDeviceChange);
    
}
CountryInitialize()