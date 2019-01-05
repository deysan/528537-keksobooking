'use strict';

(function () {

  var addressElement = document.querySelector('#address');


  var openMap = function () {
    mapElement.classList.remove('map--faded');
  };

  var mapPinPosition = function () {
    var mapPinPositionX = Math.round(parseInt(mapPinElement.style.left, 10) + PIN_HALF_WIDTH);
    var mapPinPositionY = Math.round(parseInt(mapPinElement.style.top, 10) + PIN_HALF_HEIGHT);
    addressElement.value = mapPinPositionX + ', ' + mapPinPositionY;
  };

  var mapPins = function (offers) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item, index) {
      openCard(item, offers[index]);
    });
  };

  var activateMap = function () {
    var offers = generateOffers();
    openMap();
    renderOffers(offers);
    enableAdForm();
    mapPinPosition();
    mapPins(offers);

    mapPinElement.removeEventListener('mouseup', activateMap);
  };

  mapPinElement.addEventListener('mouseup', activateMap);

  var disabledMap = function () {
    for (var i = 0; i < formInputElement.length; i++) {
      formInputElement[i].disabled = true;
    }
  };

  disabledMap();

})();
