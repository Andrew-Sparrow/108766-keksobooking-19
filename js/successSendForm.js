'use strict';
(function () {
  var DEFAULT_PRICE_PLACE_HOLDER = 1000;
  var DEFAULT_SRC_IMG = 'img/muffin-grey.svg';

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var price = adForm.querySelector('#price');
  var addressField = document.querySelector('#address');
  var templateSuccess = document.querySelector('#success').content;
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var homePreview = document.querySelector('.ad-form__photo img');


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
      window.generate.generatePins(window.compose.ads);

      window.activeState.toggleFormElements(true);
      price.placeholder = DEFAULT_PRICE_PLACE_HOLDER;
      avatarPreview.src = DEFAULT_SRC_IMG;
      homePreview.src = DEFAULT_SRC_IMG;

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

  function clickOutsideSuccess(evt) {
    var isClickOutside = evt.target.contains(main.querySelector('div.success'));

    if (isClickOutside) {
      main.querySelector('div.success').remove();
      window.removeEventListener('click', clickOutsideSuccess);
      window.removeEventListener('keydown', pressEscape);
    }
  }

  function pressEscape(evt) {
    var key = evt.key;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      window.removeEventListener('click', clickOutsideSuccess);
      window.removeEventListener('keydown', pressEscape);
      main.querySelector('div.success').remove();
    }
  }

  function successSendForm() {

    var containerSuccess = templateSuccess.cloneNode(true);
    main.appendChild(containerSuccess);

    window.addEventListener('keydown', pressEscape);
    window.addEventListener('click', clickOutsideSuccess);

    setFormInactiveState();
  }

})();
