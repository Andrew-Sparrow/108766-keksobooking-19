'use strict';

(function () {
  var templateError = document.querySelector('#error').content;
  var main = document.querySelector('main');

  window.errorSendForm = {
    errorHandler: errorHandler,
  };

  function clickOutside(evt) {
    var isClickInside = evt.target.firstElementChild.contains(evt.target);

    if (!isClickInside) {
      document.querySelector('main div.error').remove();
      window.removeEventListener('click', clickOutside);
      window.removeEventListener('click', pressEscapeError);
    }
  }

  function pressEscapeError(evt) {
    var key = evt.key;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      window.removeEventListener('click', clickOutside);
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

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        document.querySelector('main div.error').remove();
        window.removeEventListener('click', clickOutside);
      }
    });

    window.addEventListener('click', clickOutside);
  }

})();
