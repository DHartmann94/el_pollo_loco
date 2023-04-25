class Endboss extends MovableObject {
    posX = 2000;
    posY = 50;
    height = 400;
    width = 400;
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');

        this.loadImages(this.IMAGES_ALERT); // übergabe der bilder in die loadImages function(mo)
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT); // MovableObject
        }, 300);
    }


}