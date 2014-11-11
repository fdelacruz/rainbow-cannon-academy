var starfieldBackground = {}
starfieldBackground.create = function(game) { this.sprite = game.add.tileSprite(0, 200, 1200, 600, 'starfield') }
starfieldBackground.update = function() { this.sprite.tilePosition.x -= 1 } 