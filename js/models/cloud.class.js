class Cloud extends MovableObject {
    posX; // constructor (level1.js)
    posY = 50;
    height = 250;
    width = 400;
    speed = 0.12 + Math.random() * 0.05;


    constructor(imagePath, x) {
        super().loadImage(imagePath);

        this.animate();
        this.posX = x;
    }


    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}