'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinElement = document.querySelector('.map__pin');
  var addressElement = document.querySelector('#address');

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
    var mapPinPositionX = Math.round(parseInt(mapPinElement.style.left, 10) + window.data.PIN_HALF_WIDTH);
    var mapPinPositionY = Math.round(parseInt(mapPinElement.style.top, 10) + window.data.PIN_HALF_HEIGHT);
    addressElement.value = mapPinPositionX + ', ' + mapPinPositionY;
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
        x: Math.floor(window.data.LOCATION_MIN_X),
        y: Math.floor(window.data.LOCATION_MIN_Y - window.data.PIN_HALF_HEIGHT)
      };

      var maxCoords = {
        x: Math.floor(window.data.mapElementWidth - window.data.mapPinMainElementWidth),
        y: Math.floor(window.data.LOCATION_MAX_Y - window.data.PIN_HALF_HEIGHT)
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

  window.pin = {
    mapPinElement: mapPinElement,
    mapPinPosition: mapPinPosition,
    generateOffersElement: generateOffersElement
  };

})();
