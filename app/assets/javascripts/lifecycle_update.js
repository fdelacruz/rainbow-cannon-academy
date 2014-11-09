phaserLifeCycleFunctions.update = function () {
  var player = gameState.player
  var cursors = gameState.cursors
  var shootTheGun = false

  game.physics.arcade.collide(player, gameState.groups.platforms)
  game.physics.arcade.overlap(bullets, gameState.groups.aliens, gameUI.killAlien , null, this);

  // player.body.velocity.x = 5
  if (cursors.left.isDown) {
    // player UP
    player.body.velocity.y = -250;
    player.animations.play('up')
  } else if (cursors.right.isDown){
    // player DOWN
    player.body.velocity.y = 250;
    player.animations.play('down')
  } else {
    // player stand still
    player.animations.stop()
    player.frame = 4
    player.body.velocity.y = 0

    // fire!
    gameUI.fireGunCounter += 1
    if (gameUI.fireGunCounter == gameUI.fireGunRate){
      shootTheGun = true
      gameUI.fireGunCounter = 0
    }
    if (shootTheGun) {
      gameUI.fireBullet()
    }
  }
  overallUI.checkIfFlashcardsComplete()
}

