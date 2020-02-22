'use strict';
(function () {

  var MAX_PINS_NUM = 5;

  var pinTemplate = document.querySelector('#pin').content;
  var map = document.querySelector('.map');

  var photoTemplate = document.querySelector('#card').content;
  var clonePhotoTemplate = photoTemplate.cloneNode(true);
  var imgTemplate = clonePhotoTemplate.querySelector('.popup__photo');

  window.composePins = {
    generatePins: generatePins
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

  function generatePins(ads) {
    var fragment = new DocumentFragment();

    // this function made for closures
    function pinListener(pin, index) {
      pin.addEventListener('click', function () {
        iterateOverPins();
        pin.classList.add('map__pin--active');
        displayPopup(index, ads);
      });
    }

    function iterateOverPins() {
      var pins = map.querySelectorAll('.map__pin');

      pins.forEach(function (item) {
        if (item.classList.contains('map__pin--active')) {
          item.classList.remove('map__pin--active');
        }
      });
    }

    // creates proper popup's data for each pins
    function displayPopup(index, dwellings) {
      var offers = dwellings;
      var popup = map.querySelector('.popup');
      var popupClose = popup.querySelector('.popup__close');
      var features = popup.querySelector('.popup__features');
      var photos = popup.querySelector('.popup__photos');

      function closePopup() {
        popup.style = 'display: none';
        popupClose.removeEventListener('click', closePopup);
      }

      popupClose.addEventListener('click', closePopup);

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
        popup.querySelector('.popup__type').innerText = offers[index].offer.type;
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
    }

    for (var i = 0; i < MAX_PINS_NUM; i++) {
      // verify if add has offer property
      if (ads[i].offer !== undefined) {
        var pinContainer = pinTemplate.cloneNode(true);
        var pin = pinContainer.querySelector('.map__pin');
        var pinImg = pin.querySelector('img');

        pinListener(pin, i);
        pin.style = 'left: ' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;"';
        pinImg.src = ads[i].author.avatar;
        pinImg.alt = ads[i].offer.title;
        fragment.appendChild(pin);
      }
    }

    var pinsContainer = document.querySelector('.map__pins');
    pinsContainer.appendChild(fragment);
  }

})();
