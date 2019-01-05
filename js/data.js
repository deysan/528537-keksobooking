'use strict';

(function () {

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

  // Константы
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var LOCATION_MIN_X = 0;
  var LOCATION_MAX_X = mapElementWidth - mapPinElementWidth;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;
  var PIN_HALF_WIDTH = mapPinMainElementWidth / 2;
  var PIN_HALF_HEIGHT = mapPinMainElementHeight + mapPinMainElementAfterHeight / 2;
  var OFFERS_NUMBER = 8;

  // Массивы
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = [{
    type: 'palace',
    name: 'Дворец'
  }, {
    type: 'flat',
    name: 'Квартира'
  }, {
    type: 'house',
    name: 'Дом'
  }, {
    type: 'bungalo',
    name: 'Бунгало'
  }];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PRICE_BY_TYPE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var generateOffers = function () {
    var offers = [];
    for (var i = 0; i < OFFERS_NUMBER; i++) {

      var locationX = window.util.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X - mapPinElementWidth);
      var locationY = window.util.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y - mapPinElementHeight);

      offers[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: window.util.getRandomFromList(TITLES),
          address: locationX + ', ' + locationY,
          price: window.util.getRandomNumberRound(PRICE_MIN, PRICE_MAX),
          type: window.util.getRandomFromList(TYPES),
          rooms: window.util.getRandomNumber(ROOMS_MIN, ROOMS_MAX),
          guests: window.util.getRandomNumber(GUESTS_MIN, GUESTS_MAX),
          checkin: window.util.getRandomFromList(TIMES),
          checkout: window.util.getRandomFromList(TIMES),
          features: window.util.getRandomSliceList(FEATURES),
          description: 'Описание',
          photos: window.util.getShuffleList(PHOTOS)
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

  window.data = {
    mapElement: mapElement,
    mapElementWidth: mapElementWidth,
    mapPinMainElementWidth: mapPinMainElementWidth,
    LOCATION_MIN_X: LOCATION_MIN_X,
    LOCATION_MAX_X: LOCATION_MAX_X,
    LOCATION_MIN_Y: LOCATION_MIN_Y,
    LOCATION_MAX_Y: LOCATION_MAX_Y,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    PIN_HALF_HEIGHT: PIN_HALF_HEIGHT,
    PRICE_BY_TYPE: PRICE_BY_TYPE,
    generateOffers: generateOffers,
    renderPhoto: renderPhoto
  };

})();
