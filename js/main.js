'use strict';

// Константы
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var OFFERS_NUMBER = 8;

// Массивы
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Переменные
var map = document.querySelector('.map');

// Случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Случайная число с округлением
var getRandomNumberRound = function (min, max) {
  return Math.round((Math.floor(Math.random() * (max - min)) + min) / 100) * 100;
};

// Случаные данные из массива
var getRandomList = function (array) {
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

    offers[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
      },

      offer: {
        title: getRandomList(TITLES),
        address: 'location.' + getRandomNumber(100, 1000) + ',' + 'location.' + getRandomNumber(100, 1000), // Временное решение
        price: getRandomNumberRound(PRICE_MIN, PRICE_MAX),
        type: getRandomList(TYPES),
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomList(TIMES),
        checkout: getRandomList(TIMES),
        features: getRandomSliceList(FEATURES),
        description: '',
        photos: getShuffleList(PHOTOS)
      },

      location: {
        locationX: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y),
        locationY: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y)
      }
    };
  }

  return offers;
};

// Обьявления на странице
var openMap = function () {
  map.classList.remove('map--faded');
};

var generateOffersElement = function (offers) {
  var pin = document.querySelector('#pin').cloneNode(true);
  var mapPin = map.querySelector('.map__pin');
  var avatar = mapPin.querySelector('img');
  mapPin.style.left = offers.location.locationX + 'px';
  mapPin.style.top = offers.location.locationY + 'px';
  avatar.src = offers.author.avatar;
  avatar.alt = offers.offer.title;

  return pin;
};

var renderOffers = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(generateOffersElement(array[i]));
  }

  return fragment;
};

// Вывод данных обьявления
var generateCard = function (offers) {
  var card = document.querySelector('#card').cloneNode(true);
  var mapCard = card.querySelector('.map__card');
  mapCard.querySelector('.popup__title').textContent = offers.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offers.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = offers.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = offers.offer.type;
  mapCard.querySelector('.popup__text--capacity').textContent = offers.offer.rooms + ' комнаты для ' + offers.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers.offer.checkin + ', выезд до ' + offers.offer.checkout;
  mapCard.querySelector('.popup__features').textContent = offers.offer.features;
  mapCard.querySelector('.popup__description').textContent = offers.offer.description;
  mapCard.querySelector('.popup__photos').src = offers.offer.photos;
  mapCard.querySelector('.popup__avatar').src = offers.author.avatar;

  return card;
};

var renderCard = function (array) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(generateCard(array));

  return fragment;
};

// Отрисовка на карте
var activate = function () {
  var offers = generateOffers();
  openMap();
  renderOffers(offers);
  renderCard(offers[0]);
};

activate();
