/// <reference path="./ScriptNode.ts"/>

// You can write more code here

/* START OF COMPILED CODE */

class StartSceneActionScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public sceneKey: string = "";

	/* START-USER-CODE */

	override execute(...args: any[]): void {

		this.scene.scene.start(this.sceneKey, ...args);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
