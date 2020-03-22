'use strict';

(function () {
  var TIMEOUT_SEND_FORM = 3000; // ms
  var URLtoSendForm = 'https://js.dump.academy/keksobooking1';
  var form = document.querySelector('.ad-form');
  var resetButton = form.querySelector('.ad-form__reset');

  function submitForm(evt) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', URLtoSendForm, true);

    xhr.addEventListener('load', function () {

      if (xhr.status === 200 && xhr.readyState === 4) {
        window.successSendForm.successSendForm();
      } else {
        window.errorSendForm.errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      window.errorSendForm.errorHandler();
    });

    xhr.timeout = TIMEOUT_SEND_FORM;

    xhr.addEventListener('timeout', function () {
      window.errorSendForm.errorHandler();
    });

    xhr.send(formData);
    evt.preventDefault();

  }

  form.addEventListener('submit', submitForm);

  resetButton.addEventListener('click', window.successSendForm.setFormInactiveState);

})();
