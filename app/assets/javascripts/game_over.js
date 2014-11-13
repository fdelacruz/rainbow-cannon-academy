



function gameOver (){}

  gameOver.prototype = {
    preload: function() {
    },

  create: function() {

    wrongAnswerStrings = []
    for( var i=0, l=gameState.wrongAnswerCards.length; i<l; i++ ) {
        wrongAnswerStrings.push( gameState.wrongAnswerCards[i]["term"]+":\t"+gameState.wrongAnswerCards[i]["definition"] );
    }
    var worstFiveCards = sortByFrequencyAndRemoveDuplicates(wrongAnswerStrings).slice(0, 5)
    // console.log(worstFiveCards.join("\n"))

    worstFiveCardsText =game.add.text(
      game.world.centerX,
      100, "You may want to focus on these: \n"+worstFiveCards.join("\n"),
      { font: '24px Josefin Slab', fill: 'white'}
    )
    worstFiveCardsText.anchor.set(0.5)



    var lvltext = game.add.text(
      game.world.centerX,
      game.world.centerY, "Game Over \n You lost on level" + gameState.currentLevel + "\n Press enter to play again",
      { font: '24px Josefin Slab', fill: 'white'}
    )
    lvltext.anchor.set(0.5)

    // var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

    // enterKey.onDown.add(function(){ game.state.start('welcome') }, this)

    this.tweenLevelIntro(lvltext)
    this.tweenLevelIntro(worstFiveCardsText)
  },

  update: function() {
  },

  render: function(){
  },

  tweenLevelIntro: function(text) {
    var tween = game.add.tween(text)
    tween.from({alpha: 0}, 1000)
    tween.start()
    .onComplete.add(function(){
      tween.to({alpha:1}, 1000)
      setTimeout(function(){game.state.start('welcome')}, 10000)
      tween.to({alpha: 0}, 500)
    }, this)
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
