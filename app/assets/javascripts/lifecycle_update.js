phaserLifeCycleFunctions.update = function () {
  var player = gameState.player
  var cursors = gameState.cursors
  var shootTheGun = false

  // Player cannot pass through the game boundaries
  game.physics.arcade.collide(player, overallUI.gameAreaCeiling)
  game.physics.arcade.collide(gameState.groups.aliens, overallUI.gameAreaCeiling)
  game.physics.arcade.collide(gameState.groups.aliens, gameState.groups.aliens)
  game.physics.arcade.collide(gameState.groups.aliens, gameState.bossAlien)

  // Bullets cause damage to aliens and then disappear
  game.physics.arcade.overlap(bullets, gameState.groups.aliens, gameUI.hitAlien , null, this)

  // Bullets cause the boss alien to shrink
  game.physics.arcade.overlap(bullets, gameState.bossAlien, gameUI.shrinkBoss , null, this)

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
  gameUI.fireGunCounter += 1
  if (gameUI.fireGunCounter >= gameUI.fireGunRate){
    shootTheGun = true
    gameUI.fireGunCounter = 0
  }
  if (shootTheGun) {
    gameUI.fireBullet()
  }
  // if (gameUI.fireGunCounter > 60) gameUI.fireGunCounter = 0
  overallUI.checkIfFlashcardsComplete()
  if (gameUI.aliensDead() && overallUI.flashCardRoundComplete) {
    player.body.velocity.y = 0
    overallUI.flashCardRoundComplete = false
    overallUI.resetNextRound()
  }
  if (overallUI.flashCardRoundComplete && (gameState.groups.aliens.x < 950)){
    if (gameUI.alienScatterEnabled) gameUI.scatterAliens()
  }










}

