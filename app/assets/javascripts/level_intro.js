function levelIntro (){}

levelIntro.prototype = {
  preload: function() {
  },

  create: function() {
    game.stage.backgroundColor = '#1E1B2B'

    var lvltext = game.add.text(
      game.world.centerX,
      game.world.centerY, "Level " + gameState.currentLevel,
      { font: '68px Josefin Slab', fill: 'white'}
    )
    lvltext.anchor.set(0.5)

    /* Show Player Alien Reaction */
    if (!gameState.firstTimeOnLevel){
      /* Player Just Died */
      var alienMockingYou = game.add.sprite(game.world.centerX + 300, game.world.centerY, 'happyBoss')
      alienMockingYou.anchor.set(0.5)
    } else if (gameState.currentLevel === 1) {
      /* Player Has Just Entered Game */
      var alienMockingYou = game.add.sprite(game.world.centerX + 300, game.world.centerY, 'boss_alien')
      alienMockingYou.anchor.set(0.5)
    } else {
      /* Player Has Advanced to Next Level */
      var alienMockingYou = game.add.sprite(game.world.centerX + 300, game.world.centerY, 'deadBoss')
      alienMockingYou.anchor.set(0.5)
    }
    // -------

    this.tweenLevelIntro(alienMockingYou)
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
