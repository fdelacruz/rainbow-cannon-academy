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
gameUI.fireGunCounter = 0
gameUI.fireGunRate = 20 // (60/rate) = shots per second


// gameState --------------------------------------------------------
var gameState = {}
gameState.player = null
gameState.bossAlien = null
gameState.cursors = null
gameState.groups = {}
gameState.count = 0
gameState.userGuess = null
gameState.currentQuestion = null
gameState.currentDeck = null

console.log("this should be first")

// init all the globals
function start(){
  callAjaxToSetCurrentDeck()
  // prevent back on backspace
  document.addEventListener("keydown", function (e) {
    if (e.which === 8) e.preventDefault()
    if (e.which === 32) e.preventDefault()
  })
  console.log("creating game")
  game = new Phaser.Game(
    1200, // width
    600, // height
    Phaser.AUTO, // render backend
    'gamediv', // DOM id where game is injected
    phaserLifeCycleFunctions
  )
}


