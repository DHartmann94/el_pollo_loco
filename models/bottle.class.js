class Bottle extends MovableObject {
  x = 500 + Math.random() * 800;
  y = 360;
  height = 75;
  width = 75;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"); // Verwenden Sie das Bild Ihrer Wahl für die Flasche
  }
}