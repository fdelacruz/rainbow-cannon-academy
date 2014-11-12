function levelIntro (){}

levelIntro.prototype = {
  preload: function() {
  },

  create: function() {
    var lvltext = game.add.text(
      game.world.centerX,
      game.world.centerY, "Level " + gameState.currentLevel,
      { font: '68px Arial', fill: 'white'}
    )
    lvltext.anchor.set(0.5)

    var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

    enterKey.onDown.add(function(){ game.state.start('flashcard') }, this)



    this.tweenLevelIntro(lvltext)
    // var logo = game.add.sprite(200, 200, 'phaser')

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
      setTimeout(function(){game.state.start('flashcard')}, 2600)
      tween.to({alpha: 0}, 500)
    }, this)
  }
}
