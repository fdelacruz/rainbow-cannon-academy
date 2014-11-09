phaserLifeCycleFunctions.render = function () {
  game.debug.geom(flashCardUI.textInputLine,'#FFFFFF');
  game.debug.text('Seconds Remaining: ' + overallUI.gameTimeRemaining, 450, 32);
}

