
function flashCard() {}

flashCard.prototype = {
  create: function() {
  	console.log(game.state.current)
  	game.stage.backgroundColor = '#231825'

  	// create planet
    var planet = gameState.planetBg = game.add.tileSprite(0, 200, 1200, 600, 'planet_bg')

    // create HUD Display
    var hud = game.add.sprite(0, 0, 'hud')
    hud.width = 1200
    hud.height = 200


  	//resetting
    gameState.currentDeck.roundComplete = false
  	gameState.currentDeck.currentIndex = 0
  	gameState.currentDeck.updateCurrentCard()
  	//--
  	gameState.questionsCorrect = 0

	  // populate deck

	  // input timer
    flashCardUI.textInputTimer = new Phaser.Rectangle(0, 200, 1200, 1)


	  // If game first starting, deck must be shuffled:
	  if (gameState.firstTimeOnLevel) gameState.currentDeck.populateCurrentRound()

	  // vector shapes
	  // flashCardUI.textInputLine = new Phaser.Rectangle(0, 200, 1200, 1)

	  gameUI.gameAreaCeilingLine = new Phaser.Rectangle(0,200, 1200, 1)


	  // rain
	  // rain.create(game)

	  // create flashcardPlayer object - only visable to show upgrades
	  var flashcardPlayer = gameState.flashcardPlayer = game.add.sprite(32, game.world.height - 150, 'dude')
	  game.physics.arcade.enable(flashcardPlayer)
    flashcardPlayerBullets = gameState.groups.flashcardPlayerBullets = game.add.group()
    flashcardPlayerBullets.enableBody = true
    flashcardPlayerBullets.physicsBodyType = Phaser.Physics.ARCADE
    flashcardPlayerBullets.createMultiple(250, 'bullet')
    flashcardPlayer.anchor.set(0.5)
    this.tweenPlayerFlyIn(flashcardPlayer)

	  // create boss alien - only visable to show upgrades
	  flashcardBossAlien = gameState.bossAlien = game.add.sprite(900, 250, 'diamond')
	  game.physics.arcade.enable(flashcardBossAlien)
	  flashcardBossAlien.physicsBodyType = Phaser.Physics.ARCADE
	  flashcardBossAlien.scale.setTo(1,1)

	  // create keyboard listeners
	  game.input.keyboard.addCallbacks(this, flashCardUI.wordKeysHandler)

	  // create text fields ------------------------------------------------
	  gameUI.scoreObject = game.add.text(
	    200, 32, // x coord, y coord
	    'Score: ' + gameUI.score, // text field
	    {font: '24px Josefin Slab', fill: '#ffffff'} // text styling
	    )
    gameUI.scoreObject.anchor.set(0.5)


	  // answer input
	  gameState.userGuess = game.add.text(600, 150, '', {font: '24px Josefin Slab', fill: '#ffffff'})
    gameState.userGuess.anchor.set(0.5)
	  // flascard question
	  gameState.currentQuestion = game.add.text(600, 100, gameState.currentDeck.currentCard.term , { fill: 'white', font: '24px Josefin Slab'})
    gameState.currentQuestion.anchor.set(0.5)
	  // current round remaining cards
	  gameState.currentCardsRemaining = game.add.text(
	    600, 50,
	    'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound(),
	    {font: '24px Josefin Slab', fill: '#ffffff'}
	  )
    gameState.currentCardsRemaining.anchor.set(0.5)
	  // feedback shown to user (ex: 'Correct' or 'Omaha')
	  gameState.userFeedbackText = game.add.text(900, 32, '', {font: '24px Josefin Slab', fill: '#ffffff'})
    gameState.userFeedbackText.anchor.set(0.5)

  },

  update: function() {
    var questionsCorrect = gameState.currentDeck.cardsLeftInCurrentRound() + gameState.questionsCorrect
    var s = gameUI.alienBossScale(questionsCorrect)
    gameState.bossAlien.scale.setTo(s,s)

      Phaser.Rectangle.inflate(flashCardUI.textInputTimer, ((-3/gameState.currentDeck.currentCard.definition.length)), 0)

  if (flashCardUI.textInputTimer.width <1) {
  	// player got the question wrong, play wrong answer animation
  	var wrongTextSprite = game.add.text(600, 150, gameState.currentDeck.currentCard.definition, {font: '24px Josefin Slab', fill: 'red'})
    wrongTextSprite.anchor.set(0.5)
    flashCardUI.tweenWrongAnswer(wrongTextSprite)
    
    flashCardUI.textInputTimer.x = 0
    flashCardUI.textInputTimer.width = 1200

    // prevents glitch on hitting multiple enter hits
      if (gameState.currentDeck.currentIndex === 9 ) {
        if (gameState.finishingLevel) return
        // leave a second to view last incorrect answer
        setTimeout(function(){
          game.state.start('fight')
          gameState.finishingLevel = false
        }, 1000)
        gameState.finishingLevel = true
        return
      }
      // ---
      gameState.userFeedbackText.text = "Last: " + gameState.currentDeck.currentCard.definition
      flashCardUI.performCycleCardProcedure()
   }
  },

  render: function() {
    game.debug.geom(flashCardUI.textInputLine,'#FFFFFF')
    game.debug.geom(gameUI.gameAreaCeilingLine,'#FFFFFF')
    game.debug.geom(flashCardUI.textInputTimer,'green')
  },

  tweenPlayerFlyIn: function(player){
  	var tween = game.add.tween(player)
    tween.from({x: -100, alpha: 0}, 1500)
    tween.start()
  },

}
