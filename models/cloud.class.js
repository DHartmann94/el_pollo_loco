class Cloud extends MovableObject {
    x = 50 + Math.random() * 2500; // lässt die clouds random spawnen (vorher im constructor)
    y = 50;
    height = 250;
    width = 400;
    speed = 0.12 + Math.random() * 0.05;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.animate();
    }

    animate() {
        this.moveLeft(); 
    }

}