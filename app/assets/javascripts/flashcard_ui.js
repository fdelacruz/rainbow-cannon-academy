flashCardUI.appendLetterToAnswer = function(letter){
  gameState.userGuess.text += letter
}

flashCardUI.deleteLetterFromAnswer = function(){
  gameState.userGuess.text = gameState.userGuess.text.slice(0,-1)
}

flashCardUI.checkUserGuess = function(guess, currentAnswer){
  return (guess === " " + currentAnswer)

  //WIP

  // if (guess === " " + currentAnswer){
  //   gameState.userFeedbackText.text = 'Correct'
  //   gameUI.upgradeGun()
  //   // if correct upgrade gun
  // } else {
  //   // if incorrect upgrade boss
  //   gameUI.growBoss()
  //   gameState.userFeedbackText.text = currentAnswer
  // }
}

flashCardUI.showNextCard = function(){
  gameState.userGuess.text = ""
  gameState.currentQuestion.text = gameState.currentDeck.currentCard.term
}

flashCardUI.wordKeysHandler = function(evt){
  // var deck = gameState.currentDeck
  // Listen for user input only during flashcard round
  // if(overallUI.flashCardRoundComplete === false){
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
      gameState.currentDeck.currentIndex++
      gameState.currentCardsRemaining.text = 'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound()
      if (flashCardUI.checkUserGuess(gameState.userGuess.text, gameState.currentDeck.currentCard.definition)){
        gameState.userFeedbackText.text = 'Correct'
       } else {
        gameState.userFeedbackText.text = gameState.currentDeck.currentCard.definition
       }

      // if (deck.currentIndex === 9 ) 
      //   if (overallUI.flashCardRoundComplete === false && !gameUI.aliensExist()) {
      //     // game.state.start('fight')
      //     gameUI.spawnAliens()
      //     gameUI.sendAliens()
      //     deck.advanceToNextCard()
      //   }
      //   overallUI.flashCardRoundComplete = true
      //   return
      // }
      if (gameState.currentDeck.cardsLeftInCurrentRound === 0){
        // game.state.start('fight')
        console.log("going to fight mode")
      } else {
        flashCardUI.showNextCard()
        gameState.currentDeck.advanceToNextCard()
      }
    }
  // }
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


