class Chicken extends MovableObject {
    posX; // constructor (level1.js)
    posY = 355;
    height = 75;
    width = 75;
    speed = 0.15 + Math.random() * 0.4;
    offset = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
        this.posX = x;
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

}