class Chicken extends MovableObject {
    posY = 350;
    height = 75;
    width = 75;
    speed = 0.15 + Math.random() * 0.4; // random geschwindigkeit (vorher im constructor)
    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.loadImages(this.IMAGES_WALKING); // übergabe der bilder in die loadImages function(mo)
        this.animate();

        this.posX =  x;
    }

    // animate könnte man auch in mo definieren?
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING); // MovableObject
        }, 100);
    }

}