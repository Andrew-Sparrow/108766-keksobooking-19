'use strict';

(function () {
  var FILE_TYPES_PICTURES = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'bmp'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var fileChooserHomePicture = document.querySelector('.ad-form__upload input[type=file]');
  var homePreview = document.querySelector('.ad-form__photo img');


  function isMatchesFileType(fileNamePicture) {
    return FILE_TYPES_PICTURES.some(function (it) {
      return fileNamePicture.endsWith(it);
    });
  }

  function uploadPicture(inputPicture, preview) {
    inputPicture.addEventListener('change', function () {
      var file = inputPicture.files[0];
      var fileName = file.name.toLowerCase();

      if (isMatchesFileType(fileName)) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      } else {
        window.validateFormFields.setErrorState(inputPicture, 'файлом может быть только изображение');
      }
    });
  }

  uploadPicture(fileChooserAvatar, avatarPreview);
  uploadPicture(fileChooserHomePicture, homePreview);

})();


