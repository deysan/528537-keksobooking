'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

  var renderPhoto = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.offer.photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = array.offer.photos[i];
      fragment.appendChild(photo);
    }

    return fragment;
  };

  // Проверка элементов карточки

  // Вывод данных обьявления
  var generateCard = function (offer) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = offer.offer.title;
    card.querySelector('.popup__text--address').textContent = offer.offer.address;
    card.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = offer.offer.type.name;
    card.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    card.querySelector('.popup__features').textContent = offer.offer.features;
    card.querySelector('.popup__description').textContent = offer.offer.description;
    card.querySelector('.popup__photos').textContent = '';
    card.querySelector('.popup__photos').appendChild(renderPhoto(offer));
    card.querySelector('.popup__avatar').src = offer.author.avatar;

    return card;
  };

  var renderOffers = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.generateOffersElement(array[i]));
    }
    // window.pin.mapElement.appendChild(fragment);

    return fragment;
  };

  var openCard = function (pinOnMap, offers) {
    pinOnMap.addEventListener('click', function addOpenCardClickHandler() {
      removeCard();
      var mapCardOne = window.pin.mapPinElement.appendChild(generateCard(offers));
      addCloseCardClickHandler(mapCardOne);
    });
  };

  var addCloseCardClickHandler = function (card) {
    var cardClose = card.querySelector('.popup__close');
    document.addEventListener('keydown', popupEscHandler);
    cardClose.addEventListener('click', removeCard);
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    document.removeEventListener('keydown', popupEscHandler);
  };

  var popupEscHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      removeCard();
    }
  };

  window.card = {
    generateCard: generateCard,
    renderOffers: renderOffers,
    open: openCard,
    remove: removeCard
  };

})();
