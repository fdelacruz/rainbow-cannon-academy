phaserLifeCycleFunctions.create = function(){
  // game.stage.backgroundColor = '#FFF6E7'
  starfield = game.add.tileSprite(0, 200, 1200, 600, 'starfield');

  game.physics.startSystem(Phaser.Physics.ARCADE)

  // populate deck
  gameState.currentDeck.populateCurrentRound()


  // vector shapes
  flashCardUI.textInputLine = new Phaser.Rectangle(600, 150, 400, 1)
  overallUI.gameAreaCeilingLine = new Phaser.Rectangle(0,200, 1200, 1)
  overallUI.gameAreaCeiling = game.add.sprite(0,200,null)
  game.physics.enable(overallUI.gameAreaCeiling, Phaser.Physics.ARCADE)
  overallUI.gameAreaCeiling.body.setSize(1200, 1, 0, 0)
  overallUI.gameAreaCeiling.body.immovable = true

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
  emitter.setXSpeed(-500, -1200)
  emitter.setYSpeed(0,0)
  emitter.minRotation = 1
  emitter.maxRotation = 1
  emitter.start(false, 3000,  15) //(explode, lifespan, frequency, quantity, forceQuantity)
  emitter.gravity.y = -1000

  // playerBullets
  playerBullets = gameState.groups.playerBullets = game.add.group()
  playerBullets.enableBody = true
  playerBullets.physicsBodyType = Phaser.Physics.ARCADE
   // All 100 of them
  playerBullets.createMultiple(250, 'bullet')

  playerBullets.setAll('anchor.x', 0.5)
  playerBullets.setAll('anchor.y', 0.5)
  playerBullets.setAll('damage', 5)

  bossAlienBullets = gameState.groups.bossAlienBullets = game.add.group()
  bossAlienBullets.enableBody = true
  bossAlienBullets.physicsBodyType = Phaser.Physics.ARCADE
   // All 100 of them
  bossAlienBullets.createMultiple(250, 'bullet')

  bossAlienBullets.setAll('anchor.x', 0.5)
  bossAlienBullets.setAll('anchor.y', 0.5)
  bossAlienBullets.setAll('damage', 50)


  // create platforms (stuff the character can stand on)
  // var platforms = gameState.groups.platforms = game.add.group()
  // platforms.enableBody = true

  // var ground = platforms.create(0, game.world.height -30, 'ground')
  // ground.scale.setTo(4,1)
  // ground.body.immovable = true

  // var rightLedge = platforms.create(400, 400, 'ground')
  // rightLedge.body.immovable = true
  // var screenSplit = platforms.create(0, 200, 'ground')
  // screenSplit.scale.setTo(4,1)
  // screenSplit.body.immovable = true

  // create player object
  var player = gameState.player = game.add.sprite(32, game.world.height - 150, 'dude')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.collideWorldBounds = true
  player.health = 1000

  // create regular aliens
  aliens = gameState.groups.aliens = game.add.group()
  aliens.enableBody = true
  aliens.physicsBodyType = Phaser.Physics.ARCADE

  // create boss alien
  bossAlien = gameState.bossAlien = game.add.sprite(900, 250, 'diamond')
  game.physics.arcade.enable(bossAlien)
  bossAlien.enableBody = true
  bossAlien.physicsBodyType = Phaser.Physics.ARCADE
  bossAlien.scale.setTo(1,1)
  bossAlien.anchor.x = 0.5
  bossAlien.anchor.y = 0.5

  // create keyboard listeners
  gameState.cursors = game.input.keyboard.createCursorKeys()
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
}
