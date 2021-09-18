///<reference path="./UserComponent.ts"/>

/* START OF COMPILED CODE */

class PlatformPhysics extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__PlatformPhysics"] = this;

		/* START-USER-CTR-CODE */

		this.gameObject.scene.physics.add.existing(this.gameObject);

		const body = this.gameObject.body as Phaser.Physics.Arcade.Body;
		body.velocity.set(0, 0);
		body.immovable = true;

		body.checkCollision.up = true;
		body.checkCollision.down = false;
		body.checkCollision.left = false;
		body.checkCollision.right = false;

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Container): PlatformPhysics {
		return (gameObject as any)["__PlatformPhysics"];
	}

	private gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Container;
	public bodyY: number = 8;

	/* START-USER-CODE */

	update() {

		const body = this.gameObject.body as Phaser.Physics.Arcade.Body;

		body.offset.y = this.bodyY;

		body.offset.set(0, this.bodyY);

		if (this.gameObject instanceof Phaser.GameObjects.Container) {

			const list = this.gameObject.list;

			let width = 0;

			for (const obj of list) {

				const sprite = obj as Phaser.GameObjects.Image;

				width += sprite.width;
			}

			body.setSize(width, 1);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
