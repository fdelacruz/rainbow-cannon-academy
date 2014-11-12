function welcome (){}

welcome.prototype = {
  preload: function() {
  },

  create: function() {
    console.log(game.state.current)

    /* Create logo and fade in & out while scrolling up */
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser')
    logo.anchor.x = 0.5
    logo.anchor.y = 0.5
    this.tweenLogo(logo)

    /* Allow user to skip with enter key */
    var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

    enterKey.onDown.add(function(){ game.state.start('level_intro') }, this)


  },

  update: function() {
  },

  render: function(){
  },

  tweenLogo: function(sprite_object) {
    var tween = game.add.tween(sprite_object)
    tween.from({ y: game.world.centerY + 10, alpha: 0 }, 1300) /* Beginning logo position, 2 seconds to create position */
    tween.start()
    tween.to({x:game.world.centerX, y: game.world.centerY - 10}, 1300) /* Hold on logo, milliseconds */
    tween.onComplete.add(function() {
      tween.to({x: game.world.centerX, y: game.world.centerY - 20, alpha: 0}, 1300) /* Fade out and move up, 2 seconds */
      setTimeout(function(){game.state.start('level_intro')}, 3100) /* Go to first level */
      }, this)
  }
}
