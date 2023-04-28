class Bottle extends MovableObject {
  posX = 300 + Math.random() * 1300;
  posY = 360;
  height = 75;
  width = 75;
  offset = {
    top: 10,
    right: 10,
    bottom: 5,
    left: 25
};

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
  }
}