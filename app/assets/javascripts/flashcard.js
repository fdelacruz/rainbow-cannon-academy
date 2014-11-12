function flashCard() {}

flashCard.prototype = {
  create: function() {
  	console.log(game.state.current)
  	//resetting
  	gameState.currentDeck.currentIndex = 0
  	gameState.currentDeck.updateCurrentCard()
  	//--
  	gameState.questionsCorrect = 0
	  starfieldBackground.create(game)

	  // input timer
    flashCardUI.textInputTimer = new Phaser.Rectangle(600, 180, 400, 1)


	  // If game first starting, deck must be shuffled:
	  if (gameState.firstTimeOnLevel) gameState.currentDeck.populateCurrentRound()


	  // vector shapes
	  flashCardUI.textInputLine = new Phaser.Rectangle(600, 150, 400, 1)

	  overallUI.gameAreaCeilingLine = new Phaser.Rectangle(0,200, 1200, 1)

	  timer.create(game)

	  // rain
	  // rain.create(game)

	  // create flashcardPlayer object - only visable to show upgrades
	  var flashcardPlayer = gameState.flashcardPlayer = game.add.sprite(32, game.world.height - 150, 'dude')
	  game.physics.arcade.enable(flashcardPlayer)
    flashcardPlayerBullets = gameState.groups.flashcardPlayerBullets = game.add.group()
    flashcardPlayerBullets.enableBody = true
    flashcardPlayerBullets.physicsBodyType = Phaser.Physics.ARCADE
    flashcardPlayerBullets.createMultiple(250, 'bullet')





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
      Phaser.Rectangle.inflate(flashCardUI.textInputTimer, ((-3/gameState.currentDeck.currentCard.definition.length)), 0)

  if (flashCardUI.textInputTimer.width <1) {
    flashCardUI.textInputTimer.x = 600
    flashCardUI.textInputTimer.width = 400
   }


  },
  render: function() {
    phaserLifeCycleFunctions.render(game)
  },

}
