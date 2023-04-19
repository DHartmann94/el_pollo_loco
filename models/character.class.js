class Character extends MovableObject {
    y = 80; //175
    height = 260;
    width = 125;
    speed = 10;
    walking_sound = new Audio("audio/running.mp3");
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    world; // damit können wir auf unsere Welt Variablen zugreifen (keyboard)

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING); // übergabe der bilder in die loadImages function(mo)
        this.loadImages(this.IMAGES_JUMPING);

        this.applyGravity();
        this.animate();
    }

    // animate könnte man auch in mo definieren?
    animate() {
        setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);

        setInterval(() => {
            this.playCharacterAnimation();
        }, 50);
    }

    moveCharacter() {
        this.walking_sound.pause();
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
        }
        if (this.world.keyboard.left && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
        }

        if(this.world.keyboard.up && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100; // Moves the camera with the Character / + 100 to the right (character)
    }

    playCharacterAnimation() {
        if(this.isAboveGround()) {
            this.walking_sound.pause();
            this.playAnimation(this.IMAGES_JUMPING);
        }else {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }
    }
}