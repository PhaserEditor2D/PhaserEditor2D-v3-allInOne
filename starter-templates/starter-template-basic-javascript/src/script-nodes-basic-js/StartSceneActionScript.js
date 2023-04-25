
// You can write more code here

/* START OF COMPILED CODE */

class StartSceneActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {string} */
	sceneKey = "";

	/* START-USER-CODE */

	execute(...args) {

		this.scene.scene.start(this.sceneKey, ...args);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
