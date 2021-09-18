
/* START OF COMPILED CODE */

class PlayerController extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__PlayerController"] = this;

		/* START-USER-CTR-CODE */

		this.gameObject.setInteractive();

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): PlayerController {
		return (gameObject as any)["__PlayerController"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public player: Player|undefined;
	public direction: "left"|"right"|"up" = "left";

	/* START-USER-CODE */

	update() {

		const input = this.gameObject.scene.input;

		if (!input.activePointer.isDown) {
			return;
		}

		const objects = input.hitTestPointer(input.activePointer);

		if (objects.indexOf(this.gameObject) >= 0) {

			this.player?.pressButton(this.direction);
		}		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
