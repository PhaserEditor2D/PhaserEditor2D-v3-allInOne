
// You can write more code here

/* START OF COMPILED CODE */

class OnEventScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/** @type {string} */
	eventName = "";

	/* START-USER-CODE */

	awake() {

		this.gameObject.on(this.eventName, this.executeChildren, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
