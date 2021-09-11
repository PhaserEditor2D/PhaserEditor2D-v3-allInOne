
// You can write more code here

/* START OF COMPILED CODE */

class ScrollFactor extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Text) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__ScrollFactor"] = this;

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Text): ScrollFactor {
		return (gameObject as any)["__ScrollFactor"];
	}

	private gameObject: Phaser.GameObjects.Image|Phaser.GameObjects.Text;
	public x: number = 0;
	public y: number = 0;

	/* START-USER-CODE */

	start() {

		this.gameObject.setScrollFactor(this.x, this.y);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
