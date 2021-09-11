
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1200,
		height: 750,
		type: Phaser.AUTO,
		backgroundColor: "#242424",
		physics: {
			default: "arcade",
			arcade: {
				debug: false
			}
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		input: {
			activePointers: 3
		}
	});

	game.scene.add("Boot", Boot);
	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.start("Boot");
});

class Boot extends Phaser.Scene {

	constructor() {
		super("Boot");
	}

	preload() {

		this.load.pack("preload-asset-pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}