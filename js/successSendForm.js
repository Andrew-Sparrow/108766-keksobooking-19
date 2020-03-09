'use strict';
(function () {
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var addressField = document.querySelector('#address');
  var templateSuccess = document.querySelector('#success').content;


  window.successSendForm = {
    setFormInactiveState: setFormInactiveState,
    successSendForm: successSendForm,
  };

  function setFormInactiveState() {
    var mapCard = map.querySelector('article.map__card');

    if (mapPinMain.classList.contains('map__pin--mainActive')) {

      adFormSubmitButton.disabled = true;
      mapPinMain.classList.remove('map__pin--mainActive');
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.composePins.generatePins(window.composeAds.ads);
      window.activeState.toggleFormElements(true);
      mapCard.remove();
      mapPinMain.blur();
      adForm.reset();

      var pinElements = map.querySelectorAll('.map__pin--similar');
      // removing pins from map
      pinElements.forEach(function (element) {
        element.remove();
      });

      // set main pin to center
      mapPinMain.style.top = '375px';
      mapPinMain.style.left = '570px';

      addressField.setAttribute('value', window.fillAddressField.getPointerCoordinateMainPin());

    }
  }

  function successSendForm() {

    setFormInactiveState();

    var containerSuccess = templateSuccess.cloneNode(true);
    var clickOutsideSuccess = window.errorSendForm.clickOutside;

    main.appendChild(containerSuccess);


    window.onkeydown = function (event) {
      if (event.key === 'Escape') {
        document.querySelector('div.success').remove();
        window.removeEventListener('click', clickOutsideSuccess);
      }
    };

    window.addEventListener('click', clickOutsideSuccess);
  }

})();
