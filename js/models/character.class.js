class Character extends MovableObject {
    posX = 120;
    posY = 170;
    height = 260;
    width = 125;
    speed = 8;
    offset = {
        top: 110,
        right: 30,
        bottom: 5,
        left: 15
    };
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
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'

    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'

    ];
    world;
    stopMovementTimer = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.applyGravity();
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.playCharacterAnimation();
        }, 100);
    }

    moveCharacter() {
        world.walking_sound.pause();
        if (this.canMoveRight()) {
            this.moveCharacterRight();
        }
        if (this.canMoveLeft()) {
            this.moveCharacterLeft();
        }

        if (this.canMoveJump()) {
            this.moveCharacterJump();
        }
        this.world.camera_x = -this.posX + 100; // Moves the camera with the Character / + 100 to the right (character)
    }

    playCharacterAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
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
     * Checks whether the character can walk in the desired direction.
     * @returns {boolean} - true or false
     */
    canMoveRight() {
        return this.world.keyboard.right && this.posX < this.world.level.level_end_x && !this.isDead();
    }

    canMoveLeft() {
        return this.world.keyboard.left && this.posX > 0 && !this.isDead();
    }

    canMoveJump() {
        return this.world.keyboard.up && !this.isAboveGround() && !this.isDead() || this.world.keyboard.spacebar && !this.isAboveGround() && !this.isDead();
    }

    /**
     * Character Movement functions.
     */
    moveCharacterRight() {
        this.stopMovementTimer = 0;
        this.moveRight();
        this.otherDirection = false;
        if(!this.isAboveGround()) {
            world.walking_sound.play();
        }
    }

    moveCharacterLeft() {
        this.stopMovementTimer = 0;
        this.moveLeft();
        this.otherDirection = true;
        if(!this.isAboveGround()) {
            world.walking_sound.play();
        }
    }

    moveCharacterJump() {
        this.stopMovementTimer = 0;
        this.jump();
        world.jumping_sound.play();
    }

    /**
     * After ca. 10 seconds IMAGES_LONG_IDLE animation will play.
     * @returns {boolean} -true
     */
    checkStopMovementTimer() {
        this.stopMovementTimer += 1;
        if (this.stopMovementTimer > 100) {
            return true;
        }
    }

    /**
     * Bounces the character after jumping on an enemy.
     * @param {Object} enemy - The enemy you jumped on.
     */
    bounceAfterJumpOnEnemy(enemy) {
        this.speedY = 15;
    }
}