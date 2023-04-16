/// <reference path="./OnEventScript.ts"/>

// You can write more code here

/* START OF COMPILED CODE */

class OnPointerDownScript extends OnEventScript {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		// this (prefab fields)
		this.eventName = "pointerdown";

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	override awake(): void {

		if (!this.gameObject) {

			return;
		}

		if (!this.gameObject.input) {

			this.gameObject.setInteractive();
		}

		super.awake();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
