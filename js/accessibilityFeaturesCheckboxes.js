'use strict';

(function () {
  var housingFeaturesInFilter = document.querySelector('#housing-features');
  var featuresCheckboxesInFilter = housingFeaturesInFilter.querySelectorAll('input[type=checkbox]');

  var housingFeaturesInForm = document.querySelector('.ad-form__element.features');
  var featuresCheckboxesInForm = housingFeaturesInForm.querySelectorAll('input[type=checkbox]');

  function checkboxListener(checkbox) {

    function pressEnter(evt) {
      if (evt.key === 'Enter') {
        if (checkbox.checked === false) {
          checkbox.checked = true;
        } else {
          if (checkbox.checked === true) {
            checkbox.checked = false;
          }
        }
      }
    }
    checkbox.addEventListener('keydown', pressEnter);
  }

  featuresCheckboxesInFilter.forEach(function (item) {
    checkboxListener(item);
  });

  featuresCheckboxesInForm.forEach(function (item) {
    checkboxListener(item);
  });

})();
