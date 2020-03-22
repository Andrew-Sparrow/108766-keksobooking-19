'use strict';
(function () {

  var MAX_PINS_NUM = 5;

  var pinTemplate = document.querySelector('#pin').content;
  var map = document.querySelector('.map');

  window.generate = {
    generatePins: generatePins,
  };


  // this function made for closures
  function pinListener(pin, index, ads) {
    pin.addEventListener('click', function () {
      var popup = map.querySelector('.popup');

      window.fillPopupByData(index, ads);
      iterateOverPins();
      pin.classList.add('map__pin--active');

      function pressEscToCloseCard(evt) {
        var key = evt.key;

        if (key === 'Escape' || key === 'Esc' || key === 27) {
          window.removeEventListener('keydown', pressEscToCloseCard);
          popup.style = 'display: none';
        }
      }

      window.addEventListener('keydown', pressEscToCloseCard);
    });
  }

  // this function removes active state from all over pins
  function iterateOverPins() {
    var pins = map.querySelectorAll('.map__pin');

    pins.forEach(function (item) {
      if (item.classList.contains('map__pin--active')) {
        item.classList.remove('map__pin--active');
      }
    });
  }

  function generatePins(ads) {
    var fragment = new DocumentFragment();

    var lengthIteration = ads.length > MAX_PINS_NUM ? MAX_PINS_NUM : ads.length;

    for (var i = 0; i < lengthIteration; i++) {
      // verify if add has offer property
      if (ads[i].offer !== undefined) {
        var pinContainer = pinTemplate.cloneNode(true);
        var pin = pinContainer.querySelector('.map__pin');
        var pinImg = pin.querySelector('img');

        pinListener(pin, i, ads);
        pin.style = 'left: ' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;"';
        pinImg.src = ads[i].author.avatar;
        pinImg.alt = ads[i].offer.title;
        fragment.appendChild(pin);
      }
    }

    var pinsContainer = document.querySelector('.map__pins');
    pinsContainer.appendChild(fragment);
  }

})();
