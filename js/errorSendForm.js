'use strict';

(function () {
  var templateError = document.querySelector('#error').content;
  var main = document.querySelector('main');

  window.errorSendForm = {
    errorHandler: errorHandler,
  };

  function clickOutsideError(evt) {
    var isClickOutside = evt.target.contains(evt.target.firstElementChild);

    if (isClickOutside) {
      document.querySelector('main div.error').remove();
      window.removeEventListener('click', clickOutsideError);
      window.removeEventListener('click', pressEscapeError);
    }
  }

  function pressEscapeError(evt) {
    var key = evt.key;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      window.removeEventListener('click', clickOutsideError);
      window.removeEventListener('keydown', pressEscapeError);
      main.querySelector('div.error').remove();
    }
  }

  function errorHandler() {

    var containerError = templateError.cloneNode(true);
    var errorButton = containerError.querySelector('.error__button');
    main.appendChild(containerError);

    errorButton.onclick = function () {
      document.querySelector('main div.error').remove();
    };

    window.addEventListener('keydown', pressEscapeError);
    window.addEventListener('click', clickOutsideError);
  }

})();
