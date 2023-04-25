class Coin extends MovableObject {
    posX = 400 + Math.random() * 1200;
    posY = 150 - Math.random() * 160;
    height = 170;
    width = 170;
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS); // übergabe der bilder in die loadImages function(mo)
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS); // MovableObject
        }, 400);
    }
}