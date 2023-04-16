
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PreloadBarUpdaterScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	override get gameObject() {
		
		return super.gameObject as Phaser.GameObjects.Rectangle;
	}

	protected override awake(): void {
		
		const fullWidth = this.gameObject.width;

		this.scene.load.on(Phaser.Loader.Events.PROGRESS, (p:number) => {

			this.gameObject.width = fullWidth * p;
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
