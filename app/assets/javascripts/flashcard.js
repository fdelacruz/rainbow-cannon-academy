function flashCard() {}

flashCard.prototype = {
  create: function() {
    phaserLifeCycleFunctions.create(game)
  },
  update: function() {
    phaserLifeCycleFunctions.update(game)
  },
  render: function() {
    phaserLifeCycleFunctions.render(game)
  },

};
