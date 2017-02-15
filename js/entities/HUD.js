/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

  init: function() {
    // call the constructor
    this._super(me.Container, 'init');

    // persistent across level change
    this.isPersistent = true;

    // make sure we use screen coordinates
    this.floating = true;

    // give a name
    this.name = "HUD";

    // add our child score object at the top left corner
    this.addChild(new game.MessageItem(5, 5,
      function() {
        return 'Score: ' + game.getCurrentLevelScore();
    }));

    var msgItem = new game.MessageItem(-5, 5,
      function() {
        return game.data.message;
    });

    msgItem.textAlign("right");

    this.addChild(msgItem);
  }
});

