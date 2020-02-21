'use strict';

(function () {

  var typeHousingFilter = document.querySelector('#housing-type');
  var houses = [];
  var valueOfTypeHouse;

  var house = {
    onTypeChange: function (typeHouse) {
      return typeHouse;
    },
  };

  typeHousingFilter.addEventListener('change', function () {
    valueOfTypeHouse = typeHousingFilter.options[typeHousingFilter.selectedIndex].value;
    house.onTypeChange(valueOfTypeHouse);
    updatePins();
  });

  function getRank(apartment) {
    var rank = 0;

    if (apartment.offer.type !== undefined) {
      if (apartment.offer.type === valueOfTypeHouse) {
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

  function updatePins() {
    console.log(houses);

    window.composePins.generatePins(houses.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = houses.indexOf(left) - houses.indexOf(right);
      }
      return rankDiff;
    }));
  }

  window.backend.load(successHandler, window.backend.errorHandler);

})();
