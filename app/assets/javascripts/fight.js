	function fight() {}

fight.prototype = {
  create: function() {
  	console.log(game.state.current)

  	// create HUD Display
    var hud = game.add.sprite(0, 0, 'hud')
    hud.width = 1200
    hud.height = 200

  	// Logic to only scatter aliens once, called in fight - update loop
  	gameUI.alienScatterEnabled = true

	  game.physics.startSystem(Phaser.Physics.ARCADE)

	  // scrolling tile sprite
    var planet = gameState.planetBg = game.add.tileSprite(0, 200, 1200, 600, 'planet_bg')
    flashCardUI.tweenBgFadeIn(planet)

	  // Ceiling visible line and collision detector
	  gameUI.gameAreaCeilingLine = new Phaser.Rectangle(0,200, 1200, 1)
	  gameUI.gameAreaCeiling = game.add.sprite(0,200,null)
	  game.physics.enable(gameUI.gameAreaCeiling, Phaser.Physics.ARCADE)
	  gameUI.gameAreaCeiling.body.setSize(1200, 1, 0, 0)
	  gameUI.gameAreaCeiling.body.immovable = true

	  // rain
	  // rain.create(game)

	  // playerBullets
	  playerBullets = gameState.groups.playerBullets = game.add.group()
	  playerBullets.enableBody = true
	  playerBullets.physicsBodyType = Phaser.Physics.ARCADE
	   // All 100 of them
	  if (gameState.questionsCorrect === 10) playerBullets.createMultiple(250, 'rainbowCannon')
	  else playerBullets.createMultiple(250, 'bullet')

	  playerBullets.setAll('anchor.x', 0.5)
	  playerBullets.setAll('anchor.y', 0.5)
	  playerBullets.setAll('damage', 5)

	  bossAlienBullets = gameState.groups.bossAlienBullets = game.add.group()
	  bossAlienBullets.enableBody = true
	  bossAlienBullets.physicsBodyType = Phaser.Physics.ARCADE
	   // All 100 of them
	  bossAlienBullets.createMultiple(250, 'plasma')

	  bossAlienBullets.setAll('anchor.x', 0.5)
	  bossAlienBullets.setAll('anchor.y', 0.5)
	  bossAlienBullets.setAll('damage', 50)

	  // create player object
	  var player = gameState.player = game.add.sprite(32, game.world.height - 150, 'dude')
	  game.physics.arcade.enable(player)
	  player.body.bounce.y = 0.2
	  player.body.collideWorldBounds = true
	  player.health = 150
	  gameUI.upgradeGun(gameState.questionsCorrect)

	  // create lives

	  for (var y = 1; y < gameState.lifes + 1; y++) {
	  	var life = game.add.sprite((y*48)+100, 60, 'dude')
	  	life.angle = -90
	  	life.scale.setTo(0.6,0.6)
	  }

	  // create explosions
	  var explosions = gameState.groups.explosions = game.add.group()
    explosions.createMultiple(21, 'explosion')
    explosions.forEach(setUpExplosion)

    function setUpExplosion(explode){
    	explode.animations.add('explosion')
    }
    // ---

    // create dude hit animation

    var dude_hit = gameState.groups.dude_hit = game.add.group()
    dude_hit.createMultiple(21, 'dude_hit')
    dude_hit.forEach(setUpDudeHit)

    function setUpDudeHit(dude_hit){
    	dude_hit.animations.add('dude_hit')
    }

    // ---

	  // create regular aliens
	  aliens = gameState.groups.aliens = game.add.group()
	  aliens.enableBody = true
	  aliens.physicsBodyType = Phaser.Physics.ARCADE

	  // create boss alien

	  bossAlien = gameState.bossAlien = game.add.sprite(1350, 350, 'boss_alien')
	  // gameState.bossAlienScale = 0.25
	  game.physics.arcade.enable(bossAlien)
	  bossAlien.enableBody = true
	  bossAlien.physicsBodyType = Phaser.Physics.ARCADE
	  bossAlien.body.bounce.x = .9
	  bossAlien.body.bounce.y = .9
	  bossAlien.scale.setTo(gameState.bossAlienScale,gameState.bossAlienScale)
	  bossAlien.anchor.x = 0.5
	  bossAlien.anchor.y = 0.5

	  // create keyboard listeners
	  gameState.cursors = game.input.keyboard.createCursorKeys()

	  // create text fields ------------------------------------------------
	  gameUI.scoreObject = game.add.text(
	    32, 32, // x coord, y coord
	    gameUI.score.toString(), // text field
	    {font: '24px Josefin Slab', fill: '#ffffff'}  // text styling
	    )

	  gameUI.spawnAliens()
  },
  update: function() {
  	// scroll speed of background:
  		gameState.planetBg.tilePosition.x -= 1

  	 	var player = gameState.player
		  var cursors = gameState.cursors
		  var shootThePlayerGun = false
		  var shootTheBossAlienGun = false

		  // Player cannot pass through the game boundaries
		  game.physics.arcade.collide(player, gameUI.gameAreaCeiling)
		  // Player cannot pass through the game boundaries
		  game.physics.arcade.collide(gameState.bossAlien, gameUI.gameAreaCeiling)
		  // aliens cannot pass through game boundaries
		  game.physics.arcade.collide(gameState.groups.aliens, gameUI.gameAreaCeiling)
		  // boss alien cannot pass through game boundaries
		  game.physics.arcade.collide(gameState.bossAlien, gameUI.gameAreaCeiling)
		  // aliens bounce off of each other
		  game.physics.arcade.collide(gameState.groups.aliens, gameState.groups.aliens)
		  // aliens bounce off of boss alien
		  game.physics.arcade.collide(gameState.groups.aliens, gameState.bossAlien)

		  // Bullets cause damage to aliens and then disappear
		  game.physics.arcade.overlap(gameState.groups.playerBullets, gameState.groups.aliens, gameUI.hitAlien , null, this)
		  // Bullets cause the boss alien to shrink
		  game.physics.arcade.overlap(gameState.groups.playerBullets, gameState.bossAlien, gameUI.shrinkBoss , null, this)
		  // Aliens damage the player when they touch
		  game.physics.arcade.overlap(player, gameState.groups.aliens, gameUI.hitPlayer, null, this)
		  // Boss alien bullets damage player
		  game.physics.arcade.overlap(player, gameState.groups.bossAlienBullets, gameUI.hitPlayer, null, this)

		    if (cursors.left.isDown) {
		      // player UP
		      player.body.velocity.y = -250;
		      // player.animations.play('up')
		    } else if (cursors.right.isDown){
		      // player DOWN
		      player.body.velocity.y = 250;
		      // player.animations.play('down')
		    } else {
		      // player stand still
		      player.animations.stop()
		      player.frame = 4
		      player.body.velocity.y = 0
		    }

		  // fire!
		  gameUI.firePlayerGunCounter += 1
		  if (gameUI.firePlayerGunCounter >= gameUI.firePlayerGunRate){
		  	if (!gameUI.alienScatterEnabled){
		  		gameUI.firePlayerBullet()
		    gameUI.firePlayerGunCounter = 0
		  	}
		  }

		  gameState.bossAlien.rotation = game.physics.arcade.angleBetween(gameState.bossAlien, gameState.player) +  Math.PI
		  gameUI.fireBossAlienGunCounter += 1
		  if ((gameUI.fireBossAlienGunCounter >= gameUI.fireBossAlienGunRate) && gameState.bossAlien.inWorld && gameState.bossAlien.alive){
		    gameUI.fireBossAlienBullet()
		    gameUI.fireBossAlienGunCounter = 0
		  }

		  if (gameUI.aliensDead()) {
		    gameState.currentLevel++
		    gameState.firstTimeOnLevel = true
		    game.state.start('level_intro')
		  }

		  if (gameUI.playerDead(gameState.player)){
		  	gameState.lifes -= 1
		  	if (gameState.lifes <= 0){
		  		console.log('game over')
		  		game.state.start('game_over')
		  		// gameState.firstTimeOnLevel = false
		  		// game.state.start('game_over')
		  	} else {
		  		gameState.firstTimeOnLevel = false
		    	game.state.start('level_intro')
		  	}
		  }

		  if (gameState.groups.aliens.x < 850){
		    if (gameUI.alienScatterEnabled) {
		    	gameUI.scatterAliens()
		    	gameUI.sendBossAlien()
		    }
		  }

		  if (gameState.bossAlien.x < 800 ){
		  	gameUI.bossInGameArea = true
		  	gameState.bossAlien.body.collideWorldBounds = true
		  	gameState.bossAlien.body.velocity.x = 30
		  	gameState.bossAlien.body.velocity.y = gameUI.getRandomInt(0, 30)
		  }

		// Kamikazee Behavior



		  gameState.groups.aliens.forEach(function(alien){
		  	if (alien.body.x  < 200.5 & alien.body.x  > 199.5  ) {
		  		alien.body.velocity.x = 0}
		  	if (alien.body.x === 0) {
		  		alien.body.velocity.x = 50}
		  })

		  gameState.groups.aliens.forEach(function(alien){
		  	if (alien.body.x <201 && alien.body.x >199 ) gameUI.kamikazeCounter++
		  })

		  if (gameUI.kamikazeCounter > 1) {
		  	gameState.groups.aliens.forEach(function(alien){
		  		if (alien.body.x <201 && alien.body.x >199)  {
		  			alien.body.velocity.x = -300
		  			gameUI.kamikazeCounter = 0
		  		}
		  	})
		  }
		  gameUI.kamikazeCounter = 0

		  //

  },
  render: function() {
    game.debug.geom(gameUI.gameAreaCeilingLine,'#FFFFFF')
  },
}
