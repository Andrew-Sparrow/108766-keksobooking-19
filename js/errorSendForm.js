'use strict';

(function () {
  var templateError = document.querySelector('#error').content;
  var main = document.querySelector('main');

  window.errorSendForm = {
    errorHandler: errorHandler,
  };

  function clickOutside(event) {
    var isClickInside = event.target.firstElementChild.contains(event.target);

    if (!isClickInside) {
      event.target.remove();
      window.removeEventListener('click', clickOutside);
    }
  }

  function errorHandler() {
    var containerError = templateError.cloneNode(true);
    var errorButton = containerError.querySelector('.error__button');
    main.appendChild(containerError);

    errorButton.onclick = function () {
      document.querySelector('main div.error').remove();
    };

    window.onkeydown = function (event) {
      if (event.key === 'Escape') {
        document.querySelector('main div.error').remove();
        window.removeEventListener('click', clickOutside);
      }
    };

    window.addEventListener('click', clickOutside);
  }

})();
