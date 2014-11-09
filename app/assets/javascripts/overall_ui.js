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


