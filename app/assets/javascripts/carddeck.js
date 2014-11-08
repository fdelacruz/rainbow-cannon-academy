
function CardDeck(carddeck_object){
	this.solvedDeck = false
	this.remainingCards = carddeck_object.deck
	this.previousCorrect = false
	this.currentCard = this.remainingCards[0]
	this.advanceToNextCard = function(){
		this.remainingCards = this.remainingCards.slice(1)
		this.currentCard = this.remainingCards[0]
		if (this.remainingCards.length === 0){
			this.solvedDeck = true
		}
	}
	this.shuffleCards = function(){
		this.remainingCards = shuffle(this.remainingCards)
		this.currentCard = this.remainingCards[0]
	}
	// this.parseInput = function(){}

}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
