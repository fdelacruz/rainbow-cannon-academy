function fight() {}

fight.prototype = {
  create: function() {
  	console.log(game.state.current)
    
	  game.physics.startSystem(Phaser.Physics.ARCADE)

	  starfieldBackground.create(game)

	  overallUI.gameAreaCeilingLine = new Phaser.Rectangle(0,200, 1200, 1)
	  overallUI.gameAreaCeiling = game.add.sprite(0,200,null)
	  game.physics.enable(overallUI.gameAreaCeiling, Phaser.Physics.ARCADE)
	  overallUI.gameAreaCeiling.body.setSize(1200, 1, 0, 0)
	  overallUI.gameAreaCeiling.body.immovable = true

	  timer.create(game)

	  // rain
	  rain.create(game)

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

	  // create player object
	  var player = gameState.player = game.add.sprite(32, game.world.height - 150, 'dude')
	  game.physics.arcade.enable(player)
	  player.body.bounce.y = 0.2
	  player.body.collideWorldBounds = true
	  player.health = 100

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

	  // create text fields ------------------------------------------------
	  overallUI.scoreObject = game.add.text(
	    32, 32, // x coord, y coord
	    'Score: ' + overallUI.score, // text field
	    {fontSize: '32px', fill: '#ffffff'} // text styling
	    )

    gameState.player.health = 100

  },
  update: function() {
  	 	var player = gameState.player
		  var cursors = gameState.cursors
		  var shootThePlayerGun = false
		  var shootTheBossAlienGun = false

		  // Player cannot pass through the game boundaries
		  game.physics.arcade.collide(player, overallUI.gameAreaCeiling)
		  // aliens cannot pass through game boundaries
		  game.physics.arcade.collide(gameState.groups.aliens, overallUI.gameAreaCeiling)
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

		  // set scroll speed of background
		  // starfield.tilePosition.x -= 1
		  starfieldBackground.update()

		  // ---

		  // player.body.velocity.x = 5
		  
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
		    shootThePlayerGun = true
		    gameUI.firePlayerGunCounter = 0
		  }
		  if (shootThePlayerGun) {
		    gameUI.firePlayerBullet()
		  }

		  gameUI.fireBossAlienGunCounter += 1
		  if (gameUI.fireBossAlienGunCounter >= gameUI.fireBossAlienGunRate){
		    shootTheBossAlienGun = true
		    gameUI.fireBossAlienGunCounter = 0
		  }
		  if (shootTheBossAlienGun) {
		    gameUI.fireBossAlienBullet()
		  }

		  if (gameUI.aliensDead()) {
		    gameState.currentLevel++
		    gameState.firstTimeOnLevel = true
		    game.state.start('level_intro')
		  }

		  if (gameUI.playerDead(gameState.player)){
		  	gameState.firstTimeOnLevel = false
		    game.state.start('level_intro')
		  }

		  if (gameState.groups.aliens.x < 880){
		    if (gameUI.alienScatterEnabled) gameUI.scatterAliens()
		  }

  	
  },
  render: function() {
    game.debug.geom(overallUI.gameAreaCeilingLine,'#FFFFFF')
  	timer.render(game)
  },

}
