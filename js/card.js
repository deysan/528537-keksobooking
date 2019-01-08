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
  var renderTitle = function (title, card) {
    var titleElement = card.querySelector('.popup__title');
    if (title) {
      titleElement.textContent = title;
    } else {
      titleElement.remove();
    }
  };

  var renderAddress = function (address, card) {
    var adressElement = card.querySelector('.popup__text--address');
    if (address) {
      adressElement.textContent = address;
    } else {
      adressElement.remove();
    }
  };

  var renderPrice = function (price, card) {
    var priceElement = card.querySelector('.popup__text--price');
    if (price) {
      priceElement.textContent = price + ' ₽/ночь';
    } else {
      priceElement.remove();
    }
  };

  var renderType = function (type, card) {
    var typeElement = card.querySelector('.popup__type');
    if (type) {
      typeElement.textContent = TYPES[type];
    } else {
      typeElement.remove();
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
    if (checkin && checkout) {
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

  var renderDescription = function (description, card) {
    var descriptionElement = card.querySelector('.popup__description');
    if (description) {
      descriptionElement.textContent = description;
    } else {
      descriptionElement.remove();
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
    renderTitle(offer.offer.title, card);
    renderAddress(offer.offer.address, card);
    renderPrice(offer.offer.price, card);
    renderType(offer.offer.type, card);
    renderCapacity(offer.offer.rooms, offer.offer.guests, card);
    renderTime(offer.offer.checkin, offer.offer.checkout, card);
    renderFeatures(offer.offer.features, card);
    renderDescription(offer.offer.description, card);
    renderPhotos(offer.offer.photos, card);
    renderAvatar(offer.author.avatar, card);
    // card.querySelector('.popup__title').textContent = offer.offer.title;
    // card.querySelector('.popup__text--address').textContent = offer.offer.address;
    // card.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
    // card.querySelector('.popup__type').textContent = offer.offer.type.name;
    // card.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    // card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    // card.querySelector('.popup__features').textContent = offer.offer.features;
    // card.querySelector('.popup__description').textContent = offer.offer.description;
    // card.querySelector('.popup__photos').textContent = '';
    // card.querySelector('.popup__photos').appendChild(renderPhoto(offer));
    // card.querySelector('.popup__avatar').src = offer.author.avatar;

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
