'use strict';
(function () {
  var coatColor;
  var eyesColor;
  var lastTimeout;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    var wizards = window.wizard.similar.slice();
    coatColor = document.querySelector('input[name="coat-color"]').value;
    eyesColor = document.querySelector('input[name="eyes-color"]').value;

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(function () {
      wizards.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        return rankDiff;
      });

      window.wizard.renderList(wizards);
    }, 500);
  };

  window.backend.load(function (data) {
    window.wizard.similar = data;
    window.wizard.renderList(data);
    updateWizards();
  });

  window.updateWizards = updateWizards;
})();
