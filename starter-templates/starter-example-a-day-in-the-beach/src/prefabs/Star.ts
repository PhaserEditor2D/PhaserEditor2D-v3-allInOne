import { GameSounds } from "../GameSounds";

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Level from "~/scenes/Level";

export default class Star extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 279, y ?? 94, texture || "star-orange", frame);

		/* START-USER-CTR-CODE */

		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updatePrefab, this);

		this.verticalSpeed = Phaser.Math.Between(2, 5);
		this.angleSpeed = this.verticalSpeed * (Math.random() < 0.5 ? -1 : 1);

		this.setTexture(["star-orange", "star-green", "star-yellow"][Phaser.Math.Between(0, 2)]);

		this.setInteractive();

		this.on("pointerdown", this.hitted, this);

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private verticalSpeed: number;
	private angleSpeed: number;
	private taken = false;


	updatePrefab() {

		if (this.taken) {

			return;
		}

		const level = this.scene as Level;

		if (level.paused) {

			return;
		}

		this.y -= this.verticalSpeed;
		this.angle += this.angleSpeed;

		if (this.y < -200) {

			this.destroy();
		}
	}

	hitted() {

		const scene = this.scene as Level;

		if (scene.paused || this.taken) {

			return;
		}

		GameSounds.playBubble();

		this.taken = true;

		scene.add.tween({
			targets: this,
			props: {
				scaleX: 1.5,
				scaleY: 1.5,
				alpha: 0
			},
			duration: 250,
			onComplete: this.destroy,
			onCompleteScope: this
		});
	}

	destroy() {

		if (this.scene) {

			this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.updatePrefab, this);
		}

		super.destroy();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
