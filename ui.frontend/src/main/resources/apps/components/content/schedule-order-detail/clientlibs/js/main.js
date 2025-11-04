// view type
function viewTypeHandler(modebtn) {
  const tableView = document.querySelector(".schedule-cont-box .schedule-cont__table");
  const calendarView = document.querySelector(".schedule-cont-box .schedule-cont__calendar");
  modebtn.addEventListener("click", () => {
    if (modebtn.classList.contains("date-type")) {
      // calendar view
      calendarView.classList.remove("show-display");
      tableView.classList.add("show-display");
      modebtn.classList.remove("date-type");
    } else {
      calendarView.classList.add("show-display");
      tableView.classList.remove("show-display");
      modebtn.classList.add("date-type");
    }
  });
}
function pcViewType() {
  const viewBtn = document.querySelector(".schedule-order-detail .tit-area-box .pc-view-type");
  if (!viewBtn) return;
  viewTypeHandler(viewBtn);
}

// calenda view Datepicker
function calendarDatepicker() {
  const initYearButton = (item) => {
    setTimeout(function () {
      // prev year button
      const buttonPane = $(item).find(".ui-datepicker-prev");
      $("<a>", {
        text: "Prev Year",
        click: function () {
          $.datepicker._adjustDate(item, -1, "Y");
        },
      })
        .addClass("ui-datepicker-prevyear")
        .insertBefore(buttonPane);

      // next year button
      var buttonPaneNext = $(item).find(".ui-datepicker-next");
      $("<a>", {
        text: "Next Year",
        click: function () {
          $.datepicker._adjustDate(item, 1, "Y");
        },
      })
        .addClass("ui-datepicker-nextyear")
        .insertAfter(buttonPaneNext);
    }, 1);
  };
  // datepicker inline
  $("#datepicker-inline").datepicker({
    isRTL: true,
    firstDay: 1,
    beforeShow: initYearButton,
    onChangeMonthYear: (year, month, inst) => {
      initYearButton(inst.input);
    },
  });
  initYearButton("#datepicker-inline");
}

// calenda view List 접고펼치기
function accFoldedEvent() {
  const btnFold = document.querySelector(".calendar-list-data .data__top .icon-folded");
  const items = document.querySelectorAll(".data__result .accordion-box");

  items.forEach((item) => {
    const pElement = item.querySelector(".accordion__tit .icon-accordion");
    pElement.addEventListener("click", updateBtn);
  });
  btnFold.addEventListener("click", function () {
    if (btnFold.classList.contains("folded")) {
      items.forEach((item) => item.classList.remove("active"));
      btnFold.classList.add("folded");
    } else {
      items.forEach((item) => item.classList.add("active"));
      btnFold.classList.remove("folded");
    }
    updateBtn();
  });
  function updateBtn() {
    const allActive = Array.from(items).every((item) => item.classList.contains("active"));
    if (allActive) {
      btnFold.classList.add("folded");
    } else {
      btnFold.classList.remove("folded");
    }
  }
}

// 모바일 이벤트
let isMobile = false;
function scheduleisMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}
function scheduleHandleClick(className) {
  const parent = this.closest(`.${className}`);
  parent.classList.toggle("mo-active");
}

// title More Btn
function ScheduleMoreOpen(enable) {
  const moreBtn = document.querySelector(".schedule-order-detail .tit-area-box .tit__right .icon-more");
  if (!moreBtn) return;

  if (enable) {
    moreBtn.addEventListener("click", handleScheduleMoreClick);
  } else {
    moreBtn.removeEventListener("click", handleScheduleMoreClick);
  }
}
function handleScheduleMoreClick() {
  scheduleHandleClick.call(this, "tit__right");
}

// info folded
function scheduleactiveFolded(enable) {
  const btnFolded = document.querySelectorAll(".fold-info-box .icon-folded");
  if (btnFolded.length === 0) return;

  btnFolded.forEach((btn) => {
    if (enable) {
      btn.addEventListener("click", handleScheduleFoldedClick);
    } else {
      btn.removeEventListener("click", handleScheduleFoldedClick);
    }
  });
}
function handleScheduleFoldedClick() {
  scheduleHandleClick.call(this, "fold-info-box");
}

// Mo view type
function moViewType(enable) {
  const viewBtn = document.querySelector(".schedule-order-detail .tit-area-box .mo-view-type");
  if (!viewBtn) return;

  if (enable) {
    viewTypeHandler(viewBtn);
    viewBtn.addEventListener("click", () => {
      const viewParent = viewBtn.closest(".tit__right");
      viewParent.classList.remove("mo-active");
    });
  }
}

// calendar open
function calendarFolded(enable) {
  const foldedBtn = document.querySelector(".calendar-box .calendar-view .btn-txt");
  if (!foldedBtn) return;

  if (enable) {
    foldedBtn.addEventListener("click", handleCalendarFoldedClick);
  } else {
    foldedBtn.removeEventListener("click", handleCalendarFoldedClick);
  }
}
function handleCalendarFoldedClick() {
  scheduleHandleClick.call(this, "calendar-box");
}

// PC, MO
function scheduleEvent() {
  pcViewType();
  calendarDatepicker();
  accFoldedEvent();
}

// MO
function scheduleMoEvent() {
  const currentIsMobile = scheduleisMobile();

  if (isMobile !== currentIsMobile) {
    isMobile = currentIsMobile;

    ScheduleMoreOpen(isMobile);
    scheduleactiveFolded(isMobile);
    moViewType(isMobile);
    calendarFolded(isMobile);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  scheduleEvent();
  scheduleMoEvent();
});
window.addEventListener("resize", scheduleMoEvent);
