// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class DelayConfigComp {
    constructor(gameObject) {
        this.gameObject = gameObject;
        gameObject["__DelayConfigComp"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__DelayConfigComp"];
    }
    gameObject;
    delay = 0;
    /* START-USER-CODE */
    static getDelay(obj, defaultValue) {
        const comp = DelayConfigComp.getComponent(obj);
        if (comp) {
            return comp.delay;
        }
        return defaultValue;
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class DurationConfigComp {
    constructor(gameObject) {
        this.gameObject = gameObject;
        gameObject["__DurationConfigComp"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__DurationConfigComp"];
    }
    gameObject;
    duration = 250;
    /* START-USER-CODE */
    static getDuration(obj, defaultValue) {
        const comp = DurationConfigComp.getComponent(obj);
        if (comp) {
            return comp.duration;
        }
        return defaultValue;
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class EaseConfigComp {
    constructor(gameObject) {
        this.gameObject = gameObject;
        gameObject["__EaseConfigComp"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__EaseConfigComp"];
    }
    gameObject;
    ease = "Linear";
    /* START-USER-CODE */
    static getEase(obj, defaultValue) {
        const comp = EaseConfigComp.getComponent(obj);
        if (comp) {
            return comp.ease;
        }
        return defaultValue;
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class FadeActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    fadeDirection = "FadeIn";
    /* START-USER-CODE */
    execute(...args) {
        if (!this.gameObject) {
            return;
        }
        const sprite = this.gameObject;
        const duration = DurationConfigComp.getDuration(this, 250);
        const delay = DelayConfigComp.getDelay(this, 0);
        const ease = EaseConfigComp.getEase(this, "Expo");
        const from = this.fadeDirection === "FadeIn" ? 0 : sprite.alpha;
        const to = this.fadeDirection === "FadeIn" ? sprite.alpha : 0;
        sprite.alpha = from;
        this.scene.add.tween({
            targets: sprite,
            alpha: { from, to },
            duration,
            delay,
            ease,
            onComplete: () => {
                this.executeChildren();
            }
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class MoveInSceneActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    from = "NONE";
    /* START-USER-CODE */
    execute(...args) {
        if (!this.gameObject) {
            return;
        }
        const sprite = this.gameObject;
        const duration = DurationConfigComp.getDuration(this, 250);
        const delay = DelayConfigComp.getDelay(this, 0);
        const ease = EaseConfigComp.getEase(this, "Expo");
        const { x, y } = sprite;
        let fromX = x;
        let fromY = y;
        switch (this.from) {
            case "LEFT":
                fromX = -sprite.displayWidth;
                break;
            case "RIGHT":
                fromX = this.scene.scale.width + sprite.displayWidth;
                break;
            case "TOP":
                fromY = -sprite.displayHeight;
                break;
            case "BOTTOM":
                fromY = this.scene.scale.height + sprite.displayHeight;
                break;
        }
        sprite.setPosition(fromX, fromY);
        this.scene.add.tween({
            targets: sprite,
            x,
            y,
            duration,
            delay,
            ease,
            onComplete: () => {
                this.executeChildren();
            }
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class MoveOutSceneActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    to = "NONE";
    /* START-USER-CODE */
    execute(...args) {
        if (!this.gameObject) {
            return;
        }
        const sprite = this.gameObject;
        const duration = DurationConfigComp.getDuration(this, 250);
        const delay = DelayConfigComp.getDelay(this, 0);
        const ease = EaseConfigComp.getEase(this, "Expo.in");
        let { x, y } = sprite;
        switch (this.to) {
            case "LEFT":
                x = -sprite.displayWidth;
                break;
            case "RIGHT":
                x = this.scene.scale.width + sprite.displayWidth;
                break;
            case "TOP":
                y = -sprite.displayHeight;
                break;
            case "BOTTOM":
                y = this.scene.scale.height + sprite.displayHeight;
                break;
        }
        this.scene.add.tween({
            targets: sprite,
            x,
            y,
            duration,
            delay,
            ease,
            onComplete: () => {
                this.executeChildren();
            }
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class PushActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    _executing = false;
    execute(args) {
        if (this._executing) {
            return;
        }
        if (!this.gameObject) {
            return;
        }
        this._executing = true;
        const duration = DurationConfigComp.getDuration(this, 80);
        const { scaleX, scaleY } = this.gameObject;
        this.scene.add.tween({
            targets: this.gameObject,
            scaleX: scaleX * 0.8,
            scaleY: scaleY * 0.8,
            duration,
            yoyo: true,
            onComplete: () => {
                this._executing = false;
                this.executeChildren(args);
            }
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here


