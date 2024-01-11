class ScriptNode {
    _scene;
    _gameObject;
    _parent;
    _children;
    constructor(parent) {
        this._parent = parent;
        if (parent instanceof ScriptNode) {
            this._scene = parent.scene;
            this._gameObject = parent.gameObject;
            parent.add(this);
        }
        else if (parent instanceof Phaser.GameObjects.GameObject) {
            this._scene = parent.scene;
            this._gameObject = parent;
        }
        else {
            this._scene = parent;
        }
        const listenAwake = this.awake !== ScriptNode.prototype.awake;
        const listenStart = this.start !== ScriptNode.prototype.start;
        const listenUpdate = this.update !== ScriptNode.prototype.update;
        const listenDestroy = this.destroy !== ScriptNode.prototype.destroy;
        if (listenAwake) {
            this.scene.events.once("scene-awake", this.awake, this);
        }
        if (listenStart) {
            this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        }
        if (listenUpdate) {
            this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        }
        if (listenAwake || listenStart || listenUpdate || listenDestroy) {
            const destroyCallback = () => {
                this.scene.events.off("scene-awake", this.awake, this);
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.start, this);
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
                if (listenDestroy) {
                    this.destroy();
                }
            };
            if (this.gameObject) {
                this.gameObject.on(Phaser.GameObjects.Events.DESTROY, destroyCallback);
            }
            else {
                this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, destroyCallback);
            }
        }
    }
    getActionTargetObject(args) {
        const target = ActionTargetComp.getTargetGameObject(this, args);
        return target;
    }
    get scene() {
        return this._scene;
    }
    get gameObject() {
        return this._gameObject;
    }
    get parent() {
        return this._parent;
    }
    get children() {
        if (!this._children) {
            this._children = [];
        }
        return this._children;
    }
    add(child) {
        this.children.push(child);
    }
    executeChildren(...args) {
        if (this._children) {
            for (const child of this._children) {
                child.execute(...args);
            }
        }
    }
    execute(...args) {
        // override this on executable nodes
    }
    awake() {
        // override this
    }
    start() {
        // override this
    }
    update() {
        // override this
    }
    destroy() {
        // override this
    }
}

