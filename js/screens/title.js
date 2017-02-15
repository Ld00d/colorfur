game.TitleScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    // Load background image
    me.game.world.addChild(
      new me.ImageLayer(0, 0, {
        image: 'launch'
      }),
      0);

    me.game.world.addChild(
      new game.PlayButton(355, 430),
      1 // z-index
    );

    //me.audio.play('uketune');
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    // TODO
  }
});
