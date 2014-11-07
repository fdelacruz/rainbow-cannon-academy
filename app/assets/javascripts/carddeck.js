

var exampleDeck = {deck:[
	{q:"hello" ,a:"hola" },
	{q: "bye",a:"adios"},
	{q: "dog",a: "perro"},
	{q: "cat",a: "gato"},
	{q: "food",a: "comida"},
	]}



function CardDeck(carddeck_object){
	this.solvedDeck = false
	this.remainingCards = carddeck_object.deck
	this.previousCorrect = false
	this.currentCard = this.remainingCards[0]
	this.advanceToNextCard = function(){
		this.remainingCards = this.remainingCards.slice(1)
		if (this.remainingCards.length === 0){
			this.solvedDeck = true
		}
	}
	// this.parseInput = function(){}

}

function myFunction() {
    console.log("WTF")            // the function returns the product of p1 and p2
}