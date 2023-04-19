class Chicken extends MovableObject {
    x = 200 + Math.random() * 500; // lässt die chicken random spawnen (vorher im constructor)
    y = 350;
    height = 75;
    width = 75;
    speed = 0.15 + Math.random() * 0.4; // random geschwindigkeit (vorher im constructor)
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.loadImages(this.IMAGES_WALKING); // übergabe der bilder in die loadImages function(mo)
        this.animate();
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