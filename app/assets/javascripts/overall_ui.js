overallUI.decrementGameTimeRemaining = function(){
  overallUI.gameTimeRemaining -= 1
}

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
  gameState.currentCardsRemaining.text = 'Cards Remaining: ' + deck.cardsLeftInCurrentRound()
  gameUI.spawnAlienBoss()
  flashCardUI.textInputLine.height = 1
}


