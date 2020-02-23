'use strict';

(function () {

  var typeHousingFilter = document.querySelector('#housing-type');
  var houses = [];
  var valueOfTypeHouse;
  var pinsContainer = document.querySelector('.map__pins');

  var house = {
    onTypeChange: function (typeHouse) {
      return typeHouse;
    },
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  typeHousingFilter.addEventListener('change', function () {
    // hide opened popup card
    var popupCard = document.querySelector('.map__card');
    popupCard.style = 'display: none';

    valueOfTypeHouse = typeHousingFilter.options[typeHousingFilter.selectedIndex].value;
    house.onTypeChange(valueOfTypeHouse);
    window.debounce(updatePins());
  });

  function getRank(apartment) {
    var rank = 0;

    if (apartment.offer.type !== undefined) {
      if (apartment.offer.type === valueOfTypeHouse) {
        rank += 2;
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
