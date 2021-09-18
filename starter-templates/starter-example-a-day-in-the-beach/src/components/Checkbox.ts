
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";

export default class Checkbox extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__Checkbox"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): Checkbox {
		return (gameObject as any)["__Checkbox"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public checked: boolean = true;
	public checkedTexture: {key:string,frame?:string|number} = undefined as any;
	public unckeckedTexture: {key:string,frame?:string|number} = undefined as any;

	/* START-USER-CODE */

	start() {

		this.gameObject.on("pointerdown", () => {

			this.checked = !this.checked;

			this.updateTexture();
		});

		this.updateTexture();
	}

	updateTexture() {

		const textureConfig = this.checked ? this.checkedTexture : this.unckeckedTexture;

		this.gameObject.setTexture(textureConfig.key, textureConfig.frame);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
