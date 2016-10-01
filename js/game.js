
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {wrapper : "screen", scale : 1.0, scaleMethod: "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
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
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);

        me.pool.register('Start', game.StartEntity);
        me.pool.register('Finish', game.FinishEntity);
        me.pool.register('ControlsDisabled', game.ControlsDisabledEntity);
        me.pool.register('ControlsEnabled', game.ControlsEnabledEntity);
        me.pool.register('GoodRing', game.GoodRingEntity);
        me.pool.register('BadRing', game.BadRingEntity);


        // Start the game.
        me.state.change(me.state.PLAY);
    },
    "enableControls" : function() {

        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
    },
    "disableControls" : function() {
        me.input.unbindKey(me.input.KEY.SPACE);
    }
};
