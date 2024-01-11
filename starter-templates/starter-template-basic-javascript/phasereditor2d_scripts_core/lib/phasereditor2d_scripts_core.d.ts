declare class ScriptNode {
    private _scene;
    private _gameObject?;
    private _parent;
    private _children?;
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    protected getActionTargetObject(args: any[]): any;
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

declare class ActionTargetComp {
    constructor(gameObject: any);
    static getComponent(gameObject: any): ActionTargetComp;
    private gameObject;
    target: "GAME_OBJECT" | "ARG_1" | "ARG_2" | "ARG_3" | "ARG_4" | "ARG_5" | "ARG_6" | "ARG_7" | "ARG_8";
    targetName: string;
    static getTargetGameObject(scriptNode: ScriptNode, args: any[]): any;
}

declare class AddToParentActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    parentContainer: Phaser.GameObjects.Container | Phaser.GameObjects.Layer;
    execute(...args: any[]): void;
}

declare class AlertActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    message: string;
    execute(...args: any[]): void;
}

declare class AssignOpComp {
    constructor(gameObject: any);
    static getComponent(gameObject: any): AssignOpComp;
    private gameObject;
    operator: "=" | "+=" | "*=";
    static computeValue(node: ScriptNode, oldValue: number, newValue: number): number;
}

declare class CallbackActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    callback: (...args: any[]) => void;
    execute(...args: any[]): void;
}

declare class ConsoleLogActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    message: string;
    execute(...args: any[]): void;
}

declare class DestroyActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    execute(...args: any[]): void;
}

declare class EmitEventActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    eventName: string;
    eventEmitter: "game.events" | "scene.events" | "scene.loader" | "scene.input" | "scene.input.keyboard" | "scene.anims" | "gameObject";
    execute(...args: any[]): void;
}

declare class ExecActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    targetAction: ScriptNode;
    execute(...args: any[]): void;
}

declare class ExecChildrenActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    execute(...args: any[]): void;
}

declare class ExecRandomActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    execute(...args: any[]): void;
}

declare class FlipActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    horizontal: boolean;
    vertical: boolean;
    execute(...args: any[]): void;
}

declare class OnAwakeScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
}

declare class OnEventScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    eventName: string;
    eventEmitter: "game.events" | "scene.events" | "scene.loader" | "scene.input" | "scene.input.keyboard" | "scene.anims" | "scene.physics.world" | "gameObject";
    once: boolean;
    awake(): void;
}

declare class OnPointerDownScript extends OnEventScript {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    awake(): void;
}

declare class PlaySpriteAnimationActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    animationKey: string;
    ignoreIfPlaying: boolean;
    execute(...args: any[]): void;
}

declare class RootScript extends ScriptNode {
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

declare class SetAngleActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    angle: number;
    execute(...args: any[]): void;
}

declare class SetScaleXActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    scaleX: number;
    execute(...args: any[]): void;
}

declare class SetScaleYActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    scaleY: number;
    execute(...args: any[]): void;
}

declare class SetXActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    x: number;
    execute(...args: any[]): void;
}

declare class SetYActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    y: number;
    execute(...args: any[]): void;
}

declare class SpawnActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    objectPrefab: any;
    spawnInParentPosition: boolean;
    execute(...args: any[]): void;
}

declare class SpriteScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    get gameObject(): Phaser.GameObjects.Sprite;
}

declare class StartSceneActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    sceneKey: string;
    execute(...args: any[]): void;
}

declare class UserComponent {
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


