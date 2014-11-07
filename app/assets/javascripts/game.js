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
var scoreText
var platforms

// init all the globals
function start(){
  // prevent back on backspace
  document.addEventListener("keydown", function (e) {
    if (e.which === 8) e.preventDefault()
  })

  game = new Phaser.Game(
    800, // width
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
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)
}

phaserLifeCycleFunctions.create = function(){
  game.add.sprite(0, 0, 'sky') // set background
  game.physics.startSystem(Phaser.Physics.ARCADE)

  // create platforms (stuff the character can stand on)

  var platforms = gameState.groups.platforms = game.add.group()
  platforms.enableBody = true

  var ground = platforms.create(0, game.world.height - 64, 'ground')
  ground.scale.setTo(2,2)
  ground.body.immovable = true

  var rightLedge = platforms.create(400, 400, 'ground')
  rightLedge.body.immovable = true
  
  var leftLedge = platforms.create(-150, 250, 'ground')
  leftLedge.body.immovable = true

  // ---

  // create player object

  var player = gameState.player = game.add.sprite(32, game.world.height - 150, 'dude')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.gravity.y = 1000
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
    player.body.velocity.x = -300;
    player.animations.play('left')
  } else if (cursors.right.isDown){
    player.body.velocity.x = 300;
    player.animations.play('right')
  } else {
    player.animations.stop()
    player.frame = 4
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -600
  }

}

flashCardUI.isLetterKeyOrSpace =  function(keyCode) {
  return !(keyCode < "A".charCodeAt(0) || keyCode > "Z".charCodeAt(0)) || // not outside letter range
  keyCode == 32 // is space
}

function wordKeysHandler(evt){
  // handle backspace
  if (evt.which === 8 /* backspace */) { flashCardUI.deleteLetterFromAnswer(); return}
  // handle letter (a-z) or space
  if (flashCardUI.isLetterKeyOrSpace(evt.which)) {
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
