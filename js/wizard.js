'use strict';
(function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var wizardSetup = document.querySelector('.setup-player');

  var wizardParams = {
    names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
    fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizardList = function (wizards) {
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  var changeColor = function (el, wizard) {
    if (el.classList.contains('setup-fireball')) {
      var hiddenInput = el.parentNode.querySelector('input[name="fireball-color"]');
      var color = getNextColor(hiddenInput.value, wizard.fireballColors);

      el.style.backgroundColor = color;
      hiddenInput.value = color;
    }

    if (el.classList.contains('wizard-coat')) {
      el.style.fill = getNextColor(el.style.fill, wizard.coatColors);
      document.querySelector('input[name="coat-color"]').value = el.style.fill;
    }

    if (el.classList.contains('wizard-eyes')) {
      el.style.fill = getNextColor(el.style.fill, wizard.eyesColors);
      document.querySelector('input[name="eyes-color"]').value = el.style.fill;
    }
  };

  var getNextColor = function (current, colors) {
    var currentColor = colors.indexOf(current);
    var nextColor = currentColor === colors.length - 1 ? 0 : currentColor + 1;

    return colors[nextColor];
  };

  var wizardSetupClickHandler = function (evt) {
    changeColor(evt.target, wizardParams);
    window.updateWizards();
  };

  wizardSetup.addEventListener('click', wizardSetupClickHandler);

  window.wizard = {
    renderList: renderWizardList
  };
})();
