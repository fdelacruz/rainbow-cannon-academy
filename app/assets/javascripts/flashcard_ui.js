flashCardUI.appendLetterToAnswer = function(letter){
  gameState.userGuess.text += letter
}

flashCardUI.deleteLetterFromAnswer = function(){
  gameState.userGuess.text = gameState.userGuess.text.slice(0,-1)
}

flashCardUI.checkUserGuess = function(guess, currentAnswer){
  return (guess === " " + currentAnswer)
}

flashCardUI.wordKeysHandler = function(evt){

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

    if (evt.which === 13 /* enter */) {
      // update timer
        flashCardUI.textInputTimer.x = 600
        flashCardUI.textInputTimer.width = 400
      //
      // update user feedback text
      if (flashCardUI.checkUserGuess(gameState.userGuess.text, gameState.currentDeck.currentCard.definition)){
        gameState.userFeedbackText.text = 'Correct'
        gameState.questionsCorrect++
        flashCardUI.upgradePlayer(gameState.questionsCorrect)


      } else {
        gameState.userFeedbackText.text = gameState.currentDeck.currentCard.definition
      }

      // break out of flashcard state if the user just pressed enter on the last card in the level
      if (gameState.currentDeck.currentIndex === 9 ) {
        setTimeout(function(){game.state.start('fight')}, 1000)
        return
      }

      gameUI.performCycleCardProcedure()

      // clear user input
      // gameState.userGuess.text = ""
      // // update current card to the next card in the current round
      // gameState.currentDeck.advanceToNextCard()
      // // update cards remaining in the view
      // gameState.currentCardsRemaining.text = 'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound()
      // // update the current Question in the view
      // gameState.currentQuestion.text = gameState.currentDeck.currentCard.term
    }
  // }
}

flashCardUI.upgradePlayer = function(playerLevel) {
  // Current level = playerLevel (for setting specific upgrades)
  bullet = gameState.groups.flashcardPlayerBullets.getFirstExists(false)
  bullet.reset(gameState.flashcardPlayer.body.x, gameState.flashcardPlayer.body.y)
  gameState.groups.flashcardPlayerBullets.getFirstExists(false).body.velocity.x=1000
  bullet.body.velocity.x = 200
  bullet.lifespan = 4000
  bullet.body.velocity.x = 1000

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


