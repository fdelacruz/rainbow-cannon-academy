overallUI.decrementGameTimeRemaining = function(){
  overallUI.gameTimeRemaining -= 1
}

overallUI.checkIfFlashcardsComplete = function(){
  if (overallUI.flashCardRoundComplete) {
    flashCardUI.clearFlashCardText()
  }
}


