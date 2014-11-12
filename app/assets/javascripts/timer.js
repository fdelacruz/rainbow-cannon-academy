var timer = (function(){

	var exports = {}

	exports.create = function(phaserGame) {
		this._secondsRemaining = 300
		var t = game.time.create(/* turn off "autodestroy" */ false)
		t.loop(/* seconds: */ 1 * /* milliseconds: */ 1000, this._decrementSecond, this)
		t.start()
	}

	exports.update = function(phaserGame) {
	}

	exports.render = function(phaserGame){
		// phaserGame.debug.text('Seconds Remaining: ' + this._secondsRemaining, /* x: */ 450, /* y: */ 32)
	}

	// ---

	exports._decrementSecond = function(){
		this._secondsRemaining -= 1
	}

	return exports
})()


// game.debug.text('Seconds Remaining: ' + overallUI.gameTimeRemaining, 450, 32)
