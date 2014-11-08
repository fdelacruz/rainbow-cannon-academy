phaserLifeCycleFunctions.render = function () {
  game.debug.geom(gameUI.textInputLine,'#FFFFFF');
  game.debug.text('test: ' + overallUI.millisecondsUntilSecondDecrement.duration, 32, 32);
  game.debug.text('Loop Count: ' + overallUI.gameTimeRemaining, 32, 64);
}

