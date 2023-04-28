/// <reference path="./ScriptNode.ts"/>

// You can write more code here

/* START OF COMPILED CODE */

class ExecActionScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public targetAction!: ScriptNode;

	/* START-USER-CODE */

	override execute(...args: any[]): void {

		if (this.targetAction) {

			this.targetAction.execute(...args);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
