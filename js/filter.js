'use strict';

(function () {

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var mapFiltersElement = document.querySelector('.map__filters');
  var filterTypeElement = document.querySelector('#housing-type');
  var filterPriceElement = document.querySelector('#housing-price');
  var filterRoomsElement = document.querySelector('#housing-rooms');
  var filterGuestsElement = document.querySelector('#housing-guests');

  var filteredType = function (offer) {
    return (filterTypeElement.value === 'any' || filterTypeElement.value === offer.offer.type);
  };

  var filteredPrice = function (offer) {
    if (filterPriceElement.value === 'low') {
      return (MIN_PRICE > offer.offer.price);
    } else if (filterPriceElement.value === 'middle') {
      return (MIN_PRICE <= offer.offer.price && offer.offer.price < MAX_PRICE);
    } else if (filterPriceElement.value === 'high') {
      return (MAX_PRICE <= offer.offer.price);
    }
    return true;
  };

  var filteredRooms = function (offer) {
    return (Number(filterRoomsElement.value) === offer.offer.rooms || filterRoomsElement.value === 'any');
  };

  var filteredGuests = function (offer) {
    return (Number(filterGuestsElement.value) === offer.offer.guests || filterGuestsElement.value === 'any');
  };

  var onFilterChange = function (func) {
    mapFiltersElement.addEventListener('change', func);
  };

  var filteredOffer = function (array) {
    window.card.remove();
    window.pin.remove();
    var filterOffer = array.filter(function (offer) {
      return (filteredType(offer) && filteredPrice(offer) && filteredRooms(offer) && filteredGuests(offer));
    });
    return filterOffer;
  };

  window.filter = {
    change: onFilterChange,
    offer: filteredOffer
  };

})();
