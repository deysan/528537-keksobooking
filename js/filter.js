'use strict';

(function () {

  var mapFiltersElement = document.querySelector('.map__filters');
  var filterTypeElement = document.querySelector('#housing-type');

  var filteredType = function (offer) {
    return (filterTypeElement.value === 'any' || filterTypeElement.value === offer.offer.type);
  };

  var onFilterChange = function (func) {
    mapFiltersElement.addEventListener('change', func);
  };

  var filteredOffer = function (array) {
    window.card.remove();
    window.pin.remove();
    var filterOffer = array.filter(function (offer) {
      return (filteredType(offer));
    });
    return filterOffer;
  };

  window.filter = {
    change: onFilterChange,
    offer: filteredOffer
  };

})();
