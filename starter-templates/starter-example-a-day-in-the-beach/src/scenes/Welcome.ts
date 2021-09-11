import { GameSounds } from "../GameSounds";

/* START OF COMPILED CODE */

import Phaser from "phaser";
import InteractiveObject from "../components/InteractiveObject";
import StartSceneOnClick from "../components/StartSceneOnClick";
import PushOnClick from "../components/PushOnClick";
import OpenURLOnClick from "../components/OpenURLOnClick";
import Checkbox from "../components/Checkbox";
import ClickHandler from "../components/ClickHandler";
import FloatingObject from "../components/FloatingObject";

export default class Welcome extends Phaser.Scene {

	constructor() {
		super("Welcome");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// sky
		const sky = this.add.image(0, 0, "sky");
		sky.setOrigin(0, 0);

		// sea
		const sea = this.add.image(0, 0, "sea");
		sea.setOrigin(0, 0);

		// land
		const land = this.add.image(0, 0, "land");
		land.setOrigin(0, 0);

		// cloud
		const cloud = this.add.image(0, 0, "cloud");
		cloud.setOrigin(0, 0);

		// island
		const island = this.add.image(0, 0, "island");
		island.setOrigin(0, 0);

		// decor
		const decor = this.add.image(0, 0, "decor");
		decor.setOrigin(0, 0);

		// playBtn
		const playBtn = this.add.image(960, 840, "buttons", "Button Pack - Green_Button Green - Play.png");
		playBtn.scaleX = 2;
		playBtn.scaleY = 2;

		// facebookBtn
		const facebookBtn = this.add.image(160, 920, "buttons", "Button Pack - Green_Button Green - Facebook.png");

		// twitterBtn
		const twitterBtn = this.add.image(360, 920, "buttons", "Button Pack - Green_Button Green - Twitter.png");

		// musicBtn
		const musicBtn = this.add.image(1560, 920, "buttons", "Button Pack - Green_Button Green - Music.png");

		// soundBtn
		const soundBtn = this.add.image(1760, 920, "buttons", "Button Pack - Green_Button Green - Sound.png");

		// linkToPhaserEditor
		const linkToPhaserEditor = this.add.text(40, 40, "", {});
		linkToPhaserEditor.text = "Visit Phaser Editor 2D";
		linkToPhaserEditor.setStyle({ "backgroundColor": "#c4fe8aff", "color": "#6e5012ff", "fontSize": "18px", "fontStyle": "bold" });
		linkToPhaserEditor.setPadding({ "left": 5, "top": 5, "right": 5, "bottom": 5 });

		// bitmaptext
		const bitmaptext = this.add.bitmapText(960, 120, "hyperdrive", "a day in\nthe beach");
		bitmaptext.setOrigin(0.5, 0);
		bitmaptext.text = "a day in\nthe beach";
		bitmaptext.fontSize = 150;
		bitmaptext.align = 1;

		// playBtn (components)
		new InteractiveObject(playBtn);
		const playBtnStartSceneOnClick = new StartSceneOnClick(playBtn);
		playBtnStartSceneOnClick.sceneKey = "Level";
		new PushOnClick(playBtn);

		// facebookBtn (components)
		new InteractiveObject(facebookBtn);
		const facebookBtnOpenURLOnClick = new OpenURLOnClick(facebookBtn);
		facebookBtnOpenURLOnClick.url = "https://facebook.com/PhaserEditor2D";
		new PushOnClick(facebookBtn);

		// twitterBtn (components)
		new InteractiveObject(twitterBtn);
		const twitterBtnOpenURLOnClick = new OpenURLOnClick(twitterBtn);
		twitterBtnOpenURLOnClick.url = "https://twitter.com/PhaserEditor2D";
		new PushOnClick(twitterBtn);

		// musicBtn (components)
		new InteractiveObject(musicBtn);
		const musicBtnCheckbox = new Checkbox(musicBtn);
		musicBtnCheckbox.checkedTexture = { "key": "buttons", "frame": "Button Pack - Green_Button Green - Music.png" };
		musicBtnCheckbox.unckeckedTexture = { "key": "buttons", "frame": "Button Pack - Gray_Button Gray - Music.png" };
		new PushOnClick(musicBtn);
		const musicBtnClickHandler = new ClickHandler(musicBtn);
		musicBtnClickHandler.callback = () => GameSounds.toggleMusic();

		// soundBtn (components)
		new InteractiveObject(soundBtn);
		const soundBtnCheckbox = new Checkbox(soundBtn);
		soundBtnCheckbox.checkedTexture = { "key": "buttons", "frame": "Button Pack - Green_Button Green - Sound.png" };
		soundBtnCheckbox.unckeckedTexture = { "key": "buttons", "frame": "Button Pack - Gray_Button Gray - Sound.png" };
		new PushOnClick(soundBtn);
		const soundBtnClickHandler = new ClickHandler(soundBtn);
		soundBtnClickHandler.callback = () => GameSounds.toggleEffects();

		// linkToPhaserEditor (components)
		new InteractiveObject(linkToPhaserEditor);
		const linkToPhaserEditorOpenURLOnClick = new OpenURLOnClick(linkToPhaserEditor);
		linkToPhaserEditorOpenURLOnClick.url = "https://phasereditor2d.com";

		// bitmaptext (components)
		const bitmaptextFloatingObject = new FloatingObject(bitmaptext);
		bitmaptextFloatingObject.offset = 10;

		this.musicBtn = musicBtn;
		this.soundBtn = soundBtn;

		this.events.emit("scene-awake");
	}

	private musicBtn: Phaser.GameObjects.Image | undefined;
	public soundBtn: Phaser.GameObjects.Image | undefined;

	/* START-USER-CODE */

	create() {

		this.editorCreate();

		GameSounds.init(this);

		if (this.musicBtn && this.soundBtn) {

			Checkbox.getComponent(this.musicBtn).checked = GameSounds.musicEnabled;
			Checkbox.getComponent(this.soundBtn).checked = GameSounds.effectsEnabled;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
