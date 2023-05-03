class Endboss extends MovableObject {
    posX = 2000;
    posY = 50;
    height = 400;
    width = 400;
    offset = {
        top: 70,
        right: 15,
        bottom: 20,
        left: 20
    };
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
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');

        this.loadImages(this.IMAGES_ALERT); // MovableObject
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_ALERT); // MovableObject
            }
        }, 300);
    }

    distanceEndbossCharacter() {
        return this.posX - world.character.posX;
    }
}