'use strict';
(function () {
  var MILLISECONDS = 100;

  var map = document.querySelector('.map');
  var photoTemplate = document.querySelector('#card').content;
  var clonePhotoTemplate = photoTemplate.cloneNode(true);
  var imgTemplate = clonePhotoTemplate.querySelector('.popup__photo');

  var TypeApartment = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };


  function createFeatures(features) {
    var fragment = new DocumentFragment();

    features.forEach(function (feature) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + feature);
      fragment.appendChild(li);
    });

    return fragment;
  }

  function createPhotos(photos) {
    var fragment = new DocumentFragment();

    photos.forEach(function (src) {
      var img = imgTemplate.cloneNode(true);
      img.src = src;
      fragment.appendChild(img);
    });
    return fragment;
  }

  // creates proper popup's data for each pins
  window.fillPopupByData =
    function (index, dwellings) {
      var offers = dwellings;
      var popup = map.querySelector('.popup');
      var popupClose = popup.querySelector('.popup__close');
      var features = popup.querySelector('.popup__features');
      var photos = popup.querySelector('.popup__photos');

      // setting closing button on card to default focus;
      setTimeout(function () {
        popupClose.focus();
      }, MILLISECONDS);

      popup.querySelector('.popup__title').innerText = offers[index].offer.title;

      if (offers[index].author.avatar !== undefined) {
        popup.querySelector('.popup__avatar').src = offers[index].author.avatar;
      } else {
        popup.querySelector('.popup__avatar').style = 'display: none';
      }

      if (offers[index].offer.address !== undefined) {
        popup.querySelector('.popup__text--address').innerText = offers[index].offer.address;
      } else {
        popup.querySelector('.popup__text--address').style = 'display: none';
      }

      popup.querySelector('.popup__text--price').innerText = offers[index].offer.price;

      if (offers[index].offer.type !== undefined) {
        popup.querySelector('.popup__type').innerText = TypeApartment[offers[index].offer.type];
      } else {
        popup.querySelector('.popup__type').style = 'display: none';
      }

      if (offers[index].offer.rooms !== undefined && offers[index].offer.guests !== undefined) {
        popup.querySelector('.popup__text--capacity').innerText = offers[index].offer.rooms + ' комнат для ' + offers[index].offer.guests + ' гостя(ей)';
      } else {
        popup.querySelector('.popup__text--capacity').style = 'display: none';
      }

      if (offers[index].offer.checkin !== undefined && offers[index].offer.checkout !== undefined) {
        popup.querySelector('.popup__text--time').innerText = 'Заезд до ' + offers[index].offer.checkin + ' выезд до ' + offers[index].offer.checkout;
      } else {
        popup.querySelector('.popup__text--time').style = 'display: none';
      }

      if (offers[index].offer.features !== undefined) {
        features.innerText = '';
        features.appendChild(createFeatures(offers[index].offer.features));
      } else {
        popup.querySelector('.popup__features').style = 'display: none';
      }

      if (offers[index].offer.description) {
        popup.querySelector('.popup__description').innerText = offers[index].offer.description;
      } else {
        popup.querySelector('.popup__description').style = 'display: none';
      }

      if (offers[index].offer.photos.length > 0) {
        photos.innerText = '';
        photos.appendChild(createPhotos(offers[index].offer.photos));
        // if block with photos was previously hided
        popup.querySelector('.popup__photos').style = 'display: block';
      } else {
        popup.querySelector('.popup__photos').style = 'display: none';
      }

      popup.style = 'display: block';

    };
})();
