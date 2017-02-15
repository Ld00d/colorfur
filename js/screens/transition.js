game.TransitionScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    var currlvl = game.getCurrentLevel();
    var nextlvl = game.getNextLevel();

    // Load background image
    me.game.world.addChild(
      new me.ImageLayer(0, 0, {
        image: 'transition'
      }),
      0);

    me.game.world.addChild(
      new game.MessageItem(70, 55,
        function() {
          return 'Level: ' + currlvl.title;
        }), 15);

    me.game.world.addChild(
      new game.MessageItem(70, 160,
        function() {
          return 'Level Score: ' + currlvl.score;
        }));

    me.game.world.addChild(
      new game.MessageItem(70, 265,
        function() {
          return 'Total Score: ' + game.getTotalScore();
        }));

    me.game.world.addChild(
      new game.ReplayButton(355, 485),
      1);

    if (game.canGotoNextLevel()) {
      me.game.world.addChild(
        new game.NextButton(650, 485),
        1 // z-index
      );

    } else {
      if (game.isLastLevel()) {
        me.state.change(me.state.GAMEOVER);
      } else {
        me.game.world.addChild(
          new game.MessageItem(70, 370,
            function() {
              return 'You need ' + nextlvl.minScore + ' to continue';
            }));
      }
    }

    //me.audio.play('uketune');
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    // TODO
  }
});
