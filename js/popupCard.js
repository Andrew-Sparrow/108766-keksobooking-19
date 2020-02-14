'use strict';
(function () {

  window.popupCard = {
    createCardTemplate: createCardTemplate,
  };

  var cardTemplate = document.querySelector('#card').content;

  function createCardTemplate() {
    var cardContainer = cardTemplate.cloneNode(true);

    cardContainer = cardContainer.querySelector('article');
    cardContainer.style = 'display: none';

    return cardContainer;
  }
})();
