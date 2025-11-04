(() => {
    // programmatically toggle button
    const onToggle = (target, timer = null, setTimer = () => {}, toggleClass = 'on') => {
        const onContents = '.favorite__contents-on';
        const offContents = '.favorite__contents-off';
        const btnClose = 'button.icon-close-xsm';
        const hideDelay = 5000;

        const $target = $(target);
        $target.toggleClass(toggleClass);

        const $onContents = $target.siblings(onContents);
        const $offContents = $target.siblings(offContents);
        const $onContentsClose = $onContents.find(btnClose);
        const $offContentsClose = $offContents.find(btnClose);

        const closeContents = () => {
            if (timer) {
                clearTimeout(timer);
                setTimer(null);
            }
            $offContents.hide();
            $onContents.hide();
            $onContentsClose.off();
            $offContentsClose.off();
        }

        if ($onContents.length > 0 || $offContents.length > 0) {
            if ($target.hasClass(toggleClass)) {
                $offContents.hide();
                $onContents.show();
            } else {
                $onContents.hide();
                $offContents.show();
            }

            if (timer) {
                clearTimeout(timer);
                setTimer(null);
            }
            timer = setTimeout(() => {
                closeContents();
            }, hideDelay);
            setTimer(timer);
        }
        $onContentsClose.on('click', () => {
            closeContents();
        });
        $offContentsClose.on('click', () => {
            closeContents();
        });
    };

  // 클릭 시 특정 클래스 토글
  const setClickToggle = (container = 'button.icon-favorite', toggleClass = 'on') => {
    const $container = $(container);
    const onContents = '.favorite__contents-on';
    const offContents = '.favorite__contents-off';
    const btnClose = 'button.icon-close-xsm';
    const hideDelay = 5000;
    const timers = Array($container.length).fill(null);

    const setToggle = () => {
        $container.each((index, el) => {
            const $el = $(el);

            $el.siblings(onContents).hide();
            $el.siblings(offContents).hide();

            $el.on('click', (e) => {
                const $target = $(e.currentTarget);
                $target.toggleClass(toggleClass);
        
                const $onContents = $target.siblings(onContents);
                const $offContents = $target.siblings(offContents);
                const $onContentsClose = $onContents.find(btnClose);
                const $offContentsClose = $offContents.find(btnClose);
        
                const closeContents = () => {
                    if (timers[index]) {
                        clearTimeout(timers[index]);
                        timers[index] = null;
                    }
                    $offContents.hide();
                    $onContents.hide();
                    $onContentsClose.off();
                    $offContentsClose.off();
                }
        
                if ($onContents.length > 0 || $offContents.length > 0) {
                  if ($target.hasClass(toggleClass)) {
                    $offContents.hide();
                    $onContents.show();
                  } else {
                    $onContents.hide();
                    $offContents.show();
                  }
        
                  if (timers[index]) {
                    clearTimeout(timers[index]);
                    timers[index] = null;
                  }
                  timers[index] = setTimeout(() => {
                    closeContents();
                  }, hideDelay);
                }
                $onContentsClose.on('click', () => {
                    closeContents();
                });
                $offContentsClose.on('click', () => {
                    closeContents();
                });
            });
        });
    }
  
    const setInit = () => {
      setToggle();
    }
  
    setInit();
  }

  const setSearchInputDelete = () => {
    const inputSearchBox = '.input-box.input-search';
    const inputSearchBoxInput = 'input.input-box__input';
    const inputSearchBoxSearchDelete = 'button.icon-search-delete';
  
    const setInit = () => {
      const inputSearchBoxes = $(inputSearchBox);
      if (inputSearchBoxes.length === 0) return;

      inputSearchBoxes.each((index, el) => {
        const $inputSearchBox = $(el);
        const $inputSearchBoxInput = $inputSearchBox.find(inputSearchBoxInput);
        const $inputSearchBoxSearchDelete = $inputSearchBox.find(inputSearchBoxSearchDelete);
  
        $inputSearchBoxSearchDelete.on('click', () => {
          $inputSearchBoxInput.val('');
          $inputSearchBoxSearchDelete.hide();
          $inputSearchBoxInput.focus();
        });

        $inputSearchBoxInput.on('keyup', (e) => {
          if (e.target.value === '') {
            $inputSearchBoxSearchDelete.hide();
          } else {
            $inputSearchBoxSearchDelete.show();
          }
        });

        if ($inputSearchBoxInput.val() === '') {
          $inputSearchBoxSearchDelete.hide();
        }
      });
    }
  
    setInit();
  };
  
  const setComboBox = (container = '.combo-box', callback = (selectedElement) => {}) => {
    const comboBox = container || '.combo-box';
    const comboBoxSelect = 'button.combo-box__txt';
    const comboBoxOption = '.combo-box__menu .combo-box__menu-list li';
  
    const setInit = () => {
      const comboBoxes = $(comboBox);
      if (comboBoxes.length === 0) return;

      comboBoxes.each((index, el) => {
        const $comboBox = $(el);
        const $comboBoxSelect = $comboBox.find(comboBoxSelect);
        const $comboBoxOptions = $comboBox.find(comboBoxOption);
        let currentSelectedIdx = $comboBox.find('.selected').index();

        const setSelectedOption = ($selectedItem) => {
          const text = $selectedItem.html();
          $comboBoxSelect.html(text);
          $comboBox.removeClass('active');
          $comboBoxOptions.removeClass('selected');
          $selectedItem.addClass('selected');
          currentSelectedIdx = $comboBoxOptions.index($selectedItem);
          callback($selectedItem);
        };

        const closeBoxInner = () => {
          $comboBoxOptions.removeClass('selected');
          if (currentSelectedIdx !== -1) {
            $comboBoxOptions.eq(currentSelectedIdx).addClass('selected');
          }
          $comboBox.removeClass('active');
        }

        const setKeyboardEvent = (e) => {
          e.preventDefault();
          const selectedIdx = $comboBoxOptions.index($comboBoxOptions.filter('.selected'));
          switch (e.keyCode) {
            case 13:
              setSelectedOption($($comboBoxOptions.get(selectedIdx)));
              closeBoxInner();
              break;
            case 38:
              if (selectedIdx === -1 || $comboBoxOptions.length === 1 || selectedIdx === 0) {
                $comboBoxOptions.removeClass('selected');
                $comboBoxOptions.last().addClass('selected');
                $comboBoxOptions.last()[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return;
              }
              $comboBoxOptions.removeClass('selected');
              $($comboBoxOptions.get(selectedIdx - 1)).addClass('selected');
              $($comboBoxOptions.get(selectedIdx - 1))[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              break;
            case 40:
              if (selectedIdx === -1 || $comboBoxOptions.length === 1 || selectedIdx === $comboBoxOptions.length - 1) {
                $comboBoxOptions.removeClass('selected');
                $comboBoxOptions.first().addClass('selected');
                $comboBoxOptions.first()[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return;
              }
              $comboBoxOptions.removeClass('selected');
              $($comboBoxOptions.get(selectedIdx + 1)).addClass('selected');
              $($comboBoxOptions.get(selectedIdx + 1))[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              break;
          }
        };

        $comboBoxSelect.off();
        $comboBoxSelect.on('click', () => {
          if ($comboBox.hasClass('active')) {
            closeBoxInner();
          } else {
            $comboBox.addClass('active');
          }
        });
        $comboBoxSelect.on('keydown', (e) => {
          if ([13, 38, 40].includes(e.keyCode)) {
            setKeyboardEvent(e);
          }
        });

        $comboBoxOptions.off();
        $comboBoxOptions.on('click', (e) => {
          const $target = $(e.target);
          setSelectedOption($target.is('li') ? $target : $target.closest('li'));
        });

        $(document).on('click', (e) => {
          const $target = $(e.target);
          if (!$target.closest($comboBox).length) {
            closeBoxInner();
          }
        });
      });
    }
  
    setInit();
  }
  
  const setSlider = (container, sliderOptions, onChange = (uiObject, el) => {}) => {
    const handler = '.range-slider__hadler';
    const handlerText = 'em.range-slider__txt';
    const sliderBar = '.range-slider__bar';
  
    const sliderEl = $(container);
  
    const setSlderBarStyle = (values, $el) => {
      if (values.length !== 2) return;

      const sliderBarEl = $el.find(sliderBar);
      const { min, max } = sliderOptions;
  
      const firstPercent = (values[0] - min) / (max - min) * 100;
      const secondPercent = (values[1] - min) / (max - min) * 100;
      sliderBarEl.css('left', `${firstPercent}%`);
      sliderBarEl.css('width', `${secondPercent - firstPercent}%`);
    }
  
    const initSliderHandler = ($el) => {
        const { min, max, values } = sliderOptions;
        const handlers = $el.find(handler);
        const handlerTexts = handlers.find(handlerText);
  
        if (handlers.length === 2) {
            handlers.each((index, el) => {
            const currentHandler = $(el);
            const leftPercent = (values[index] - min) / (max - min) * 100;
            currentHandler.css('left', `${leftPercent}%`);
            });
        }
        if (handlerTexts.length === 2) {
            handlerTexts.each((index, el) => {
            const currentHandlerText = $(el);
            currentHandlerText.text(values[index]);
            });
        }
        setSlderBarStyle(values, $el);
    }
  
    const setChangedUi = (ui, $el) => {
      const { handleIndex, value, values } = ui;
      const { min, max } = sliderOptions;
      const handlers = $el.find(handler);
      const handlerTexts = handlers.find(handlerText);
  
      if (handlers.length === 2) {
        const currentHandler = handlers[handleIndex];
        const leftPercent = (value - min) / (max - min) * 100;
        currentHandler.style.left = `${leftPercent}%`;
      }
      if (handlerTexts.length === 2) {
        const currentHandlerText = handlerTexts[handleIndex];
        currentHandlerText.textContent = value;
      }
      setSlderBarStyle(values, $el);
    }
  
    const setInit = () => {
      if (sliderEl.length === 0) return;

      sliderEl.each((index, el) => {
        const $el = $(el);
        initSliderHandler($el);
        $el.slider({
            ...sliderOptions,
            slide: (event, ui) => {
              setChangedUi(ui, $el);
            },
            change: (event, ui) => {
              onChange(ui, $el);
            },
        });
      });
    }
  
    setInit();
  };

  const setTabList = (container = '.tab-list-box', handleSelectedTab = (idx) => {}, additionalSwiperOptions = {}) => {
    const tabListBox = container;
    const tabWrap = '.tab-wrap';
    const tabWrapContents = '.tab-wrap__contents';
    const tabButtonPrev = '.tab-btn__prev';
    const tabButtonNext = '.tab-btn__next';
    const tabListBoxInner = '.tab-list-box__inner';
    const tabList = '.tab-list';
    const tabListButton = 'button.tab-list__tab';

    const swipers = [];
    const getSwipers = () => swipers;

    const activeTabWrap = ($wrapContents, activeIndex) => {
      const activeContent = $wrapContents.get(activeIndex);
      $wrapContents.attr('hidden', 'true');
      $(activeContent).removeAttr('hidden');
    }

    const handleClickTabPosition = ($target, _swiper, $tabButtonPrev) => {
        if ($target.width() + $target.offset().left > _swiper.width && !_swiper.isEnd) {
            _swiper.slideNext();
            setTimeout(() => {
                handleClickTabPosition($target, _swiper, $tabButtonPrev);
            }, 100);
        } else if ($target.offset().left < $tabButtonPrev.width() + $tabButtonPrev.offset().left + 15 && !_swiper.isBeginning) {
            _swiper.slidePrev();
            setTimeout(() => {
                handleClickTabPosition($target, _swiper, $tabButtonPrev);
            }, 100);
        }
    };

    const initTabSwiper = () => {
      const tabListBoxes = $(tabListBox);
      if (tabListBoxes.length === 0) return;

      tabListBoxes.each((index, el) => {
        const $tabListBox = $(el);
        const $tabButtonPrev = $tabListBox.find(tabButtonPrev);
        const $tabButtonNext = $tabListBox.find(tabButtonNext);
        const $tabListBoxInner = $tabListBox.find(tabListBoxInner);
        if ($tabListBoxInner.length === 0) return;
        
        $tabListBoxInner.addClass(`swiper-container_${index}`);
        const beforeSwiper = document.querySelector(`${container} .swiper-container_${index}`).swiper;
        if (beforeSwiper) {
            beforeSwiper.destroy();
        }
        const swiper = new Swiper(`${container} .swiper-container_${index}`, {
            freeMode: true,
            slidesPerView: "auto",
            spaceBetween: 24,
            wrapperClass: 'tab-list',
            slideClass: 'tab-list__tab',
            breakpoints: {
              769: {
                  spaceBetween: 40,
              },
            },
            on: {
                init: (_swiper) => {
                    if (_swiper.isBeginning) {
                        $tabButtonPrev.addClass('swiper-button-disabled');
                    } else {
                        $tabButtonPrev.removeClass('swiper-button-disabled');
                    }
                    if (_swiper.isEnd) {
                        $tabButtonNext.addClass('swiper-button-disabled');
                    } else {
                        $tabButtonNext.removeClass('swiper-button-disabled');
                    }
                },
                click: (_swiper, e) => {
                    const $target = $(e.target).closest('.tab-list__tab');
                    if ($target.length === 0) return;
                    handleClickTabPosition($target, _swiper, $tabButtonPrev);
                },
            },

            ...additionalSwiperOptions,
        });
        swipers.push(swiper);

        if ($tabButtonPrev.length === 0 || $tabButtonNext.length === 0) return;
        
        $tabButtonPrev.off('click');
        $tabButtonPrev.on('click', () => {
            swiper.slidePrev();
        });
        
        $tabButtonNext.off('click');
        $tabButtonNext.on('click', () => {
            swiper.slideNext();
        });

        swiper.on('sliderMove resize transitionEnd', (_swiper) => {
            if (_swiper.isBeginning) {
                $tabButtonPrev.addClass('swiper-button-disabled');
            } else {
                $tabButtonPrev.removeClass('swiper-button-disabled');
            }
            if (_swiper.isEnd) {
                $tabButtonNext.addClass('swiper-button-disabled');
            } else {
                $tabButtonNext.removeClass('swiper-button-disabled');
            }
        });
      });

    }

    const initTabList = () => {
      const tabLists = $(tabList);
      if (tabLists.length === 0) return;

      tabLists.each((index, el) => {
        const $tabList = $(el);
        const $tabListButtons = $tabList.find(`> ${tabListButton}`);
        const $tabWrap = $tabList.closest(tabWrap);
        const $tabWrapContents = $tabWrap.find(`> ${tabWrapContents}`);
        const isTabWrap = $tabWrapContents.length > 0;

        $tabListButtons.on('click', (e) => {
            const $target = $(e.target);
            const $tabListButton = $target.closest(tabListButton);

            $tabListButtons.removeClass('active');
            $tabListButtons.attr('aria-selected', 'false');
            $tabListButton.addClass('active');
            $tabListButton.attr('aria-selected', 'true');
            
            const tabIdx = $tabListButtons.index($tabListButton);
            if (isTabWrap) {
                activeTabWrap($tabWrapContents.find('> div'), tabIdx);
            }
            handleSelectedTab(tabIdx);
        });

        if (isTabWrap) {
            activeTabWrap($tabWrapContents.find('> div'), $tabListButtons.index($tabListButtons.filter('.active')))
        }
      });
    }

    const setInit = () => {
      initTabList();
      initTabSwiper();
    }

    setInit();

    return {
        getSwipers,
    };
  }

  const setTooltip = (container = ".tooltip") => {
    const tooltip = container;
    const tooltipButton = "button.tooltip__btn";
    const tooltipContents = ".tooltip__contents";
    const tooltipCloseButton = "button.tooltip-close__btn";
    const documentClickHandler = "tooltip-outside-click";
 
    let currentActiveTooltip = null;
 
    const closeTooltip = $tooltip => {
      if ($tooltip) {
        $tooltip.removeClass("active");
      }
    };
 
    const resetDocumentClickHandler = () => {
      $(document).off(`click.${documentClickHandler}`);
      $(document).on(`click.${documentClickHandler}`, e => {
        const $target = $(e.target);
        if (!$target.closest(tooltip).length && currentActiveTooltip) {
          closeTooltip(currentActiveTooltip);
          currentActiveTooltip = null;
        }
      });
    };
 
    const setInit = () => {
      $(document).off(`click.${documentClickHandler}`);
 
      const tooltips = $(tooltip);
      if (tooltips.length === 0) return;
 
      tooltips.each((index, el) => {
        const $tooltip = $(el);
        const $tooltipContents = $tooltip.find(tooltipContents);
        const $tooltipButton = $tooltip.find(tooltipButton);
        const $tooltipCloseButton = $tooltip.find(tooltipCloseButton);
        if ($tooltipContents.length === 0) return;
 
        $tooltipButton.off("click");
        $tooltipCloseButton.off("click");
 
        $tooltipButton.on("click", () => {
          if ($tooltip.hasClass("active")) {
            closeTooltip($tooltip);
            currentActiveTooltip = null;
          } else {
            closeTooltip(currentActiveTooltip);
            $tooltip.addClass("active");
            currentActiveTooltip = $tooltip;
          }
          resetDocumentClickHandler();
        });
 
        $tooltipCloseButton.on("click", () => {
          closeTooltip($tooltip);
          currentActiveTooltip = null;
        });
      });
 
      resetDocumentClickHandler();
    };
 
    setInit();
  };

  const setInputNumber = (container, options = {
    value: 1,
    min: 1,
    // max: 999,  https://cnx33303.atlassian.net/browse/HVCHB-1273
  }) => {
    const defaultContainer = '.input-number';
    const defaultValue = 1;

    const downButton = 'button.btn-number__down';
    const upButton = 'button.btn-number__up';
    const inputValue = 'input.input-number__input';

    const $container = $(container || defaultContainer);

    const setButtonDisabled = (newValue, $downButton, $upButton) => {
      const { min, max } = options;
      if (typeof min === 'number') {
        if (newValue <= min) {
          $downButton.prop('disabled', true);
        } else {
          $downButton.prop('disabled', false);
        }
      }
      if (typeof max === 'number') {
        if (newValue >= max) {
          $upButton.prop('disabled', true);
        } else {
          $upButton.prop('disabled', false);
        }
      }
    };

    const setInit = () => {
      if ($container.length === 0) return;

      $container.each((index, el) => {
        const $el = $(el);
        const $downButton = $el.find(downButton);
        const $upButton = $el.find(upButton);
        const $inputValue = $el.find(inputValue);

        $inputValue.off('keyup');
        $inputValue.on('keyup', (e) => {
          if (e.target.value === '' || e.target.value === '-') return;

          const { min, max, value } = options;
          const newVal = Number(e.target.value);
          if (isNaN(newVal)) {
            $inputValue.val(value !== undefined ? value : defaultValue)
            setButtonDisabled(value !== undefined ? value : defaultValue, $downButton, $upButton);
          } else if (newVal < min) {
            $inputValue.val(min);
            setButtonDisabled(min, $downButton, $upButton);
          } else if (newVal > max) {
            $inputValue.val(max);
            setButtonDisabled(max, $downButton, $upButton);
          } else {
            setButtonDisabled(newVal, $downButton, $upButton);
          }
        });

        $downButton.off('click');
        $downButton.on('click', () => {
          const value = Number($inputValue.val());
          $inputValue.val(value - 1);
          setButtonDisabled(value - 1, $downButton, $upButton);
        });

        $upButton.off('click');
        $upButton.on('click', () => {
          const value = Number($inputValue.val());
          $inputValue.val(value + 1);
          setButtonDisabled(value + 1, $downButton, $upButton);
        });

        if ($inputValue.attr('disabled')) return;
        if ($inputValue.val()) {
          setButtonDisabled(Number($inputValue.val()), $downButton, $upButton);
        } else if (options && options.value) {
          const { value } = options;
          $inputValue.val(value);
          setButtonDisabled(value, $downButton, $upButton);
        } else {
          $inputValue.val(defaultValue);
          setButtonDisabled(defaultValue, $downButton, $upButton);
        }
      });
    }

    setInit();
  }

  const setDatePicker = (container = '.input-datepicker', onSelect, _options = {}) => {
    const getCommonLabel = () => {
        try {
            return commonLabel;
        } catch (e) {
            return undefined;
        }
    }
    const _commonLabel = getCommonLabel();
    const $container = $(container);

    const initYearButton = (input) => {
      setTimeout(function() {
        var buttonPane = $(input)
        .datepicker("widget")
        .find(".ui-datepicker-prev");

        $("<a>", {
            text: "Prev Year",
            click: function() {
                $.datepicker._adjustDate(input, -1, "Y");
            }
        }).addClass("ui-datepicker-prevyear").insertBefore(buttonPane);

        
        var buttonPaneNext = $(input)
            .datepicker("widget")
            .find(".ui-datepicker-next");

        $("<a>", {
            text: "Next Year",
            click: function() {
                $.datepicker._adjustDate(input, 1, "Y");
            }
        }).addClass("ui-datepicker-nextyear").insertAfter(buttonPaneNext);
      }, 1);
    }

    const setInit = () => {
      if ($container.length === 0) return;

      $container.each((index, el) => {
        const $el = $(el);
        $el.datepicker({
          dateFormat: _commonLabel && _commonLabel.dateType ? _commonLabel.dateType.toLowerCase().replace('yyyy', 'yy') : 'yy-mm-dd',
          showOtherMonths: true,
          isRTL: true,
          firstDay: 1,
          beforeShow: initYearButton,
          onChangeMonthYear: (year, month, inst) => {
            initYearButton(inst.input);
          },
          ...onSelect && { onSelect },
          ..._options,
        });
      });
    }

    setInit();
  }

  const popupStack = [];
  const scrollControllers = [];
  const closePopup = () => {
    if (popupStack.length === 0) return;
    const targetId = popupStack.pop();
    const $layer = $(`#${targetId}`);

    $layer.removeClass('active');

    if (popupStack.length === 0) {
      $('html').removeClass('layer-open');
    }

    const scrollController = scrollControllers.pop();
    window.removeEventListener('resize', scrollController);
  }

    const openPopup = (targetId) => {
        const popupWrapInner = '.popup-wrap__inner';
        const alertWrapInner = '.alert-wrap__inner';
        const popupContainer = '.popup__container';
        const popupFooter = '.popup__footer';

        if (popupStack.includes(targetId)) return;
        popupStack.push(targetId);

        const $layer = $(`#${targetId}`);
        const $popupWrapInner = $layer.find(popupWrapInner); // alert는 높이 계산 X
        const $popupContainer = $layer.find(popupContainer); // alert는 높이 계산 X
        const $popupFooter = $layer.find(popupFooter);
        const $layerClose = $popupWrapInner.length > 0 ? 
            $popupWrapInner.find('> button.icon-close') :
            $layer.find(alertWrapInner).find('> button.icon-close');

        $layer.addClass('active');
        $('html').addClass('layer-open');
        
        const controlHeight = () => {
            $popupContainer.css("height", '100%');
            $popupContainer.css("height", `calc(${$popupWrapInner.prop('clientHeight')}px - ${($popupContainer.prop('offsetTop') || 0) + ($popupFooter.prop('clientHeight') || 0)}px - ${$popupWrapInner.css('padding-bottom')})`);
        };
        controlHeight();
        
        const hasScroll = ($_container) => {
            return $_container.prop('scrollHeight') > Math.ceil($_container.innerHeight());
        };
        if (hasScroll($popupContainer)) {
            $popupFooter.addClass('shadow');
        }

        $layerClose.off();
        $layerClose.on('click', () => {
            closePopup(targetId);
        });

        const controlScroll = () => {
            setTimeout(() => {
                controlHeight();
                if (hasScroll($popupContainer)) {
                    $popupFooter.addClass('shadow');
                } else {
                    $popupFooter.removeClass('shadow');
                }
            }, 100);
        }

        window.addEventListener('resize', controlScroll);
        scrollControllers.push(controlScroll);
    };

  const setLayerPopup = (container = '[data-layer-target]') => {
    const $container = $(container);

    const setInit = () => {
      $container.on('click', (e) => {
        const $target = $(e.currentTarget);
        const targetId = $target.data('layer-target');
        openPopup(targetId);
      });
    }

    setInit();
  }

  const setAccordion = (container = '.accordion-box') => {
    const $container = $(container);
    const accordionBtn = '.accordion__tit .icon-accordion';
    const btnTextBlind = '.txt-blind';
    const getCommonLabel = () => {
        try {
            return commonLabel;
        } catch (e) {
            return undefined;
        }
    }
    const _commonLabel = getCommonLabel();

    const setBlind = (_el) => {
        if (_commonLabel && _commonLabel.ailsDropDownCloseLabel && _commonLabel.ailsOpenLabel) {
            const isOpened = _el.hasClass('active');
            const $accordionBtn = _el.find(accordionBtn);
            const $btnTextBlind = $accordionBtn.find(btnTextBlind);
            const { ailsDropDownCloseLabel, ailsOpenLabel } = _commonLabel;
            if (isOpened) {
                $btnTextBlind.text(ailsDropDownCloseLabel);
            } else {
                $btnTextBlind.text(ailsOpenLabel);
            }
        }
    }

    const setInit = () => {
      $container.each((index, el) => {
        const $el = $(el);
        const $accordionBtn = $el.find(accordionBtn);

        $accordionBtn.on('click', (e) => {
          $el.toggleClass('active');
          setBlind($el);
        });
        setBlind($el);
    });
    };

    setInit();
  };

  const setAutoComplete = (container = '.input-search-box') => {
    const $container = $(container);
    const inputSearchBoxInner = '.input-search-box__inner';
    const inputItem = '.input-box > input';
    const boxListContainer = '.search-box__auto-list';
    const boxLists = 'ul > li';
    const inputSearchBoxSearchDelete = '.icon-search-delete';

    const autoCompleteController = (_el) => {
        let currentItems = [];
        let callbackSelected = () => {};

        const getLiItem = (message, searchText) => {
            const lowerMessage = message.toLocaleLowerCase();
            const lowerSearchText = searchText.toLocaleLowerCase();
            const escapedSearchText = lowerSearchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regExp = new RegExp(escapedSearchText, 'g');
            const testItem = lowerMessage.matchAll(regExp);
            const matchResult = [...testItem];
            let result = '<li class="autoitem">';
            let idx = 0;
            if (matchResult.length === 0) {
                result += message;
            } else {
                matchResult.forEach(item => {
                    const startIdx = item.index;
                    const endIdx = item.index + searchText.length;
                    result += message.slice(idx, startIdx) + `<span class="txt-point1">${message.slice(startIdx, endIdx)}</span>`;
                    idx = endIdx;
                });
                result += message.slice(idx);
            }
            result += '</li>';
    
            return result;
        };

        const renderItems = (items) => {
            _el.find(boxListContainer).empty();
            const searchText = _el.find(inputItem).val()
            let liHtml = '';
            items.forEach((item) => {
                liHtml += getLiItem(item, searchText.toLowerCase());
            });
            _el.find(boxListContainer).html(liHtml);
        };

        const setItemEvents = () => {
            _el.find(boxLists).on('click', e => {
                const $target = $(e.target);
                const text = $target.text();
                _el.find(inputItem).val(text);
                callbackSelected(text);
                // closeBoxInner();
            });
        };

        const setResult = (result) => {
            currentItems = result;
            renderItems(result);
            setItemEvents();
        };

        const setCallbackSelected = (callback) => {
            callbackSelected = callback;
        };

        return {
            setResult,
            setCallbackSelected,
        };
    };

    const setInit = () => {
      $container.each((index, el) => {
        const $el = $(el);
        $el[0].autoComplete = autoCompleteController($el);
        const $inputSearchBoxInner = $el.find(inputSearchBoxInner);
        const $inputItem = $inputSearchBoxInner.find(inputItem);
        const $boxLists = $inputSearchBoxInner.find(boxLists);
        const $inputSearchBoxSearchDelete = $inputSearchBoxInner.find(inputSearchBoxSearchDelete);

        const closeBoxInner = () => {
          $boxLists.removeClass('selected');
          $inputSearchBoxInner.removeClass('active');
        }

        const setKeyboardEvent = (e) => {
          const visibleItems = $boxLists.filter(':visible');
          const selectedIdx = $boxLists.index(visibleItems.filter('.selected'));
          if (visibleItems.length === 0) return;
          switch (e.keyCode) {
            case 13:
              closeBoxInner();
              break;
            case 38:
              if (selectedIdx === -1 || visibleItems.length === 1 || $boxLists.get(selectedIdx) === visibleItems.get(0)) {
                $boxLists.removeClass('selected');
                visibleItems.last().addClass('selected');
                $inputItem.val(visibleItems.last().text());
                return;
              }
              $($boxLists.get(selectedIdx)).removeClass('selected');
              $($boxLists.get(selectedIdx - 1)).addClass('selected');
              $inputItem.val($($boxLists.get(selectedIdx - 1)).text());
              break;
            case 40:
              if (selectedIdx === -1 || visibleItems.length === 1 || $boxLists.get(selectedIdx) === visibleItems.get(visibleItems.length - 1)) {
                $boxLists.removeClass('selected');
                visibleItems.first().addClass('selected');
                $inputItem.val(visibleItems.first().text());
                return;
              }
              $($boxLists.get(selectedIdx)).removeClass('selected');
              $($boxLists.get(selectedIdx + 1)).addClass('selected');
              $inputItem.val($($boxLists.get(selectedIdx + 1)).text());
              break;
          }
        };

        $inputItem.on('keyup', e => {
            // 키보드 이벤트 없이 hover만 남김 
        //   if ([13, 38, 40].includes(e.keyCode)) {
        //     setKeyboardEvent(e);
        //     return;
        //   }
          if ([13].includes(e.keyCode)) {
            closeBoxInner();
            return;
          }

          if (!!e.target.value) {
            $inputSearchBoxInner.addClass('active');
            // const val = e.target.value.toLowerCase();
            // $boxLists.each((index, el) => {
            //   const $el = $(el);
            //   if ($el.text().toLowerCase().indexOf(val) > -1) {
            //     $el.show();
            //   } else {
            //     $el.hide();
            //   }
            // });
          } else {
            closeBoxInner();
          }
        });

        // $boxLists.on('click', e => {
        //   const $target = $(e.target);
        //   const text = $target.text();
        //   $inputItem.val(text);
        //   closeBoxInner();
        // });

        $inputSearchBoxSearchDelete.on('click', () => {
          closeBoxInner();
        });

        $(document).on('click', (e) => {
          const $target = $(e.target);
          if (!$target.closest($inputItem).length) {
            closeBoxInner();
          }
        });
      });
    }

    setInit();
  }

  const setDefaultSwiper = (unitSwiperOptions = {
    container: '.unit-swiper',
    swiperOptions: {
      slidesPerView: 4,
      spaceBetween: 4,
      navigation: {
          nextEl: ".unit__next-btn",
          prevEl: ".unit__prev-btn",
      },
    },
    slides: '.swiper-slide.unit__item',
    activeClass: 'active',
  }, callback = (element) => {}) => {
    const {
      container,
      swiperOptions,
      slides,
      activeClass,
    } = unitSwiperOptions;
    if ($(container).length === 0) return;
    const allyOptions = getA11yOptions($(container)[0]); // NOTE 첫 번째 값으로 통일, 나중에 필요하면 변경
    const unitSwiper = new Swiper(container, {
        a11y: {
            enabled: true,
            prevSlideMessage: allyOptions.prevSlideMessage,
            nextSlideMessage: allyOptions.nextSlideMessage,
        },
        ...swiperOptions,
    });
    const $container = $(container);
    $container.each((cIndex, el) => {
      const $el = $(el);
      const $slides = $el.find(slides);
      $slides.each((sIndex, slideEl) => {
        const $slideEl = $(slideEl);
        $slideEl.on('click', () => {
          $slides.removeClass(activeClass);
          $slideEl.addClass(activeClass);
          callback($slideEl);
        });

        if (swiperOptions) {
          const { slidesPerView } = swiperOptions;
          if ($slides.length < 5) {
            $el.find('.swiper-wrapper').addClass('fj-center');
          }
        }
      });
    });
  }

  const initAll = () => {
    setClickToggle();
    setSearchInputDelete();
    setComboBox();
    setTabList();
    setTooltip();
    setDatePicker();
    setLayerPopup();
    setAccordion();
    setAutoComplete();
    setDefaultSwiper();
  }
   
  const commonFunction = () => {
    return {
      initAll,
      setSlider,
      setInputNumber,
      closePopup,
      openPopup,
      setClickToggle,
      setSearchInputDelete,
      setComboBox,
      setTabList,
      setTooltip,
      setDatePicker,
      setLayerPopup,
      setAccordion,
      setAutoComplete,
      setDefaultSwiper,
      onToggle,
    }
  }
  
  // global 사용 시
  window.hvachubFunc = commonFunction();
})();

function getA11yOptions(swiperContainer) {
  const nextButtonText = $(swiperContainer).find('> .swiper-button-next .txt-blind').text();
  const prevButtonText = $(swiperContainer).find('> .swiper-button-prev .txt-blind').text();

  return {
    prevSlideMessage: prevButtonText,
    nextSlideMessage: nextButtonText,
  };
}

(() => {
    const global = window.hvachubFunc;

    global.initAll();
        
    // 옵션 세팅할 수 있도록 분리
    global.setSlider(
        '.range-slider__inner',
        {
        range: true,
        min: 0,
        max: 10,
        values: [0.5, 5.5],
        step: 0.5
        }
    );
    global.setInputNumber();
    // global.setInputNumber('.input-number', { min: 1, max: 10, value: 3 });

    // NOTE onToggle 사용 예시
    // timer, setTimer 필수는 아니지만 없으면 여러 favorite 버튼을 반복적으로 클릭할 때 delay가 꼬일 수 있음
    // let timer1 = null;
    // $('#on-toggle-test-1').off('click');
    // $('#on-toggle-test-1').on('click', function (e) {
    //     global.onToggle(e.currentTarget, timer1, (timer) => { timer1 = timer; });
    // });
    // let timer2 = null;
    // $('#on-toggle-test-2').off('click');
    // $('#on-toggle-test-2').on('click', function (e) {
    //     global.onToggle(e.currentTarget, timer2, (timer) => { timer2 = timer; });
    // });

    // NOTE additionalSwiperOptions 예시
    // const { getSwipers } = global.setTabList('.tab-list-box.custom-test', () => {}, { spaceBetween: 100 });
    // getSwipers().forEach(swiper => {
    //     swiper.destroy()
    // });
})();
