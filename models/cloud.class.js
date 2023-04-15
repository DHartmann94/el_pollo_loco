class Cloud extends MovableObject {
    y = 50;
    width = 400;
    height = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500; // lässt die clouds random spawnen

        this.animateClouds();
    }

    animateClouds() {
        setInterval( () => {
            this.x -= 0.15;
        }, 1000 / 60);
        
    }

}