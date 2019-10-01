'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var COLUMN_GAP = 50;
  var GAP_Y = 90;
  var COLUMN_WIDTH = 40;
  var FONT_HEIGHT = 20;
  var columnHeight = CLOUD_HEIGHT - GAP_Y - FONT_HEIGHT - GAP;
  var FONT_GAP_X = 20;
  var FONT_GAP_Y = 30;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  var renderText = function (ctx, x, y, color, text) {
    ctx.font = '16px PT Mono';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  var renderRect = function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    renderText(ctx, CLOUD_X + FONT_GAP_X, CLOUD_Y + FONT_GAP_Y, '#000', 'Ура вы победили!');
    renderText(ctx, CLOUD_X + FONT_GAP_X, CLOUD_Y + FONT_GAP_Y + FONT_HEIGHT, '#000', 'Список результатов:');

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {

      if (players[i] === 'Вы') {
        renderRect(ctx, CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP_Y + (columnHeight - (columnHeight * times[i]) / maxTime), COLUMN_WIDTH, (columnHeight * times[i]) / maxTime, 'rgba(255, 0, 0, 1)');
      } else {
        renderRect(ctx, CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP_Y + (columnHeight - (columnHeight * times[i]) / maxTime), COLUMN_WIDTH, (columnHeight * times[i]) / maxTime, 'hsl(240, ' + (Math.random() * 100) + '%, 50%)');
      }

      renderText(ctx, CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP_Y + columnHeight + FONT_HEIGHT, '#000', players[i]);

      renderText(ctx, CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP_Y + (columnHeight - (columnHeight * times[i]) / maxTime) - GAP, '#000', Math.round(times[i]));
    }
  };
})();
