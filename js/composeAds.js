'use strict';

(function () {

  var MAX_AD_NUM = 8;

  var MIN_X = 0;
  var MIN_Y = 130;

  var MAX_X = document.querySelector('.map__pins').scrollWidth;
  var MAX_Y = 630;

  var apartmentTypes = [
    'palace',
    'flat',
    'house',
    'bungalow'
  ];

  var checkinTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var apartmentFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var photoSources = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var ads = [];

  window.composeAds = {
    ads: ads,
    generateAds: generateAds
  };

  // returns random integer in range
  function generateRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArrayElement(array) {
    var index = generateRandomIntInclusive(0, array.length - 1);

    return array[index];
  }

  function createAvatarValue(index) {
    return 'img/avatars/user0' + index + '.png';
  }

  function createVariousLengthArray(array) {
    var length = generateRandomIntInclusive(1, array.length);
    return array.slice(0, length);
  }

  function generateAds() {
    for (var i = 0; i < MAX_AD_NUM; i++) {
      var ad = {
        author: {
          avatar: createAvatarValue(i + 1),
        },
        offer: {
          title: 'Заголовок',
          address: '600, 350',
          price: 101,
          type: getRandomArrayElement(apartmentTypes),
          rooms: 3,
          guests: 3,
          checkin: getRandomArrayElement(checkinTimes),
          checkout: getRandomArrayElement(checkinTimes),
          features: createVariousLengthArray(apartmentFeatures),
          description: 'дом с приведениями',
          photos: createVariousLengthArray(photoSources),
        },
        location: {
          x: generateRandomIntInclusive(MIN_X, MAX_X),
          y: generateRandomIntInclusive(MIN_Y, MAX_Y)
        }
      };

      ads.push(ad);
    }
  }

})();
