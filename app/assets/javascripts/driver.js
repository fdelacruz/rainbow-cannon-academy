//=require phaser
//=require starfield_background
//=require timer
//=require rain

window.onload = start

var lc = {}

lc.preload = function(game){
  game.load.image('starfield', '../assets/starfield.png')
}

lc.create = function(game){ 
	starfieldBackground.create(game)
	timer.create(game)
}

lc.update = function(game){ 
	starfieldBackground.update(game)
	timer.update(game)
}

lc.render = function(game){
	timer.render(game)
}

// init all the globals
function start(){
  game = new Phaser.Game(
    1200, // width
    600, // height
    Phaser.AUTO, // render backend
    'gamediv', // DOM id where game is injected
    rain
  )
}
