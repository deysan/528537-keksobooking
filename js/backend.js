'use strict';

(function () {

  var Code = {
    SUCCESS: 200
  };

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/dataы',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var prepareRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
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
  var save = function (data, onLoad, onError) {
    var xhr = prepareRequest(onLoad, onError);
    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
