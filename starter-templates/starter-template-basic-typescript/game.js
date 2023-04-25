"use strict";
window.addEventListener('load', function () {
    var game = new Phaser.Game({
        width: 1280,
        height: 720,
        type: Phaser.AUTO,
        backgroundColor: "#242424",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });
    game.scene.add("Preload", Preload);
    game.scene.add("Level", Level);
    game.scene.add("Boot", Boot, true);
});
class Boot extends Phaser.Scene {
    preload() {
        this.load.pack("pack", "assets/preload-asset-pack.json");
    }
    create() {
        this.scene.start("Preload");
    }
}
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
// You can write more code here
/* START OF COMPILED CODE */
class Level extends Phaser.Scene {
    constructor() {
        super("Level");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
        // dino
        const dino = this.add.image(640, 302, "dino");
        // onPointerDownScript
        const onPointerDownScript = new OnPointerDownScript(dino);
        // pushActionScript
        new PushActionScript(onPointerDownScript);
        // text_1
        const text_1 = this.add.text(640, 462, "", {});
        text_1.setOrigin(0.5, 0);
        text_1.text = "Phaser 3 + Phaser Editor 2D + TypeScript";
        text_1.setStyle({ "fontFamily": "arial", "fontSize": "3em" });
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here.
    create() {
        this.editorCreate();
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
        // guapen
        const guapen = this.add.image(505, 360, "guapen");
        guapen.scaleX = 0.4;
        guapen.scaleY = 0.4;
        // progressBar
        const progressBar = this.add.rectangle(553, 361, 256, 20);
        progressBar.setOrigin(0, 0);
        progressBar.isFilled = true;
        progressBar.fillColor = 14737632;
        // preloadUpdater
        new PreloadBarUpdaterScript(progressBar);
        // progressBarBg
        const progressBarBg = this.add.rectangle(553, 361, 256, 20);
        progressBarBg.setOrigin(0, 0);
        progressBarBg.fillColor = 14737632;
        progressBarBg.isStroked = true;
        // loadingText
        const loadingText = this.add.text(552, 329, "", {});
        loadingText.text = "Loading...";
        loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here
    preload() {
        this.editorCreate();
        this.load.pack("asset-pack", "assets/asset-pack.json");
    }
    create() {
        this.scene.start("Level");
    }
}
/* END OF COMPILED CODE */
// You can write more code here
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
/// <reference path="../script-nodes-basic-ts/ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class PreloadBarUpdaterScript extends ScriptNode {
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
    awake() {
        const fullWidth = this.gameObject.width;
        this.scene.load.on(Phaser.Loader.Events.PROGRESS, (p) => {
            this.gameObject.width = fullWidth * p;
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="../script-nodes-basic-ts/ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class PushActionScript extends ScriptNode {
    constructor(parent) {
        super(parent);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    execute(args) {
        this.scene.add.tween({
            targets: this.gameObject,
            scaleX: "*=0.8",
            scaleY: "*=0.8",
            duration: 80,
            yoyo: true,
            onYoyo: () => {
                this.executeChildren(args);
            }
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./ScriptNode.ts"/>
/* START OF COMPILED CODE */
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
/// <reference path="./ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
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
/// <reference path="./ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
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
/// <reference path="./ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
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
                    this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
                        emitter?.off(this.eventName, this.executeChildren, this);
                    });
                    break;
            }
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./OnEventScript.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
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
/// <reference path="./ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class RootScriptNode extends ScriptNode {
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
/// <reference path="./ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
class SpriteScriptNode extends ScriptNode {
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
/// <reference path="./ScriptNode.ts"/>
// You can write more code here
/* START OF COMPILED CODE */
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
