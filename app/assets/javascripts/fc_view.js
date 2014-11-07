
var fc_view = {
	inputLetter:  function(textobject,letter){
		textobject += letter
		console.log(MyObject.foo)
	},
	userBackspace: function (){
		userGuess.text = userGuess.text.slice(0,-1)
	},
	viewNextCard: function(){
		userGuess.text = ""
		rightAnswer.text = currentDeck.currentCard.q
	}
}