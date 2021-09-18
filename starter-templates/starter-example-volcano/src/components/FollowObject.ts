/// <reference path="./UserComponent.ts" />

/* START OF COMPILED CODE */

class FollowObject extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__FollowObject"] = this;

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): FollowObject {
		return (gameObject as any)["__FollowObject"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public target: Phaser.GameObjects.Container|Phaser.GameObjects.Image|undefined;

	/* START-USER-CODE */

	private offsetX = 0;
	private offsetY = 0;

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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
