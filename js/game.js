/* Game namespace */
var game = {

  // an object where to store game information
  data: {
    // score
    score: 0,
    message: 'Here we go!',
    goodMessages: [
      'Nice!', 'Way to go!', 'Raaaowwrrr!!',
      'Excellent work!', 'Are you a pro?',
      'Furtastic!', 'Huzzah!', 'Yes!'
    ],
    badMessages: [
      'Oops!', 'D\'oh', 'Hissssss!', 'Ouch!',
      'Need help?', 'CATastrophe!', 'Are you ok?',
      'Wrong way kitty!', 'Bad kitty!'
    ],
    state: {
      TRANSITION: me.state.USER + 1,
      NEXT: me.state.USER + 2
    },
    levels: [{
        name: 'redcat',
        title: 'Red Cat',
        minScore: 0,
        score: 0
      }, {
        name: 'orangecat',
        title: 'Orange Cat',
        minScore: 18,
        score: 0
      }, {
        name: 'yellowcat',
        title: 'Yellow Cat',
        minScore: 35,
        score: 0
      }, {
        name: 'greencat',
        title: 'Green Cat',
        minScore: 52,
        score: 0
      }, {
        name: 'bluecat',
        title: 'Blue Cat',
        minScore: 68,
        score: 0
      }, {
        name: 'purplecat',
        title: 'Purple Cat',
        minScore: 83,
        score: 0
      }, {
        name: 'pinkcat',
        title: 'Pink Cat',
        minScore: 100,
        score: 0
      }, {
        name: 'rainbowcat',
        title: 'Rainbow Cat',
        minScore: 115,
        score: 0
      }

    ],
    levelIndex: 0
  },

  // Run on page load.
  onload: function() {
    // Initialize the video.
    if (!me.video.init(960, 640, {
        wrapper: "screen",
        scale: 1.0,
        scaleMethod: "flex-width"
      })) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (me.game.HASH.debug === true) {
      window.onReady(function() {
        me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // set and load all resources.
    // (this will also automatically switch to the loading screen)
    me.loader.preload(game.resources, this.loaded.bind(this));
  },

  // Run on game resources loaded.
  loaded: function() {

    me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.state.set(game.data.state.TRANSITION, new game.TransitionScreen());
    me.state.set(me.state.GAMEOVER, new game.GameOverScreen());

    // add our player entity in the entity pool
    me.pool.register('redcat', game.RedCatEntity);
    me.pool.register('orangecat', game.OrangeCatEntity);
    me.pool.register('yellowcat', game.YellowCatEntity);
    me.pool.register('greencat', game.GreenCatEntity);
    me.pool.register('bluecat', game.BlueCatEntity);
    me.pool.register('purplecat', game.PurpleCatEntity);
    me.pool.register('pinkcat', game.PinkCatEntity);
    me.pool.register('rainbowcat', game.RainbowCatEntity);

    me.pool.register('Start', game.StartEntity);
    me.pool.register('Finish', game.FinishEntity);
    me.pool.register('ControlsDisabled', game.ControlsDisabledEntity);
    me.pool.register('ControlsEnabled', game.ControlsEnabledEntity);
    me.pool.register('GoodRing', game.GoodRingEntity);
    me.pool.register('BadRing', game.BadRingEntity);

    me.state.change(me.state.MENU);
  },

  enableControls: function() {
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
    me.input.bindPointer(me.input.KEY.SPACE);
  },

  disableControls: function() {
    me.input.unbindKey(me.input.KEY.SPACE);
    me.input.unbindPointer(me.input.pointer.LEFT);
  },
  onLevelEnd: function() {
    me.state.change(game.data.state.TRANSITION);
  },
  gotoNextLevel: function() {
    if (game.data.levelIndex < game.data.levels.length - 1) {
      game.data.levelIndex++;
      me.state.change(me.state.PLAY);
    }
  },
  canGotoNextLevel: function() {
    if (game.data.levelIndex < game.data.levels.length - 1) {
      var nextLevel = game.data.levels[game.data.levelIndex + 1];
      return this.getTotalScore() >= nextLevel.minScore;
    }

    return false;
  },
  replayLevel: function() {
    this.setCurrentLevelScore(0);
    me.state.change(me.state.PLAY);
  },
  isLastLevel: function() {
    return game.data.levelIndex === game.data.levels.length - 1;
  },
  getCurrentLevel: function() {
    return game.data.levels[game.data.levelIndex];
  },
  getNextLevel: function() {
    var nextLevel = null;
    if (game.data.levelIndex < game.data.levels.length - 1) {
      nextLevel = game.data.levels[game.data.levelIndex + 1];
    }
    return nextLevel;
  },
  getCurrentLevelScore: function() {
    var data = game.data;
    return data.levels[data.levelIndex].score;
  },
  setCurrentLevelScore: function(s) {
    game.data.levels[game.data.levelIndex].score = s;
  },
  addToCurrentLevelScore: function(a) {
    var cls = this.getCurrentLevelScore();
    this.setCurrentLevelScore(cls + a);
  },
  getTotalScore: function() {
    var total = 0;
    for (var i = 0; i <= game.data.levelIndex; i++) {
      total += game.data.levels[i].score;
    }
    return total;
  }

};
