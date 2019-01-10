'use strict';

(function () {

  var mapFiltersElement = document.querySelector('.map__filters');
  var filterTypeElement = document.querySelector('#housing-type');
  var filterPriceElement = document.querySelector('#housing-price');

  var filteredType = function (offer) {
    return (filterTypeElement.value === 'any' || filterTypeElement.value === offer.offer.type);
  };

  var filteredPrice = function (offer) {
    if (filterPriceElement.value === 'low') {
      return (10000 > offer.offer.price);
    } else if (filterPriceElement.value === 'middle') {
      return (10000 <= offer.offer.price && offer.offer.price < 50000);
    } else if (filterPriceElement.value === 'high') {
      return (50000 <= offer.offer.price);
    }
    return true;
};

  var onFilterChange = function (func) {
    mapFiltersElement.addEventListener('change', func);
  };

  var filteredOffer = function (array) {
    window.card.remove();
    window.pin.remove();
    var filterOffer = array.filter(function (offer) {
      return (filteredType(offer) && filteredPrice(offer));
    });
    return filterOffer;
  };

  window.filter = {
    change: onFilterChange,
    offer: filteredOffer
  };

})();
