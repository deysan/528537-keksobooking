'use strict';

(function () {

  window.util = {
    ESC_KEYCODE: 27,

    popupEscHandler: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeCard();
      }
    },

    // Случайное число
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // Случайная число с округлением
    getRandomNumberRound: function (min, max) {
      return Math.round((Math.floor(Math.random() * (max - min)) + min) / 100) * 100;
    },

    // Случаные данные из массива
    getRandomFromList: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    // Случайная длина массива
    getRandomSliceList: function (array) {
      return array.slice((window.util.getRandomNumber(0, array.length)));
    },

    // Перемешивание массива
    getShuffleList: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
  };

})();
