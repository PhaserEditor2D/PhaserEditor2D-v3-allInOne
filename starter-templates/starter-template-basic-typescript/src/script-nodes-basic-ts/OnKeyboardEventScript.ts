/// <reference path="./ScriptNode.ts"/>

// You can write more code here

/* START OF COMPILED CODE */

class OnKeyboardEventScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public eventName: string = "";

	/* START-USER-CODE */

	protected override awake(): void {

		if (!this.eventName) {

			return;
		}

		this.scene.input.keyboard?.on(this.eventName, () => {

			this.executeChildren();
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
