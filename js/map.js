'use strict';

(function () {

  var openMap = function () {
    window.data.mapElement.classList.remove('map--faded');
  };

  var mapPins = function (offers) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item, index) {
      window.card.openCard(item, offers[index]);
    });
  };

  var activateMap = function () {
    var offers = window.data.generateOffers();
    openMap();
    window.card.renderOffers(offers);
    window.form.enableAdForm();
    window.pin.mapPinPosition();
    mapPins(offers);

    window.pin.mapPinElement.removeEventListener('mouseup', activateMap);
  };

  window.pin.mapPinElement.addEventListener('mouseup', activateMap);

  var disabledMap = function () {
    for (var i = 0; i < window.form.formInputElement.length; i++) {
      window.form.formInputElement[i].disabled = true;
    }
  };

  disabledMap();

})();
