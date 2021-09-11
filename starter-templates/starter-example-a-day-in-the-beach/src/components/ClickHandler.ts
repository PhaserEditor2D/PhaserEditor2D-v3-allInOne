
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class ClickHandler {

	constructor(gameObject: Phaser.GameObjects.Image) {
		this.gameObject = gameObject;
		(gameObject as any)["__ClickHandler"] = this;

		/* START-USER-CTR-CODE */

		this.gameObject.on("pointerup", () => {

			this.callback();
		});

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): ClickHandler {
		return (gameObject as any)["__ClickHandler"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public callback: ()=>void = () => {};

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
