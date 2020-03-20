'use strict';

(function () {
  var TIMEOUT_IN_MS = 3000; // 3s

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var URL = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    load: load,
    errorHandler: errorHandler,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    statusCode: StatusCode,
  };

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = StatusCode.BAD_REQUEST + ' - Неверный запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = StatusCode.UNAUTHORIZED + ' - Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = StatusCode.NOT_FOUND + ' - Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style =
      'z-index: 100;' +
      ' margin: 0 auto;' +
      ' text-align: center;' +
      ' background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

})();
