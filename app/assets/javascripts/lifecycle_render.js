phaserLifeCycleFunctions.render = function(phaserGame) {
  phaserGame.debug.geom(flashCardUI.textInputLine,'#FFFFFF')
  phaserGame.debug.geom(overallUI.gameAreaCeilingLine,'#FFFFFF')
  timer.render(phaserGame)
}
