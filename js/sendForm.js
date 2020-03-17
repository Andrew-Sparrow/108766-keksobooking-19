'use strict';

(function () {
  var URLtoSendForm = 'https://js.dump.academy/keksobooking1';
  var form = document.querySelector('.ad-form');
  var resetButton = form.querySelector('.ad-form__reset');


  form.addEventListener('submit', function (evt) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', URLtoSendForm, true);

    xhr.onload = function () {

      if (xhr.status === 200 && xhr.readyState === 4) {
        window.successSendForm.successSendForm();
      } else {
        window.errorSendForm.errorHandler();
      }
    };
    xhr.send(formData);
    evt.preventDefault();

  }, false);

  resetButton.addEventListener('click', window.successSendForm.setFormInactiveState);

})();
