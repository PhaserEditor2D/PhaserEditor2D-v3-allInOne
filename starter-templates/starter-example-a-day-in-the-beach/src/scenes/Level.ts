import Star from "../prefabs/Star";


/* START OF COMPILED CODE */

import Phaser from "phaser";
import InteractiveObject from "../components/InteractiveObject";
import StartSceneOnClick from "../components/StartSceneOnClick";
import PushOnClick from "../components/PushOnClick";
import FloatingObject from "../components/FloatingObject";
import Checkbox from "../components/Checkbox";
import ClickHandler from "../components/ClickHandler";

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// underwater_1
		const underwater_1 = this.add.image(0, 0, "underwater-1");
		underwater_1.setOrigin(0, 0);

		// underwater_2
		const underwater_2 = this.add.image(0, 0, "underwater-2");
		underwater_2.setOrigin(0, 0);

		// underwater_3
		const underwater_3 = this.add.image(0, 0, "underwater-3");
		underwater_3.setOrigin(0, 0);

		// underwater_5
		const underwater_5 = this.add.image(0, 0, "underwater-5");
		underwater_5.setOrigin(0, 0);

		// underwater_7
		const underwater_7 = this.add.image(0, 0, "underwater-7");
		underwater_7.setOrigin(0, 0);

		// underwater_8
		const underwater_8 = this.add.image(0, 0, "underwater-8");
		underwater_8.setOrigin(0, 0);

		// underwater_4
		const underwater_4 = this.add.image(0, 0, "underwater-4");
		underwater_4.setOrigin(0, 0);
		underwater_4.alphaBottomLeft = 0;
		underwater_4.alphaBottomRight = 0;

		// homeButton
		const homeButton = this.add.image(1782, 116, "buttons", "Button Pack - Green_Button Green - Home.png");

		// pauseBtn
		const pauseBtn = this.add.image(1596, 118, "buttons", "Button Pack - Green_Button Green - Pause.png");

		// homeButton (components)
		new InteractiveObject(homeButton);
		const homeButtonStartSceneOnClick = new StartSceneOnClick(homeButton);
		homeButtonStartSceneOnClick.sceneKey = "Welcome";
		new PushOnClick(homeButton);
		const homeButtonFloatingObject = new FloatingObject(homeButton);
		homeButtonFloatingObject.offset = 5;

		// pauseBtn (components)
		new InteractiveObject(pauseBtn);
		new PushOnClick(pauseBtn);
		const pauseBtnCheckbox = new Checkbox(pauseBtn);
		pauseBtnCheckbox.checked = false;
		pauseBtnCheckbox.checkedTexture = { "key": "buttons", "frame": "Button Pack - Green_Button Green - Play.png" };
		pauseBtnCheckbox.unckeckedTexture = { "key": "buttons", "frame": "Button Pack - Green_Button Green - Pause.png" };
		const pauseBtnFloatingObject = new FloatingObject(pauseBtn);
		pauseBtnFloatingObject.offset = 5;
		const pauseBtnClickHandler = new ClickHandler(pauseBtn);
		pauseBtnClickHandler.callback = () => this.onPauseClicked();

		this.pauseBtn = pauseBtn;

		this.events.emit("scene-awake");
	}

	private pauseBtn: Phaser.GameObjects.Image | undefined;

	/* START-USER-CODE */

	public paused = false;

	create() {

		this.editorCreate();

		this.paused = false;

		this.spawnItem();
	}

	spawnItem() {

		if (!this.paused) {

			const star = new Star(this, Phaser.Math.Between(200, 1700), 1200);
			this.add.existing(star);
		}

		this.time.addEvent({
			delay: Phaser.Math.Between(100, 2000),
			callback: this.spawnItem,
			callbackScope: this
		});
	}

	onPauseClicked() {

		if (this.pauseBtn) {

			const checkbox = Checkbox.getComponent(this.pauseBtn);
			this.paused = checkbox.checked;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
