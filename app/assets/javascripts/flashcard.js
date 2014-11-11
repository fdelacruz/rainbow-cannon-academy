function flashCard() {}

flashCard.prototype = {
  create: function() {
  	console.log(game.state.current)
  	gameState.currentDeck.currentIndex = 0
  	gameState.questionsCorrect = 0
	  starfieldBackground.create(game)

	  // populate deck
	  gameState.currentDeck.populateCurrentRound()


	  // vector shapes
	  flashCardUI.textInputLine = new Phaser.Rectangle(600, 150, 400, 1)

	  overallUI.gameAreaCeilingLine = new Phaser.Rectangle(0,200, 1200, 1)

	  timer.create(game)

	  // rain
	  rain.create(game)

	  // create flashcardPlayer object - only visable to show upgrades
	  var flashcardPlayer = game.add.sprite(32, game.world.height - 150, 'dude')
	  game.physics.arcade.enable(flashcardPlayer)

	  // create boss alien - only visable to show upgrades
	  flashcardBossAlien = game.add.sprite(900, 250, 'diamond')
	  game.physics.arcade.enable(flashcardBossAlien)
	  flashcardBossAlien.physicsBodyType = Phaser.Physics.ARCADE
	  flashcardBossAlien.scale.setTo(1,1)

	  // create keyboard listeners
	  game.input.keyboard.addCallbacks(this, flashCardUI.wordKeysHandler)

	  // create text fields ------------------------------------------------
	  overallUI.scoreObject = game.add.text(
	    32, 32, // x coord, y coord
	    'Score: ' + overallUI.score, // text field
	    {fontSize: '32px', fill: '#ffffff'} // text styling
	    )


	  // answer input
	  gameState.userGuess = game.add.text(600, 122, '', {fontSize: '32px', fill: '#ffffff'})
	  // flascard question
	  gameState.currentQuestion = game.add.text(200, 128, gameState.currentDeck.currentCard.term , {fontSize: '32px', fill: '#ffffff'})
	  // current round remaining cards
	  gameState.currentCardsRemaining = game.add.text(
	    450, 50,
	    'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound(),
	    {fontSize: '32px', fill: '#ffffff'}
	  )
	  // feedback shown to user (ex: 'Correct' or 'Omaha')
	  gameState.userFeedbackText = game.add.text(765, 165, '', {fontSize: '32px', fill: '#ffffff'})
  },

  update: function() {
   	// var player = gameState.player

	  // set scroll speed of background
	  starfieldBackground.update()

  },
  render: function() {
    phaserLifeCycleFunctions.render(game)
  },

}
