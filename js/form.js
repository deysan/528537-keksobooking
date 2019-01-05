'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  var formInputElement = formElement.querySelectorAll('fieldset');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var capacityOptionElement = capacityElement.querySelectorAll('option');
  var priceElement = document.querySelector('#price');
  var typeElement = document.querySelector('#type');
  var timesInElement = document.querySelector('#timein');
  var timesOutElement = document.querySelector('#timeout');

  var enableAdForm = function () {
    formElement.classList.remove('ad-form--disabled');

    for (var i = 0; i < formInputElement.length; i++) {
      formInputElement[i].disabled = false;
    }
  };

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
    minPriceByType(window.data.PRICE_BY_TYPE[evt.target.value]);
  });

  // Синхронизация времени заезда и выезда
  timesInElement.addEventListener('change', function (evt) {
    timesOutElement.value = evt.target.value;
  });

  timesOutElement.addEventListener('change', function (evt) {
    timesInElement.value = evt.target.value;
  });

  window.form = {
    formElement: formElement,
    formInputElement: formInputElement,
    enableAdForm: enableAdForm
  };

})();
