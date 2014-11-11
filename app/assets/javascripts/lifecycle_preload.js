
phaserLifeCycleFunctions.preload = function(game){
  game.load.image('sky', '../assets/sky.png')
  game.load.image('ground', '../assets/platform.png')
  game.load.image('star', '../assets/star.png')
  game.load.image('dude', '../assets/ship.png')
  game.load.image('diamond', '../assets/diamond.png')
  game.load.spritesheet('invader', '../assets/baddie.png', 32, 32)
  game.load.spritesheet('rain', '../assets/rain.png', 17, 17)
  game.load.image('bullet', '../assets/bullets.png')
  game.load.image('starfield', '../assets/starfield.png');
}
