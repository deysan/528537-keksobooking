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
// var PROFILE_NUMBER = 8; // Переменная для количества обьектов

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

var profile = {
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


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPin = map.querySelector('.map__pin');
mapPin.style.left = profile.location.locationX + 'px';
mapPin.style.top = profile.location.locationY + 'px';
mapPin.querySelector('img').src = profile.author.avatar;
mapPin.querySelector('img').alt = profile.offer.title;

// console.log('left = ' + mapPin.style.left);
// console.log('top = ' + mapPin.style.top);
