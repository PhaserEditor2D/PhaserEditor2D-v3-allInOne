/// <reference path="../script-nodes-basic-ts/ScriptNode.ts"/>

// You can write more code here

/* START OF COMPILED CODE */

class PushActionScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */


	override execute(args?: any): void {

		this.scene.add.tween({
			targets: this.gameObject,
			scaleX: "*=0.8",
			scaleY: "*=0.8",
			duration: 80,
			yoyo: true,
			onYoyo: () => {

				this.executeChildren(args);
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
