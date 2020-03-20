'use strict';

(function () {

  var ads = [];

  window.compose = {
    ads: ads,
    generateAds: generateAds
  };

  function generateAds(arrayFromServer) {
    window.compose.ads = arrayFromServer;
  }

})();
