'use strict';
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var mapPinMain = map.querySelector('.map__pin--main');


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

      pinElements.forEach(function (element) {
        element.remove();
      });
    }
  }

})();
