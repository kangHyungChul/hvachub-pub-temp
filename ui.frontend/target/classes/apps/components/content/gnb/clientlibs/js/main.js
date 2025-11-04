document.addEventListener("DOMContentLoaded", function() {
  GnbDeviceChange();
});
window.addEventListener("resize", function() {
  GnbDeviceChange();
});

function GnbDeviceChange() {
  if (window.innerWidth <= 768) {
    moNavOpen();
    GnbMoMenuClick();
  } else {
    pcGnbEvent();
    userMouse();
  }
}

// Cart
const carBox = document.querySelector(".mycart-box");
if (carBox) {
  const cartNumBox = document.querySelector(".mycart-box .mycart-box__count");
  const cartNum = document.querySelector(
    ".mycart-box .mycart-box__count > span"
  );
  const threshold = 1000;

  if (parseInt(cartNum.textContent, 10) >= threshold) {
    let number = parseInt(cartNum.textContent, 10);
    let textContent = (number - 1).toString();
    cartNum.textContent = textContent;
    cartNumBox.classList.add("expand");
  }
}

// PC gnb
function pcGnbEvent() {
  const $header = document.querySelector(".header-wrap");
  const $oneDepths = document.querySelectorAll(".gnb-box .gnb-1depth");

  $oneDepths.forEach(dep => {
    const $depTit = dep.querySelector(".gnb-1depth__tit");
    const $content = dep.querySelector(".gnb-2depth-wrap");

    if ($content) {
      $depTit.addEventListener("focus", () => toggleUserCont($depTit, dep));
      $depTit.addEventListener("blur", event =>
        closeUserCont($depTit, dep, event)
      );
      dep.addEventListener("keydown", event =>
        closeUserOnEscape($depTit, dep, event)
      );
      dep.addEventListener("focusout", event =>
        closeUserOnFocusOut($depTit, dep, event)
      );

      // 이벤트 핸들러 등록
      dep.addEventListener("mouseenter", () => {
        dep.classList.add("active");
      });
      dep.addEventListener("mouseleave", () => {
        dep.classList.remove("active");
      });

      // 1depth class 감지
      let observer = new MutationObserver(mutations => {
        if (dep.classList.contains("active")) {
          $header.classList.add("active");
        } else {
          $header.classList.remove("active");
        }
      });
      let option = {
        attributes: true,
        childList: true,
        characterData: true
      };
      observer.observe(dep, option);
    }
  });
}

// Pc User
function userMouse() {
  const $userBox = document.querySelector(".user-info-box");
  const $userBtn = $userBox.querySelector(".btn-icon.icon-user");
  // const $userCont = document.querySelector('.user-info-box > .user-info__inner');

  $userBtn.addEventListener("focus", () => toggleUserCont($userBtn, $userBox));
  $userBtn.addEventListener("blur", event =>
    closeUserCont($userBtn, $userBox, event)
  );
  $userBox.addEventListener("keydown", event =>
    closeUserOnEscape($userBtn, $userBox, event)
  );
  $userBox.addEventListener("focusout", event =>
    closeUserOnFocusOut($userBtn, $userBox, event)
  );
  $userBox.addEventListener("mouseenter", () => {
    $userBox.classList.add("active");
  });
  $userBox.addEventListener("mouseleave", () => {
    $userBox.classList.remove("active");
  });
}

// common
function toggleUserCont(tfBtn, tfBox) {
  tfBtn.setAttribute("aria-expanded", "true");
  tfBox.classList.add("active");
}
function closeUserCont(tfBtn, tfBox, event) {
  const relatedTarget = event.relatedTarget;
  if (!tfBox.contains(relatedTarget)) {
    tfBtn.setAttribute("aria-expanded", "false");
    tfBox.classList.remove("active");
  }
}
function closeUserOnFocusOut(tfBtn, tfBox, event) {
  const relatedTarget = event.relatedTarget;
  if (!tfBox.contains(relatedTarget)) {
    closeUserCont(tfBtn, tfBox, event);
  }
}
function closeUserOnEscape(tfBtn, tfBox, event) {
  if (event.key === "Escape") {
    closeUserCont(tfBtn, tfBox, event);
    tfBtn.focus();
  }
}

// Mo nave open
function moNavOpen() {
  const moHamBtn = document.querySelector(".utility-menu-box .icon-hamburger");
  const moNav = document.querySelector(".header-box .header-gnb");
  const moNavClose = moNav.querySelectorAll(".icon-mo-nav-close");
  moHamBtn.addEventListener("click", () => {
    moNav.classList.add("block");
    document.documentElement.classList.add("layer-open");
  });
  moNavClose.forEach(Close => {
    Close.addEventListener("click", () => {
      moNav.classList.remove("block");
      document.documentElement.classList.remove("layer-open");
      Close.closest(".gnb-1depth").classList.remove("mo-active");
      const openDepths = moNav.querySelectorAll(".gnb-2depth");
      openDepths.forEach(openDep => {
        openDep.classList.remove("is-selected");
      });
    });
  });
}

// Mo 1depth Click / 2depth close
function GnbMoMenuClick() {
  const $oneDepths = document.querySelectorAll(".gnb-box .gnb-1depth");
  $oneDepths.forEach(dep => {
    const $depTit = dep.querySelector(".gnb-1depth__tit");
    const $content = dep.querySelector(".gnb-2depth-wrap");
    const $depCloseBtn = dep.querySelector(".icon-mo-nav-back");
    if ($content) {
      $depTit.addEventListener("click", () => {
        dep.classList.add("mo-active");
      });
      $depCloseBtn.addEventListener("click", () => {
        dep.classList.remove("mo-active");
      });

      dep.querySelector("a").addEventListener("click", function(event){
        event.preventDefault();
      });
    }
    const $twoDepths = dep.querySelectorAll(".gnb-2depth");
    $twoDepths.forEach(dep2 => {
      const $twoDepthTit = dep2.querySelector(".gnb-2depth__tit");
      const $thirdDepth = dep2.querySelector(".gnb-3depth-box");

      if ($thirdDepth) {
        $twoDepthTit.addEventListener("click", () => {
          dep2.classList.toggle("is-selected");
        });
      }
    });
  });
}
