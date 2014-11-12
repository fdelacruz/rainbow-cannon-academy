
//=require game_ui
//=require deck_ajax
//=require flashcard_ui
//=require phaser
//=require carddeck
//=require starfield_background
//=require rain
//=require preload
//=require flashcard
//=require fight
//=require level_intro
//=require welcome




// entry point

window.onload = start

// global modules ---------------------------------------------------
var game = null // phaser game
var phaserLifeCycleFunctions = {}


// flashcardUI -----------------------------------------------------------
flashCardUI.textInputLine

// gameUI -----------------------------------------------------------
gameUI.bulletTime = 0
gameUI.gunLevel = 0
gameUI.alienScatterEnabled = true
gameUI.firePlayerGunCounter = 0
gameUI.fireBossAlienGunCounter = 0
gameUI.score = 0

gameUI.firePlayerGunRate = 60 // (60/rate) = shots per second
gameUI.fireBossAlienGunRate = 60 // (60/rate) = shots per second

// gameState --------------------------------------------------------
var gameState = {}
gameState.player = null // phaser sprite object
gameState.bossAlien = null // phaser sprite object
gameState.cursors = null
gameState.groups = {}
gameState.userGuess = null
gameState.currentQuestion = null
gameState.currentDeck = null
gameState.currentLevel = 1
gameState.questionsCorrect = 0
gameState.firstTimeOnLevel = true
gameState.finishingLevel = false

// init all the globals
function start(){
  callAjaxToSetCurrentDeck()
  // prevent back on backspace
  document.addEventListener("keydown", function (e) {
    if (e.which === 8) e.preventDefault() // backspace
    if (e.which === 32) e.preventDefault() // space
  })
  game = new Phaser.Game(
    1200, // width
    600, // height
    Phaser.AUTO, // render backend
    'gamediv' // DOM id where game is injected
  )
  game.state.add('preload', preLoad)
  game.state.add('welcome', welcome)
  game.state.add('level_intro', levelIntro)
  game.state.add('flashcard', flashCard)
  game.state.add('fight', fight)
  game.state.start('preload')
}





