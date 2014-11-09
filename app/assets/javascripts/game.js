// entry point
window.onload = start

// global modules ---------------------------------------------------
var game = null // phaser game
var phaserLifeCycleFunctions = {}
var flashCardUI = {}
var gameUI = {}
var overallUI = {}

// overallUI
overallUI.millisecondsUntilSecondDecrement = null
overallUI.gameTimeRemaining = null


// gameUI -----------------------------------------------------------
gameUI.bulletTime = 0
gameUI.shotDelayTime = 0
gameUI.fireGunCounter = 0
gameUI.fireGunRate = 10 // (60/rate) = shots per second
gameUI.textInputLine

// gameState --------------------------------------------------------
var gameState = {}
gameState.player = null
gameState.cursors = null
gameState.groups = {}
gameState.count = 0
gameState.userGuess = null
gameState.currentQuestion = null



// init all the globals
function start(){
  // prevent back on backspace
  document.addEventListener("keydown", function (e) {
    if (e.which === 8) e.preventDefault()
    if (e.which === 32) e.preventDefault()
  })
  game = new Phaser.Game(
    1200, // width
    600, // height
    Phaser.AUTO, // render backend
    'gamediv', // DOM id where game is injected
    phaserLifeCycleFunctions
  )
}

function createAliens () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 5; x++)
        {
            var alien = gameState.alien =  aliens.create(x * 70, y * 70, 'invader') // space between aliens
            alien.anchor.setTo(0.5, 0.5) // settting anchor to center of alien
            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true)
            alien.play('fly')
            // alien.body.moves = false
            alien.body.velocity.y = Math.floor(Math.random() * (200 +100 + 1)) - 100 // (max - min + 1)) + min;
            alien.body.bounce.y = 0.4
            alien.body.collideWorldBounds = true
        }
    }

    aliens.x = 900
    aliens.y = 285

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x:0 }, 10000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    // tween.onLoop.add(descend, this);
}
