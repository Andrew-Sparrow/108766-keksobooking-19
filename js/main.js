'use strict';
var WIDTH_MAIN_PIN = 65;
var HEIGHT_MAIN_PIN = 65;

var MAX_PINS_NUM = 8;
var MAX_AD_NUM = 8;

var MIN_X = 0;
var MIN_Y = 130;

var MAX_X = document.querySelector('.map__pins').scrollWidth;
var MAX_Y = 630;

var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var guestsCapacity = adForm.querySelector('#capacity');
var adFormSubmitButton = adForm.querySelector('.ad-form__submit');


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
/*
var typesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом'
};
*/
var pinTemplate = document.querySelector('#pin').content;
// var cardTemplate = document.querySelector('#card').content;

// returns random integer in range
function generateRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
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

var ads = [];

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

function generatePins() {
  var fragment = new DocumentFragment();

  for (var i = 0; i < MAX_PINS_NUM; i++) {
    var pinContainer = pinTemplate.cloneNode(true);
    var pin = pinContainer.querySelector('.map__pin');
    var pinImg = pin.querySelector('img');
    pin.style = 'left: ' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;"';
    pinImg.src = ads[i].author.avatar;
    pinImg.alt = ads[i].author.title;
    fragment.appendChild(pin);
  }
  var pinsContainer = document.querySelector('.map__pins');
  pinsContainer.appendChild(fragment);
}
/*
function createFeatures(features) {
  var fragment = new DocumentFragment();
  features.forEach(function (feature) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + feature);
    fragment.appendChild(li);
  });

  return fragment;
}

function createPhotos(photos, template) {
  var fragment = new DocumentFragment();
  photos.forEach(function (src) {
    var img = template.cloneNode(true);
    img.src = src;
    fragment.appendChild(img);
  });
  return fragment;
}
*/
/*
function showCard(card) {
  var cardContainer = cardTemplate.cloneNode(true);
  cardContainer = cardContainer.querySelector('article');

  cardContainer.querySelector('.popup__title').innerText = card.offer.title;
  cardContainer.querySelector('.popup__text--address').innerText = card.offer.address;
  cardContainer.querySelector('.popup__text--price').innerText = card.offer.price;

  cardContainer.querySelector('.popup__type').innerText = typesMap[card.offer.type];

  cardContainer.querySelector('.popup__text--capacity').innerText = card.offer.rooms + ' комнат для ' + card.offer.guests;
  cardContainer.querySelector('.popup__text--time').innerText = 'Заезд до ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;

  var features = cardContainer.querySelector('.popup__features');
  features.innerText = '';
  features.appendChild(createFeatures(card.offer.features));

  cardContainer.querySelector('.popup__description').innetText = card.offer.description;
  var photos = cardContainer.querySelector('.popup__photos');
  var photoTemplate = photos.querySelector('img').cloneNode(true);
  photos.innerText = '';
  photos.appendChild(createPhotos(card.offer.photos, photoTemplate));

  cardContainer.querySelector('.popup__avatar').src = card.author.avatar;

  return cardContainer;
}
*/
function init() {
  generateAds();
  generatePins();
  // var card = showCard(ads[0]);
  // var mFilterContainer = document.querySelector('.map__filters-container');
  // mFilterContainer.insertAdjacentElement('beforebegin', card);
}


mapPinMain.addEventListener('mousedown', onMouseButton);
mapPinMain.addEventListener('keydown', onKeyDown);

function onMouseButton(evt) {
  if (evt.button === 0) {
    setFormOnActiveState();
  }
}

function onKeyDown(evt) {
  if (evt.key === 'Enter') {
    setFormOnActiveState();
  }
}

function setFormOnActiveState() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  init();
  toggleFormElements(false);
  validateGuestCapacity();
  addressField.value = getPointerCoordinateMainPin();
}
/* code from qodo.co.uk */
// function disables/activates the elements
function toggleFormElements(isDisabled) {
  var inputs = adForm.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = isDisabled;
  }
  var selects = adForm.getElementsByTagName('select');
  for (var j = 0; j < selects.length; j++) {
    selects[j].disabled = isDisabled;
  }
  var textareas = adForm.getElementsByTagName('textarea');
  for (var k = 0; k < textareas.length; k++) {
    textareas[k].disabled = isDisabled;
  }
  var buttons = adForm.getElementsByTagName('button');
  for (var l = 0; l < buttons.length; l++) {
    buttons[l].disabled = isDisabled;
  }
  var labels = adForm.getElementsByTagName('label');
  for (var m = 0; m < buttons.length; m++) {
    labels[m].disabled = isDisabled;
  }
}

toggleFormElements(true);

function getXCoordinateMainPin() {
  return mapPinMain.offsetLeft;
}

function getYCoordinatesMainPin() {
  return mapPinMain.offsetTop;
}

function getCenterCoordinatesMainPin() {
  var centerX = getXCoordinateMainPin() + Math.floor(WIDTH_MAIN_PIN / 2);
  var centerY = getYCoordinatesMainPin() + Math.floor(HEIGHT_MAIN_PIN / 2);
  var centerCoordinate = centerX + ', ' + centerY;
  return centerCoordinate;
}

function getPointerCoordinateMainPin() {
  var centerX = getXCoordinateMainPin() + Math.floor(WIDTH_MAIN_PIN / 2);
  var centerY = getYCoordinatesMainPin() + HEIGHT_MAIN_PIN;
  var centerCoordinate = centerX + ', ' + centerY;
  return centerCoordinate;
}

// sets the value of address field with data of main pin coordinates
addressField.value = getCenterCoordinatesMainPin();

function getSelectedFromRoomNumber() {
  var valueRoom = roomNumber.options[roomNumber.selectedIndex].value;
  return valueRoom;
}

function getSelectedFromGuestsCapacity() {
  var valueGuests = guestsCapacity.options[guestsCapacity.selectedIndex].value;
  return valueGuests;
}

function validateGuestCapacity() {
  var valueFromRoomNumber = parseInt(getSelectedFromRoomNumber(), 10);
  var valueFromGuestsCapacity = parseInt(getSelectedFromGuestsCapacity(), 10);

  if (valueFromRoomNumber === 100 && valueFromGuestsCapacity !== 0) {
    adFormSubmitButton.disabled = true;
    adFormSubmitButton.classList.add('ad-form--disabled');
    roomNumber.setCustomValidity('Количество мест - "не для гостей" должно совпадать с количеством комнат - 100');
    roomNumber.reportValidity();
  } else if (valueFromRoomNumber < 100 && valueFromGuestsCapacity === 0) {
    adFormSubmitButton.disabled = true;
    adFormSubmitButton.classList.add('ad-form--disabled');
    roomNumber.setCustomValidity('Количество мест - "не для гостей" должно совпадать с количеством комнат 100');
    roomNumber.reportValidity();
    adFormSubmitButton.classList.add('ad-form--disabled');
  } else if (valueFromGuestsCapacity > valueFromRoomNumber) {
    adFormSubmitButton.disabled = true;
    adFormSubmitButton.classList.add('ad-form--disabled');
    roomNumber.setCustomValidity('Количество комнат не может быть меньше количества гостей');
    roomNumber.reportValidity();
    adFormSubmitButton.classList.add('ad-form--disabled');
  } else {
    adFormSubmitButton.classList.remove('ad-form--disabled');
    adFormSubmitButton.disabled = false;
    roomNumber.setCustomValidity('');
  }
}

validateGuestCapacity();
guestsCapacity.addEventListener('change', validateGuestCapacity);
roomNumber.addEventListener('change', validateGuestCapacity);
