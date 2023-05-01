class ThrowableObject extends MovableObject {
    posX; // constructor (position character MO)
    posY; // constructor (position character MO)
    otherDirection; // constructor (position character MO)
    height = 75;
    width = 75;
    offset = {
        top: 10,
        right: 10,
        bottom: 5,
        left: 15
    };
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION); // MovableObject
        this.loadImages(this.IMAGES_BOTTLE_SPLASH); // MovableObject

        this.posX = x;
        this.posY = y;
        this.otherDirection = otherDirection;

        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        setInterval(() => {
            if(this.otherDirection === true) {
                this.posX -= 10;
            } else {
                this.posX += 10;
            }
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION); // MovableObject
        }, 100);
    }
}