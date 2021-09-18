export class GameSounds {

    static musicSound: Phaser.Sound.WebAudioSound;

    static bubbleSound: Phaser.Sound.WebAudioSound;

    static effectsEnabled: boolean;

    static init(scene: Phaser.Scene) {

        if (GameSounds.musicSound) {

            return;
        }

        GameSounds.musicSound = scene.sound.add("music") as Phaser.Sound.WebAudioSound;
        GameSounds.musicSound.play({ loop: true, volume: 0.2 });

        GameSounds.bubbleSound = scene.sound.add("bubble") as Phaser.Sound.WebAudioSound;
        GameSounds.effectsEnabled = true;
    }

    static toggleMusic() {

        if (GameSounds.musicEnabled) {

            GameSounds.musicSound.pause();

        } else {

            GameSounds.musicSound.resume();
        }
    }

    static get musicEnabled() {

        return GameSounds.musicSound && GameSounds.musicSound.isPlaying;
    }

    static toggleEffects() {

        GameSounds.effectsEnabled = !GameSounds.effectsEnabled;
    }

    static playBubble() {

        if (GameSounds.effectsEnabled) {

            GameSounds.bubbleSound.play();
        }
    }
}