'use strict';
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var mapPinMain = map.querySelector('.map__pin--main');
  var templateSuccess = document.querySelector('#success').content;
  var main = document.querySelector('main');


  window.setFormInactiveState = {
    setFormOnInactiveState: setFormOnInactiveState,
  };

  function setFormOnInactiveState() {
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
    }

    var containerSuccess = templateSuccess.cloneNode(true);
    main.appendChild(containerSuccess);

    var clickOutsideSuccess = window.errorSendForm.clickOutside;

    window.onkeydown = function (event) {
      if (event.key === 'Escape') {
        document.querySelector('div.success').remove();
        window.removeEventListener('click', clickOutsideSuccess);
      }
    };

    window.addEventListener('click', clickOutsideSuccess);
  }

})();
