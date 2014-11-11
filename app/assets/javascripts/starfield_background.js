var starfieldBackground = (function(){

	var exports = {}

	exports.create = function(phaseGame) { 
		this.sprite = phaseGame.add.tileSprite(0, 200, 1200, 600, 'starfield') 
	}
	
	exports.update = function() { 
		this.sprite.tilePosition.x -= 1 
	} 

	return exports
})()
