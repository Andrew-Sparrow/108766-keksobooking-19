'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    load: load,
    errorHandler: errorHandler
  };

  var statusCode = {
    OK: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404
  };

  var TIMEOUT_IN_MS = 3000; // 3s

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case statusCode.OK:
          onLoad(xhr.response);
          break;
        case statusCode.badRequest:
          error = statusCode.badRequest + ' - Неверный запрос';
          break;
        case statusCode.unauthorized:
          error = statusCode.unauthorized + ' - Пользователь не авторизован';
          break;
        case statusCode.notFound:
          error = statusCode.notFound + ' - Ничего не найдено';
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
