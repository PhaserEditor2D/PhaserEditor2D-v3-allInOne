declare class DelayConfigComp {
    constructor(gameObject: any);
    static getComponent(gameObject: any): DelayConfigComp;
    private gameObject;
    delay: number;
    static getDelay(obj: any, defaultValue: number): number;
}

declare class DurationConfigComp {
    constructor(gameObject: any);
    static getComponent(gameObject: any): DurationConfigComp;
    private gameObject;
    duration: number;
    static getDuration(obj: any, defaultValue: number): number;
}

declare class EaseConfigComp {
    constructor(gameObject: any);
    static getComponent(gameObject: any): EaseConfigComp;
    private gameObject;
    ease: "Power0" | "Power1" | "Power2" | "Power3" | "Power4" | "Linear" | "Quad" | "Cubic" | "Quart" | "Quint" | "Sine" | "Expo" | "Circ" | "Elastic" | "Back" | "Bounce" | "Stepped" | "Quad.easeIn" | "Cubic.easeIn" | "Quart.easeIn" | "Quint.easeIn" | "Sine.easeIn" | "Expo.easeIn" | "Circ.easeIn" | "Elastic.easeIn" | "Back.easeIn" | "Bounce.easeIn" | "Quad.easeOut" | "Cubic.easeOut" | "Quart.easeOut" | "Quint.easeOut" | "Sine.easeOut" | "Expo.easeOut" | "Circ.easeOut" | "Elastic.easeOut" | "Back.easeOut" | "Bounce.easeOut" | "Quad.easeInOut" | "Cubic.easeInOut" | "Quart.easeInOut" | "Quint.easeInOut" | "Sine.easeInOut" | "Expo.easeInOut" | "Circ.easeInOut" | "Elastic.easeInOut" | "Back.easeInOut" | "Bounce.easeInOut";
    static getEase(obj: any, defaultValue: string): string;
}

declare class FadeActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    fadeDirection: "FadeIn" | "FadeOut";
    execute(...args: any[]): void;
}

declare class MoveInSceneActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    from: "LEFT" | "RIGHT" | "TOP" | "BOTTOM" | "NONE";
    execute(...args: any[]): void;
}

declare class MoveOutSceneActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    to: "LEFT" | "RIGHT" | "TOP" | "BOTTOM" | "NONE";
    execute(...args: any[]): void;
}

declare class PushActionScript extends ScriptNode {
    constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene);
    private _executing;
    execute(args?: any): void;
}


