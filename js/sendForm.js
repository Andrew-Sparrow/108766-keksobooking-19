'use strict';

(function () {
  var URLtoSendForm = 'https://js.dump.academy/keksobooking';
  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URLtoSendForm, true);

    xhr.onload = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        window.setFormInactiveState.setFormOnInactiveState();
      } else {
        console.log('error');
      }
    };
    xhr.send(formData);
    evt.preventDefault();

  }, false);

})();
