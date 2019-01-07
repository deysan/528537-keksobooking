'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');

  var openMap = function () {
    window.pin.mapElement.classList.remove('map--faded');
  };

  var closeMap = function () {
    window.pin.mapElement.classList.add('map--faded');
  };

  var mapPins = function (offers) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item, index) {
      window.card.open(item, offers[index]);
    });
  };

  var activateMap = function () {
    openMap();

    window.backend.load(function (array) {
      mapPinsElement.appendChild(window.card.renderOffers(array));
    }, window.popup.onError);

    window.form.enable();
    window.pin.mapPosition();
    mapPins();

    window.pin.mapElement.removeEventListener('mouseup', activateMap);
  };

  var dectivateMap = function () {
    closeMap();
    // closeCardPopup();
    window.form.disable();
    window.pin.remove();
    // window.form.resetLocationMapPinMain();
  };

  window.pin.mapElement.addEventListener('mouseup', activateMap);

  // activateMap();

  window.map = {
    dectivate: dectivateMap
  }

})();
