'use strict';
(function () {

  // var ads = window.composeAds.ads;

  var MAX_PINS_NUM = 8;

  var pinTemplate = document.querySelector('#pin').content;

  window.composePins = {
    generatePins: generatePins
  };

  function generatePins(ads) {
    var fragment = new DocumentFragment();

    for (var i = 0; i < MAX_PINS_NUM; i++) {
      var pinContainer = pinTemplate.cloneNode(true);
      var pin = pinContainer.querySelector('.map__pin');
      var pinImg = pin.querySelector('img');
// debugger;
      pin.style = 'left: ' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;"';
      pinImg.src = ads[i].author.avatar;
      pinImg.alt = ads[i].offer.title;
      fragment.appendChild(pin);
    }

    var pinsContainer = document.querySelector('.map__pins');
    pinsContainer.appendChild(fragment);
  }

})();
