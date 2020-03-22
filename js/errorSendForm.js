'use strict';

(function () {
  var templateError = document.querySelector('#error').content;
  var main = document.querySelector('main');

  window.errorSendForm = {
    onError: onError,
  };

  function clickOutsideError(evt) {
    var isClickOutside = evt.target.contains(evt.target.firstElementChild);

    if (isClickOutside) {
      document.querySelector('main div.error').remove();
      window.removeEventListener('click', clickOutsideError);
      window.removeEventListener('keydown', pressEscapeError);
    }
  }

  function pressEscapeError(evt) {
    var key = evt.key;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      main.querySelector('div.error').remove();
      window.removeEventListener('click', clickOutsideError);
      window.removeEventListener('keydown', pressEscapeError);
    }
  }

  function onError() {

    var containerError = templateError.cloneNode(true);
    var errorButton = containerError.querySelector('.error__button');
    main.appendChild(containerError);

    errorButton.addEventListener('click', function () {
      document.querySelector('main div.error').remove();
    });

    window.addEventListener('keydown', pressEscapeError);
    window.addEventListener('click', clickOutsideError);
  }

})();
