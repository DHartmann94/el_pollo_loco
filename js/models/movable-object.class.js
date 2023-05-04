class MovableObject extends DrawableObject {
    speedY = 0;
    acceleration = 2.5;

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
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Creates a gravitational effect.
     */
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
            return this.posY < 170; //The falling should be stopped there.
        }
    }

    /**
     * Calculates when an object falls.
     * @returns {boolean} - Returns true if the object is falling.
     */
    isFalling() {
        return this.speedY < 0 && this.isAboveGround();
    }

    /**
     * Checks if the current object is colliding with the specified object.
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} - Returns true if the objects are colliding.
     */
    isColliding(obj) {
        return this.posX + this.width - this.offset.right > obj.posX + obj.offset.left &&
            this.posY + this.height - this.offset.bottom > obj.posY + obj.offset.top &&
            this.posX + this.offset.left < obj.posX + obj.width - obj.offset.right &&
            this.posY + this.offset.top < obj.posY + obj.height - obj.offset.bottom;
    }

    /**
     * Decreases the energy of the object by the specified damage value.
     * Saves the time of the hit.
     * @param {Number} damage - The damage value to be deducted.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Indicates the duration of the animation.
     * @returns - Duration of the animation.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Indicates when an object is dead.
     * @returns {boolean} - Returns true if the objects is dead.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Movement types.
     */
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