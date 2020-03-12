'use strict';

(function () {

  var pinsContainer = document.querySelector('.map__pins');
  var typeHousingFilter = document.querySelector('#housing-type');
  var priceHousingFilter = document.querySelector('#housing-price');
  var roomsHousingFilter = document.querySelector('#housing-rooms');
  var guestsHousingFilter = document.querySelector('#housing-guests');

  var wifiHousingFilter = document.querySelector('#filter-wifi');
  var dishwasherHousingFilter = document.querySelector('#filter-dishwasher');
  var parkingHousingFilter = document.querySelector('#filter-parking');
  var washerHousingFilter = document.querySelector('#filter-washer');
  var elevatorHousingFilter = document.querySelector('#filter-elevator');
  var conditionerHousingFilter = document.querySelector('#filter-conditioner');

  var houses = [];
  var valueOfTypeHouse = typeHousingFilter.options[typeHousingFilter.selectedIndex].value;
  var valueOfPriceHouse = priceHousingFilter.options[priceHousingFilter.selectedIndex].value;
  var valueOfRoomNumbers = roomsHousingFilter.options[roomsHousingFilter.selectedIndex].value;
  var valueOfGuestsNumbers = guestsHousingFilter.options[guestsHousingFilter.selectedIndex].value;


  window.backend.load(successHandler, window.backend.errorHandler);

  typeHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    valueOfTypeHouse = typeHousingFilter.options[typeHousingFilter.selectedIndex].value;
    window.debounce(updatePins());
  });

  priceHousingFilter.addEventListener('change', function () {
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    valueOfPriceHouse = priceHousingFilter.options[priceHousingFilter.selectedIndex].value;
    window.debounce(updatePins());
  });

  roomsHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    valueOfRoomNumbers = roomsHousingFilter.options[roomsHousingFilter.selectedIndex].value;
    window.debounce(updatePins());
  });

  guestsHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    valueOfGuestsNumbers = guestsHousingFilter.options[guestsHousingFilter.selectedIndex].value;
    window.debounce(updatePins());
  });

  function getRank(apartment) {
    var rank = 0;

    if (apartment.offer.type !== undefined) {
      // console.log('valueOfTypeHouse', valueOfTypeHouse);
      if (valueOfTypeHouse === apartment.offer.type) {

        rank += 2;
      }
      if (valueOfPriceHouse === 'middle') {
        if (apartment.offer.price >= 10000 && apartment.offer.price <= 50000) {
          rank += 1;
        }
      }
      if (valueOfPriceHouse === 'low') {
        if (apartment.offer.price < 10000) {
          rank += 1;
        }
      }
      if (valueOfPriceHouse === 'high') {
        if (apartment.offer.price > 50000) {
          rank += 1;
        }
      }
      if (+valueOfRoomNumbers === apartment.offer.rooms) {
        rank += 1;
      }
      if (+valueOfGuestsNumbers === apartment.offer.guests) {
        rank += 1;
      }
    } else {
      rank = 0;
    }

    return rank;
  }

  function successHandler(data) {
    houses = data;
    window.composeAds.generateAds(houses);
  }

  function sorting(places) {
    var sortedPlaces = places.slice().sort(function (right, left) {

      var rankDiff = getRank(left) - getRank(right);
      if (rankDiff === 0) {
        rankDiff = places.indexOf(left) - places.indexOf(right);
      }
      return rankDiff;
    });

    return sortedPlaces;
  }

  function updatePins() {
    // find all pins except main pin to clean up map
    var pinButtons = pinsContainer.querySelectorAll('button:not(.map__pin--main)');

    // delete all previous pins from map
    pinButtons.forEach(function (el) {
      el.remove();
    });

    window.composePins.generatePins(sorting(houses));
  }

})();
