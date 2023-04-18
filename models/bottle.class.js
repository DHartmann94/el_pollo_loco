class Bottle extends MovableObject {
    x = 500 + Math.random() * 800;
    y = 375;
    height = 50;
    width = 50; 

    constructor() {
      super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"); // Verwenden Sie das Bild Ihrer Wahl für die Flasche
    }
  }