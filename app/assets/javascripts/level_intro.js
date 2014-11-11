function levelIntro (){}

levelIntro.prototype = {
  preload: function() {
  },

  create: function() {
    console.log(game.state.current)

    var currentLevel = game.add.text(600, 122, gameState.currentLevel.toString(), {fontSize: '32px', fill: '#ffffff'})

    var sprite = game.add.sprite(40, 40, 'diamond')
    this.tweenFadeState(sprite)
  },

  update: function() {
  },

  render: function(){
  },

  tweenFadeState: function(sprite_object) {

    var tween = game.add.tween(sprite_object)
    tween.to({ x: 600 }, 2000)
    tween.start()
    tween.onComplete.add(function() {
        this.game.state.start('flashcard')
      }, this)
  }
}
