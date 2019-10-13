'use strict';
(function () {
  var setupDialog = document.querySelector('.setup');
  var wizardNameInput = setupDialog.querySelector('.setup-user-name');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupDialog.querySelector('.setup-close');
  var uploadElement = document.querySelector('.upload');
  var form = setupDialog.querySelector('.setup-wizard-form');

  var openSetup = function () {
    setupDialog.classList.remove('hidden');
    document.addEventListener('keydown', setupEscPressHandler);
  };

  var closeSetup = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', setupEscPressHandler);
  };

  var setupEscPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeSetup();
    }
  };

  setupOpenElement.addEventListener('click', function () {
    openSetup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      openSetup();
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closeSetup();
  });

  wizardNameInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  uploadElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var newCoords = {
        x: setupDialog.offsetLeft - (startCoords.x - moveEvt.clientX),
        y: setupDialog.offsetTop - (startCoords.y - moveEvt.clientY)
      };

      setupDialog.style.top = newCoords.y + 'px';
      setupDialog.style.left = newCoords.x + 'px';

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var preventDefaultHandler = function (draggedEvt) {
          draggedEvt.preventDefault();
          uploadElement.removeEventListener('click', preventDefaultHandler);
        };
        uploadElement.addEventListener('click', preventDefaultHandler);
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  document.querySelector('.setup-similar').classList.remove('hidden');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      closeSetup();
    });
  });
})();
