'use strict';

(function () {

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var filtersElement = document.querySelector('.map__filters');
  var filterTypeElement = document.querySelector('#housing-type');
  var filterPriceElement = document.querySelector('#housing-price');
  var filterRoomsElement = document.querySelector('#housing-rooms');
  var filterGuestsElement = document.querySelector('#housing-guests');
  var filterFeaturesElement = document.querySelector('#housing-features');
  var filterInputElement = filtersElement.querySelectorAll('input[type="checkbox"]');
  var filterSelectElement = filtersElement.querySelectorAll('select');

  var filterType = function (offer) {
    return (filterTypeElement.value === 'any' || filterTypeElement.value === offer.offer.type);
  };

  var filterPrice = function (offer) {
    if (filterPriceElement.value === 'low') {
      return (MIN_PRICE > offer.offer.price);
    } else if (filterPriceElement.value === 'middle') {
      return (MIN_PRICE <= offer.offer.price && offer.offer.price < MAX_PRICE);
    } else if (filterPriceElement.value === 'high') {
      return (MAX_PRICE <= offer.offer.price);
    }
    return true;
  };

  var filterRoom = function (offer) {
    return (Number(filterRoomsElement.value) === offer.offer.rooms || filterRoomsElement.value === 'any');
  };

  var filterGuests = function (offer) {
    return (Number(filterGuestsElement.value) === offer.offer.guests || filterGuestsElement.value === 'any');
  };

  var filterFeatures = function (offer) {
    var checkedFeatures = filterFeaturesElement.querySelectorAll('input:checked');
    var feature = true;
    Array.from(checkedFeatures).every(function (checkbox) {
      feature = offer.offer.features.indexOf(checkbox.value) !== -1;
      return feature;
    });
    return feature;
  };

  var onFilterChange = function (func) {
    filtersElement.addEventListener('change', func);
  };

  var filterOffers = function (array) {
    window.card.remove();
    window.pin.remove();
    var filterOffer = array.filter(function (offer) {
      return (filterType(offer) && filterPrice(offer) && filterRoom(offer) && filterGuests(offer) && filterFeatures(offer));
    });
    return filterOffer;
  };

  var enableAdForm = function () {
    filterInputElement.forEach(function (element) {
      element.removeAttribute('disabled');
    });
    filterSelectElement.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var disableAdForm = function () {
    filterInputElement.forEach(function (element) {
      element.setAttribute('disabled', true);
    });
    filterSelectElement.forEach(function (element) {
      element.setAttribute('disabled', true);
    });
  };

  disableAdForm();

  window.filter = {
    element: filtersElement,
    change: onFilterChange,
    offer: filterOffers,
    disable: disableAdForm,
    enable: enableAdForm
  };

})();
