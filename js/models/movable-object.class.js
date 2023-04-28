class MovableObject {
    posX;
    posY;
    height;
    width;
    speed; // animations geschwindigkeit
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    speedY = 0; // Fall Geschwindigkeit.
    acceleration = 2.5; // Fall Geschwindigkeit erhöhen

    energy = 100;
    lastHit = 0;

    img; // hier wird das Bild reingeladen und angezeigt.
    imageCache = {}; // hier werden die animate bilder reingeladen.
    currentImage = 0; // wählt das Bild in der animate function aus.
    otherDirection = false; // spiegelt bei der animation das Bild.


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.posY < 170; // dort soll das herunterfallen gestoppt werden.
    }

    loadImage(path) {
        this.img = new Image(); // Image() existiert bereits in JS
        this.img.src = path;
    }

    /**
     * Adds the "path" of the image-arrays to the imageCache-JSON.
     * @param {Array} imageArray -An array consisting of animation images.
     */
    loadImages(imageArray) {
        imageArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })

    }

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

    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this.selectedMovableObjects()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            //koordinaten wo die quadrate platziert werden sollen.
            ctx.strokeRect(this.posX + this.offset.left, this.posY + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
        }
    }

    selectedMovableObjects() {
        return this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coin;
    }

    /*isColliding(obj) { //JUNUS
        return (
            this.posX + this.width >= obj.posX &&
            this.posX <= obj.posX + obj.width &&
            this.posY + this.offsetY + this.height >= obj.posY &&
            this.posY + this.offsetY <= obj.posY + obj.height
            //&& obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
        );
    }*/

    /*isColliding(mo) {
    return (
        this.posX + this.width > mo.posX &&
        this.posY + this.height > mo.posY &&
        this.posX < mo.posX &&
        this.posY < mo.posY + mo.height
    );
}*/

    isColliding(obj) {
        return this.posX + this.width - this.offset.right > obj.posX + obj.offset.left &&
            this.posY + this.height - this.offset.bottom > obj.posY + obj.offset.top &&
            this.posX + this.offset.left < obj.posX + obj.width - obj.offset.right &&
            this.posY + this.offset.top < obj.posY + obj.height - obj.offset.bottom;
    }

    hit() {
        this.energy -= 5;
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