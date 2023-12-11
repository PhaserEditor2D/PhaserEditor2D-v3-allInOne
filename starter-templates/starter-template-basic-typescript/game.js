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
        // onAwakeScript
        const onAwakeScript = new OnAwakeScript(dino);
        // moveInSceneActionScript
        const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);
        // text_1
        const text_1 = this.add.text(640, 462, "", {});
        text_1.setOrigin(0.5, 0);
        text_1.text = "Phaser 3 + Phaser Editor 2D + TypeScript";
        text_1.setStyle({ "fontFamily": "arial", "fontSize": "3em" });
        // onAwakeScript_1
        const onAwakeScript_1 = new OnAwakeScript(text_1);
        // fadeActionScript
        const fadeActionScript = new FadeActionScript(onAwakeScript_1);
        // moveInSceneActionScript (prefab fields)
        moveInSceneActionScript.from = "TOP";
        // moveInSceneActionScript (components)
        const moveInSceneActionScriptDurationConfigComp = new DurationConfigComp(moveInSceneActionScript);
        moveInSceneActionScriptDurationConfigComp.duration = 1000;
        // fadeActionScript (prefab fields)
        fadeActionScript.fadeDirection = "FadeIn";
        // fadeActionScript (components)
        const fadeActionScriptDurationConfigComp = new DurationConfigComp(fadeActionScript);
        fadeActionScriptDurationConfigComp.duration = 1000;
        const fadeActionScriptDelayConfigComp = new DelayConfigComp(fadeActionScript);
        fadeActionScriptDelayConfigComp.delay = 500;
        const fadeActionScriptEaseConfigComp = new EaseConfigComp(fadeActionScript);
        fadeActionScriptEaseConfigComp.ease = "Expo";
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
