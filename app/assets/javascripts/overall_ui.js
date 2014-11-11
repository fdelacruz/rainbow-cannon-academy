//=require game
//=require game_ui
//=require flashcard_ui
//=require lifecycle_preload
//=require lifecycle_create
//=require lifecycle_update
//=require lifecycle_render

overallUI.checkIfFlashcardsComplete = function(){
  if (overallUI.flashCardRoundComplete) {
    flashCardUI.clearFlashCardText()
  }
}

overallUI.updateScore = function(){
  overallUI.score += 10
  overallUI.scoreObject.text = "Score: " + overallUI.score
}

overallUI.resetNextRound = function(){
  gameState.currentDeck.populateCurrentRound()
	gameState.currentDeck.currentIndex = 0
	flashCardUI.showNextCard()
  gameState.currentCardsRemaining.text = 'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound()
  gameUI.spawnAlienBoss()
  flashCardUI.textInputLine.height = 1
}

overallUI.resetPreviousRound = function(){
  gameState.currentDeck.shuffleCards()
  overallUI.flashCardRoundComplete = false
  gameState.currentDeck.currentIndex = 0
  flashCardUI.showNextCard()
  gameState.currentCardsRemaining.text = 'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound()
  flashCardUI.textInputLine.height = 1
  overallUI.score = overallUI.score * 0.9
  gameUI.killAllAliens()
  gameUI.spawnAlienBoss()
  gameUI.respawnPlayer()
  gameUI.alienScatterEnabled = true
}
