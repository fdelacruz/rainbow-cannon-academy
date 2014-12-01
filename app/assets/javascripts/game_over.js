
function gameOver (){}

  gameOver.prototype = {
    preload: function() {
    },

  create: function() {

    wrongAnswerStrings = []
    for( var i=0, l=gameState.wrongAnswerCards.length; i<l; i++ ) {
        wrongAnswerStrings.push( gameState.wrongAnswerCards[i]["term"]+":\t\t\t\t\t\t"+gameState.wrongAnswerCards[i]["definition"] );
    }
    var worstFiveCards = sortByFrequencyAndRemoveDuplicates(wrongAnswerStrings).slice(0, 5)

    for (var i = 0; i < worstFiveCards.length; i++) {
    worstFiveCards[i] = (i+1)+". "+worstFiveCards[i]
    }

    var gameOverDisplay = "You may want to focus on these: \n\n\n" + worstFiveCards.join("\n\n") + "\n\n\nFinal Score: " + gameUI.score
    var playAgainURL = ""
    var playerTween = game.add.sprite(-300, 700, 'dude')

    worstFiveCardsText =game.add.text(
      game.world.centerX,
      300, gameOverDisplay,
      { font: '24px Josefin Slab', fill: 'white'}
    )

    var button = game.add.button(game.world.centerX - 95, 400, 'dude', this.restartGame, this);
    // button.onInputUp.add(restartGame, this);

    worstFiveCardsText.anchor.set(0.5)

    this.showStats(worstFiveCardsText)
    // this.moveTweenAcrossScreen(playerTween)
  },

  update: function() {
  },

  render: function(){
  },

  restartGame: function(){
    console.log('restart game')
    window.location.reload()
  },

  showStats: function(text) {
    var tween = game.add.tween(text)
    tween.from({alpha: 0}, 5000)
    tween.start()
    .onComplete.add(function(){
      tween.to({alpha:1}, 5000)
      // setTimeout(function(){game.state.start('welcome')}, 10000)
    }, this)
  },

  moveTweenAcrossScreen: function(player) {
    console.log('player should be entering')
    var tween = game.add.tween(player)
    tween.to({x: 1000, y: 700}, 5000)
  }
}


function sortByFrequencyAndRemoveDuplicates(array) {
    var frequency = {}, value;

    // compute frequencies of each value
    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }

    // make array from the frequency object to de-duplicate
    var uniques = [];
    for(value in frequency) {
        uniques.push(value);
    }

    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
}
