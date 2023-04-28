class BackgroundObject extends MovableObject {
    posX; // constructor (level1.js)
    posY; // constructor
    height = 480;
    width = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.posX = x;
        this.posY = 480 - this.height;
    }

}