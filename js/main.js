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
var PROFILE_NUMBER = 8; // Переменная для количества обьектов

// Массивы
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Случайная число с округлением
var getRandomNumberRound = function (min, max) {
  return Math.round((Math.floor(Math.random() * (max - min)) + min) / 100) * 100; // Специально сделал цену с округлением до сотен
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

  var profile = [];

  for (var i = 0; i <= PROFILE_NUMBER; i++) {

    profile[i] = {
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

  return profile;
};


// Вывод в консоль для теста

// console.log('avatar = ' + profile.author.avatar);

// console.log('title = ' + profile.offer.title);
// console.log('address = ' + profile.offer.address);
// console.log('price = ' + profile.offer.price);
// console.log('type = ' + profile.offer.type);
// console.log('rooms = ' + profile.offer.rooms);
// console.log('guests = ' + profile.offer.guests);
// console.log('checkin = ' + profile.offer.checkin);
// console.log('checkout = ' + profile.offer.checkout);
// console.log('features = ' + profile.offer.features);
// console.log('description = ' + profile.offer.description);
// console.log('photos = ' + profile.offer.photos);

// console.log('locationX = ' + profile.location.locationX);
// console.log('locationY = ' + profile.location.locationY);


// Обьявления на странице

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var generateOffersElement = function () {
  var pin = document.querySelector('#pin').cloneNode(true);
  var mapPin = map.querySelector('.map__pin');
  var avatar = mapPin.querySelector('img');
  mapPin.style.left = profile.location.locationX + 'px';
  mapPin.style.top = profile.location.locationY + 'px';
  avatar.src = profile.author.avatar;
  avatar.alt = profile.offer.title;

  return pin;
};


var renderOffers = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < profile.length; i++) {
    fragment.appendChild(generateOffersElement(profile[i]));
  }
  return fragment;
};

// Данные первого обьявления

var generateCard = function () {
  var card = document.querySelector('#card').cloneNode(true);
  var mapCard = card.querySelector('.map__card');

  mapCard.querySelector('.popup__title').textContent = profile.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = profile.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = profile.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = profile.offer.type;
  mapCard.querySelector('.popup__text--capacity').textContent = profile.offer.rooms + ' комнаты для ' + profile.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + profile.offer.checkin + ', выезд до ' + profile.offer.checkout;
  mapCard.querySelector('.popup__features').textContent = profile.offer.features;
  mapCard.querySelector('.popup__description').textContent = profile.offer.description;
  mapCard.querySelector('.popup__photos').src = profile.offer.photos;
  mapCard.querySelector('.popup__avatar').src = profile.author.avatar;

  return card;
};

var renderCard = function (profile) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(profile);
  return fragment;
};

// Отрисовка на карте

var activate = function () {
  var offers = generateOffers(); // в цикле генерируем 8 объявлений со случайными данными
  renderOffers(offers); // рисуем объявления на странице (аналогично учебному с помощью fragment
  renderCard(profile[0]); // создаем карточку объявления на основе первого элемента из массива объявлений
};

activate();


// console.log('left = ' + mapPin.style.left);
// console.log('top = ' + mapPin.style.top);
