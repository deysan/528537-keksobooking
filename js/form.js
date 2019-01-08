'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  var resetFormElement = document.querySelector('.ad-form__reset');
  var formInputElement = formElement.querySelectorAll('fieldset');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var capacityOptionElement = capacityElement.querySelectorAll('option');
  var priceElement = document.querySelector('#price');
  var typeElement = document.querySelector('#type');
  var timesInElement = document.querySelector('#timein');
  var timesOutElement = document.querySelector('#timeout');

  var PRICE_BY_TYPE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var enableAdForm = function () {
    formElement.classList.remove('ad-form--disabled');
    for (var i = 0; i < formInputElement.length; i++) {
      formInputElement[i].disabled = false;
    }
  };

  var disableAdForm = function () {
    formElement.classList.add('ad-form--disabled');
    for (var i = 0; i < formInputElement.length; i++) {
      formInputElement[i].disabled = true;
    }
  };

  resetFormElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    formElement.reset();
    window.map.dectivate();
  });


  disableAdForm();

  // Функция выбора количества комнат и гостей
  var onCapacityChange = function () {
    if (roomNumberElement.value === '1') {
      capacityOptionElement[0].setAttribute('disabled', true);
      capacityOptionElement[1].setAttribute('disabled', true);
      capacityOptionElement[2].removeAttribute('disabled');
      capacityOptionElement[3].setAttribute('disabled', true);
      capacityElement.value = '1';
    } else if (roomNumberElement.value === '2') {
      capacityOptionElement[0].setAttribute('disabled', true);
      capacityOptionElement[1].removeAttribute('disabled');
      capacityOptionElement[2].removeAttribute('disabled');
      capacityOptionElement[3].setAttribute('disabled', true);
      capacityElement.value = '2';
    } else if (roomNumberElement.value === '3') {
      capacityOptionElement[0].removeAttribute('disabled');
      capacityOptionElement[1].removeAttribute('disabled');
      capacityOptionElement[2].removeAttribute('disabled');
      capacityOptionElement[3].setAttribute('disabled', true);
      capacityElement.value = '3';
    } else if (roomNumberElement.value === '100') {
      capacityOptionElement[0].setAttribute('disabled', true);
      capacityOptionElement[1].setAttribute('disabled', true);
      capacityOptionElement[2].setAttribute('disabled', true);
      capacityOptionElement[3].removeAttribute('disabled');
      capacityElement.value = '0';
    }
  };

  onCapacityChange();
  roomNumberElement.addEventListener('change', onCapacityChange);

  // Минимальная цена в зависимости от жилья
  var minPriceByType = function (price) {
    priceElement.min = price;
    priceElement.placeholder = price;
  };

  typeElement.addEventListener('change', function (evt) {
    priceElement.value = '';
    minPriceByType(PRICE_BY_TYPE[evt.target.value]);
  });

  // Синхронизация времени заезда и выезда
  timesInElement.addEventListener('change', function (evt) {
    timesOutElement.value = evt.target.value;
  });

  timesOutElement.addEventListener('change', function (evt) {
    timesInElement.value = evt.target.value;
  });

  // Обработчик отправки формы
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formElement), function () {
      window.popup.onSuccess();
      window.map.dectivate();
    }, window.popup.onError);
  });

  window.form = {
    element: formElement,
    formInputElement: formInputElement,
    enable: enableAdForm,
    disable: disableAdForm
  };

})();
