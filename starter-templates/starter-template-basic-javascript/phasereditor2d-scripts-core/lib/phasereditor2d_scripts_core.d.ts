class ScriptNode {
    private _scene;
    private _gameObject?;
    private _parent;
    private _children?;
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    get scene(): Phaser.Scene;
    get gameObject(): Phaser.GameObjects.GameObject | undefined;
    get parent(): Phaser.GameObjects.GameObject | Phaser.Scene | ScriptNode;
    get children(): ScriptNode[];
    add(child: ScriptNode): void;
    executeChildren(...args: any[]): void;
    execute(...args: any[]): void;
    protected awake(): void;
    protected start(): void;
    protected update(): void;
    protected destroy(): void;
}

class AlertActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    message: string;
    execute(...args: any[]): void;
}

class CallbackActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    callback: (...args: any[]) => void;
    execute(...args: any[]): void;
}

class ConsoleLogActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    message: string;
    execute(...args: any[]): void;
}

class DestroyActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    execute(...args: any[]): void;
}

class EmitEventActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    eventName: string;
    eventEmitter: "game.events" | "scene.events" | "scene.loader" | "scene.input" | "scene.input.keyboard" | "scene.anims" | "gameObject";
    execute(...args: any[]): void;
}

class ExecActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    targetAction: ScriptNode;
    execute(...args: any[]): void;
}

class OnAwakeScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
}

class OnEventScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    eventName: string;
    eventEmitter: "game.events" | "scene.events" | "scene.loader" | "scene.input" | "scene.input.keyboard" | "scene.anims" | "scene.physics.world" | "gameObject";
    once: boolean;
    awake(): void;
}

class OnPointerDownScript extends OnEventScript {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    awake(): void;
}

class RootScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    key: string;
    /**
     * Gets the RootScript object set into the game object.
     * It lookups the script node in using the `key` parameter as attribute of the game object.
     *
     * @param gameObject The game object where the root script is set.
     * @param key The key used to set root script into the game object. It is `"scripts"` by default.
     * @returns The root script.
     */
    static getRoot(gameObject: Phaser.GameObjects.GameObject, key?: string): RootScript;
    /**
     * Gets the children of the root script registered in the given game object, using the given key.
     *
     * @param gameObject The game object containing the root script.
     * @param key The key used to register the root script in the game object.
     * @returns The chidlren of the root script.
     */
    static getChildren(gameObject: Phaser.GameObjects.GameObject, key?: string): ScriptNode[];
    /**
     * Gets the root script associated to the game object, using the given key.
     *
     * @param gameObject The game object where the root script is set.
     * @param key The key used for registering the root script in the game object.
     * @returns The root script.
     */
    static hasRoot(gameObject: Phaser.GameObjects.GameObject, key?: string): boolean;
    protected awake(): void;
}

class SpriteScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    get gameObject(): Phaser.GameObjects.Sprite;
}

class StartSceneActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    sceneKey: string;
    execute(...args: any[]): void;
}

class UserComponent {
    /**
     * @param gameObject The entity.
     */
    constructor(gameObject: Phaser.GameObjects.GameObject);
    scene: Phaser.Scene;
    protected awake(): void;
    protected start(): void;
    protected update(): void;
    protected destroy(): void;
}


