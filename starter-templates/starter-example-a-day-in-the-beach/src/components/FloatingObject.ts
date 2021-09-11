
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";

export default class FloatingObject extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.BitmapText) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__FloatingObject"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.BitmapText): FloatingObject {
		return (gameObject as any)["__FloatingObject"];
	}

	private gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.BitmapText;
	public offset: number = 20;

	/* START-USER-CODE */

	start() {

		this.gameObject.scene.add.tween({
			targets: this.gameObject,
			props: {
				y: "-=" + this.offset,
			},
			yoyo: true,
			repeat: -1,
			duration: 1000,
			delay: Phaser.Math.Between(100, 500)
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
