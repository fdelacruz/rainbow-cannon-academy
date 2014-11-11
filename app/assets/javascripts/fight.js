function fight() {}

fight.prototype = {
  create: function() {
  	console.log(game.state.current)
    phaserLifeCycleFunctions.create(game)
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
		    game.state.start('level_intro')
		  }

		  if (gameUI.playerDead(gameState.player)){
		    game.state.start('level_intro')
		  }

		  if (gameState.groups.aliens.x < 880){
		    if (gameUI.alienScatterEnabled) gameUI.scatterAliens()
		  }

  	
  },
  render: function() {
    phaserLifeCycleFunctions.render(game)
  },

}