// You can write more code here
/* END-USER-IMPORTS */
class ActionTargetComp {
    constructor(gameObject) {
        this.gameObject = gameObject;
        gameObject["__ActionTargetComp"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__ActionTargetComp"];
    }
    gameObject;
    target = "GAME_OBJECT";
    targetName = "";
    /* START-USER-CODE */
    static getTargetGameObject(scriptNode, args) {
        const comp = ActionTargetComp.getComponent(scriptNode);
        if (comp) {
            switch (comp.target) {
                case "GAME_OBJECT":
                    return scriptNode.gameObject;
                case "ARG_1":
                    return args[0];
                case "ARG_2":
                    return args[1];
                case "ARG_3":
                    return args[2];
                case "ARG_4":
                    return args[3];
                case "ARG_5":
                    return args[4];
                case "ARG_6":
                    return args[5];
                case "ARG_7":
                    return args[6];
                case "ARG_8":
                    return args[7];
            }
        }
        return scriptNode.gameObject;
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class AddToParentActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    parentContainer;
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        this.parentContainer.add(obj);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class AlertActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    message = "";
    /* START-USER-CODE */
    execute(...args) {
        alert(this.message);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* END-USER-IMPORTS */
class AssignOpComp {
    constructor(gameObject) {
        this.gameObject = gameObject;
        gameObject["__AssignOpComp"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__AssignOpComp"];
    }
    gameObject;
    operator = "=";
    /* START-USER-CODE */
    static computeValue(node, oldValue, newValue) {
        const comp = AssignOpComp.getComponent(node);
        if (comp) {
            switch (comp.operator) {
                case "+=":
                    return oldValue + newValue;
                case "*=":
                    return oldValue * newValue;
                default:
                    return newValue;
            }
        }
        return newValue;
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class CallbackActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    callback;
    /* START-USER-CODE */
    execute(...args) {
        if (this.callback) {
            this.callback(...args);
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class ConsoleLogActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    message = "";
    /* START-USER-CODE */
    execute(...args) {
        console.log(this.message);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* END-USER-IMPORTS */
class DestroyActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        obj?.destroy();
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class EmitEventActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    eventName = "";
    eventEmitter = "gameObject";
    /* START-USER-CODE */
    execute(...args) {
        let emitter;
        switch (this.eventEmitter) {
            case "game.events":
                emitter = this.scene.game.events;
                break;
            case "scene.events":
                emitter = this.scene.events;
                break;
            case "scene.loader":
                emitter = this.scene.load;
                break;
            case "scene.input":
                emitter = this.scene.input;
                break;
            case "scene.input.keyboard":
                emitter = this.scene.input.keyboard;
                break;
            case "scene.anims":
                emitter = this.scene.anims;
                break;
            case "gameObject":
                emitter = this.gameObject;
                break;
        }
        if (emitter) {
            emitter.emit(this.eventName, ...args);
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class ExecActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    targetAction;
    /* START-USER-CODE */
    execute(...args) {
        if (this.targetAction) {
            this.targetAction.execute(...args);
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class ExecChildrenActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    execute(...args) {
        this.executeChildren(...args);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class ExecRandomActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    execute(...args) {
        const child = Phaser.Utils.Array.GetRandom(this.children);
        child.execute(...args);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class FlipActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    horizontal = false;
    vertical = false;
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        if (this.horizontal) {
            obj.flipX = !obj.flipX;
        }
        if (this.vertical) {
            obj.flipY = !obj.flipY;
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class OnAwakeScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        this.scene.events.once("scene-awake", () => {
            this.executeChildren();
        });
        /* END-USER-CTR-CODE */
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class OnEventScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }
    eventName = "";
    eventEmitter = "gameObject";
    once = false;
    /* START-USER-CODE */
    awake() {
        let emitter;
        switch (this.eventEmitter) {
            case "game.events":
                emitter = this.scene.game.events;
                break;
            case "scene.events":
                emitter = this.scene.events;
                break;
            case "scene.loader":
                emitter = this.scene.load;
                break;
            case "scene.input":
                emitter = this.scene.input;
                break;
            case "scene.input.keyboard":
                emitter = this.scene.input.keyboard;
                break;
            case "scene.anims":
                emitter = this.scene.anims;
                break;
            case "scene.physics.world":
                emitter = this.scene.physics.world;
                break;
            case "gameObject":
                emitter = this.gameObject;
                break;
        }
        if (emitter) {
            if (this.once) {
                emitter.once(this.eventName, this.executeChildren, this);
            }
            else {
                emitter.on(this.eventName, this.executeChildren, this);
            }
            switch (this.eventEmitter) {
                case "scene.anims":
                case "scene.events":
                case "scene.input":
                case "scene.input.keyboard":
                case "scene.loader":
                case "scene.physics.world":
                    this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
                        emitter?.off(this.eventName, this.executeChildren, this);
                    });
                    break;
            }
            // If it is attached to a game object
            // and the emitter isn't the game object
            // then remove the listener
            if (this.gameObject && this.eventEmitter !== "gameObject") {
                this.gameObject.once(Phaser.GameObjects.Events.DESTROY, () => {
                    emitter?.off(this.eventName, this.executeChildren, this);
                });
            }
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class OnPointerDownScript extends OnEventScript {
    constructor(parent) {
        super(parent);
        // this (prefab fields)
        this.eventName = "pointerdown";
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    awake() {
        if (!this.gameObject) {
            return;
        }
        if (!this.gameObject.input) {
            this.gameObject.setInteractive();
        }
        super.awake();
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class PlaySpriteAnimationActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    animationKey = "";
    ignoreIfPlaying = false;
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        obj.once("animationcomplete-" + this.animationKey, () => this.executeChildren(...args));
        obj.play(this.animationKey, this.ignoreIfPlaying);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class RootScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    key = "scripts";
    /* START-USER-CODE */
    /**
     * Gets the RootScript object set into the game object.
     * It lookups the script node in using the `key` parameter as attribute of the game object.
     *
     * @param gameObject The game object where the root script is set.
     * @param key The key used to set root script into the game object. It is `"scripts"` by default.
     * @returns The root script.
     */
    static getRoot(gameObject, key = "scripts") {
        return gameObject[`RootScript__${key}`];
    }
    /**
     * Gets the children of the root script registered in the given game object, using the given key.
     *
     * @param gameObject The game object containing the root script.
     * @param key The key used to register the root script in the game object.
     * @returns The chidlren of the root script.
     */
    static getChildren(gameObject, key = "scripts") {
        const root = this.getRoot(gameObject, key);
        if (root) {
            return root.children;
        }
        return [];
    }
    /**
     * Gets the root script associated to the game object, using the given key.
     *
     * @param gameObject The game object where the root script is set.
     * @param key The key used for registering the root script in the game object.
     * @returns The root script.
     */
    static hasRoot(gameObject, key = "scripts") {
        const script = this.getRoot(gameObject, key);
        return script !== undefined;
    }
    awake() {
        this.gameObject[`RootScript__${this.key}`] = this;
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class SetAngleActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    angle = 0;
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        obj.angle = AssignOpComp.computeValue(this, obj.angle, this.angle);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class SetScaleXActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    scaleX = 1;
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        obj.scaleX = AssignOpComp.computeValue(this, obj.scaleX, this.scaleX);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class SetScaleYActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    scaleY = 1;
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        obj.scaleY = AssignOpComp.computeValue(this, obj.scaleY, this.scaleY);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class SetXActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    x = 0;
    /* START-USER-CODE */
    execute(...args) {
        const obj = this.getActionTargetObject(args);
        obj.x = AssignOpComp.computeValue(this, obj.x, this.x);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class SetYActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    y = 0;
    /* START-USER-CODE */
    execute(...args) {
        console.log("here");
        const obj = this.getActionTargetObject(args);
        obj.y = AssignOpComp.computeValue(this, obj.y, this.y);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class SpawnActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    objectPrefab;
    spawnInParentPosition = true;
    /* START-USER-CODE */
    execute(...args) {
        if (!this.objectPrefab) {
            return;
        }
        const obj = new this.objectPrefab(this.scene);
        this.scene.events.emit("scene-awake");
        if (this.spawnInParentPosition) {
            const sprite = this.getActionTargetObject(args);
            obj.x = sprite.x;
            obj.y = sprite.y;
        }
        this.scene.add.existing(obj);
        this.executeChildren(obj);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class SpriteScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    get gameObject() {
        return super.gameObject;
    }
}
/* END OF COMPILED CODE */
// You can write more code here

// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class StartSceneActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    sceneKey = "";
    /* START-USER-CODE */
    execute(...args) {
        this.scene.scene.start(this.sceneKey, ...args);
    }
}
/* END OF COMPILED CODE */
// You can write more code here

class UserComponent {
    /**
     * @param gameObject The entity.
     */
    constructor(gameObject) {
        this.scene = gameObject.scene;
        const listenAwake = this.awake !== UserComponent.prototype.awake;
        const listenStart = this.start !== UserComponent.prototype.start;
        const listenUpdate = this.update !== UserComponent.prototype.update;
        const listenDestroy = this.destroy !== UserComponent.prototype.destroy;
        if (listenAwake) {
            this.scene.events.once("scene-awake", this.awake, this);
        }
        if (listenStart) {
            this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        }
        if (listenUpdate) {
            this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        }
        if (listenStart || listenUpdate || listenDestroy) {
            gameObject.on(Phaser.GameObjects.Events.DESTROY, () => {
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.start, this);
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
                if (listenDestroy) {
                    this.destroy();
                }
            });
        }
    }
    scene;
    awake() {
        // override this
    }
    start() {
        // override this
    }
    update() {
        // override this
    }
    destroy() {
        // override this
    }
}


