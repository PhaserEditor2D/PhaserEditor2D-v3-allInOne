
// You can write more code here

/* START OF COMPILED CODE */

class PreloadBarUpdaterScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */


	 awake() {

		const fullWidth = this.gameObject.width;

		this.scene.load.on(Phaser.Loader.Events.PROGRESS, p => {

			this.gameObject.width = fullWidth * p;
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
