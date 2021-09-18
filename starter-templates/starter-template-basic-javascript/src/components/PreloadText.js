/* START OF COMPILED CODE */

class PreloadText extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__PreloadText"] = this;

		/* START-USER-CTR-CODE */

		this.scene.load.on(Phaser.Loader.Events.PROGRESS, p => {

			this.gameObject.text = Math.floor(p * 100) + "%";
		});

		/* END-USER-CTR-CODE */
	}

	/** @returns {PreloadText} */
	static getComponent(gameObject) {
		return gameObject["__PreloadText"];
	}

	/** @type {Phaser.GameObjects.Text} */
	gameObject;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
