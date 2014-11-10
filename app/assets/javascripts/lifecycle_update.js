phaserLifeCycleFunctions.update = function () {
  var player = gameState.player
  var cursors = gameState.cursors
  var shootThePlayerGun = false

  // Player cannot pass through the game boundaries
  game.physics.arcade.collide(player, overallUI.gameAreaCeiling)
  game.physics.arcade.collide(gameState.groups.aliens, overallUI.gameAreaCeiling)
  game.physics.arcade.collide(gameState.groups.aliens, gameState.groups.aliens)
  game.physics.arcade.collide(gameState.groups.aliens, gameState.bossAlien)

  // Bullets cause damage to aliens and then disappear
  game.physics.arcade.overlap(playerBullets, gameState.groups.aliens, gameUI.hitAlien , null, this)

  // Bullets cause the boss alien to shrink
  game.physics.arcade.overlap(playerBullets, gameState.bossAlien, gameUI.shrinkBoss , null, this)

  // Aliens damage the player when they touch
  game.physics.arcade.overlap(player, gameState.groups.aliens, gameUI.hitPlayer, null, this)

  //tile position
  starfield.tilePosition.x -= 1

  // ---

  // player.body.velocity.x = 5
  if (overallUI.flashCardRoundComplete) {
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
  }

  // fire!
  gameUI.firePlayerGunCounter += 1
  if (gameUI.firePlayerGunCounter >= gameUI.fireGunRate){
    shootThePlayerGun = true
    gameUI.firePlayerGunCounter = 0
  }
  if (shootThePlayerGun) {
    gameUI.firePlayerBullet()
  }

  overallUI.checkIfFlashcardsComplete()
  if (gameUI.aliensDead() && overallUI.flashCardRoundComplete) {
    player.body.velocity.y = 0
    overallUI.flashCardRoundComplete = false
    overallUI.resetNextRound()
  }
  if (overallUI.flashCardRoundComplete && (gameState.groups.aliens.x < 880)){
    if (gameUI.alienScatterEnabled) gameUI.scatterAliens()
  }










}

