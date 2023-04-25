class Bottle extends MovableObject {
  posX = 500 + Math.random() * 800;
  posY = 360;
  height = 75;
  width = 75;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
  }
}