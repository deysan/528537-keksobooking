'use strict';

(function () {

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var prepareRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;
        case Code.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case Code.NOT_FOUND:
          onError('Данные по запросу не найдены');
          break;
        case Code.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;
        default:
          onError('Неизвестный результат ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = 10000;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  // Загружка данных
  var load = function (onLoad, onError) {
    var xhr = prepareRequest(onLoad, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  // Отправка данных
  var upload = function (data, onLoad, onError) {
    var xhr = prepareRequest(onLoad, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
