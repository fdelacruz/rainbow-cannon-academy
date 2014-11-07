console.log("fc controller")

var fc_controller = {
	initializeText: function(deckobject){

		return game.add.text(16,16, deckobject.currentCard.q, {fontSize: '32px', fill: '#000'})


	},

	keyListener: function(keystroke){
		if (keystroke.which === 8){
			// delete
			fc_view.userBackspace()
			return
		} else if (keystroke.which === 13){
			console.log("else if")
			// enter
			this.checkUserGuess(userGuess.text,currentDeck.currentCard.a) 
			currentDeck.advanceToNextCard()
			fc_view.viewNextCard()
		} else if ( (keystroke.which < "A".charCodeAt(0) || keystroke.which > "Z".charCodeAt(0)) && keystroke.which != 32 ) {
			// letter
			var letter = String.fromCharCode( keystroke.which )
			if( !keystroke.shiftKey ) letter = letter.toLowerCase()
			fc_view.inputLetter(userGuess.text,letter)
			return
		}

	},

	checkUserGuess:   function (guess, rightAnswer){
		if (guess === " " + rightAnswer){
			console.log("Correct")
		}
	}
}