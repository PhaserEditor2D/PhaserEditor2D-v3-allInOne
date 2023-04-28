
// You can write more code here

/* START OF COMPILED CODE */

class CallbackActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {(...args: any[]) => void} */
	callback;

	/* START-USER-CODE */

	execute(...args) {

		if (this.callback) {

			this.callback(...args);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
