"use strict";
window.addEventListener('load', function () {
    var game = new Phaser.Game({
        width: 1200,
        height: 750,
        type: Phaser.AUTO,
        backgroundColor: "#242424",
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        input: {
            activePointers: 3
        }
    });
    game.scene.add("Boot", Boot);
    game.scene.add("Preload", Preload);
    game.scene.add("Level", Level);
    game.scene.start("Boot");
});
class Boot extends Phaser.Scene {
    constructor() {
        super("Boot");
    }
    preload() {
        this.load.pack("preload-asset-pack", "assets/preload-asset-pack.json");
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
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
/// <reference path="./UserComponent.ts" />
/* START OF COMPILED CODE */
class FollowObject extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__FollowObject"] = this;
        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__FollowObject"];
    }
    gameObject;
    target;
    /* START-USER-CODE */
    offsetX = 0;
    offsetY = 0;
    start() {
        if (this.target) {
            this.offsetX = this.gameObject.x - this.target.x;
            this.offsetY = this.gameObject.y - this.target.y;
        }
    }
    update() {
        if (this.target) {
            this.gameObject.x = this.target.x + this.offsetX;
            this.gameObject.y = this.target.y + this.offsetY;
            if (this.gameObject.body && this.target.body) {
                this.gameObject.body.velocity.x = this.target.body.velocity.x;
                this.gameObject.body.velocity.y = this.target.body.velocity.y;
            }
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class HorizontalMove extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__HorizontalMove"] = this;
        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__HorizontalMove"];
    }
    gameObject;
    horizVelocity = 0;
    minX = 0;
    maxX = 3070;
    /* START-USER-CODE */
    start() {
        const body = this.gameObject.body;
        body.velocity.x = this.horizVelocity;
    }
    update() {
        const body = this.gameObject.body;
        if (this.gameObject.x < this.minX) {
            body.velocity.x = Math.abs(this.horizVelocity);
        }
        if (this.gameObject.x > this.maxX) {
            body.velocity.x = -Math.abs(this.horizVelocity);
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
///<reference path="./UserComponent.ts"/>
/* START OF COMPILED CODE */
class PlatformPhysics extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PlatformPhysics"] = this;
        /* START-USER-CTR-CODE */
        this.gameObject.scene.physics.add.existing(this.gameObject);
        const body = this.gameObject.body;
        body.velocity.set(0, 0);
        body.immovable = true;
        body.checkCollision.up = true;
        body.checkCollision.down = false;
        body.checkCollision.left = false;
        body.checkCollision.right = false;
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PlatformPhysics"];
    }
    gameObject;
    bodyY = 8;
    /* START-USER-CODE */
    update() {
        const body = this.gameObject.body;
        body.offset.y = this.bodyY;
        body.offset.set(0, this.bodyY);
        if (this.gameObject instanceof Phaser.GameObjects.Container) {
            const list = this.gameObject.list;
            let width = 0;
            for (const obj of list) {
                const sprite = obj;
                width += sprite.width;
            }
            body.setSize(width, 1);
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/* START OF COMPILED CODE */
class PlayerController extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PlayerController"] = this;
        /* START-USER-CTR-CODE */
        this.gameObject.setInteractive();
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PlayerController"];
    }
    gameObject;
    player;
    direction = "left";
    /* START-USER-CODE */
    update() {
        const input = this.gameObject.scene.input;
        if (!input.activePointer.isDown) {
            return;
        }
        const objects = input.hitTestPointer(input.activePointer);
        if (objects.indexOf(this.gameObject) >= 0) {
            this.player?.pressButton(this.direction);
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
/// <reference path="./UserComponent.ts"/>
/* START OF COMPILED CODE */
class PreloadText extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__PreloadText"] = this;
        /* START-USER-CTR-CODE */
        this.scene.load.on(Phaser.Loader.Events.PROGRESS, (p) => {
            this.gameObject.text = Math.floor(p * 100) + "%";
        });
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PreloadText"];
    }
    gameObject;
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class ScrollFactor extends UserComponent {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        gameObject["__ScrollFactor"] = this;
        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__ScrollFactor"];
    }
    gameObject;
    x = 0;
    y = 0;
    /* START-USER-CODE */
    start() {
        this.gameObject.setScrollFactor(this.x, this.y);
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class FoodItem extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 72, y ?? 70, texture || "volcano", frame ?? "Volcano Level Set_Collectable Object - Meat.png");
        /* START-USER-CTR-CODE */
        this.scene.physics.add.existing(this);
        this.idleTween = this.scene.tweens.add({
            targets: this,
            scaleX: 0.8,
            scaleY: 0.8,
            angle: "-= 30",
            yoyo: true,
            repeat: -1,
            duration: 1000 + Math.random() * 1000
        });
        /* END-USER-CTR-CODE */
    }
    /* START-USER-CODE */
    idleTween;
    getBody() {
        return this.body;
    }
    taken() {
        this.getBody().setEnable(false);
        this.idleTween.remove();
        this.scene.add.tween({
            targets: this,
            duration: 500,
            scaleX: 0.6,
            scaleY: 0.6,
            angle: 360,
            alpha: 0,
            y: "-=50",
            ease: Phaser.Math.Easing.Linear,
            onComplete: () => {
                this.destroy();
            },
            onCompleteScope: this
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Ladder extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 0, y ?? 0, texture || "volcano", frame ?? "Volcano Level Set_Platformer - Ladder.png");
        this.setOrigin(0, 0);
        // this (components)
        const thisPlatformPhysics = new PlatformPhysics(this);
        thisPlatformPhysics.bodyY = 80;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class MovingPlatform1 extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);
        // p2
        const p2 = scene.add.image(0, 0, "volcano", "Volcano Level Set_Platformer - Ground 10.png");
        p2.setOrigin(0, 0);
        this.add(p2);
        // p1
        const p1 = scene.add.image(128, 0, "volcano", "Volcano Level Set_Platformer - Ground 12.png");
        p1.setOrigin(0, 0);
        this.add(p1);
        // this (components)
        new PlatformPhysics(this);
        const thisHorizontalMove = new HorizontalMove(this);
        thisHorizontalMove.horizVelocity = 50;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class MovingPlatform2 extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);
        // p3
        const p3 = scene.add.image(0, 0, "volcano", "Volcano Level Set_Platformer - Wooden Bridge.png");
        p3.setOrigin(0, 0);
        this.add(p3);
        // p2
        const p2 = scene.add.image(128, 0, "volcano", "Volcano Level Set_Platformer - Wooden Bridge.png");
        p2.setOrigin(0, 0);
        this.add(p2);
        // p1
        const p1 = scene.add.image(256, 0, "volcano", "Volcano Level Set_Platformer - Wooden Bridge.png");
        p1.setOrigin(0, 0);
        this.add(p1);
        // this (components)
        new PlatformPhysics(this);
        const thisHorizontalMove = new HorizontalMove(this);
        thisHorizontalMove.horizVelocity = 100;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 136, y ?? 177, texture || "player", frame ?? "Idle_001");
        this.setOrigin(0.5045282703122486, 0.8054902070420497);
        /* START-USER-CTR-CODE */
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updatePlayer, this);
        /* END-USER-CTR-CODE */
    }
    platforms = [];
    foodItems = [];
    /* START-USER-CODE */
    leftDown = false;
    rightDown = false;
    upDown = false;
    leftKey;
    rightKey;
    upKey;
    spaceKey;
    jumpsCount = 0;
    lastWalkTime = 0;
    isFlying = false;
    stopSound;
    walkingSound;
    jumpSound;
    flySound;
    eatSound;
    start() {
        // physics
        const arcade = this.scene.physics;
        arcade.add.existing(this);
        const body = this.body;
        body.setSize(80, 145);
        body.setDrag(1, 0);
        body.gravity.set(0, 600);
        body.setBounce(0.2, 0.2);
        arcade.add.collider(this, this.platforms);
        arcade.add.overlap(this, this.foodItems, this.playerVsFood, undefined, this);
        // animation
        this.play("player-Idle");
        // controller
        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.jumpsCount = 0;
        this.lastWalkTime = 0;
        this.isFlying = true;
        // sound
        this.stopSound = this.scene.sound.add("fall-stop");
        this.walkingSound = this.scene.sound.add("walk");
        this.jumpSound = this.scene.sound.add("jump");
        this.flySound = this.scene.sound.add("fly");
        this.eatSound = this.scene.sound.add("eat");
    }
    playerVsFood(player, foodItem) {
        foodItem.taken();
        this.eatSound?.play();
    }
    isKeyDown(key) {
        if (key) {
            return key.isDown;
        }
        return false;
    }
    updatePlayer(time, delta) {
        this.leftDown = this.leftDown || this.isKeyDown(this.leftKey);
        this.rightDown = this.rightDown || this.isKeyDown(this.rightKey);
        this.upDown = this.upDown || this.isKeyDown(this.upKey) || this.isKeyDown(this.spaceKey);
        const body = this.body;
        const xVelocity = 200;
        const touchingDown = body.touching.down;
        if (this.isFlying && touchingDown) {
            if (this.stopSound && !this.stopSound.isPlaying) {
                this.stopSound.play();
            }
        }
        this.isFlying = !touchingDown;
        if (touchingDown) {
            this.jumpsCount = 0;
            if (time - this.lastWalkTime > 400) {
                body.velocity.x = 0;
            }
        }
        if (this.leftDown) {
            body.velocity.x = -xVelocity;
            if (touchingDown) {
                this.lastWalkTime = time;
                if (this.walkingSound && !this.walkingSound.isPlaying) {
                    this.walkingSound.play();
                }
            }
            this.flipX = true;
        }
        if (this.rightDown) {
            body.velocity.x = xVelocity;
            if (touchingDown) {
                this.lastWalkTime = time;
                if (this.walkingSound && !this.walkingSound.isPlaying) {
                    this.walkingSound.play();
                }
            }
            this.flipX = false;
        }
        if (this.upDown) {
            if (touchingDown || body.velocity.y > 0) {
                if (this.jumpsCount < 2) {
                    this.jumpsCount++;
                    body.velocity.y = -420;
                    this.jumpSound?.play();
                    if (!touchingDown) {
                        this.flySound?.play();
                    }
                    this.walkingSound?.stop();
                }
            }
        }
        if (body.touching.down) {
            if (body.velocity.x === 0) {
                this.play("player-Idle", true);
            }
            else {
                this.play("player-Running", true);
            }
        }
        else {
            const current = this.anims.currentAnim;
            if (current.key === "player-Jump Start") {
                if (!this.anims.isPlaying) {
                    this.play("player-Jump Loop", true);
                }
            }
            else {
                if (current.key !== "player-Jump Loop") {
                    this.play("player-Jump Start", true);
                }
            }
        }
        this.leftDown = this.rightDown = this.upDown = false;
        // check bounds
        const bounds = this.scene.cameras.main.getBounds();
        if (this.x < bounds.x) {
            this.x = 0;
        }
        if (this.x > bounds.x + bounds.width) {
            this.x = bounds.x + bounds.width;
        }
        if (this.y < bounds.y) {
            this.y = bounds.y;
        }
        if (this.y > bounds.y + bounds.height + 200) {
            this.scene.sound.play("dead");
            this.setPosition(130, 360);
        }
    }
    pressButton(direction) {
        switch (direction) {
            case "left":
                this.leftDown = true;
                break;
            case "right":
                this.rightDown = true;
                break;
            case "up":
                this.upDown = true;
                break;
        }
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class PlayerButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 81, y ?? 72, texture || "ui", frame ?? "btn-up");
        // this (components)
        new ScrollFactor(this);
        new PlayerController(this);
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Level extends Phaser.Scene {
    constructor() {
        super("Level");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    _create() {
        // backgroundLayer
        const backgroundLayer = this.add.layer();
        // background
        const background = this.add.image(0, 1, "Volcano Level Set_Background - Layer 00");
        background.scaleX = 1.1;
        background.scaleY = 1.1;
        background.setOrigin(0, 0);
        background.tintTopRight = 10494241;
        background.tintBottomLeft = 7220011;
        background.tintBottomRight = 2433506;
        backgroundLayer.add(background);
        // blava2
        const blava2 = this.add.image(1334, 0, "Volcano Level Set_Background - Layer 01");
        blava2.setOrigin(0, 0);
        backgroundLayer.add(blava2);
        // blava3
        const blava3 = this.add.image(2668, 0, "Volcano Level Set_Background - Layer 01");
        blava3.setOrigin(0, 0);
        backgroundLayer.add(blava3);
        // blava1
        const blava1 = this.add.image(0, -1, "Volcano Level Set_Background - Layer 01");
        blava1.setOrigin(0, 0);
        backgroundLayer.add(blava1);
        // platformBottomItemsLayer
        const platformBottomItemsLayer = this.add.layer();
        // signpost1
        const signpost1 = this.add.image(1536, -344, "volcano", "Volcano Level Set_Environment - Signpost 01.png");
        platformBottomItemsLayer.add(signpost1);
        // platformsLayer
        const platformsLayer = this.add.layer();
        // movingPlatform2
        const movingPlatform2 = new MovingPlatform1(this, 890, 256);
        platformsLayer.add(movingPlatform2);
        // movingPlatform1
        const movingPlatform1 = new MovingPlatform2(this, 311, 577);
        platformsLayer.add(movingPlatform1);
        // p4
        const p4 = this.add.image(128, 768, "volcano", "Volcano Level Set_Platformer - Ground Additional 01.png");
        platformsLayer.add(p4);
        // p3
        const p3 = this.add.image(256, 640, "volcano", "Volcano Level Set_Platformer - Ground 12.png");
        platformsLayer.add(p3);
        // p2
        const p2 = this.add.image(128, 640, "volcano", "Volcano Level Set_Platformer - Ground 11.png");
        platformsLayer.add(p2);
        // p1
        const p1 = this.add.image(0, 640, "volcano", "Volcano Level Set_Platformer - Ground 11.png");
        platformsLayer.add(p1);
        // movingPlatform3
        const movingPlatform3 = new MovingPlatform1(this, 1920, 0);
        platformsLayer.add(movingPlatform3);
        // container_2_1
        const container_2_1 = new MovingPlatform2(this, 1882, 590);
        platformsLayer.add(container_2_1);
        // p9
        const p9 = this.add.image(2880, 640, "volcano", "Volcano Level Set_Platformer - Ground Additional 02.png");
        p9.setOrigin(0, 0);
        platformsLayer.add(p9);
        // p8
        const p8 = this.add.image(2816, 640, "volcano", "Volcano Level Set_Platformer - Ground 10.png");
        platformsLayer.add(p8);
        // p7
        const p7 = this.add.image(2944, 640, "volcano", "Volcano Level Set_Platformer - Ground 11.png");
        platformsLayer.add(p7);
        // p6
        const p6 = this.add.image(3073, 640, "volcano", "Volcano Level Set_Platformer - Ground 11.png");
        platformsLayer.add(p6);
        // p5
        const p5 = this.add.image(3200, 640, "volcano", "Volcano Level Set_Platformer - Ground 11.png");
        platformsLayer.add(p5);
        // p12
        const p12 = this.add.image(1536, 384, "volcano", "Volcano Level Set_Platformer - Stone.png");
        platformsLayer.add(p12);
        // p11
        const p11 = this.add.image(1536, -256, "volcano", "Volcano Level Set_Platformer - Stone.png");
        platformsLayer.add(p11);
        // p10
        const p10 = this.add.image(1664, -256, "volcano", "Volcano Level Set_Platformer - Stone.png");
        platformsLayer.add(p10);
        // volcano_Level_Set_Environment___Crack_07_png
        const volcano_Level_Set_Environment___Crack_07_png = this.add.image(117, 866, "volcano", "Volcano Level Set_Environment - Crack 07.png");
        platformsLayer.add(volcano_Level_Set_Environment___Crack_07_png);
        // volcano_Level_Set_Environment___Crack_06_png
        const volcano_Level_Set_Environment___Crack_06_png = this.add.image(212, 664, "volcano", "Volcano Level Set_Environment - Crack 06.png");
        platformsLayer.add(volcano_Level_Set_Environment___Crack_06_png);
        // volcano_Level_Set_Environment___Crack_06_png_1
        const volcano_Level_Set_Environment___Crack_06_png_1 = this.add.image(3098, 903, "volcano", "Volcano Level Set_Environment - Crack 06.png");
        platformsLayer.add(volcano_Level_Set_Environment___Crack_06_png_1);
        // volcano_Level_Set_Environment___Crack_05_png
        const volcano_Level_Set_Environment___Crack_05_png = this.add.image(2999, 698, "volcano", "Volcano Level Set_Environment - Crack 05.png");
        platformsLayer.add(volcano_Level_Set_Environment___Crack_05_png);
        // volcano_Level_Set_Platformer___Brick_02_png_2_1
        const volcano_Level_Set_Platformer___Brick_02_png_2_1 = this.add.image(1792, -256, "volcano", "Volcano Level Set_Platformer - Stone.png");
        platformsLayer.add(volcano_Level_Set_Platformer___Brick_02_png_2_1);
        // platformTopItemsLayer
        const platformTopItemsLayer = this.add.layer();
        // endFlag
        const endFlag = this.add.image(2944, 526, "volcano", "Volcano Level Set_Environment - White Flag.png");
        platformTopItemsLayer.add(endFlag);
        // signpost
        const signpost = this.add.image(131, 519, "volcano", "Volcano Level Set_Environment - Signpost 01.png");
        platformTopItemsLayer.add(signpost);
        // skull1
        const skull1 = this.add.image(2093, -28, "volcano", "Volcano Level Set_Environment - Skull.png");
        platformTopItemsLayer.add(skull1);
        // lava2
        const lava2 = this.add.image(1059, 250, "volcano", "Volcano Level Set_Environment - Lava 03.png");
        platformTopItemsLayer.add(lava2);
        // lava1
        const lava1 = this.add.image(599, 576, "volcano", "Volcano Level Set_Environment - Lava 03.png");
        platformTopItemsLayer.add(lava1);
        // lava3
        const lava3 = this.add.image(233, 571, "volcano", "Volcano Level Set_Environment - Lava 02.png");
        platformTopItemsLayer.add(lava3);
        // laddersLayer
        const laddersLayer = this.add.layer();
        // ladder5
        const ladder5 = new Ladder(this, 1468, -150, "volcano", "Volcano Level Set_Platformer - Ladder.png");
        laddersLayer.add(ladder5);
        // ladder4
        const ladder4 = new Ladder(this, 1472, -272, "volcano", "Volcano Level Set_Platformer - Ladder.png");
        laddersLayer.add(ladder4);
        // ladder3
        const ladder3 = new Ladder(this, 1475, -22, "volcano", "Volcano Level Set_Platformer - Ladder.png");
        laddersLayer.add(ladder3);
        // ladder2
        const ladder2 = new Ladder(this, 1467, 106, "volcano", "Volcano Level Set_Platformer - Ladder.png");
        laddersLayer.add(ladder2);
        // ladder1
        const ladder1 = new Ladder(this, 1475, 208);
        laddersLayer.add(ladder1);
        // ladder6
        const ladder6 = new Ladder(this, 952, 321);
        laddersLayer.add(ladder6);
        // playerLayer
        const playerLayer = this.add.layer();
        // player
        const player = new Player(this, 94, 395);
        playerLayer.add(player);
        // pickItemsLayer
        const pickItemsLayer = this.add.layer();
        // meet3
        const meet3 = new FoodItem(this, 1232, 33, "volcano", "Volcano Level Set_Collectable Object - Meat.png");
        pickItemsLayer.add(meet3);
        // meet2
        const meet2 = new FoodItem(this, 2250, 278, "volcano", "Volcano Level Set_Collectable Object - Meat.png");
        pickItemsLayer.add(meet2);
        // banana
        const banana = new FoodItem(this, 480, 680, "volcano", "Tiny Caveman_Game Object - Banana.png");
        pickItemsLayer.add(banana);
        // apple
        const apple = new FoodItem(this, 600, 160, "volcano", "Tiny Caveman_Game Object - Apple.png");
        pickItemsLayer.add(apple);
        // cherry
        const cherry = new FoodItem(this, 1200, 680, "volcano", "Tiny Caveman_Game Object - Cherry.png");
        pickItemsLayer.add(cherry);
        // apple2
        const apple2 = new FoodItem(this, 2480, 680, "volcano", "Tiny Caveman_Game Object - Apple.png");
        pickItemsLayer.add(apple2);
        // banana1
        const banana1 = new FoodItem(this, 1760, 680, "volcano", "Tiny Caveman_Game Object - Banana.png");
        pickItemsLayer.add(banana1);
        // meet1
        const meet1 = new FoodItem(this, 747, 386);
        pickItemsLayer.add(meet1);
        // controlsLayer
        const controlsLayer = this.add.layer();
        // btn_left
        const btn_left = new PlayerButton(this, 880, 640, "ui", "btn-left");
        controlsLayer.add(btn_left);
        // btn_right
        const btn_right = new PlayerButton(this, 1080, 640, "ui", "btn-right");
        controlsLayer.add(btn_right);
        // btn_up
        const btn_up = new PlayerButton(this, 126, 640);
        controlsLayer.add(btn_up);
        // debugLayer
        const debugLayer = this.add.layer();
        // debugText
        const debugText = this.add.text(224, -106, "", {});
        debugText.text = "Debug text.";
        debugText.setStyle({ "fontSize": "42px" });
        debugLayer.add(debugText);
        // lists
        const platforms = [p1, p2, movingPlatform1, movingPlatform2, movingPlatform3, container_2_1, p8, p6, p5, p9, p7, p12, volcano_Level_Set_Platformer___Brick_02_png_2_1, p10, p11, p3, ladder1, ladder2, ladder3, ladder5, ladder4, ladder6];
        const foodItems = [meet1, banana1, apple2, cherry, banana, meet3, meet2, apple];
        // background (components)
        const backgroundScrollFactor = new ScrollFactor(background);
        backgroundScrollFactor.x = 0.1;
        // blava2 (components)
        const blava2ScrollFactor = new ScrollFactor(blava2);
        blava2ScrollFactor.x = 1.2;
        blava2ScrollFactor.y = 1;
        // blava3 (components)
        const blava3ScrollFactor = new ScrollFactor(blava3);
        blava3ScrollFactor.x = 1.2;
        blava3ScrollFactor.y = 1;
        // blava1 (components)
        const blava1ScrollFactor = new ScrollFactor(blava1);
        blava1ScrollFactor.x = 1.2;
        blava1ScrollFactor.y = 1;
        // movingPlatform2 (components)
        const movingPlatform2HorizontalMove = HorizontalMove.getComponent(movingPlatform2);
        movingPlatform2HorizontalMove.horizVelocity = -50;
        movingPlatform2HorizontalMove.minX = 540;
        movingPlatform2HorizontalMove.maxX = 1170;
        // movingPlatform1 (components)
        const movingPlatform1HorizontalMove = HorizontalMove.getComponent(movingPlatform1);
        movingPlatform1HorizontalMove.minX = 310;
        movingPlatform1HorizontalMove.maxX = 924;
        // p3 (components)
        new PlatformPhysics(p3);
        // p2 (components)
        new PlatformPhysics(p2);
        // p1 (components)
        new PlatformPhysics(p1);
        // movingPlatform3 (components)
        const movingPlatform3HorizontalMove = HorizontalMove.getComponent(movingPlatform3);
        movingPlatform3HorizontalMove.horizVelocity = -50;
        movingPlatform3HorizontalMove.minX = 1900;
        movingPlatform3HorizontalMove.maxX = 2224;
        // container_2_1 (components)
        const container_2_1HorizontalMove = HorizontalMove.getComponent(container_2_1);
        container_2_1HorizontalMove.minX = 1720;
        container_2_1HorizontalMove.maxX = 2360;
        // p8 (components)
        new PlatformPhysics(p8);
        // p7 (components)
        new PlatformPhysics(p7);
        // p6 (components)
        new PlatformPhysics(p6);
        // p5 (components)
        new PlatformPhysics(p5);
        // p12 (components)
        new PlatformPhysics(p12);
        // p11 (components)
        new PlatformPhysics(p11);
        // p10 (components)
        new PlatformPhysics(p10);
        // volcano_Level_Set_Platformer___Brick_02_png_2_1 (components)
        new PlatformPhysics(volcano_Level_Set_Platformer___Brick_02_png_2_1);
        // skull1 (components)
        const skull1FollowObject = new FollowObject(skull1);
        skull1FollowObject.target = movingPlatform3;
        // lava2 (components)
        const lava2FollowObject = new FollowObject(lava2);
        lava2FollowObject.target = movingPlatform2;
        // lava1 (components)
        const lava1FollowObject = new FollowObject(lava1);
        lava1FollowObject.target = movingPlatform1;
        // ladder6 (components)
        const ladder6FollowObject = new FollowObject(ladder6);
        ladder6FollowObject.target = movingPlatform2;
        // player (prefab fields)
        player.platforms = platforms;
        player.foodItems = foodItems;
        // btn_left (components)
        const btn_leftPlayerController = PlayerController.getComponent(btn_left);
        btn_leftPlayerController.player = player;
        // btn_right (components)
        const btn_rightPlayerController = PlayerController.getComponent(btn_right);
        btn_rightPlayerController.player = player;
        btn_rightPlayerController.direction = "right";
        // btn_up (components)
        const btn_upPlayerController = PlayerController.getComponent(btn_up);
        btn_upPlayerController.player = player;
        btn_upPlayerController.direction = "up";
        // debugText (components)
        new ScrollFactor(debugText);
        this.background = background;
        this.blava2 = blava2;
        this.blava3 = blava3;
        this.blava1 = blava1;
        this.movingPlatform2 = movingPlatform2;
        this.movingPlatform1 = movingPlatform1;
        this.movingPlatform3 = movingPlatform3;
        this.playerLayer = playerLayer;
        this.player = player;
        this.debugText = debugText;
        this.platforms = platforms;
        this.foodItems = foodItems;
        this.events.emit("scene-awake");
    }
    background;
    blava2;
    blava3;
    blava1;
    movingPlatform2;
    movingPlatform1;
    movingPlatform3;
    playerLayer;
    player;
    debugText;
    platforms;
    foodItems;
    /* START-USER-CODE */
    create() {
        this._create();
        if (this.player) {
            this.cameras.main.setBounds(0, -800, 3000, 750 + 800);
            this.cameras.main.startFollow(this.player);
        }
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
    editorPreload() {
        this.load.pack("asset-pack", "assets/asset-pack.json");
    }
    editorCreate() {
        // guapen
        const guapen = this.add.image(600, 317, "guapen");
        guapen.scaleX = 0.5915891440784282;
        guapen.scaleY = 0.5915891440784282;
        // progress
        const progress = this.add.text(600, 447, "", {});
        progress.setOrigin(0.5, 0.5);
        progress.text = "0%";
        progress.setStyle({ "fontSize": "30px" });
        // progress (components)
        new PreloadText(progress);
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here
    preload() {
        this.editorCreate();
        this.editorPreload();
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
    }
}
/* END OF COMPILED CODE */
// You can write more code here
