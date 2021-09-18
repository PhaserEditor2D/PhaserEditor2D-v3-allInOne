
// You can write more code here

/* START OF COMPILED CODE */

class HorizontalMove extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__HorizontalMove"] = this;

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Container): HorizontalMove {
		return (gameObject as any)["__HorizontalMove"];
	}

	private gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Sprite|Phaser.GameObjects.Container;
	public horizVelocity: number = 0;
	public minX: number = 0;
	public maxX: number = 3070;

	/* START-USER-CODE */

	start() {

		const body = this.gameObject.body;

		body.velocity.x = this.horizVelocity;
	}

	update() {

		const body = this.gameObject.body as Phaser.Physics.Arcade.Body;

		if (this.gameObject.x < this.minX) {

			body.velocity.x = Math.abs(this.horizVelocity);
		}

		if (this.gameObject.x > this.maxX) {

			body.velocity.x = -Math.abs(this.horizVelocity);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
