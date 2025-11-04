// 드래그 가로스크롤 
const scrollContainer = document.querySelectorAll('.permission-setting .list-check');
scrollContainer.forEach( scrollC =>{
    let isDown = false;
    let startX;
    let scrollLeft;
    const startDragging = (e) => {
        isDown = true;
        startX = e.pageX - scrollC.offsetLeft;
        scrollLeft = scrollC.scrollLeft;
    };
    const stopDragging = () => { isDown = false; };
    const drag = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollC.offsetLeft;
        scrollC.scrollLeft = scrollLeft - (x - startX) * 3;
    };
    scrollC.addEventListener('mousedown', startDragging);
    scrollC.addEventListener('mouseleave', stopDragging);
    scrollC.addEventListener('mouseup', stopDragging);
    scrollC.addEventListener('mousemove', drag);
})      