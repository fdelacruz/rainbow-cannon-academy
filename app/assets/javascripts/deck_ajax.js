$( document ).ready(function() {
    console.log( "ready!" );
    var deckId = $('[data-deck-id]').data().deckId
    var url_string = 'json/' + deckId
    // write ajax
      $.ajax({
        url: url_string
      }).success(function(response) {
        console.log('success')
        console.log(response)
      });
});
