var starfieldBackground = (function(){

	var exports = {}

	exports.preload = function(phaserGame){
	  phaserGame.load.image('starfield', '../assets/starfield.png')
	}

	exports.create = function(phaserGame) { 
		this.sprite = phaserGame.add.tileSprite(0, 200, 1200, 600, 'starfield') 
	}
	
	exports.update = function(phaserGame) { 
		this.sprite.tilePosition.x -= 1 
	} 

	exports.render = function(phaserGame) { 
	} 

	return exports
})()
