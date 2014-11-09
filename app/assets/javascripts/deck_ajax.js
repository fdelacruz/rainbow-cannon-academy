
function callAjaxToSetCurrentDeck(){
  var deck
    var deckId = $('[data-deck-id]').data().deckId
    var url_string = 'json/' + deckId
    // write ajax
      $.ajax({
        url: url_string
      }).success(function(response) {
        console.log("in response")
        gameState.currentDeck = new CardDeck(response)
      });
}
