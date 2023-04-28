class Character extends MovableObject {
    posY = 170;
    height = 260;
    width = 125;
    speed = 10;
    offset = {
        top: 110,
        right: 30,
        bottom: 5,
        left: 15
    };
    walking_sound = new Audio("audio/running.mp3");
    jumping_sound = new Audio("audio/jumping.mp3");
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
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world; // damit können wir auf unsere Welt Variablen zugreifen (keyboard)
    stopMovementTimer = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING); // übergabe der bilder in die loadImages function(mo)
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);

        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);

        setInterval(() => {
            this.playCharacterAnimation();
        }, 100);
    }

    moveCharacter() {
        this.walking_sound.pause();
        if (this.world.keyboard.right && this.posX < this.world.level.level_end_x) {
            this.stopMovementTimer = 0;
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
        }
        if (this.world.keyboard.left && this.posX > 0) {
            this.stopMovementTimer = 0;
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
        }

        if (this.world.keyboard.up && !this.isAboveGround()) {
            this.stopMovementTimer = 0;
            this.jump();
            this.jumping_sound.play();
        }
        this.world.camera_x = -this.posX + 100; // Moves the camera with the Character / + 100 to the right (character)
    }

    playCharacterAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.checkStopMovementTimer()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * After 10 seconds IMAGES_LONG_IDLE animation will play.
     * @returns -true
     */
    checkStopMovementTimer() {
        this.stopMovementTimer += 1;
        if (this.stopMovementTimer > 100) {
            return true;
        }
    }
}