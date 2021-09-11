
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";

export default class PushOnClick extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__PushOnClick"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): PushOnClick {
		return (gameObject as any)["__PushOnClick"];
	}

	private gameObject: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	private initialScale = 1;

	start() {

		this.initialScale = this.gameObject.scaleX;

		this.gameObject.on("pointerdown", () => {

			this.gameObject.setScale(0.9 * this.initialScale);
		});

		this.gameObject.on("pointerup", () => {

			this.gameObject.setScale(this.initialScale);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
