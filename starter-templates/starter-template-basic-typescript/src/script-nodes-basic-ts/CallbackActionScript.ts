/// <reference path="./ScriptNode.ts"/>

/* START OF COMPILED CODE */

class CallbackActionScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public callback!: (...args: any[]) => void;

	/* START-USER-CODE */

	execute(...args: any[]) {

		if (this.callback) {

			this.callback(...args);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
