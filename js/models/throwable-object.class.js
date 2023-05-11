class ThrowableObject extends MovableObject {
    posX; // constructor (position character MO)
    posY; // constructor (position character MO)
    otherDirection; // constructor (position character MO)
    height = 75;
    width = 75;
    offset = {
        top: 20,
        right: 20,
        bottom: 10,
        left: 25
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
    bottleHit = false;

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);

        this.throw();
        this.posX = x;
        this.posY = y;
        this.otherDirection = otherDirection;
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.animate();
        setInterval(() => {
            if(this.otherDirection === true) {
                this.posX -= 8;
            } else {
                this.posX += 8;
            }
        }, 20);
    }

    animate() {
        setInterval(() => {
            if(this.bottleSplash()) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }, 100);
    }

    bottleSplash() {
        return this.posY > 260 || this.bottleHit;
    }

    bottleTouchGround() {
        //return this.posY + this.height - this.offset.bottom > 330;
    }
}