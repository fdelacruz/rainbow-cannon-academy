function welcome (){}



welcome.prototype = {
  preload: function() {
  },

  create: function() {
    console.log(game.state.current)
    game.stage.backgroundColor = '#1E1B2B'

    // Reset globals level in case of game over
    gameState.lifes = 2
    gameState.currentLevel = 1
    gameState.firstTimeOnLevel = true
    gameState.wrongAnswerCards = []
    gameState.currentLevel = 1
    gameUI.score = 0
    // gameState.player.health = 150

    // --

    /* Create logo and fade in & out while scrolling up */
    var logo = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'phaser')
    logo.anchor.x = 0.5
    logo.anchor.y = 0.5
    this.tweenLogo(logo)

    /* Allow user to skip with enter key */
    // var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

    // enterKey.onDown.add(function(){ game.state.start('level_intro') }, this)


  },

  update: function() {
  },

  render: function(){
  },

  tweenLogo: function(sprite_object) {
    var tween = game.add.tween(sprite_object)
    tween.from({alpha: 0 }, 2000) /* Beginning logo position, 2 seconds to create position */
    tween.start()
    tween.to({}, 2000) /* Hold on logo, milliseconds */
    tween.onComplete.add(function() {
      tween.to({alpha: 0}, 2000) /* Fade out and move up, 2 seconds */
      setTimeout(function(){game.state.start('level_intro')}, 5000) /* Go to first level */
      }, this)
  }
}
