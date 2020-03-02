'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapWidth = map.offsetWidth;
  var addressField = document.querySelector('#address');

  var MIN_X = 0 - window.WIDTH_MAIN_PIN / 2;
  var MAX_X = mapWidth - window.WIDTH_MAIN_PIN / 2;

  var MIN_Y = 130;
  var MAX_Y = 630;

  function onMouseDown(evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shiftCoordinates = {
      x: startCoordinates.x - evt.clientX,
      y: startCoordinates.y - evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      shiftCoordinates.x = startCoordinates.x - moveEvt.clientX;
      shiftCoordinates.y = startCoordinates.y - moveEvt.clientY;

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      function yConstraint() {
        var yMoved = mapPinMain.offsetTop - shiftCoordinates.y;

        if (yMoved <= MIN_Y) {
          return MIN_Y;
        }
        if (yMoved >= MAX_Y) {
          return MAX_Y;
        }

        return yMoved;
      }

      function xConstraint() {
        var xMoved = (mapPinMain.offsetLeft) - shiftCoordinates.x;

        if (xMoved <= MIN_X) {
          return MIN_X;
        }
        if (xMoved >= MAX_X) {
          return MAX_X;
        }

        return xMoved;
      }

      var xPointerForFieldAddress = xConstraint() + window.WIDTH_MAIN_PIN / 2;
      var yPointerForFieldAddress = yConstraint();

      mapPinMain.style.top = yConstraint() + 'px';
      mapPinMain.style.left = xConstraint() + 'px';
      addressField.setAttribute('value', xPointerForFieldAddress + ', ' + yPointerForFieldAddress);
    }


    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousedown', onMouseDown);

})();
