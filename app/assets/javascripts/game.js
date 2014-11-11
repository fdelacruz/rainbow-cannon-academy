//=require deck_ajax
//=require phaser
//=require carddeck
//=require starfield_background
//=require timer
//=require rain
//=require game_area_ceiling

// entry point

window.onload = start

// global modules ---------------------------------------------------
var game = null // phaser game
var phaserLifeCycleFunctions = {}
var flashCardUI = {}
var gameUI = {}
var overallUI = {}

// overallUI
overallUI.gameTimeRemaining = null
overallUI.flashCardRoundComplete = false
overallUI.score = 0

// flashcardUI -----------------------------------------------------------
flashCardUI.textInputLine

// gameUI -----------------------------------------------------------
gameUI.bulletTime = 0
gameUI.gunLevel = 0
gameUI.alienScatterEnabled = true
gameUI.firePlayerGunCounter = 0
gameUI.fireBossAlienGunCounter = 0

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
    'gamediv', // DOM id where game is injected
    phaserLifeCycleFunctions
  )
}


