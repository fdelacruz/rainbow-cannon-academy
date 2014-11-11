var gameAreaCeiling = (function(){

  var exports = {}

  exports.preload = function(phaserGame){

  }

  exports.create = function(phaserGame) {
    this.ceiling = phaserGame.add.sprite(0,200,null)
    phaserGame.physics.enable(this.ceiling, Phaser.Physics.ARCADE)
    this.ceiling.body.setSize(1200, 1, 0, 0)
    this.ceiling.body.immovable = true
  }

  exports.update = function(phaserGame, player,  aliens_group) {
    // Player cannot pass through the game boundaries
    phaserGame.physics.arcade.collide(player, this.ceiling)
    // // aliens cannot pass through game boundaries
    phaserGame.physics.arcade.collide(aliens_group, this.ceiling)
  }

  exports.render = function(phaserGame) {
  }

  return exports
})()
