'use strict';

(function () {

  var openMap = function () {
    window.pin.map.classList.remove('map--faded');
  };

  var closeMap = function () {
    window.pin.map.classList.add('map--faded');
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
      window.pin.mapElements.appendChild(window.card.renderOffers(array));
    }, window.popup.onError);

    window.form.enable();
    window.pin.mapPosition();
    window.backend.load(mapPins);

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
  };

})();
