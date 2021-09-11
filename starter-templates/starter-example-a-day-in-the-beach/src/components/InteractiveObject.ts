
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class InteractiveObject {

	constructor(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Text) {
		this.gameObject = gameObject;
		(gameObject as any)["__InteractiveObject"] = this;

		/* START-USER-CTR-CODE */

		this.gameObject.setInteractive();

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Text): InteractiveObject {
		return (gameObject as any)["__InteractiveObject"];
	}

	private gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
