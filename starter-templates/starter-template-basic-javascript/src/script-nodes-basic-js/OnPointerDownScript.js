
// You can write more code here

/* START OF COMPILED CODE */

class OnPointerDownScript extends OnEventScript {

	constructor(parent) {
		super(parent);

		// this (prefab fields)
		this.eventName = "pointerdown";

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	awake() {

		if (!this.gameObject) {

			return;
		}

		if (!this.gameObject.input) {

			this.gameObject.setInteractive();
		}

		super.awake();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
