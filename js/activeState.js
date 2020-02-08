'use strict';
(function () {

  var map = document.querySelector('.map');
  var addressField = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', onMouseButton);
  mapPinMain.addEventListener('keydown', onKeyDown);

  function onMouseButton(evt) {
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

  var ads = window.composeAds.generateAds;
  var pins = window.composePins.generatePins;

  function setFormOnActiveState() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    ads();
    pins();
    toggleFormElements(false);
    addressField.value = window.fillAddressField.getPointerCoordinateMainPin;
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
