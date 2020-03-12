'use strict';
(function () {
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

  var filters = {
    onTypeHouseChange: function () {},
    onPriceHouseChange: function () {},
    onRoomsHouseChange: function () {},
    onGuestsHouseChange: function () {},

    onWiFiFeatureChange: function () {},
    onDishwasherFeatureChange: function () {},
    onParkingFeatureChange: function () {},
    onWasherFeatureChange: function () {},
    onElevatorFeatureChange: function () {},
    onConditionerFeatureChange: function () {},
  };

  typeHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newTypeHouse = typeHousingFilter.options[typeHousingFilter.selectedIndex].value;

    filters.onTypeHouseChange(newTypeHouse);
  });

  priceHousingFilter.addEventListener('change', function () {
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newPriceHouse = priceHousingFilter.options[priceHousingFilter.selectedIndex].value;

    filters.onPriceHouseChange(newPriceHouse);
  });

  roomsHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newRoomsHouse = roomsHousingFilter.options[roomsHousingFilter.selectedIndex].value;

    filters.onRoomsHouseChange(newRoomsHouse);
  });

  guestsHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newGuestsHouse = guestsHousingFilter.options[guestsHousingFilter.selectedIndex].value;

    filters.onGuestsHouseChange(newGuestsHouse);
  });

  // Features filters --------------------------------

  wifiHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newWiFiFeature = wifiHousingFilter.value;
    filters.onWiFiFeatureChange(newWiFiFeature);
  });

  dishwasherHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newDishwasherFeature = dishwasherHousingFilter.value;
    filters.onDishwasherFeatureChange(newDishwasherFeature);
  });

  parkingHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newParkingFeature = parkingHousingFilter.value;
    filters.onParkingFeatureChange(newParkingFeature);
  });

  washerHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newWasherFeature = washerHousingFilter.value;
    filters.onWasherFeatureChange(newWasherFeature);
  });

  elevatorHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newElevatorFeature = elevatorHousingFilter.value;
    filters.onElevatorFeatureChange(newElevatorFeature);
  });

  conditionerHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    var newConditionerFeature = conditionerHousingFilter.value;
    filters.onConditionerFeatureChange(newConditionerFeature);
  });

  window.filters = filters;

})();
