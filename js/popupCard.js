'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content;

  window.popupCard = {
    createCardTemplate: createCardTemplate,
  };


  function createCardTemplate() {
    var cardContainer = cardTemplate.cloneNode(true);

    cardContainer = cardContainer.querySelector('article');
    cardContainer.style = 'display: none';

    return cardContainer;
  }

})();
