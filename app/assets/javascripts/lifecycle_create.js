phaserLifeCycleFunctions.create = function(){
  var sky = game.add.sprite(0, 0, 'sky') // set background
  sky.scale.setTo(2,1)
  game.physics.startSystem(Phaser.Physics.ARCADE)
  gameUI.textInputLine = new Phaser.Rectangle(0, 550, 800, 50)


  //rain

  var emitter = game.add.emitter(game.world.width, 475, 500)  //(x, y , max particles)

  emitter.height = 400

  emitter.makeParticles('rain')
  // emitter.gravity.x = 0

  emitter.minParticleScale = 1
  emitter.maxParticleScale = 1

  // emitter.setYSpeed(500,-500);
  emitter.setXSpeed(-800, -1500)
  emitter.setYSpeed(0,0)

  emitter.minRotation = 1
  emitter.maxRotation = 1

  emitter.start(false, 3000,  0.5) //(explode, lifespan, frequency, quantity, forceQuantity)
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

  // create keyboard listeners
  gameState.cursors = game.input.keyboard.createCursorKeys()
  game.input.keyboard.addCallbacks(this, flashCardUI.wordKeysHandler)

  // answer input
  gameState.userGuess = game.add.text(400,16, '', {fontSize: '32px', fill: '#000'})
  // flascard question
  gameState.currentQuestion = game.add.text(16,16, gameState.currentDeck.currentCard.term , {fontSize: '32px', fill: '#000'})
}
