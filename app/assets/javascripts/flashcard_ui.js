flashCardUI.appendLetterToAnswer = function(letter){
  gameState.userGuess.text += letter
}

flashCardUI.deleteLetterFromAnswer = function(){
  gameState.userGuess.text = gameState.userGuess.text.slice(0,-1)
}

flashCardUI.checkUserGuess = function(guess, currentAnswer){
  if (guess === " " + currentAnswer){
    gameState.userFeedbackText.text = 'Correct'
  } else {
    gameState.userFeedbackText.text = currentAnswer
  }
}

flashCardUI.showNextCard = function(){
  gameState.userGuess.text = ""
  gameState.currentQuestion.text = gameState.currentDeck.currentCard.term
}

flashCardUI.wordKeysHandler = function(evt){
  deck = gameState.currentDeck
  // handle backspace
  if (evt.which === 8 /* backspace */) { flashCardUI.deleteLetterFromAnswer(); return}
  // handle letter (a-z) or space
  if (flashCardUI.isLetterKeyOrSpaceOrNumber(evt.which)) {
    // handle letters
    var letter = String.fromCharCode( evt.which )
    if( !evt.shiftKey ) letter = letter.toLowerCase()
    flashCardUI.appendLetterToAnswer(letter)
    return
  }
  // handle enter
  if (evt.which === 13 /* enter */) {
    flashCardUI.checkUserGuess(gameState.userGuess.text, deck.currentCard.definition)
    if (deck.currentIndex === 9) {
      overallUI.flashCardRoundComplete = true
      gameUI.spawnAliens = true
      return
    }
    deck.advanceToNextCard()
    gameState.currentCardsRemaining.text = 'Cards Remaining: ' + deck.cardsLeftInCurrentRound()
    flashCardUI.showNextCard()
  }
}

flashCardUI.isLetterKeyOrSpaceOrNumber =  function(keyCode) {
  return !(keyCode < "A".charCodeAt(0) || keyCode > "Z".charCodeAt(0)) || // not outside letter range
  keyCode == 32 || (keyCode <= "9".charCodeAt(0) && keyCode >= "0".charCodeAt(0)) // is space or number
}

flashCardUI.clearFlashCardText = function(){
  gameState.userGuess.text = ''
  gameState.currentQuestion.text = ''
  gameState.currentCardsRemaining.text = 'ROUND OVER. BEGIN GAME'
  gameState.userFeedbackText.text = ''
  flashCardUI.textInputLine.height = 0
}


