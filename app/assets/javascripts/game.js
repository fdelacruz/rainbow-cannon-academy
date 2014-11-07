// globals
window.game = null

//

function start(){
  window.game = new Phaser.Game(
    800, // width
    600, // height
    Phaser.AUTO, // render backend
    'gamediv', // DOM id where game is injected
    { preload: preload,
      create: create,
      update: update,
    }
  )
  window.currentDeck = new CardDeck(exampleDeck)

  // prevent back on backspace
  document.addEventListener("keydown", function (e) {
    if (e.which === 8) {
      e.preventDefault()
    }
  })

}
// game state

var score = 0
var scoreText
var platforms
var userGuess



window.preload = function(){
  game.load.image('sky', 'assets/sky.png')
  game.load.image('ground', 'assets/platform.png')
  game.load.image('star', 'assets/star.png')
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)
}

window.create = function(){
  game.add.sprite(0,0, 'sky')
  game.physics.startSystem(Phaser.Physics.ARCADE)
  platforms = game.add.group();
  platforms.enableBody = true
  var ground = platforms.create(0, game.world.height - 64, 'ground')
  ground.scale.setTo(2,2)
  ground.body.immovable = true
  var ledge = platforms.create(400, 400, 'ground')
  ledge.body.immovable = true
  ledge = platforms.create(-150, 250, 'ground')
  ledge.body.immovable = true

  // create player object
  player = game.add.sprite(32, game.world.height - 150, 'dude')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.gravity.y = 1000
  player.body.collideWorldBounds = true
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);


  //create cursor listeners
  cursors = game.input.keyboard.createCursorKeys()
  // letterT = game.input.keyboard.addKey(Phaser.Keyboard.T)

  // letterT.onDown.add(showLetter, this)

  game.input.keyboard.addCallbacks(this, mykeydownhandler)




  //score text
  userGuess = game.add.text(400,16, '', {fontSize: '32px', fill: '#000'})
  rightAnswer = game.add.text(16,16, currentDeck.currentCard.q, {fontSize: '32px', fill: '#000'})

}



function update() {
  game.physics.arcade.collide(player, platforms)

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





function mykeydownhandler(evt){
  // Skip it unless it's a-z.
  if (evt.which === 8){
    deleteLastScoreText()
    return
  } else if (evt.which === 13){
    checkUserGuess(userGuess.text,currentDeck.currentCard.a) 
    currentDeck.advanceToNextCard()
    console.log(currentDeck.currentCard)
    /// updating view
    viewNextCard()

  }
  else if( (evt.which < "A".charCodeAt(0) || evt.which > "Z".charCodeAt(0)) && evt.which != 32 )
  {
    return;
  }
  
  var letter = String.fromCharCode( evt.which )
  if( !evt.shiftKey ) letter = letter.toLowerCase()
    inputLetter(letter)
}

function inputLetter(letter){
  userGuess.text += letter
} 


function showLetter(letter){
  scoreText.text = letter
}

function deleteLastScoreText(){
  userGuess.text = userGuess.text.slice(0,-1)
}

function checkUserGuess(guess, rightAnswer){
  if (guess === " " + rightAnswer){
    console.log("Correct")
  }
}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function viewNextCard(){
  console.log("view next")
  userGuess.text = ""
  rightAnswer.text = currentDeck.currentCard.q
}


window.onload = function(){

  start()

}
