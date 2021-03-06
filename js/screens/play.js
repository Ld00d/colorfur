game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    var levelData = game.data.levels[game.data.levelIndex];
    this.cat = me.pool.pull(levelData.name, 31717, 499);

    me.levelDirector.loadLevel('flyingcats');

    // Add our HUD to the game world, add it last so that this is on top of the rest.
    // Can also be forced by specifying a "Infinity" z value to the addChild function.
    this.HUD = new game.HUD.Container();
    me.game.world.addChild(this.HUD);

    me.game.world.addChild(this.cat, 6);
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    // remove the HUD from the game world
    me.game.world.removeChild(this.HUD);
    me.game.world.removeChild(this.cat);
  }
});
