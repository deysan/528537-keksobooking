'use strict';

(function () {

  // Константы
  var LOCATION_MIN_X = 0;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;

  // Переменные
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var mapElementWidth = mapElement.offsetWidth;
  var mapPinElement = document.querySelector('.map__pin');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinMainElementWidth = mapPinMainElement.offsetWidth;
  var mapPinMainElementHeight = mapPinMainElement.offsetHeight;
  var mapPinMainElementAfter = window.getComputedStyle(mapPinMainElement, '::after');
  var mapPinMainElementAfterHeight = parseInt(mapPinMainElementAfter.height, 10);
  var addressElement = document.querySelector('#address');
  var locationMaxX = mapElementWidth - mapPinMainElementWidth;
  var pinHalfWidth = mapPinMainElementWidth / 2;
  var pinHalfHeight = mapPinMainElementHeight + mapPinMainElementAfterHeight / 2;

  var generateOffersElement = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var avatar = pin.querySelector('img');
    pin.style.left = offer.location.x + 'px';
    pin.style.top = offer.location.y + 'px';
    avatar.src = offer.author.avatar;
    avatar.alt = offer.offer.title;

    return pin;
  };

  var mapPinPosition = function () {
    var mapPinPositionX = Math.round(parseInt(mapPinElement.style.left, 10) + pinHalfWidth);
    var mapPinPositionY = Math.round(parseInt(mapPinElement.style.top, 10) + pinHalfHeight);
    addressElement.value = mapPinPositionX + ', ' + mapPinPositionY;
  };

  var mapPinPositionX = Math.round(parseInt(mapPinElement.style.left, 10));
  var mapPinPositionY = Math.round(parseInt(mapPinElement.style.top, 10));

  var resetMapPinPosition = function () {
    mapPinElement.style.left = mapPinPositionX + 'px';
    mapPinElement.style.top = mapPinPositionY + 'px';
    mapPinPosition();
  };

  // Перемещения главного маркера
  mapPinElement.addEventListener('mousedown', function (evt) {
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
        x: mapPinElement.offsetLeft - shift.x,
        y: mapPinElement.offsetTop - shift.y
      };

      var minCoords = {
        x: Math.floor(LOCATION_MIN_X),
        y: Math.floor(LOCATION_MIN_Y - pinHalfHeight)
      };

      var maxCoords = {
        x: Math.floor(locationMaxX),
        y: Math.floor(LOCATION_MAX_Y - pinHalfHeight)
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

      mapPinElement.style.left = newCoords.x + 'px';
      mapPinElement.style.top = newCoords.y + 'px';

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

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins) {
      pins.forEach(function (item) {
        item.remove();
      });
    }
  };

  window.pin = {
    map: mapElement,
    mapElement: mapPinElement,
    mapElements: mapPinsElement,
    mapPosition: mapPinPosition,
    resetMapPosition: resetMapPinPosition,
    generateOffersElement: generateOffersElement,
    remove: removePins
  };

})();
