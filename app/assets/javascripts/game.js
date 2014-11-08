// entry point
window.onload = start

// global modules
var game = null // phaser game
var phaserLifeCycleFunctions = {}
var flashCardUI = {}

// global state
var gameState = {}
gameState.player = null
gameState.cursors = null
gameState.groups = {}

gameState.userGuess = null
gameState.rightAnswer = null
gameState.currentDeck = new CardDeck({
  deck:[
    {q:"hello" ,a:"hola" },
    {q: "bye",a:"adios"},
    {q: "dog",a: "perro"},
    {q: "cat",a: "gato"},
    {q: "food",a: "comida"},
  ]
})

var score = 0
var platforms

// init all the globals
function start(){
  // prevent back on backspace
  document.addEventListener("keydown", function (e) {
    if (e.which === 8) e.preventDefault()
  })

  game = new Phaser.Game(
    1200, // width
    600, // height
    Phaser.AUTO, // render backend
    'gamediv', // DOM id where game is injected
    phaserLifeCycleFunctions
  )
}

phaserLifeCycleFunctions.preload = function(){
  game.load.image('sky', 'assets/sky.png')
  game.load.image('ground', 'assets/platform.png')
  game.load.image('star', 'assets/star.png')
  game.load.image('dude', 'assets/ship.png')
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)
  game.load.spritesheet('rain', 'assets/rain.png', 17, 17);
}

phaserLifeCycleFunctions.create = function(){
  var sky = game.add.sprite(0, 0, 'sky') // set background
  sky.scale.setTo(2,1)
  game.physics.startSystem(Phaser.Physics.ARCADE)


  //rain

  var emitter = game.add.emitter(350, -1200, 500);  //(x, y , max particles)

  emitter.width = 150;
  emitter.angle = 90
  // emitter.angle = 30; // uncomment to set an angle for the rain.

  emitter.makeParticles('rain');

  emitter.minParticleScale = 0.4;
  emitter.maxParticleScale = 1;

  // emitter.setYSpeed(500,-500);
  emitter.setYSpeed(200, 1000);

  // emitter.minRotation = 0;
  // emitter.maxRotation = 0;

  emitter.start(false, 3000,  500); //(explode, lifespan, frequency, quantity, forceQuantity)

  //rain


  // create platforms (stuff the character can stand on)

  var platforms = gameState.groups.platforms = game.add.group()
  platforms.enableBody = true

  var ground = platforms.create(0, game.world.height -30, 'ground')
  ground.scale.setTo(4,1)
  ground.body.immovable = true

  // var rightLedge = platforms.create(400, 400, 'ground')
  // rightLedge.body.immovable = true

  var screenSplit = platforms.create(0, 200, 'ground')
  screenSplit.scale.setTo(4,1)
  screenSplit.body.immovable = true

  // ---

  // create player object

  var player = gameState.player = game.add.sprite(32, game.world.height - 150, 'dude')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.collideWorldBounds = true
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // ---

  // create keyboard listeners
  gameState.cursors = game.input.keyboard.createCursorKeys()
  game.input.keyboard.addCallbacks(this, wordKeysHandler)

  // answer input
  gameState.userGuess = game.add.text(400,16, '', {fontSize: '32px', fill: '#000'})
  // flascard question
  gameState.rightAnswer = game.add.text(16,16, gameState.currentDeck.currentCard.q, {fontSize: '32px', fill: '#000'})
}

phaserLifeCycleFunctions.update = function () {
  var player = gameState.player
  var cursors = gameState.cursors

  game.physics.arcade.collide(player, gameState.groups.platforms)

  player.body.velocity.x = 0
  if (cursors.left.isDown) {
    player.body.velocity.y = -300;
    player.animations.play('up')
  } else if (cursors.right.isDown){
    player.body.velocity.y = 300;
    player.animations.play('down')
  } else {
    player.animations.stop()
    player.frame = 4
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -600
  }

}

flashCardUI.isLetterKeyOrSpaceOrNumber =  function(keyCode) {
  return !(keyCode < "A".charCodeAt(0) || keyCode > "Z".charCodeAt(0)) || // not outside letter range
  keyCode == 32 || (keyCode <= "9".charCodeAt(0) && keyCode >= "0".charCodeAt(0)) // is space or number
}

function wordKeysHandler(evt){
  // handle backspace
  if (evt.which === 8 /* backspace */) { flashCardUI.deleteLetterFromAnswer(); return}
  // handle letter (a-z) or space
  if (flashCardUI.isLetterKeyOrSpaceOrNumber(evt.which)) {
    // handle letters
    var letter = String.fromCharCode( evt.which )
    if( !evt.shiftKey ) letter = letter.toLowerCase()
    flashCardUI.appendLetterToAnswer(letter)
    return
  }
  // handle enter
  if (evt.which === 13 /* enter */) {
    flashCardUI.checkUserGuess(gameState.userGuess.text, gameState.currentDeck.currentCard.a)
    gameState.currentDeck.advanceToNextCard()
    if (gameState.currentDeck.solvedDeck){
      console.log("you win")
      return
    }
    flashCardUI.showNextCard()
    return
  }
}

flashCardUI.appendLetterToAnswer = function(letter){
  gameState.userGuess.text += letter
}

flashCardUI.deleteLetterFromAnswer = function(){
  gameState.userGuess.text = gameState.userGuess.text.slice(0,-1)
}

flashCardUI.checkUserGuess = function(guess, rightAnswer){
  if (guess === " " + rightAnswer){
    console.log("Correct")
  }
}

flashCardUI.showNextCard = function(){
  gameState.userGuess.text = ""
  gameState.rightAnswer.text = gameState.currentDeck.currentCard.q
}

// flashCardUI.checkIfGameIsFinished = function(letter){

// }
