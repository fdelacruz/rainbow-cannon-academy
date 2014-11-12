// var airship = (function(){

// 	var exports = {}

// 	exports.preload = function(phaserGame){
// 		phaserGame.load.image('dude', '../assets/ship.png')
// 	}

// 	exports.create = function(phaserGame) { 
// 		this.spawnPlayer(phaserGame)
// 	}
	
// 	exports.update = function(phaserGame, cursors, playerIsLocked) { 
// 		// var cursors = gameState.cursors
// 		var player = this.sprite
// 		if (!playerIsLocked) {
// 	    if (cursors.left.isDown) {
// 	      // player UP
// 	      player.body.velocity.y = -250;
// 	      // player.animations.play('up')
// 	    } else if (cursors.right.isDown){
// 	      // player DOWN
// 	      player.body.velocity.y = 250;
// 	      // player.animations.play('down')
// 	    } else {
// 	      // player stand still
// 	      player.animations.stop()
// 	      player.frame = 4
// 	      player.body.velocity.y = 0
// 	    }
// 	  }
// 	  if (playerIsLocked) player.body.velocity.y = 0
// 	} 

// 	exports.render = function(phaserGame) { 
// 	} 

// 	exports.spawnPlayer = function(phaserGame) {
// 	 	var player = this.sprite = phaserGame.add.sprite(32, phaserGame.world.height - 150, 'dude')
// 	  phaserGame.physics.arcade.enable(player)
// 	  player.body.bounce.y = 0.2
// 	  player.body.collideWorldBounds = true
// 	  player.health = 100
// 	} 

// 	return exports
// })()
