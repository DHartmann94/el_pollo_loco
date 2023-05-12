class Coin extends MovableObject {
    posX; // constructor (level1.js)
    posY = 170 - Math.random() * 100;
    height = 170;
    width = 170;
    offset = {
        top: 55,
        right: 55,
        bottom: 55,
        left: 55
    };
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x) {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);

        this.animate();
        this.posX =  x;
    }


    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 400);
    }
}