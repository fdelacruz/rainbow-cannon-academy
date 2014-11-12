var rain = (function(){

	var exports = {}

	exports.preload = function(phaserGame){
  	phaserGame.load.spritesheet('rain', '../assets/rain.png', 17, 17)
	}

	exports.create = function(phaserGame) {
		var emitter = phaserGame.add.emitter(phaserGame.world.width, 375, 500)  //(x, y , max particles)
	  emitter.height = 400
	  emitter.angle = 2
	  
	  emitter.makeParticles('rain')
	  emitter.setXSpeed(-500, -1200)
	  emitter.setYSpeed(0,0)
	  emitter.minRotation = 1
	  emitter.maxRotation = 1
	  emitter.start(false, 3000, 500) //(explode, lifespan, frequency, quantity, forceQuantity)
	  emitter.gravity.y = -1000
	}
	
	exports.update = function(phaserGame) { 
	} 

	exports.render = function(phaserGame) { 
	} 

	return exports
})()
