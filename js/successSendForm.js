'use strict';
(function () {
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');
  var templateSuccess = document.querySelector('#success').content;


  window.successSendForm = {
    setFormInactiveState: setFormInactiveState,
    successSendForm: successSendForm,
  };

  function setFormInactiveState() {
    var mapCard = map.querySelector('article.map__card');
    var popup = map.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');

    if (mapPinMain.classList.contains('map__pin--mainActive')) {

      popupClose.blur();

      mapPinMain.classList.remove('map__pin--mainActive');
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.composePins.generatePins(window.composeAds.ads);

      window.activeState.toggleFormElements(true);
      mapCard.remove();
      mapPinMain.blur();

      var pinElements = map.querySelectorAll('.map__pin--similar');
      // removing pins from map
      pinElements.forEach(function (element) {
        element.remove();
      });

      // set main pin to center
      mapPinMain.style.top = '375px';
      mapPinMain.style.left = '570px';

      addressField.setAttribute('value', window.fillAddressField.getPointerCoordinateMainPin());
      adForm.reset();
    }
  }

  function successSendForm() {

    var containerSuccess = templateSuccess.cloneNode(true);
    main.appendChild(containerSuccess);

    function pressEscape(event) {
      var key = event.key;

      if (key === 'Escape' || key === 'Esc' || key === 27) {
        window.removeEventListener('click', clickOutsideSuccess);
        window.removeEventListener('keydown', pressEscape);
        main.querySelector('div.success').remove();
      }
    }

    function clickOutsideSuccess(evt) {
      var isClickInside = evt.target.firstElementChild.contains(evt.target);

      if (!isClickInside) {
        evt.target.remove();
      }
      window.removeEventListener('click', clickOutsideSuccess);
      window.removeEventListener('keydown', pressEscape);
    }

    window.addEventListener('keydown', pressEscape);
    window.addEventListener('click', clickOutsideSuccess);

    setFormInactiveState();
  }


})();
