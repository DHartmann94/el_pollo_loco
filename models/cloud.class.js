class Cloud extends MovableObject {
    x = 0 + Math.random() * 500; // lässt die clouds random spawnen (vorher im constructor)
    y = 50;
    height = 250;
    width = 400;
    speed = 0.15;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.animate();
    }

    animate() {
        this.moveLeft(); 
    }

}