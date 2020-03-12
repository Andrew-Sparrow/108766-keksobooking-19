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

  var valueWiFiFilter = null;
  var valueDishwasherFilter = null;
  var valueParkingFilter = null;
  var valueWasherFilter = null;
  var valueElevatorFilter = null;
  var valueConditionerFilter = null;


  window.backend.load(successHandler, window.backend.errorHandler);

  function getRank(apartment) {
    var rank = 0;

    if (valueOfTypeHouse === apartment.offer.type) {
      rank += 1;
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
    if (apartment.offer.features.includes(valueWiFiFilter) && wifiHousingFilter.checked) {
      rank += 1;
    }
    if (apartment.offer.features.includes(valueDishwasherFilter) && dishwasherHousingFilter.checked) {
      rank += 1;
    }
    if (apartment.offer.features.includes(valueParkingFilter) && parkingHousingFilter.checked) {
      rank += 1;
    }
    if (apartment.offer.features.includes(valueWasherFilter) && washerHousingFilter.checked) {
      rank += 1;
    }
    if (apartment.offer.features.includes(valueElevatorFilter) && elevatorHousingFilter.checked) {
      rank += 1;
    }
    if (apartment.offer.features.includes(valueConditionerFilter) && conditionerHousingFilter.checked) {
      rank += 1;
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

  window.filters.onTypeHouseChange = function (typeOfHouse) {
    valueOfTypeHouse = typeOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onPriceHouseChange = function (priceOfHouse) {
    valueOfPriceHouse = priceOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onRoomsHouseChange = function (roomsOfHouse) {
    valueOfRoomNumbers = roomsOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onGuestsHouseChange = function (guestsOfHouse) {
    valueOfRoomNumbers = guestsOfHouse;
    window.debounce(updatePins());
  };

  // Features handlers ---------------------------------------

  window.filters.onWiFiFeatureChange = function (wifiOfHouse) {
    valueWiFiFilter = wifiOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onDishwasherFeatureChange = function (dishwasherOfHouse) {
    valueDishwasherFilter = dishwasherOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onParkingFeatureChange = function (parkingOfHouse) {
    valueParkingFilter = parkingOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onWasherFeatureChange = function (washerOfHouse) {
    valueWasherFilter = washerOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onElevatorFeatureChange = function (elevatorOfHouse) {
    valueElevatorFilter = elevatorOfHouse;
    window.debounce(updatePins());
  };

  window.filters.onConditionerFeatureChange = function (conditionerOfHouse) {
    valueConditionerFilter = conditionerOfHouse;
    window.debounce(updatePins());
  };
})();
