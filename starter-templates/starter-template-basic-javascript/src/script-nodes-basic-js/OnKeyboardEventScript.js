
// You can write more code here

/* START OF COMPILED CODE */

class OnKeyboardEventScript extends ScriptNode {

	constructor(parent) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {string} */
	eventName = "";

	/* START-USER-CODE */

	awake() {

		if (!this.eventName) {

			return;
		}

		this.scene.input.keyboard.on(this.eventName, () => {

			this.executeChildren();
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
