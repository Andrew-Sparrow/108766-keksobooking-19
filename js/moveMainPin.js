'use strict';

(function () {

  var MIN_X = 0 - window.WIDTH_MAIN_PIN / 2;
  var MAX_X = document.querySelector('.map').offsetWidth - window.WIDTH_MAIN_PIN / 2;

  var MIN_Y = 130;
  var MAX_Y = 630;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');


  function onMouseDown(evt) {
    evt.preventDefault();

    var xStartCoordinate = evt.clientX;
    var yStartCoordinate = evt.clientY;

    var xShiftCoordinate = xStartCoordinate - evt.clientX;
    var yShiftCoordinate = yStartCoordinate - evt.clientY;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      xShiftCoordinate = xStartCoordinate - moveEvt.clientX;
      yShiftCoordinate = yStartCoordinate - moveEvt.clientY;

      xStartCoordinate = moveEvt.clientX;
      yStartCoordinate = moveEvt.clientY;

      function yConstraint() {
        var yMoved = mapPinMain.offsetTop - yShiftCoordinate;

        if (yMoved <= MIN_Y) {
          return MIN_Y;
        }
        if (yMoved >= MAX_Y) {
          return MAX_Y;
        }

        return yMoved;
      }

      function xConstraint() {
        var xMoved = (mapPinMain.offsetLeft) - xShiftCoordinate;
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
      addressField.value = xPointerForFieldAddress + ', ' + yPointerForFieldAddress;
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  mapPinMain.addEventListener('mousedown', onMouseDown);

})();
