'use strict';

(function () {

  // Переменные
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
        y: Math.floor(LOCATION_MIN_Y - PIN_HALF_HEIGHT)
      };

      var maxCoords = {
        x: Math.floor(mapElementWidth - mapPinElementWidth),
        y: Math.floor(LOCATION_MAX_Y - PIN_HALF_HEIGHT)
      };

      if (newCoords.y < minCoords.y) {
        newCoords.y = minCoords.y;
      }

      if (newCoords.y > maxCoords.y) {
        newCoords.y = maxCoords.y;
      }

      if (newCoords.x < minCoords.x) {
        newCoords.x = minCoords.x;
      }

      if (newCoords.x > maxCoords.x) {
        newCoords.x = maxCoords.x;
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

})();
