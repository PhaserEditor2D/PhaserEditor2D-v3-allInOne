
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class OpenURLOnClick {

	constructor(gameObject: Phaser.GameObjects.GameObject) {
		this.gameObject = gameObject;
		(gameObject as any)["__OpenURLOnClick"] = this;

		/* START-USER-CTR-CODE */

		this.gameObject.on("pointerup", () => {

			open(this.url);
		});

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.GameObject): OpenURLOnClick {
		return (gameObject as any)["__OpenURLOnClick"];
	}

	private gameObject: Phaser.GameObjects.GameObject;
	public url: string = "";

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
