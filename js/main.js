'use strict';

var listTypeApartment = ['palace', 'flat', 'house', 'bungalow'];
var listTimeCheckInOut = ['12:00', '13:00', '14:00'];
var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var mapPinsDOMContainer = document.querySelector('.map__pins');

// returns random integer
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

// generates 8new apartments
function generateListApartments() {
  var listApartments = [];

  function newAuthor() {
    var newAthor = {};
    return newAthor;
  }

  for (var i = 1; i <= 8; i++) {
    var newApartment = {};
    newApartment.author = newAuthor();
    newApartment.offer = {};

    newApartment.author.avatar = 'img/avatars/user0' + i + '.png';
    newApartment.offer.title = 'Предложение аренды - 0' + i;
    newApartment.offer.address = (i * 10 + 500).toString(10) + ', ' + (i * 10 + 250).toString(10);
    newApartment.offer.price = 1000 + i * 100;
    newApartment.offer.type = listTypeApartment[getRandomIntInclusive(0, 3)];
    newApartment.offer.rooms = getRandomIntInclusive(1, 4);
    newApartment.offer.guests = getRandomIntInclusive(1, 5);
    newApartment.offer.checkin = listTimeCheckInOut[getRandomIntInclusive(0, 2)];
    newApartment.offer.features = [listFeatures[0], listFeatures[2]];
    newApartment.offer.description = 'Уютный дом с добрыми и любопытными приведениями';
    newApartment.offer.photos = [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];
    newApartment.location = {};
    newApartment.location.x = getRandomIntInclusive(0, mapPinsDOMContainer.scrollWidth);
    newApartment.location.y = getRandomIntInclusive(130, 620);

    listApartments.push(newApartment);
  }

  return listApartments;
}

var listJSApartments = generateListApartments();

document.querySelector('.map').classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content;

function createNewDOMPin(JSObjectPin) {
  var cloneMapPinsDOMContainer = mapPinTemplate.cloneNode(true);
  cloneMapPinsDOMContainer
   .querySelector('.map__pin')
   .style = 'left: ' + (JSObjectPin.location.x + 31).toString(10) + 'px; top: ' + (JSObjectPin.location.y + 31).toString(10) + 'px;';
  var imageClonePin = cloneMapPinsDOMContainer.querySelector('img');
  imageClonePin.src = JSObjectPin.author.avatar;
  imageClonePin.alt = JSObjectPin.offer.title;

  return cloneMapPinsDOMContainer;
}

/*
* fills in container by given list
*@param {Object} DOM-container - container for filling in.
*@param {Object} list - list of DOM-elements.
*
*/
function fillContainer(container, listJSElements) {
  var fragment = new DocumentFragment();
  listJSElements.forEach(function (item) {
    return fragment.appendChild(createNewDOMPin(item));
  });
  container.appendChild(fragment);
}

fillContainer(mapPinsDOMContainer, listJSApartments);

/*
* creates new apartment's card by template
* @param {Object} apartment - JS Object with properties of apartment
*/
function createCardByTemplate(apartment) {
  var mapCardTemplate = document.querySelector('#card').content;
  var cardTemplateContainer = mapCardTemplate.querySelector('article');
  var cloneCardContainer = cardTemplateContainer.cloneNode(true);

  var cloneCardTitle = cloneCardContainer.querySelector('.popup__title');
  var cloneCardAddress = cloneCardContainer.querySelector('.popup__text--address');
  var cloneCardPrice = cloneCardContainer.querySelector('.popup__text--price');
  var cloneCardType = cloneCardContainer.querySelector('.popup__type');
  var cloneCardCapacity = cloneCardContainer.querySelector('.popup__text--capacity');
  var cloneCardCheckInOut = cloneCardContainer.querySelector('.popup__text--time');
  var cloneCardFeatures = cloneCardContainer.querySelector('.popup__features');
  var cloneCardFeaturesWiFi = cloneCardContainer.querySelector('.popup__feature--wifi');
  var cloneCardFeaturesDishwasher = cloneCardContainer.querySelector('.popup__feature--dishwasher');
  var cloneCardFeaturesParking = cloneCardContainer.querySelector('.popup__feature--parking');
  var cloneCardFeaturesWasher = cloneCardContainer.querySelector('.popup__feature--washer');
  var cloneCardFeaturesElevator = cloneCardContainer.querySelector('.popup__feature--elevator');
  var cloneCardFeaturesConditioner = cloneCardContainer.querySelector('.popup__feature--conditioner');

  var cloneCardDescription = cloneCardContainer.querySelector('.popup__description');
  var cloneCardPhotos = cloneCardContainer.querySelector('.popup__photos');
  var cloneCardImg = cloneCardPhotos.querySelector('img');

  var cloneCardAvatar = cloneCardContainer.querySelector('.popup__avatar');

  cloneCardTitle.innerText = apartment.offer.title;
  cloneCardAddress.innerText = apartment.offer.address;
  cloneCardPrice.innerText = apartment.offer.price;
  cloneCardType.innerText = apartment.offer.type;
  cloneCardCapacity.innerText = apartment.offer.rooms + ' комната(ы) для ' + apartment.offer.guests + 'гостя(ей)';
  cloneCardCheckInOut.innerText = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkin;

  cloneCardFeatures.innerHTML = '';

  apartment.offer.features.forEach(function (item) {
    switch (item) {
      case 'wifi':
        cloneCardFeatures.appendChild(cloneCardFeaturesWiFi);
        break;
      case 'dishwasher':
        cloneCardFeatures.appendChild(cloneCardFeaturesDishwasher);
        break;
      case 'parking':
        cloneCardFeatures.appendChild(cloneCardFeaturesParking);
        break;
      case 'washer':
        cloneCardFeatures.appendChild(cloneCardFeaturesWasher);
        break;
      case 'elevator':
        cloneCardFeatures.appendChild(cloneCardFeaturesElevator);
        break;
      case 'conditioner':
        cloneCardFeatures.appendChild(cloneCardFeaturesConditioner);
        break;
    }
  });

  cloneCardDescription.innerText = apartment.offer.description;

  cloneCardPhotos.innerHTML = '';

  apartment.offer.photos.forEach(function (photoSrc) {
    var cloneImg = cloneCardImg.cloneNode();
    cloneImg.src = photoSrc;
    cloneCardPhotos.appendChild(cloneImg);
  });

  cloneCardAvatar.src = apartment.author.avatar;

  return cloneCardContainer;
}

var mapFiltersContainerDOM = document.querySelector('.map__filters-container');
mapFiltersContainerDOM.insertAdjacentElement('beforebegin', createCardByTemplate(listJSApartments[0]));
