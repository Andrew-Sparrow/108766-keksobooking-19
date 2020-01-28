var listTypeApartment = ['palace', 'flat', 'house', 'bungalow'];
var listTimeCheckInOut = ['12:00', '13:00', '14:00'];
var listFeatures= ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// returns random integer
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function generateListApartments() {
  var listApartments = [];

  function newAuthor() {
    var newAthor = {};
    return newAthor;
  }

  for (var i = 1; i <= 8; i++) {
    var newApartment = {};
    newApartment.author = newAuthor();
    newApartment.author.avatar = 'img/avatars/user0' + i + '.png';
    listApartments.push(newApartment);
  }

  return listApartments;
}

console.log(generateListApartments());
