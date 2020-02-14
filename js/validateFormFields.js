'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var price = adForm.querySelector('#price');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var title = adForm.querySelector('#title');

  function validatePrice() {
    if ((!isNaN(price.value) && price.value > 1000000) || isNaN(price.value)) {
      setDisableStateForPriceField();
    } else {
      adFormSubmitButton.classList.remove('ad-form--disabled');
      adFormSubmitButton.disabled = false;
      price.setCustomValidity('');
    }
  }

  function setDisableStateForPriceField() {
    adFormSubmitButton.disabled = true;
    adFormSubmitButton.classList.add('ad-form--disabled');
    price.setCustomValidity('Числовое поле, Максимальное значение — 1 000 000.');
    price.reportValidity();
  }

  price.addEventListener('change', validatePrice);

  function setErrorState(field, message) {
    adFormSubmitButton.disabled = true;
    adFormSubmitButton.classList.add('ad-form--disabled');
    field.setCustomValidity(message);
    price.reportValidity();
  }

  function removeDisable() {
    adFormSubmitButton.classList.remove('ad-form--disabled');
    adFormSubmitButton.disabled = false;
    price.setCustomValidity('');
  }

  function validateTitle() {
    if (title.value.length < 30 && title.value.length > 100) {
      setErrorState(title, 'Обязательное текстовое поле, Минимальная длина — 30 символов, Максимальная длина — 100 символов.');
    } else {
      removeDisable();
    }
  }

  title.addEventListener('change', validateTitle);


})();
