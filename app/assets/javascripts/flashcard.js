function flashCard() {}

flashCard.prototype = {
  create: function() {
  	console.log(game.state.current)
    phaserLifeCycleFunctions.create(game)
  },

  update: function() {

   	var player = gameState.player
	  var cursors = gameState.cursors


	  // set scroll speed of background
	  starfieldBackground.update()
	  // ---

	  // overallUI.checkIfFlashcardsComplete()
	  // if (gameState.currentDeck.cardsLeftInCurrentRound() < 1 ) {
	  // 	flashCardUI.clearFlashCardText()
	  //   gameState.currentLevel++
	  //   // console.log("go to fight mode")
	  //   // game.state.start('fight')
	  // }

  },
  render: function() {
    phaserLifeCycleFunctions.render(game)
  },

}
