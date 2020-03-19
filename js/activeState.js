'use strict';
(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mFilterContainer = document.querySelector('.map__filters-container');

  var inputs = adForm.getElementsByTagName('input');
  var selects = adForm.getElementsByTagName('select');
  var textarea = adForm.querySelector('textarea');
  var labels = adForm.getElementsByTagName('label');
  var buttons = adForm.getElementsByTagName('button');

  var selectsFilter = mFilterContainer.querySelectorAll('select');
  var checkboxesFilter = mFilterContainer.querySelectorAll('input[type=checkbox]');


  window.activeState = {
    toggleFormElements: toggleFormElements,
  };

  mapPinMain.addEventListener('mousedown', onMouseDown);
  mapPinMain.addEventListener('keydown', onKeyDown);

  function onMouseDown(evt) {
    if (evt.button === 0) {
      setFormOnActiveState();
    }
  }

  function onKeyDown(evt) {
    if (evt.key === 'Enter') {
      setFormOnActiveState();
    }
  }

  function setFormOnActiveState() {
    // verify active state on button to prevent download data by clicking on the button
    if (!mapPinMain.classList.contains('map__pin--mainActive')) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapPinMain.classList.add('map__pin--mainActive');
      window.composePins.generatePins(window.composeAds.ads);
      toggleFormElements(false);
      mFilterContainer.insertAdjacentElement('beforebegin', window.popupCard.createCardTemplate());
      mapPinMain.blur();

      var pinElements = map.querySelectorAll('.map__pin--similar');
      window.activeState.pinElements = pinElements;
    }
  }

  function disableElements(elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  }

  function toggleFormElements(isDisabled) {
    disableElements(inputs, isDisabled);

    disableElements(selects, isDisabled);

    textarea.disabled = isDisabled;

    disableElements(labels, isDisabled);
    disableElements(buttons, isDisabled);

    disableElements(selectsFilter, isDisabled);
    disableElements(checkboxesFilter, isDisabled);
  }

  // by default all elements are disabled
  toggleFormElements(true);
})();
