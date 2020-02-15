'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');

  checkin.addEventListener('change', function () {
    checkout.selectedIndex = checkin.selectedIndex;
  });

  checkout.addEventListener('change', function () {
    checkin.selectedIndex = checkout.selectedIndex;
  });

})();
