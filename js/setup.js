'use strict';
(function () {
  var similarWizardTemplte = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARDS = 4;
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var coatInput = document.getElementsByName('coat-color')[0];
  var eyesInput = document.getElementsByName('eyes-color')[0];
  var fireballInput = document.getElementsByName('fireball-color')[0];

  var colorRandom = function (colors) {
    var extraColor = colors[Math.floor(Math.random() * colors.length)];
    return extraColor;
  };

  wizardCoat.addEventListener('click', function () {
    var colorCoat = colorRandom(COAT_COLORS);
    wizardCoat.style.fill = colorCoat;
    coatInput.value = colorCoat;
  });

  wizardEyes.addEventListener('click', function () {
    var colorEyes = colorRandom(EYES_COLORS);
    wizardEyes.style.fill = colorEyes;
    eyesInput.value = colorEyes;
  });

  wizardFireball.addEventListener('click', function () {
    var colorFireball = colorRandom(FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = colorFireball;
    fireballInput.value = colorFireball;
  });

  var getRandomWizards = function (name, surname, coatColor, eyesColor) {
    var wizards = [];

    for (var i = 0; i < MAX_WIZARDS; i++) {
      var wizard = {};

      wizard.name = name[Math.floor(Math.random() * name.length)] + ' ' + surname[Math.floor(Math.random() * surname.length)];
      wizard.coatColor = coatColor[Math.floor(Math.random() * coatColor.length)];
      wizard.eyesColor = eyesColor[Math.floor(Math.random() * eyesColor.length)];

      wizards.push(wizard);
    }

    return wizards;
  };

  var renderWizard = function (element) {
    var wizardElement = similarWizardTemplte.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.eyesColor;

    return wizardElement;
  };

  var addElement = function (name, surname, coats, eyes) {
    var wizardsArray = getRandomWizards(name, surname, coats, eyes);
    for (var j = 0; j < wizardsArray.length; j++) {
      fragment.appendChild(renderWizard(wizardsArray[j]));
    }
  };

  addElement(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
