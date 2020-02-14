'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var price = adForm.querySelector('#price');
  var minimalPriceForNight = 1000;
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var title = adForm.querySelector('#title');
  var typeHousing = adForm.querySelector('#type');

  window.validateFormFields = {
    setErrorState: setErrorState,
    removeDisable: removeDisable
  };

  function getSelectedFromTypeHousing() {
    var valueType = typeHousing.options[typeHousing.selectedIndex].value;
    return valueType;
  }

  function setErrorState(field, message) {
    adFormSubmitButton.disabled = true;
    adFormSubmitButton.classList.add('ad-form--disabled');
    field.setCustomValidity(message);
    field.reportValidity();
  }

  function removeDisable(field) {
    adFormSubmitButton.classList.remove('ad-form--disabled');
    adFormSubmitButton.disabled = false;
    field.setCustomValidity('');
  }

  function validatePrice() {
    if ((!isNaN(price.value) && price.value > 1000000 || (!isNaN(price.value) && price.value < minimalPriceForNight))
     || isNaN(price.value)) {
      setErrorState(price, 'Числовое поле, минимальная цена - ' + minimalPriceForNight + ', Максимальное цена — 1 000 000.');
    } else {
      removeDisable(price);
    }
  }

  function validateTitle() {
    if (title.value.length < 30 || title.value.length > 100) {
      setErrorState(title, 'Обязательное текстовое поле, Минимальная длина — 30 символов, Максимальная длина — 100 символов.');
    } else {
      removeDisable(title);
    }
  }

  title.addEventListener('change', validateTitle);

  function validateTypeofHousing() {
    switch (getSelectedFromTypeHousing()) {
      case 'bungalow' :
        minimalPriceForNight = 0;
        price.placeholder = minimalPriceForNight;
        break;
      case 'flat':
        minimalPriceForNight = 1000;
        price.placeholder = minimalPriceForNight;
        break;
      case 'house':
        minimalPriceForNight = 5000;
        price.placeholder = minimalPriceForNight;
        break;
      case 'palace':
        minimalPriceForNight = 10000;
        price.placeholder = minimalPriceForNight;
        break;
    }
  }

  typeHousing.addEventListener('change', validateTypeofHousing);
  price.addEventListener('change', validatePrice);

})();
