	function fight() {}

fight.prototype = {
  create: function() {
  	console.log(game.state.current)


  	// Enemy Bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);



  	// Logic to only scatter aliens once, called in fight - update loop
  	gameUI.alienScatterEnabled = true

	  game.physics.startSystem(Phaser.Physics.ARCADE)

	  // scrolling tile sprite
    var planet = gameState.planetBg = game.add.tileSprite(0, 200, 1200, 600, 'planet_bg')

	  // Ceiling visible line and collision detector
	  gameUI.gameAreaCeilingLine = new Phaser.Rectangle(0,200, 1200, 1)
	  gameUI.gameAreaCeiling = game.add.sprite(0,200,null)
	  game.physics.enable(gameUI.gameAreaCeiling, Phaser.Physics.ARCADE)
	  gameUI.gameAreaCeiling.body.setSize(1200, 1, 0, 0)
	  gameUI.gameAreaCeiling.body.immovable = true

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
	  gameUI.upgradeGun(gameState.questionsCorrect)

	  // create explosions
	  var explosions = gameState.groups.explosions = game.add.group()
    explosions.createMultiple(21, 'explosion')
    explosions.forEach(setUpExplosion)

    function setUpExplosion(explode){
    	explode.animations.add('explosion')
    }

	  // create regular aliens
	  aliens = gameState.groups.aliens = game.add.group()
	  aliens.enableBody = true
	  aliens.physicsBodyType = Phaser.Physics.ARCADE

	  // create boss alien
	  bossAlien = gameState.bossAlien = game.add.sprite(1500, 350, 'diamond')
	  game.physics.arcade.enable(bossAlien)
	  bossAlien.enableBody = true
	  bossAlien.physicsBodyType = Phaser.Physics.ARCADE
	  bossAlien.body.bounce.x = .9
	  bossAlien.body.bounce.y = .9
	  var scale = gameUI.alienBossScale(gameState.questionsCorrect)
	  bossAlien.scale.setTo(scale,scale)
	  bossAlien.anchor.x = 0.5
	  bossAlien.anchor.y = 0.5

	  // create keyboard listeners
	  gameState.cursors = game.input.keyboard.createCursorKeys()

	  // create text fields ------------------------------------------------
	  gameUI.scoreObject = game.add.text(
	    32, 32, // x coord, y coord
	    'Score: ' + gameUI.score, // text field
	    {fontSize: '32px', fill: '#ffffff'} // text styling
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

		  // gameState.bossAlien.rotation = game.physics.arcade.angleBetween(gameState.bossAlien, gameState.player)
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

		  gameState.groups.aliens.forEach(function(alien){
		  	if (alien.body.x === 0) {
		  		alien.body.velocity.x = 50}
		  })

		  gameState.groups.aliens.forEach(function(alien){
		  	if (alien.body.x  < 100.5 & alien.body.x  > 99.5  ) {
		  		alien.body.velocity.x = 0}
		  })

		  gameState.groups.aliens.forEach(function(alien){
		  	if (alien.body.x <101 && alien.body.x >99 ) gameUI.kamikazeCounter++
		  	// if (alien.body.x <= 10  &&  alien.body.velocity.x > 0) alien.velocity.x = 200
		  })

		  if (gameUI.kamikazeCounter > 1) {
		  	gameState.groups.aliens.forEach(function(alien){
		  		if (alien.body.x <101 && alien.body.x >99)  {
		  			alien.body.velocity.x = -300
		  			gameUI.kamikazeCounter = 0
		  		}
		  	})
		  }
		  gameUI.kamikazeCounter = 0

  },
  render: function() {
    game.debug.geom(gameUI.gameAreaCeilingLine,'#FFFFFF')
  },
}
