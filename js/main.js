'use strict';

// Переменные
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
var mapElement = document.querySelector('.map');
var mapElementWidth = mapElement.offsetWidth;
var mapPinElement = document.querySelector('.map__pin');
var mapPinElementWidth = mapPinElement.offsetWidth;
var mapPinElementHeight = mapPinElement.offsetHeight;
var mapPinMainElement = document.querySelector('.map__pin--main');
var mapPinMainElementWidth = mapPinMainElement.offsetWidth;
var mapPinMainElementHeight = mapPinMainElement.offsetHeight;
var mapPinMainElementAfter = window.getComputedStyle(mapPinMainElement, '::after');
var mapPinMainElementAfterHeight = parseInt(mapPinMainElementAfter.height, 10);
var formElement = document.querySelector('.ad-form');
var formInputElement = formElement.querySelectorAll('fieldset');
var addressElement = document.querySelector('#address');
var roomNumberElement = document.querySelector('#room_number');
var capacityElement = document.querySelector('#capacity');
var capacityOptionElement = capacityElement.querySelectorAll('option');
var priceElement = document.querySelector('#price');
var typeElement = document.querySelector('#type');
var timesInElement = document.querySelector('#timein');
var timesOutElement = document.querySelector('#timeout');

// Константы
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var LOCATION_MIN_X = 0;
var LOCATION_MAX_X = mapElementWidth;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var PIN_HALF_WIDTH = mapPinMainElementWidth / 2;
var PIN_HALF_HEIGHT = mapPinMainElementHeight + mapPinMainElementAfterHeight / 2;
var OFFERS_NUMBER = 8;

var ESC_KEYCODE = 27;

// Массивы
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = [{type: 'palace', name: 'Дворец'}, {type: 'flat', name: 'Квартира'}, {type: 'house', name: 'Дом'}, {type: 'bungalo', name: 'Бунгало'}];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICE_BY_TYPE = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};

// Случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Случайная число с округлением
var getRandomNumberRound = function (min, max) {
  return Math.round((Math.floor(Math.random() * (max - min)) + min) / 100) * 100;
};

// Случаные данные из массива
var getRandomFromList = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Случайная длина массива
var getRandomSliceList = function (array) {
  return array.slice((getRandomNumber(0, array.length)));
};

// Перемешивание массива
var getShuffleList = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var generateOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_NUMBER; i++) {

    var locationX = getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X - mapPinElementWidth);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y - mapPinElementHeight);

    offers[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: getRandomFromList(TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomNumberRound(PRICE_MIN, PRICE_MAX),
        type: getRandomFromList(TYPES),
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomFromList(TIMES),
        checkout: getRandomFromList(TIMES),
        features: getRandomSliceList(FEATURES),
        description: 'Описание',
        photos: getShuffleList(PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  return offers;
};

var renderPhoto = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.offer.photos.length; i++) {
    var photo = photoTemplate.cloneNode(true);
    photo.src = array.offer.photos[i];
    fragment.appendChild(photo);
  }

  return fragment;
};

// Обьявления на странице
var openMap = function () {
  mapElement.classList.remove('map--faded');
};

var generateOffersElement = function (offer) {
  var pin = pinTemplate.cloneNode(true);
  var avatar = pin.querySelector('img');
  pin.style.left = offer.location.x + 'px';
  pin.style.top = offer.location.y + 'px';
  avatar.src = offer.author.avatar;
  avatar.alt = offer.offer.title;

  return pin;
};

var renderOffers = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(generateOffersElement(array[i]));
  }
  mapElement.appendChild(fragment);
};

// Вывод данных обьявления
var generateCard = function (offer) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offer.offer.title;
  card.querySelector('.popup__text--address').textContent = offer.offer.address;
  card.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = offer.offer.type.name;
  card.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  card.querySelector('.popup__features').textContent = offer.offer.features;
  card.querySelector('.popup__description').textContent = offer.offer.description;
  card.querySelector('.popup__photos').textContent = '';
  card.querySelector('.popup__photos').appendChild(renderPhoto(offer));
  card.querySelector('.popup__avatar').src = offer.author.avatar;

  return card;
};

// Отрисовка на карте
var enableAdForm = function () {
  formElement.classList.remove('ad-form--disabled');

  for (var i = 0; i < formInputElement.length; i++) {
    formInputElement[i].disabled = false;
  }
};

var mapPinPosition = function () {
  var mapPinPositionX = Math.round(parseInt(mapPinMainElement.style.left, 10) + PIN_HALF_WIDTH);
  var mapPinPositionY = Math.round(parseInt(mapPinMainElement.style.top, 10) + PIN_HALF_HEIGHT);
  addressElement.value = mapPinPositionX + ', ' + mapPinPositionY;
};

var mapPins = function (offers) {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (item, index) {
    openCard(item, offers[index]);
  });
};

var activateMap = function () {
  var offers = generateOffers();
  openMap();
  renderOffers(offers);
  enableAdForm();
  mapPinPosition();
  mapPins(offers);

  mapPinMainElement.removeEventListener('mouseup', activateMap);
};

// ТЗ 1. Активация страницы
mapPinMainElement.addEventListener('mouseup', activateMap);

// Неактивное состояние
var disabledMap = function () {
  for (var i = 0; i < formInputElement.length; i++) {
    formInputElement[i].disabled = true;
  }
};

disabledMap();

// Функции открытия и закрытия карточки
var openCard = function (pinOnMap, offers) {
  pinOnMap.addEventListener('click', function addOpenCardClickHandler() {
    removeCard();
    var mapCardOne = mapElement.appendChild(generateCard(offers));
    addCloseCardClickHandler(mapCardOne);
  });
};

var addCloseCardClickHandler = function (card) {
  var cardClose = card.querySelector('.popup__close');
  document.addEventListener('keydown', popupEscHandler);
  cardClose.addEventListener('click', removeCard);
};

var popupEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removeCard();
  }
};

var removeCard = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }
  document.removeEventListener('keydown', popupEscHandler);
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
  minPriceByType(PRICE_BY_TYPE[evt.target.value]);
});

// Синхронизация времени заезда и выезда
timesInElement.addEventListener('change', function (evt) {
  timesOutElement.value = evt.target.value;
});

timesOutElement.addEventListener('change', function (evt) {
  timesInElement.value = evt.target.value;
});

// Перемещения главного маркера

mapPinMainElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newCoords = {
      x: mapPinMainElement.offsetLeft - shift.x,
      y: mapPinMainElement.offsetTop - shift.y
    };

    var minCoords = {
      x: Math.floor(LOCATION_MIN_X),
      y: Math.floor(LOCATION_MIN_Y - PIN_HALF_HEIGHT)
    };

    var maxCoords = {
      x: Math.floor(mapElementWidth - mapPinMainElementWidth),
      y: Math.floor(LOCATION_MAX_Y - PIN_HALF_HEIGHT)
    };

    if (newCoords.x < minCoords.x) {
      newCoords.x = minCoords.x;
    } else if (newCoords.x > maxCoords.x) {
      newCoords.x = maxCoords.x;
    }

    if (newCoords.y < minCoords.y) {
      newCoords.y = minCoords.y;
    } else if (newCoords.y > maxCoords.y) {
      newCoords.y = maxCoords.y;
    }

    mapPinMainElement.style.left = newCoords.x + 'px';
    mapPinMainElement.style.top = newCoords.y + 'px';

    mapPinPosition();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
