'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

  var TYPES = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  var renderPhoto = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = array[i];
      fragment.appendChild(photo);
    }

    return fragment;
  };

  var renderFeature = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + array[i];
      fragment.appendChild(featureElement);
    }
    return fragment;
  };

  // Проверка элементов карточки
  var renderInfo = function (info, card, link) {
    var infoElement = card.querySelector(link);
    if (info === 'offer.offer.price') {
      infoElement.textContent = info + ' ₽/ночь';
    } else if (info === 'offer.offer.type') {
      infoElement.textContent = TYPES[info];
    } else if (info) {
      infoElement.textContent = info;
    } else {
      infoElement.remove();
    }
  };

  var renderCapacity = function (rooms, guests, card) {
    var capacityElement = card.querySelector('.popup__text--capacity');
    if (rooms && guests) {
      capacityElement.textContent = rooms + ' комнаты для ' + guests + ' гостей';
    } else {
      capacityElement.remove();
    }
  };

  var renderTime = function (checkin, checkout, card) {
    var timeElement = card.querySelector('.popup__text--time');
    if (checkin || checkout) {
      timeElement.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    } else {
      timeElement.remove();
    }
  };

  var renderFeatures = function (features, card) {
    var featuresElement = card.querySelector('.popup__features');
    if (features) {
      featuresElement.textContent = '';
      featuresElement.appendChild(renderFeature(features));
    } else {
      featuresElement.remove();
    }
  };

  var renderPhotos = function (photos, card) {
    var photosElement = card.querySelector('.popup__photos');
    if (photos) {
      photosElement.textContent = '';
      photosElement.appendChild(renderPhoto(photos));
    } else {
      photosElement.remove();
    }
  };

  var renderAvatar = function (avatar, card) {
    var avatarElement = card.querySelector('.popup__avatar');
    if (avatar) {
      avatarElement.src = avatar;
    } else {
      avatarElement.remove();
    }
  };

  // Вывод данных обьявления
  var generateCard = function (offer) {
    var card = cardTemplate.cloneNode(true);
    renderInfo(offer.offer.title, card, '.popup__title');
    renderInfo(offer.offer.address, card, '.popup__text--address');
    renderInfo(offer.offer.price, card, '.popup__text--price');
    renderInfo(offer.offer.type, card, '.popup__type');
    renderCapacity(offer.offer.rooms, offer.offer.guests, card);
    renderTime(offer.offer.checkin, offer.offer.checkout, card);
    renderFeatures(offer.offer.features, card);
    renderInfo(offer.offer.description, card, '.popup__description');
    renderPhotos(offer.offer.photos, card);
    renderAvatar(offer.author.avatar, card);

    return card;
  };

  var renderOffers = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.generateOffersElement(array[i]));
    }

    return fragment;
  };

  var openCard = function (pinOnMap, offers) {
    pinOnMap.addEventListener('click', function () {
      removeCard();
      var mapCardOne = window.pin.mapElements.appendChild(generateCard(offers));
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
    if (evt.keyCode !== window.util.ESC_KEYCODE) {
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
