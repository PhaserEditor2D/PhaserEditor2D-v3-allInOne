
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 136, y ?? 177, texture || "player", frame ?? "Idle_001");

		this.setOrigin(0.5045282703122486, 0.8054902070420497);

		/* START-USER-CTR-CODE */

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updatePlayer, this);

		/* END-USER-CTR-CODE */
	}

	public platforms: Phaser.GameObjects.GameObject[] = [];
	public foodItems: FoodItem[] = [];

	/* START-USER-CODE */

	private leftDown = false;
	private rightDown = false;
	private upDown = false;
	private leftKey: Phaser.Input.Keyboard.Key | undefined;
	private rightKey: Phaser.Input.Keyboard.Key | undefined;
	private upKey: Phaser.Input.Keyboard.Key | undefined;
	private spaceKey: Phaser.Input.Keyboard.Key | undefined;
	private jumpsCount = 0;
	private lastWalkTime = 0;
	private isFlying = false;
	private stopSound: Phaser.Sound.BaseSound | undefined;
	private walkingSound: Phaser.Sound.BaseSound | undefined;
	private jumpSound: Phaser.Sound.BaseSound | undefined;
	private flySound: Phaser.Sound.BaseSound | undefined;
	private eatSound: Phaser.Sound.BaseSound | undefined;


	start() {

		// physics

		const arcade = this.scene.physics as Phaser.Physics.Arcade.ArcadePhysics;

		arcade.add.existing(this);

		const body = this.body as Phaser.Physics.Arcade.Body;

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

	private playerVsFood(player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
		foodItem: Phaser.Types.Physics.Arcade.GameObjectWithBody) {

		(foodItem as FoodItem).taken();

		this.eatSound?.play();
	}

	private isKeyDown(key?: Phaser.Input.Keyboard.Key) {

		if (key) {

			return key.isDown;
		}

		return false;
	}

	updatePlayer(time: number, delta: number) {

		this.leftDown = this.leftDown || this.isKeyDown(this.leftKey);
		this.rightDown = this.rightDown || this.isKeyDown(this.rightKey);
		this.upDown = this.upDown || this.isKeyDown(this.upKey) || this.isKeyDown(this.spaceKey);

		const body = this.body as Phaser.Physics.Arcade.Body;

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

			} else {

				this.play("player-Running", true);
			}
		} else {

			const current = this.anims.currentAnim;

			if (current.key === "player-Jump Start") {

				if (!this.anims.isPlaying) {

					this.play("player-Jump Loop", true);
				}
			} else {

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

	pressButton(direction: "left" | "right" | "up") {

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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
