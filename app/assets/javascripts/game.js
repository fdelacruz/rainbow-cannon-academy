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
overallUI.flashCardRoundComplete = false
overallUI.score = 0

// flashcardUI -----------------------------------------------------------
flashCardUI.textInputLine

// gameUI -----------------------------------------------------------
gameUI.bulletTime = 0
gameUI.shotDelayTime = 0
gameUI.fireGunCounter = 0
gameUI.fireGunRate = 5 // (60/rate) = shots per second

gameUI.spawnAliens = false

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


