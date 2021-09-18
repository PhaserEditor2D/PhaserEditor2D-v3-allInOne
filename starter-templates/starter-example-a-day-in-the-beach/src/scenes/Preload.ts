import preloadPackUrl from "../../static/assets/asset-pack.json";

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// guapen
		const guapen = this.add.image(960, 442, "guapen");
		guapen.scaleX = 0.5915891440784282;
		guapen.scaleY = 0.5915891440784282;

		// progress
		const progress = this.add.text(960, 572, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({"fontSize":"30px"});

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.load.pack("asset-pack", preloadPackUrl);

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Welcome"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
