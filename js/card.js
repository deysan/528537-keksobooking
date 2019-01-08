'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

  var renderPhoto = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = array[i];
      fragment.appendChild(photo);
    }

    return fragment;
  };

  // Проверка элементов карточки
  var renderTitle = function (title, card) {
    var titleElement = card.querySelector('.popup__title');
    if (title.length === 0) {
      titleElement.remove();
    } else {
      titleElement.textContent = title;
    }
  };

  var renderAddress = function (address, card) {
    var adressElement = card.querySelector('.popup__text--address');
    if (address.length === 0) {
      adressElement.remove();
    } else {
      adressElement.textContent = address;
    }
  };

  var renderPrice = function (price, card) {
    var priceElement = card.querySelector('.popup__text--price');
    if (price.length === 0) {
      priceElement.remove();
    } else {
      priceElement.textContent = price + ' ₽/ночь';
    }
  };

  var renderType = function (type, card) {
    var typeElement = card.querySelector('.popup__type');
    if (type.length === 0) {
      typeElement.remove();
    } else {
      typeElement.textContent = type;
    }
  };

  var renderCapacity = function (rooms, guests, card) {
    var capacityElement = card.querySelector('.popup__text--capacity');
    if (rooms.length && guests.length === 0) {
      capacityElement.remove();
    } else {
      capacityElement.textContent = rooms + ' комнаты для ' + guests + ' гостей';
    }
  };

  var renderTime = function (checkin, checkout, card) {
    var timeElement = card.querySelector('.popup__text--time');
    if (checkin.length && checkout.length === 0) {
      timeElement.remove();
    } else {
      timeElement.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    }
  };

  var renderFeatures = function (features, card) {
    var featuresElement = card.querySelector('.popup__features');
    if (features.length === 0) {
      featuresElement.remove();
    } else {
      featuresElement = features;
    }
  };

  var renderDescription = function (description, card) {
    var descriptionElement = card.querySelector('.popup__description');
    if (description.length === 0) {
      descriptionElement.remove();
    } else {
      descriptionElement.textContent = description;
    }
  };

  var renderPhotos = function (photos, card) {
    var photosElement = card.querySelector('.popup__photos');
    if (photos.length === 0) {
      photosElement.remove();
    } else {
      photosElement.textContent = '';
      photosElement.appendChild(renderPhoto(photos));
    }
  };

  var renderAvatar = function (avatar, card) {
    var avatarElement = card.querySelector('.popup__avatar');
    if (avatar.length === 0) {
      avatarElement.remove();
    } else {
      avatarElement.src = avatar;
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
