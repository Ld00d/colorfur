/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

  /**
   * constructor
   */
  init: function(x, y, settings) {
    var stgs = settings || {};
    stgs.framewidth = 125;
    stgs.width = 125;
    stgs.height = 131;
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);

    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.HORIZONTAL);

    this.renderable.addAnimation("run", [0, 0, 1, 1, 1, 1]);

    this.renderable.addAnimation("jump", [1]);
  },

  /**
   * update the entity
   */
  update: function(dt) {

    this.body.vel.x -= this.body.accel.x * me.timer.tick;

    if (me.input.isKeyPressed('jump')) {
      // make sure we are not already jumping or falling
      if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;

        // set the jumping flag
        this.body.jumping = true;
      }
    }
    if (!this.body.jumping && !this.body.falling) {
      if (!this.renderable.isCurrentAnimation("run")) {
        this.renderable.setCurrentAnimation("run");
      }
    } else {

      if (!this.renderable.isCurrentAnimation("jump")) {
        this.renderable.setCurrentAnimation("jump");
      }
    }

    // apply physics to the body (this moves the entity)
    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision: function(response, other) {

    // Make all other objects solid
    return true;
  }
});

game.RedCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'redcat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(9, 30);
  }
});

game.OrangeCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'orangecat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(10, 30);
  }
});

game.YellowCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'yellowcat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(11, 30);
  }
});

game.GreenCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'greencat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(12, 30);
  }
});

game.BlueCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'bluecat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(13, 30);
  }
});

game.PurpleCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'purplecat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(14, 30);
  }
});

game.PinkCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'pinkcat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(15, 30);
  }
});

game.RainbowCatEntity = game.PlayerEntity.extend({
  /**
   * constructor
   */
  init: function(x, y, settings) {
    var rcSettings = settings || {};
    rcSettings.image = 'rainbowcat';

    this._super(game.PlayerEntity, 'init', [x, y, rcSettings]);

    this.body.setVelocity(20, 30);
  }
});

game.StartEntity = me.Entity.extend({
  onCollision: function() {
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    return false;
  }
});

game.FinishEntity = me.Entity.extend({
  onCollision: function() {
    game.onLevelEnd();
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    return false;
  }
});

game.ControlsDisabledEntity = me.Entity.extend({
  onCollision: function() {
    game.disableControls();
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    return false;
  }
});

game.ControlsEnabledEntity = me.Entity.extend({
  onCollision: function() {
    game.enableControls();
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    return false;
  }
});

game.BadRingEntity = me.Entity.extend({
  onCollision: function() {
    game.addToCurrentLevelScore(-1);
    game.data.message = game.data.badMessages[(0).random(game.data.badMessages.length)];
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    return false;
  }
});

game.GoodRingEntity = me.Entity.extend({
  onCollision: function() {
    var meowindx = 1;
    game.addToCurrentLevelScore(1);
    meowindx = (1).random(4);
    me.audio.play('meow' + meowindx);
    game.data.message = game.data.goodMessages[(0).random(game.data.goodMessages.length)];
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    return false;
  }
});
