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
      console.log(gameState.currentDeck.currentCard)
      // update timer
        flashCardUI.textInputTimer.x = 0
        flashCardUI.textInputTimer.width = 1200
      //
      // update user feedback text

      // correct answer case:
      if (flashCardUI.checkUserGuess(gameState.userGuess.text, gameState.currentDeck.currentCard.definition)){
        gameState.userFeedbackText.text = 'Last: Correct'
        gameState.questionsCorrect++
        // show upgrade text
        flashCardUI.upgradePlayer(gameState.questionsCorrect)
        var upgradeTextSprite = game.add.text(0, game.world.height - 150, '+1 Gun Level', {font: '12px Josefin Slab', fill: 'green'})
        flashCardUI.tweenPlayerUpgrade(upgradeTextSprite)

      // incorrect answer case:
      } else {
        gameState.userFeedbackText.text = "Last: "+ gameState.currentDeck.currentCard.definition
      }
      // break out of flashcard state if the user just pressed enter on the last card in the level
      if (gameState.currentDeck.currentIndex === 9 ) {
        if (gameState.finishingLevel) return
        // leave a second to view last incorrect answer
        setTimeout(function(){
          game.state.start('fight')
          gameState.finishingLevel = false
        }, 1000)
        gameState.finishingLevel = true
        return
      }

      flashCardUI.performCycleCardProcedure()

    }
  // }
}

flashCardUI.upgradePlayer = function(playerLevel) {
  // Current level = playerLevel (for setting specific upgrades)
  bullet = gameState.groups.flashcardPlayerBullets.getFirstExists(false)
  bullet.reset(gameState.flashcardPlayer.x, gameState.flashcardPlayer.y)
  gameState.groups.flashcardPlayerBullets.getFirstExists(false).body.velocity.x=1000
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

flashCardUI.tweenPlayerUpgrade = function(text_sprite){
  console.log(text_sprite)
  var tween = game.add.tween(text_sprite)
  tween.to({y: game.world.height - 300, alpha: 0}, 2500)
  tween.start()
}

flashCardUI.performCycleCardProcedure = function(){
  console.log(gameState.currentDeck.currentCard)
      gameState.userGuess.text = ""
      // update current card to the next card in the current round
      gameState.currentDeck.advanceToNextCard()
      // update cards remaining in the view
      gameState.currentCardsRemaining.text = 'Cards Remaining: ' + gameState.currentDeck.cardsLeftInCurrentRound()
      // update the current Question in the view
      gameState.currentQuestion.text = gameState.currentDeck.currentCard.term
}
