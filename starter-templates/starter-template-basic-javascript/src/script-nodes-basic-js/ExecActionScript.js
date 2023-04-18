
// You can write more code here

/* START OF COMPILED CODE */

class ExecActionScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {ScriptNode} */
	targetAction;

	/* START-USER-CODE */

	execute() {

		if (this.targetAction) {

			this.targetAction.execute();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
