flashCardUI.appendLetterToAnswer = function(letter){
  gameState.userGuess.text += letter
}

flashCardUI.deleteLetterFromAnswer = function(){
  gameState.userGuess.text = gameState.userGuess.text.slice(0,-1)
}

flashCardUI.checkUserGuess = function(guess, currentQuestion){
  if (guess === " " + currentQuestion){
    console.log("Correct")
  }
}

flashCardUI.showNextCard = function(){
  gameState.userGuess.text = ""
  gameState.currentQuestion.text = gameState.currentDeck.currentCard.q
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
  // handle enter
  if (evt.which === 13 /* enter */) {
    flashCardUI.checkUserGuess(gameState.userGuess.text, gameState.currentDeck.currentCard.a)
    gameState.currentDeck.advanceToNextCard()
    if (gameState.currentDeck.solvedDeck){
      console.log("you win")
      return
    }
    flashCardUI.showNextCard()
    return
  }
}

flashCardUI.isLetterKeyOrSpaceOrNumber =  function(keyCode) {
  return !(keyCode < "A".charCodeAt(0) || keyCode > "Z".charCodeAt(0)) || // not outside letter range
  keyCode == 32 || (keyCode <= "9".charCodeAt(0) && keyCode >= "0".charCodeAt(0)) // is space or number
}

