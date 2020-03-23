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

  var valueWiFiFilter = wifiHousingFilter.value;
  var valueDishwasherFilter = dishwasherHousingFilter.value;
  var valueParkingFilter = parkingHousingFilter.value;
  var valueWasherFilter = washerHousingFilter.value;
  var valueElevatorFilter = elevatorHousingFilter.value;
  var valueConditionerFilter = conditionerHousingFilter.value;


  window.backend.load(onSuccess, window.backend.onError);


  function onSuccess(data) {
    houses = data;
    window.compose.generateAds(houses);
  }

  function filterPins() {

    function filterPinsByType() {
      var filteredHouses = [];

      if (houses.length === 0) {
        return filteredHouses;
      }
      if (valueOfTypeHouse === 'any') {
        filteredHouses = houses;
        return filteredHouses;
      }
      for (var i = 0; i < houses.length; i++) {
        if (filteredHouses.length === 5 && valueOfTypeHouse !== 'any') {
          break;
        }
        if (houses[i].offer.type === valueOfTypeHouse) {
          filteredHouses.push(houses[i]);
        }
      }

      return filteredHouses;
    }

    function filterPinsByPrice(pins) {
      var filteredHouses = [];

      if (pins.length === 0) {
        return filteredHouses;
      }
      if (valueOfTypeHouse === 'any' && valueOfRoomNumbers === 'any' && valueOfGuestsNumbers === 'any') {
        pins = houses;
      }
      if (valueOfPriceHouse === 'any') {
        filteredHouses = pins;
        return filteredHouses;
      }
      for (var i = 0; i < pins.length; i++) {
        if (filteredHouses.length === 5) {
          break;
        }
        if (valueOfPriceHouse === 'middle') {
          if (pins[i].offer.price >= 10000 && pins[i].offer.price <= 50000) {
            filteredHouses.push(pins[i]);
          }
        }
        if (valueOfPriceHouse === 'low') {
          if (pins[i].offer.price < 10000) {
            filteredHouses.push(pins[i]);
          }
        }
        if (valueOfPriceHouse === 'high') {
          if (pins[i].offer.price > 50000) {
            filteredHouses.push(pins[i]);
          }
        }
      }
      return filteredHouses;
    }

    function filterByRoomNumber(pins) {
      var filteredHouses = [];

      if (pins.length === 0) {
        return filteredHouses;
      }
      if (valueOfTypeHouse === 'any' && valueOfPriceHouse === 'any' && valueOfGuestsNumbers === 'any') {
        pins = houses;
      }
      if (valueOfRoomNumbers === 'any') {
        filteredHouses = pins;
        return filteredHouses;
      }
      for (var i = 0; i < pins.length; i++) {
        if (filteredHouses.length === 5) {
          break;
        }
        if (pins[i].offer.rooms === +valueOfRoomNumbers) {
          filteredHouses.push(pins[i]);
        }
      }
      return filteredHouses;
    }

    function filterByGuests(pins) {
      var filteredHouses = [];

      if (pins.length === 0) {
        return filteredHouses;
      }
      if (valueOfTypeHouse === 'any' && valueOfPriceHouse === 'any' && valueOfRoomNumbers === 'any') {
        pins = houses;
      }
      if (valueOfGuestsNumbers === 'any') {
        filteredHouses = pins;
        return filteredHouses;
      }
      for (var i = 0; i < pins.length; i++) {
        if (filteredHouses.length === 5) {
          break;
        }
        if (pins[i].offer.guests === +valueOfGuestsNumbers) {
          filteredHouses.push(pins[i]);
        }
      }
      return filteredHouses;
    }

    function filterByFeatures(pins, housingFilter, valueFilter) {
      var filteredHouses = [];

      if (pins.length === 0) {
        return filteredHouses;
      }
      if (!housingFilter.checked) {
        filteredHouses = pins;
        return filteredHouses;
      }
      for (var i = 0; i < pins.length; i++) {
        if (filteredHouses.length === 5) {
          break;
        }
        if (pins[i].offer.features.includes(valueFilter) && housingFilter.checked) {
          filteredHouses.push(pins[i]);
        }
      }
      return filteredHouses;
    }

    var filteredPins = filterPinsByType();
    filteredPins = filterPinsByPrice(filteredPins);
    filteredPins = filterByRoomNumber(filteredPins);
    filteredPins = filterByGuests(filteredPins);

    filteredPins = filterByFeatures(filteredPins, wifiHousingFilter, valueWiFiFilter);
    filteredPins = filterByFeatures(filteredPins, dishwasherHousingFilter, valueDishwasherFilter);
    filteredPins = filterByFeatures(filteredPins, parkingHousingFilter, valueParkingFilter);
    filteredPins = filterByFeatures(filteredPins, washerHousingFilter, valueWasherFilter);
    filteredPins = filterByFeatures(filteredPins, elevatorHousingFilter, valueElevatorFilter);
    filteredPins = filterByFeatures(filteredPins, conditionerHousingFilter, valueConditionerFilter);

    return filteredPins;
  }

  function updatePins() {
    // find all pins except main pin to clean up map
    var pinButtons = pinsContainer.querySelectorAll('button:not(.map__pin--main)');

    // delete all previous pins from map
    pinButtons.forEach(function (el) {
      el.remove();
    });
    window.generate.generatePins(filterPins());
  }

  window.filters.onTypeHouseChange = window.debounce(function (typeOfHouse) {
    valueOfTypeHouse = typeOfHouse;
    updatePins();
  });

  window.filters.onPriceHouseChange = window.debounce(function (priceOfHouse) {
    valueOfPriceHouse = priceOfHouse;
    updatePins();
  });

  window.filters.onRoomsHouseChange = window.debounce(function (roomsOfHouse) {
    valueOfRoomNumbers = roomsOfHouse;
    updatePins();
  });

  window.filters.onGuestsHouseChange = window.debounce(function (guestsOfHouse) {
    valueOfGuestsNumbers = guestsOfHouse;
    updatePins();
  });

  // Features handlers ------------------------------------

  window.filters.onWiFiFeatureChange = window.debounce(function (wifiOfHouse) {
    valueWiFiFilter = wifiOfHouse;
    updatePins();
  });

  window.filters.onDishwasherFeatureChange = window.debounce(function (dishwasherOfHouse) {
    valueDishwasherFilter = dishwasherOfHouse;
    updatePins();
  });

  window.filters.onParkingFeatureChange = window.debounce(function (parkingOfHouse) {
    valueParkingFilter = parkingOfHouse;
    updatePins();
  });

  window.filters.onWasherFeatureChange = window.debounce(function (washerOfHouse) {
    valueWasherFilter = washerOfHouse;
    updatePins();
  });

  window.filters.onElevatorFeatureChange = window.debounce(function (elevatorOfHouse) {
    valueElevatorFilter = elevatorOfHouse;
    updatePins();
  });

  window.filters.onConditionerFeatureChange = window.debounce(function (conditionerOfHouse) {
    valueConditionerFilter = conditionerOfHouse;
    updatePins();
  });
})();
