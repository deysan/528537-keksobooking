'use strict';

(function () {

  // Вывод всплывающего окна

  var mainElement = document.querySelector('main');
  var successTemplate = document.querySelector('#success');
  var errorTemplate = document.querySelector('#error');

  var onSuccess = function () {
    var fragment = document.createDocumentFragment();
    var successElement = successTemplate.content.querySelector('.success');

    fragment.appendChild(successElement);
    mainElement.appendChild(fragment);

    document.addEventListener('keydown', removePopup);
    document.addEventListener('mousedown', removePopup);
  };

  var onError = function () {
    var fragment = document.createDocumentFragment();
    var errorElement = errorTemplate.content.querySelector('.error');

    fragment.appendChild(errorElement);
    mainElement.appendChild(fragment);

    onButton();

    document.addEventListener('keydown', removePopup);
    document.addEventListener('mousedown', removePopup);
  };

  var removePopup = function () {
    var popupSuccess = document.querySelector('.success');
    var popupError = document.querySelector('.error');

    if (popupSuccess) {
      popupSuccess.remove();
    } else if (popupError) {
      popupError.remove();
    }

    window.map.dectivate();

    document.removeEventListener('keydown', removePopup);
    document.removeEventListener('mousedown', removePopup);
  };

  var onButton = function () {
    var buttonError = document.querySelector('.error__button');

    buttonError.addEventListener('click', function (evt) {
      evt.preventDefault();
      removePopup();
    });

    buttonError.addEventListener('keydown', function (evt) {
      evt.preventDefault();

      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        removePopup();
      }
    });

    window.pin.resetMapPosition();
  };

  // Обработчик отправки формы
  window.form.element.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.element), function () {
      onSuccess();
      window.map.dectivate();
    }, onError);
  });

  window.popup = {
    onError: onError
  };

})();
