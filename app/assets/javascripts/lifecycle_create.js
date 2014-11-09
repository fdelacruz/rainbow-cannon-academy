phaserLifeCycleFunctions.create = function(){
  game.stage.backgroundColor = '#542437'
  game.physics.startSystem(Phaser.Physics.ARCADE)

  // populate deck
  gameState.currentDeck.populateCurrentRound()


  // vector shapes
  flashCardUI.textInputLine = new Phaser.Rectangle(600, 150, 400, 1)

  // timer
  var timer = overallUI.millisecondsUntilSecondDecrement = game.time.create(false)
  overallUI.gameTimeRemaining = 300
  timer.loop(1000, overallUI.decrementGameTimeRemaining, this)
  timer.start()

  // rain
  var emitter = game.add.emitter(game.world.width, 375, 500)  //(x, y , max particles)
  emitter.height = 400
  emitter.angle = 2
  // emitter.makeParticles('rain')
  emitter.minParticleScale = 1
  emitter.maxParticleScale = 1
  emitter.setXSpeed(-800, -1500)
  emitter.setYSpeed(0,0)
  emitter.minRotation = 1
  emitter.maxRotation = 1
  emitter.start(false, 3000,  15) //(explode, lifespan, frequency, quantity, forceQuantity)
  emitter.gravity.x = 1000

  // bullets
  bullets = game.add.group()
  bullets.enableBody = true
  bullets.physicsBodyType = Phaser.Physics.ARCADE
  //  All 40 of them
  bullets.createMultiple(400, 'bullet')
  bullets.setAll('anchor.x', 0.5)
  bullets.setAll('anchor.y', 0.5)

  // create platforms (stuff the character can stand on)
  var platforms = gameState.groups.platforms = game.add.group()
  platforms.enableBody = true

  var ground = platforms.create(0, game.world.height -30, 'ground')
  ground.scale.setTo(4,1)
  ground.body.immovable = true

  // var rightLedge = platforms.create(400, 400, 'ground')
  // rightLedge.body.immovable = true
  var screenSplit = platforms.create(0, 200, 'ground')
  screenSplit.scale.setTo(4,1)
  screenSplit.body.immovable = true

  // create player object
  var player = gameState.player = game.add.sprite(32, game.world.height - 150, 'dude')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.collideWorldBounds = true

  // create bad guy
  aliens = gameState.groups.aliens = game.add.group()
  aliens.enableBody = true
  aliens.physicsBodyType = Phaser.Physics.ARCADE
  createAliens()

  // create keyboard listeners
  gameState.cursors = game.input.keyboard.createCursorKeys()
  game.input.keyboard.addCallbacks(this, flashCardUI.wordKeysHandler)

  // create text fields ------------------------------------------------

  // answer input
  gameState.userGuess = game.add.text(600, 122, '', {fontSize: '32px', fill: '#000'})
  // flascard question
  gameState.currentQuestion = game.add.text(200, 128, gameState.currentDeck.currentCard.term , {fontSize: '32px', fill: '#000'})
  // current round remaining cards
  gameState.currentCardsRemaining = game.add.text(
    450, 50,
    'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound(),
    {fontSize: '32px', fill: '#000'}
  )
  // feedback shown to user (ex: 'Correct' or 'Omaha')
  gameState.userFeedbackText = game.add.text(765, 165, '', {fontSize: '32px', fill: '#000'})
}
