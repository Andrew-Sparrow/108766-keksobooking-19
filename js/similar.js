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


  window.backend.load(successHandler, window.backend.errorHandler);


  function successHandler(data) {
    houses = data;
    window.compose.generateAds(houses);
  }

  function filterPins() {

    function filterPinsByType() {
      return houses.filter(function (item) {
        var isInType = false;

        if (valueOfTypeHouse === 'any') {
          isInType = true;
        }
        if (item.offer.type === valueOfTypeHouse) {
          isInType = true;
        }
        return isInType;
      });
    }

    function filterPinsByPrice(pins) {
      return pins.filter(function (item) {
        var isInRangePrice = false;

        if (valueOfPriceHouse === 'any') {
          isInRangePrice = true;
        }
        if (valueOfPriceHouse === 'middle') {
          if (item.offer.price >= 10000 && item.offer.price <= 50000) {
            isInRangePrice = true;
          }
        }
        if (valueOfPriceHouse === 'low') {
          if (item.offer.price < 10000) {
            isInRangePrice = true;
          }
        }
        if (valueOfPriceHouse === 'high') {
          if (item.offer.price > 50000) {
            isInRangePrice = true;
          }
        }
        return isInRangePrice;
      });
    }

    function filterByRoomNumber(pins) {
      return pins.filter(function (item) {
        var isInRangeRoom = false;

        if (valueOfRoomNumbers === 'any') {
          isInRangeRoom = true;
        }
        if (+valueOfRoomNumbers === item.offer.rooms) {
          isInRangeRoom = true;
        }
        return isInRangeRoom;
      });
    }

    function filterByGuests(pins) {
      return pins.filter(function (item) {
        var isInRangeGuests = false;

        if (valueOfGuestsNumbers === 'any') {
          isInRangeGuests = true;
        }
        if (+valueOfGuestsNumbers === item.offer.guests) {
          isInRangeGuests = true;
        }
        return isInRangeGuests;
      });
    }

    function filterByFeatures(pins, housingFilter, valueFilter) {
      return pins.filter(function (item) {
        var isInRange = false;

        if (!housingFilter.checked) {
          isInRange = true;
        }
        if (item.offer.features.includes(valueFilter) && housingFilter.checked) {
          isInRange = true;
        }
        return isInRange;
      });
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
    window.compose.generatePins(filterPins());
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
