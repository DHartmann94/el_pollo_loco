class Endboss extends MovableObject {
    posX = 2000;
    posY = 50;
    height = 400;
    width = 400;
    speed = 5;
    offset = {
        top: 70,
        right: 15,
        bottom: 20,
        left: 20
    };
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');

        this.loadImages(this.IMAGES_ALERT); // MovableObject
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveEndboss();
        }, 1000 / 10);

        setInterval(() => {
            this.playEndbossAnimation();
        }, 300);
    }

    moveEndboss() {
        if(this.distanceEndbossCharacter() < 500 && this.distanceEndbossCharacter() > 30 && !this.isDead()) {
            this.moveLeft();
            this.otherDirection = false;
        }
        if(this.distanceEndbossCharacter() > -700 && this.distanceEndbossCharacter() < -200 && !this.isDead()) {
            this.moveRight();
            this.otherDirection = true;
        }
    }

    playEndbossAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.distanceEndbossCharacter() < 130) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.distanceEndbossCharacter() < 500) {
            this.playAnimation(this.IMAGES_WALKING); // MovableObject
        } else if (this.distanceEndbossCharacter() < 800) {
            this.playAnimation(this.IMAGES_ALERT); // MovableObject
        }
    }

    distanceEndbossCharacter() {
        return this.posX - world.character.posX;
    }
}