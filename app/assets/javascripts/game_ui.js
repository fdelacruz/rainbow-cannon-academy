gameUI.fireBullet = function() {
  if (game.time.now > gameUI.bulletTime) {
    bullet = bullets.getFirstExists(false);
    if (bullet) {
      bullet.reset(gameState.player.body.x + 16, gameState.player.body.y + 16);
      bullet.lifespan = 4000;
      bullet.rotation = gameState.player.rotation;
      game.physics.arcade.velocityFromRotation(gameState.player.rotation, 400, bullet.body.velocity);
    }
  }
}

gameUI.createAliens = function(){
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 5; x++) {
      var alien = gameState.alien =  aliens.create(x * 70, y * 70, 'invader') // space between aliens
      alien.anchor.setTo(0.5, 0.5) // settting anchor to center of alien
      // alien.animations.add('fly', [0, 3], 20, true)
      alien.play('fly')
      // alien.body.moves = false
      // alien.body.velocity.y = Math.random()// (max - min + 1)) + min;
      alien.body.bounce.y = 0.4
      alien.body.collideWorldBounds = true
    }
  }

  // position the block of aliens
  aliens.x = 900
  aliens.y = 285

  //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  var tween = game.add.tween(aliens).to( { x:0 }, 15000, Phaser.Easing.Linear.None, true, 0, 1000, true);

  //  When the tween loops it calls descend
  // tween.onLoop.add(descend, this);
}

gameUI.killAlien = function(bullet, alien){
  alien.kill()
  bullet.kill()
}

gameUI.aliensDead = function(){
  return (gameState.groups.aliens.countLiving() === 0)
}
