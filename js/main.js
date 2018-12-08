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
var TYPES = [{type:'palace',name:'Дворец'}, {type:'flat',name:'Квартира'}, {type:'house',name:'Дом'}, {type:'bungalo',name:'Бунгало'}];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Переменные
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

    var locationX = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    offers[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
      },

      offer: {
        title: getRandomList(TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomNumberRound(PRICE_MIN, PRICE_MAX),
        type: getRandomList(TYPES),
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomList(TIMES),
        checkout: getRandomList(TIMES),
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

// Обьявления на странице
var openMap = function () {
  map.classList.remove('map--faded');
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

  map.appendChild(fragment);
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
  card.querySelector('.popup__photo').src = offer.offer.photos;
  card.querySelector('.popup__avatar').src = offer.author.avatar;

  return card;
};

var renderCard = function (array) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(generateCard(array));

  map.appendChild(fragment);
};

// Отрисовка на карте
var activate = function () {
  var offers = generateOffers();
  openMap();
  renderOffers(offers);
  renderCard(offers[0]);
};

activate();
