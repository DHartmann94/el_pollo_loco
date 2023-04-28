class Cloud extends MovableObject {
    posY = 50;
    height = 250;
    width = 400;
    speed = 0.12 + Math.random() * 0.05;


    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.animate();

        this.posX = x;
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}