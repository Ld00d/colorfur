game.PlayButton = me.GUI_Object.extend({

  init: function(x, y) {
    var settings = {
      image: 'btnplay',
      framewidth: 250,
      frameheight: 100

    };

    // super constructor
    this._super(me.GUI_Object, 'init', [x, y, settings]);

    this.anchorPoint.set(0, 0);
  },

  onClick: function() {
    // Change to the PLAY state when the button is clicked
    me.state.change(me.state.PLAY);
    return true;
  }
});

game.NextButton = me.GUI_Object.extend({

  init: function(x, y) {
    var settings = {
      image: 'btnnext',
      framewidth: 250,
      frameheight: 100

    };

    // super constructor
    this._super(me.GUI_Object, 'init', [x, y, settings]);

    this.anchorPoint.set(0, 0);
  },

  onClick: function() {

    game.gotoNextLevel();
    return true;
  }
});

game.ReplayButton = me.GUI_Object.extend({

  init: function(x, y) {
    var settings = {
      image: 'btnreplay',
      framewidth: 250,
      frameheight: 100
    };

    // super constructor
    this._super(me.GUI_Object, 'init', [x, y, settings]);

    this.anchorPoint.set(0, 0);
  },

  onClick: function() {

    game.replayLevel();
    return true;
  }
});

game.MessageItem = me.Renderable.extend({

  init: function(x, y, textFunction) {
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    this.font = new me.BitmapFont(
      me.loader.getBinary('markerfelt'),
      me.loader.getImage('markerfelt'));

    this.textFunction = textFunction;
    this.message = '';
  },

  update: function() {
    var msg = this.textFunction();
    if (this.message !== msg) {
      this.message = msg;
      return true;
    }
    return false;
  },

  draw: function(context) {
    var text = this.textFunction();
    var x = 0,
      y = 0;
    if (this.textAlign() === 'right') {
      x = me.game.viewport.width + this.pos.x;
      y = this.pos.y;
    } else {
      x = this.pos.x;
      y = this.pos.y;
    }
    this.font.draw(context, text, x, y);
  },

  textAlign: function(ta) {
    if (ta) {
      this.font.textAlign = ta;
    }
    return this.font.textAlign;
  }

});
