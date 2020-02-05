'use strict';
var WIDTH_MAIN_PIN = 65;
var HEIGHT_MAIN_PIN = 65;

var MAX_PINS_NUM = 8;
var MAX_AD_NUM = 8;

var MIN_X = 0;
var MIN_Y = 130;

var MAX_X = document.querySelector('.map__pins').scrollWidth;
var MAX_Y = 630;
var DECIMAL_NUMBER_SYSTEM = 10;
var OPTION_VALUE_HUNDRED_ROOMS = 100;
var OPTION_VALUE_OF_NOT_FOR_GUESTS = 0;

var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var guestsCapacity = adForm.querySelector('#capacity');
var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
var ads = [];


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

var pinTemplate = document.querySelector('#pin').content;

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

function init() {
  generateAds();
  generatePins();
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

adFormSubmitButton.disabled = true;

function setFormOnActiveState() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  init();
  toggleFormElements(false);
  // validateGuestCapacity();
  addressField.value = getPointerCoordinateMainPin();
}

function disableElements(elements, isDisabled) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = isDisabled;
  }
}

/* code from qodo.co.uk */
// function disables/activates the elements
function toggleFormElements(isDisabled) {
  var inputs = adForm.getElementsByTagName('input');
  disableElements(inputs, isDisabled);
  var selects = adForm.getElementsByTagName('select');
  disableElements(selects, isDisabled);
  var textareas = adForm.getElementsByTagName('textarea');
  disableElements(textareas, isDisabled);
  var buttons = adForm.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = isDisabled;
  }
  var labels = adForm.getElementsByTagName('label');
  disableElements(labels, isDisabled);
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

function changeFormFeaturesByValidate() {
  adFormSubmitButton.disabled = true;
  adFormSubmitButton.classList.add('ad-form--disabled');
  roomNumber.setCustomValidity('Количество мест - "не для гостей" должно совпадать с количеством комнат - 100');
  roomNumber.reportValidity();
}

function validateGuestCapacity() {
  var valueFromRoomNumber = parseInt(getSelectedFromRoomNumber(), DECIMAL_NUMBER_SYSTEM);
  var valueFromGuestsCapacity = parseInt(getSelectedFromGuestsCapacity(), DECIMAL_NUMBER_SYSTEM);

  if (valueFromRoomNumber === OPTION_VALUE_HUNDRED_ROOMS && valueFromGuestsCapacity !== OPTION_VALUE_OF_NOT_FOR_GUESTS) {
    changeFormFeaturesByValidate();
  } else if (valueFromRoomNumber < OPTION_VALUE_HUNDRED_ROOMS && valueFromGuestsCapacity === OPTION_VALUE_OF_NOT_FOR_GUESTS) {
    changeFormFeaturesByValidate();
  } else if (valueFromGuestsCapacity > valueFromRoomNumber) {
    changeFormFeaturesByValidate();
    roomNumber.setCustomValidity('Количество комнат не может быть меньше количества гостей');
  } else {
    adFormSubmitButton.classList.remove('ad-form--disabled');
    adFormSubmitButton.disabled = false;
    roomNumber.setCustomValidity('');
  }
}

guestsCapacity.addEventListener('change', validateGuestCapacity);
roomNumber.addEventListener('change', validateGuestCapacity);
