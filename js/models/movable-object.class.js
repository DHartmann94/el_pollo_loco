class MovableObject extends DrawableObject {
    speedY = 0; // case speed
    acceleration = 2.5; // case increase speed

    energy = 100;
    dead = false;
    collectableCoins = 0;
    collectableBottles = 0;

    lastHit = 0;


    /**
    * Goes through the JSON-imageCache and displays the selected images.
    * @param {Array} images -An array consisting of animation images.
    */
    playAnimation(images) {
        let index = this.currentImage % images.length; // Modulo = wenn das ende des array erreicht ist fängt index wieder bei 0 an.
        let path = images[index]; // wählt das entsprechnde Bild aus IMAGES_WALKING aus.
        this.img = this.imageCache[path]; // dieses wird in die Variable img geladen und angezeigt.
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.posY < 170; // dort soll das herunterfallen gestoppt werden.
        }
    }

    isFalling() {
        return this.speedY < 0 && this.isAboveGround();
    }

    isColliding(obj) {
        return this.posX + this.width - this.offset.right > obj.posX + obj.offset.left &&
            this.posY + this.height - this.offset.bottom > obj.posY + obj.offset.top &&
            this.posX + this.offset.left < obj.posX + obj.width - obj.offset.right &&
            this.posY + this.offset.top < obj.posY + obj.height - obj.offset.bottom;
    }

    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference
        timePassed = timePassed / 1000; // milliseconds
        return timePassed < 0.5; // dauer der animation
    }

    isDead() {
        return this.energy === 0;
    }

    moveRight() {
        this.posX += this.speed;
    }

    moveLeft() {
        this.posX -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}