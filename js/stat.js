'use strict';
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
var FONT = '16px PT Mono';
var COLOR = '#000';
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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = FONT;
  ctx.fillStyle = COLOR;
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP_X, CLOUD_Y + FONT_GAP_Y);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP_X, CLOUD_Y + FONT_GAP_Y + FONT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + (Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP_Y + (columnHeight - (columnHeight * times[i]) / maxTime), COLUMN_WIDTH, (columnHeight * times[i]) / maxTime);

    ctx.font = FONT;
    ctx.fillStyle = COLOR;
    ctx.fillText(players[i], CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP_Y + columnHeight + FONT_HEIGHT);
    ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + GAP_Y + (columnHeight - (columnHeight * times[i]) / maxTime) - GAP);
  }
};
