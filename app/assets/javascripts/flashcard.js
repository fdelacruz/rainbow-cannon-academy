function flashCard() {}

flashCard.prototype = {
  create: function() {
  	console.log(game.state.current)
    phaserLifeCycleFunctions.create(game)
  },

  update: function() {
  	
   	var player = gameState.player

	  // set scroll speed of background
	  starfieldBackground.update()

  },
  render: function() {
    phaserLifeCycleFunctions.render(game)
  },

}
