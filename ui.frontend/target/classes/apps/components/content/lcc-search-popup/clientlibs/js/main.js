// common All check
function allCheckedEvent(){
    const checkTable =document.querySelectorAll('.lcc-unit-detail-table')
    checkTable.forEach(table => {
        const AllCeck = table.querySelector('.unit-detail__head .unit-check .btn-checkbox input[value="all"]');
        const check = table.querySelectorAll ('.unit-detail__body .unit-check .btn-checkbox input');

        AllCeck.addEventListener('change', () => {
            check.forEach(checkbox => {
                checkbox.checked = AllCeck.checked;
            });
        });

        check.forEach(el => {
            el.addEventListener('change', () => {   
                const allChecked = Array.from(check).every(cb => cb.checked);
                AllCeck.checked = allChecked;
            });
        });
    })
}

function LccisMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}
function LccShEvent(enable) {
    const quoteItems = document.querySelectorAll('.lcc-quote-list .lcc-quote__item')
    const $prjOpen = document.querySelector('.lccp-prj-pop .prj__search .icon-mo-folded')
    const $prjResult = document.querySelectorAll('.lcc-quote__item .view-prd-btn')
    const $PrjResultClose = document.querySelector('.lccp-prj-pop .lcc-sh__result-el.right .icon-mo-back')
    const $prdOpen = document.querySelectorAll('.prd__search')
    const $prdResult = document.querySelector('.lccp-prd-pop .mo-view-btn .btn-block')      
    if (enable) {
        quoteItems.forEach(item => { 
            const viewBtn = item.querySelector('.view-prd-btn')
            viewBtn.removeEventListener('click', () => quoteSelect(item, quoteItems));
        });
        $prjOpen.addEventListener('click', LccPrjOpenHandle);
        $prjResult.forEach(Btn => { 
            Btn.addEventListener('click', LccPrjResultHandle);
        });
        $PrjResultClose.addEventListener('click', LccPrjResultCloseHandle);
        $prdOpen.forEach(Btn => { 
            const searchClose = Btn.querySelector('.mo-prd-sh-box .mo-prd-sh__close')
            const searchBtn = Btn.querySelector('.mo-prd-search > .btn-block')

            searchBtn.addEventListener('click', () => LccPrdOpenHandle(Btn));
            searchClose.addEventListener('click', () => LccPrdCloseHandle(Btn));
        });
        $prdResult.addEventListener('click', LccPrdResultHandle);

    } else {
        quoteItems.forEach(item => { 
            const viewBtn = item.querySelector('.view-prd-btn')
            viewBtn.addEventListener('click', () => quoteSelect(item, quoteItems));
        });
        $prjOpen.removeEventListener('click', LccPrjOpenHandle);
        $prjResult.forEach(Btn => { 
            Btn.removeEventListener('click', LccPrjResultHandle);
        });
        $PrjResultClose.removeEventListener('click', LccPrjResultCloseHandle);
        $prdOpen.forEach(Btn => { 
            const searchClose = Btn.querySelector('.mo-prd-sh-box .mo-prd-sh__close')
            const searchBtn = Btn.querySelector('.mo-prd-search > .btn-block')

            searchBtn.removeEventListener('click', () => LccPrdOpenHandle(Btn));
            searchClose.removeEventListener('click', () => LccPrdCloseHandle(Btn));
        });
        $prdResult.removeEventListener('click', LccPrdResultHandle);

    }
}

// Pc 
function quoteSelect(item, quoteItems) {
    quoteItems.forEach(quoteItem => {
        quoteItem.classList.remove('selected');
    });
    item.classList.add('selected');
}

// mobile
function LccPrjOpenHandle(){
    const parent = this.closest('.prj__search')
    parent.classList.toggle('mo-active')
}
function LccPrjResultHandle(){
    const parent = this.closest('.lcc-sh__result')
    parent.classList.add('open-detail')
    const items = document.querySelectorAll('.lcc-quote-list .lcc-quote__item')
    items.forEach(item => {
        item.classList.remove('selected');
    });
    const parent2 = this.closest('.lcc-quote__item')
    parent2.classList.add('selected');
};
function LccPrjResultCloseHandle(){
    const parent = this.closest('.lcc-sh__result')
    parent.classList.remove('open-detail')
}
function LccPrdOpenHandle(Btn) {
    Btn.classList.add('mo-active')
}
function LccPrdCloseHandle(Btn) {
    Btn.classList.remove('mo-active')
}
function LccPrdResultHandle(){
    const parent = this.closest('.lcc-sh__result-el.right')
    parent.classList.toggle('open-detail')
}

function LccShDeviceChange() {
    LccShEvent(LccisMobile());
}
document.addEventListener('DOMContentLoaded', () => {
    LccShDeviceChange();
    allCheckedEvent()
});
window.addEventListener('resize', LccShDeviceChange);