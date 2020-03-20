'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content;

  window.popup = {
    createCardTemplate: createCardTemplate,
  };

  function createCardTemplate() {
    var cardContainer = cardTemplate.cloneNode(true);

    cardContainer = cardContainer.querySelector('article');
    var closeButton = cardContainer.querySelector('.popup__close');
    cardContainer.style = 'display: none';

    function closePopup() {
      cardContainer.style = 'display: none';
    }

    function closePopupEsc(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }

    closeButton.addEventListener('click', closePopup);

    closeButton.addEventListener('keydown', closePopupEsc);

    return cardContainer;
  }

})();
