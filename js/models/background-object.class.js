class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.posX = x;
        this.posY = 480 - this.height;
    }

}