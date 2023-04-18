
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "./ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class RootScriptNode extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public key: string = "scripts";

	/* START-USER-CODE */

	/**
	 * Gets the RootScript object set into the game object.
	 * It lookups the script node in using the `key` parameter as attribute of the game object.
	 * 
	 * @param gameObject The game object where the root script is set.
	 * @param key The key used to set root script into the game object. It is `"scripts"` by default.
	 * @returns The root script.
	 */
	static getRoot(gameObject: Phaser.GameObjects.GameObject, key = "scripts") {

		return (gameObject as any)[`RootScript__${key}`] as RootScriptNode;
	}

	/**
	 * Gets the children of the root script registered in the given game object, using the given key.
	 * 
	 * @param gameObject The game object containing the root script.
	 * @param key The key used to register the root script in the game object.
	 * @returns The chidlren of the root script.
	 */
	static getChildren(gameObject: Phaser.GameObjects.GameObject, key = "scripts") {

		const root = this.getRoot(gameObject, key);

		if (root) {

			return root.children;
		}

		return [];
	}

	/**
	 * Gets the root script associated to the game object, using the given key.
	 * 
	 * @param gameObject The game object where the root script is set.
	 * @param key The key used for registering the root script in the game object.
	 * @returns The root script.
	 */
	static hasRoot(gameObject: Phaser.GameObjects.GameObject, key = "scripts") {

		const script = this.getRoot(gameObject, key);

		return script !== undefined;
	}

	protected override awake(): void {

		(this.gameObject as any)[`RootScript__${this.key}`] = this;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
