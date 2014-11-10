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
      var alien = aliens.create(x * 70, y * 70, 'invader') // space between aliens
      alien.body.collideWorldBounds = true
      alien.body.moves = false
      alien.health = 10
      alien.body.bounce.y = 1
      alien.body.velocity.y = 100
    }
  }

  // position the block of aliens
  aliens.x = 1230
  aliens.y = 285

  // tween animations
  var tween = game.add.tween(aliens).to(
    { x:0 },
    5000,
    Phaser.Easing.Linear.None,
    true,
    0,
    1000,
    true)

  var bossTween = game.add.tween(bossAlien).to(
    { x:400 },
    5000,
    Phaser.Easing.Linear.None,
    true,
    0,
    1000,
    true)
  //  When the tween loops it calls descend
  // tween.onLoop.add(descend, this);
}

gameUI.hitAlien = function(bullet, alien){
  alien.health -= bullet.damage
  if (alien.health <= 0) gameUI.killAlien(alien)
  bullet.kill()
}

gameUI.killAlien = function(alien){
  alien.kill()
  overallUI.updateScore()
}

gameUI.aliensDead = function(){
  return (gameState.groups.aliens.countLiving() === 0)
}



gameUI.upgradeGun= function(){
  gameUI.gunLevel++
  gameUI.fireGunRate = Math.floor(gameUI.fireGunRate * .75)+1
}



gameUI.shrinkBoss = function(boss,bullet){

  bullet.kill()
  gameState.bossAlien.scale.x *= .8
  gameState.bossAlien.scale.y *= .8
  if (gameState.bossAlien.scale.x <= 2) boss.kill()
  // boss.kill()
  console.log("hit boss")

}



































