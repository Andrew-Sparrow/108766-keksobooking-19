'use strict';
(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mFilterContainer = document.querySelector('.map__filters-container');

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

  adFormSubmitButton.disabled = true;

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

  /* code from qodo.co.uk */
  // function disables/activates the elements
  function toggleFormElements(isDisabled) {
    var inputs = adForm.getElementsByTagName('input');
    disableElements(inputs, isDisabled);
    var selects = adForm.getElementsByTagName('select');
    disableElements(selects, isDisabled);
    var textareas = adForm.getElementsByTagName('textarea');
    disableElements(textareas, isDisabled);
    var buttons = adForm.getElementsByTagName('button');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = isDisabled;
    }

    var labels = adForm.getElementsByTagName('label');
    disableElements(labels, isDisabled);
  }

  toggleFormElements(true);
})();
