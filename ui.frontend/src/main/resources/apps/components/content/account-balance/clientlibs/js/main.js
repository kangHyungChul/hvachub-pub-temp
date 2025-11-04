// 모바일 이벤트
// function accisMobile() {
//     return window.matchMedia("(max-width: 768px)").matches;
// }

// function updateContentHeight(parent) {
//     const content = parent.querySelector('.content-box');
//     if (content) {
//         parent.style.height = content.offsetHeight + 48 + 'px';
//     }
// }

// function toggleRadioEvents(enable) {
//     const radios = document.querySelectorAll('.acc-search__item > .btn-radio .btn-radio__input');
//     radios.forEach(radio => {
//         const active = enable ? 'addEventListener' : 'removeEventListener';
//         radio[active]('change', radioEvent);
//         if (radio.checked) {
//             const parent = radio.closest('.acc-search__item');
//             if (accisMobile()) {
//                 parent.classList.add('is-checked');
//                 updateContentHeight(parent);
//             } else {
//                 parent.style.height = '';
//             } 
//         }
//     });
// }

// function radioEvent() {
//     const $parent = this.closest('.acc-search__item');
//     document.querySelectorAll('.acc-search__item').forEach(parent => {
//         parent.classList.remove('is-checked');
//         parent.style.height = '';
//     });
//     $parent.classList.add('is-checked');  
//     if (accisMobile()) updateContentHeight($parent);
// }

// function accDeviceChange() {
//     toggleRadioEvents(accisMobile());
// }
// document.addEventListener('DOMContentLoaded', () => {
//     accDeviceChange();
// });
// window.addEventListener('resize', accDeviceChange);