'use strict';

(function () {

  var ads = [];

  window.composeAds = {
    ads: ads,
    generateAds: generateAds
  };

  function generateAds(arrayFromServer) {
    window.composeAds.ads = arrayFromServer;
  }

})();
