game.GameOverScreen = me.ScreenObject.extend({

  onResetEvent: function() {
    // Load background image
    me.game.world.addChild(
      new me.ImageLayer(0, 0, {
        image: 'game_over'
      }),
      0);

    me.game.world.addChild(
      new game.MessageItem(250, 360,
        function() {
          return 'Total Score: ' + game.getTotalScore();
        }));
  }

});
