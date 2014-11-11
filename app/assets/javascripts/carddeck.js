function CardDeck(array_of_card_jsons){
	this.deck = array_of_card_jsons
	this.currentRound = []
	this.currentIndex = 0
	this.currentCard = null
	this.cardsLeftInCurrentRound = function(){
		return (this.currentRound.length - this.currentIndex)
	}
	this.advanceToNextCard = function(){
		// this.currentIndex += 1
		this.currentCard = this.currentRound[this.currentIndex]
	}
	this.populateCurrentRound = function(){
		this.shuffleCards()
		this.currentRound = this.deck.slice(0,10)
		this.updateCurrentCard()
	}
	this.shuffleCards = function(){
		this.deck = shuffle(this.deck)
		this.updateCurrentCard()
	}
	this.updateCurrentCard = function(){
		this.currentCard = this.currentRound[this.currentIndex]
	}


}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
