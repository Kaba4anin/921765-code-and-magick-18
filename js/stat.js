'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BAR_GAP = 50;
  var TEXT_HEIGHT = 42;
  var TEXT_COLOR = '#000';
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderBar = function (ctx, x, y, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, BAR_WIDTH, height);
  };

  var renderText = function (ctx, text, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  var getMaxElement = function (arr) {
    var maxElement = 0;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getBarColor = function (hue) {
    var saturation = Math.floor(Math.random() * 100);
    return 'hsl(' + hue + ', ' + saturation + '%, 50%)';
  };

  var getX = function (gap) {
    return CLOUD_X + gap;
  };

  var getY = function (gap) {
    return CLOUD_Y + gap;
  };

  var renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, getX(10), getY(10), 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.font = '16px PT Mono';
    renderText(ctx, 'Ура вы победили!', getX(20), getY(30), TEXT_COLOR);
    renderText(ctx, 'Список результатов: ', getX(20), getY(52), TEXT_COLOR);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var newBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
      var barHeightGap = BAR_HEIGHT - newBarHeight + TEXT_HEIGHT;
      var barWidthGap = getX(40) + (BAR_WIDTH + BAR_GAP) * i;
      var barColor = names[i] === 'Вы' ? PLAYER_COLOR : getBarColor(250);
      var time = Math.ceil(times[i]);

      renderText(ctx, time, barWidthGap, getY(30) + barHeightGap, TEXT_COLOR);
      renderBar(ctx, barWidthGap, getY(40) + barHeightGap, newBarHeight, barColor);
      renderText(ctx, names[i], barWidthGap, getY(252), TEXT_COLOR);
    }
  };

  window.renderStatistics = renderStatistics;
})();
