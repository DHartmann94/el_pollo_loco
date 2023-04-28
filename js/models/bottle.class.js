class Bottle extends MovableObject {
  posX; // constructor (level1.js)
  posY = 360;
  height = 75;
  width = 75;
  offset = {
    top: 10,
    right: 10,
    bottom: 5,
    left: 15
};

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.posX = x;
  }
}