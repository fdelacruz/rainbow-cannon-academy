// entry point
window.onload = start

// global modules ---------------------------------------------------
var game = null // phaser game
var phaserLifeCycleFunctions = {}
var flashCardUI = {}
var gameUI = {}

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
gameState.currentDeck = new CardDeck({
  deck:[
    {q:"hello" ,a:"hola" },
    {q: "bye",a:"adios"},
    {q: "dog",a: "perro"},
    {q: "cat",a: "gato"},
    {q: "food",a: "comida"},
  ]
})

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
