'use strict';

(function () {

  var DECIMAL_NUMBER_SYSTEM = 10;
  var OPTION_VALUE_HUNDRED_ROOMS = 100;
  var OPTION_VALUE_OF_NOT_FOR_GUESTS = 0;

  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var guestsCapacity = adForm.querySelector('#capacity');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');

  function getSelectedFromRoomNumber() {
    var valueRoom = roomNumber.options[roomNumber.selectedIndex].value;
    return valueRoom;
  }

  function getSelectedFromGuestsCapacity() {
    var valueGuests = guestsCapacity.options[guestsCapacity.selectedIndex].value;
    return valueGuests;
  }

  function changeFormFeaturesByValidate() {
    adFormSubmitButton.disabled = true;
    adFormSubmitButton.classList.add('ad-form--disabled');
    roomNumber.setCustomValidity('Количество мест - "не для гостей" должно совпадать с количеством комнат - 100');
    roomNumber.reportValidity();
  }

  function validateGuestCapacity() {
    var valueFromRoomNumber = parseInt(getSelectedFromRoomNumber(), DECIMAL_NUMBER_SYSTEM);
    var valueFromGuestsCapacity = parseInt(getSelectedFromGuestsCapacity(), DECIMAL_NUMBER_SYSTEM);

    if (valueFromRoomNumber === OPTION_VALUE_HUNDRED_ROOMS && valueFromGuestsCapacity !== OPTION_VALUE_OF_NOT_FOR_GUESTS) {
      changeFormFeaturesByValidate();
    } else if (valueFromRoomNumber < OPTION_VALUE_HUNDRED_ROOMS && valueFromGuestsCapacity === OPTION_VALUE_OF_NOT_FOR_GUESTS) {
      changeFormFeaturesByValidate();
    } else if (valueFromGuestsCapacity > valueFromRoomNumber) {
      changeFormFeaturesByValidate();
      roomNumber.setCustomValidity('Количество комнат не может быть меньше количества гостей');
    } else {
      adFormSubmitButton.classList.remove('ad-form--disabled');
      adFormSubmitButton.disabled = false;
      roomNumber.setCustomValidity('');
    }
  }

  guestsCapacity.addEventListener('change', validateGuestCapacity);
  roomNumber.addEventListener('change', validateGuestCapacity);
})();
