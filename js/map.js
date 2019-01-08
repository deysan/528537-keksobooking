'use strict';

(function () {

  // var errorElement = document.querySelector('.error');

  var loadData = function () {
    window.backend.load(function (array) {
      window.pin.mapElements.appendChild(window.card.renderOffers(array));
      mapPins(array);
    }, window.popup.onError);
  };

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
    loadData();

    if (loadData) {
      openMap();
      window.form.enable();
      window.pin.mapPosition();
    }

    window.pin.mapElement.removeEventListener('mouseup', activateMap);
  };

  var dectivateMap = function () {
    closeMap();
    window.card.remove();
    window.form.disable();
    window.pin.remove();
    window.pin.resetMapPosition();
  };

  window.pin.mapElement.addEventListener('mouseup', activateMap);


  // activateMap();

  window.map = {
    dectivate: dectivateMap
  };

})();
