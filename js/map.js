'use strict';

(function () {

  var loadData = function () {
    window.backend.load(function (array) {
      window.filter.change(function () {
        window.debounce(function () {
          window.card.remove();
          mapPins(array);
        });
      });
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
    var offer = window.filter.offer(offers);
    window.pin.mapElements.appendChild(window.card.renderOffers(offer));
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item, index) {
      window.card.open(item, offer[index]);
    });
  };

  var activateMap = function () {
    loadData();

    if (loadData) {
      openMap();
      window.form.enable();
      window.filter.enable();
      window.pin.mapPosition();
    }

    window.pin.mapElement.removeEventListener('mouseup', activateMap);
  };

  var dectivateMap = function () {
    closeMap();
    window.card.remove();
    window.pin.resetMapPosition();
    window.form.element.reset();
    window.form.disable();
    window.filter.element.reset();
    window.filter.disable();
    window.pin.remove();
    window.pin.mapElement.addEventListener('mouseup', activateMap);
  };

  window.pin.mapElement.addEventListener('mouseup', activateMap);

  window.form.reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.element.reset();
    window.map.dectivate();
  });

  window.map = {
    activate: activateMap,
    dectivate: dectivateMap,
    pins: mapPins
  };

})();
