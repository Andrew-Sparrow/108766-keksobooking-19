'use strict';

(function () {
  var WIDTH_MAIN_PIN = 65;
  var HEIGHT_MAIN_PIN = 65;

  var addressField = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.fillAddressField = {
    getPointerCoordinateMainPin: getPointerCoordinateMainPin(),
    mapPinMain: mapPinMain
  };

  function getXCoordinateMainPin() {
    return mapPinMain.offsetLeft;
  }

  function getYCoordinatesMainPin() {
    return mapPinMain.offsetTop;
  }

  function getCenterCoordinatesMainPin() {
    var centerX = getXCoordinateMainPin() + Math.floor(WIDTH_MAIN_PIN / 2);
    var centerY = getYCoordinatesMainPin() + Math.floor(HEIGHT_MAIN_PIN / 2);
    var centerCoordinate = centerX + ', ' + centerY;
    return centerCoordinate;
  }

  function getPointerCoordinateMainPin() {
    var centerX = getXCoordinateMainPin() + Math.floor(WIDTH_MAIN_PIN / 2);
    var centerY = getYCoordinatesMainPin() + HEIGHT_MAIN_PIN;
    var centerCoordinate = centerX + ', ' + centerY;
    return centerCoordinate;
  }

  // sets the value of address field with data of main pin coordinates
  addressField.value = getCenterCoordinatesMainPin();
})();
