/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.setVelocity(9, 30);
        
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.HORIZONTAL);

        this.renderable.addAnimation("run",  [0, 0, 1, 1, 1, 1]);

        this.renderable.addAnimation("jump", [1]);
    },

    /**
     * update the entity
     */
    update : function (dt) {

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
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});

game.StartEntity = me.Entity.extend( {
    onCollision: function(response, other) {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        return false;
    }
});

game.FinishEntity = me.Entity.extend( {
    onCollision: function(response, other) {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        return false;
    }
});

game.ControlsDisabledEntity = me.Entity.extend( {
    onCollision: function(response, other) {
        game.disableControls();
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        return false;
    }
});

game.ControlsEnabledEntity = me.Entity.extend( {
    onCollision: function(response, other) {
        game.enableControls();
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        return false;
    }
});

game.BadRingEntity = me.Entity.extend( {
    onCollision: function(response, other) {
        game.data.score--;
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        return false;
    }
});

game.GoodRingEntity = me.Entity.extend( {
    onCollision: function(response, other) {
        game.data.score++;
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        return false;
    }
});

