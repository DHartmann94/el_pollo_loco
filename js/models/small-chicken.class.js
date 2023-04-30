class SmallChicken extends MovableObject {
    posX; // constructor (level1.js)
    posY = 365;
    height = 55;
    width = 55;
    speed = 0.5 + Math.random() * 0.4; // random geschwindigkeit (vorher im constructor)
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.loadImages(this.IMAGES_WALKING); // übergabe der bilder in die loadImages function(mo)
        this.animate();

        this.posX =  x;
    }
    
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING); // MovableObject
        }, 100);
    }

}