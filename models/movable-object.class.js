class MovableObject {
    x = 120;
    y = 280;
    offsetY;
    offsetX;
    height = 150;
    width = 100;
    speed; // animations geschwindigkeit 

    speedY = 0; // Fall Geschwindigkeit.
    acceleration = 2.5; // Fall Geschwindigkeit erhöhen

    img; // hier wird das Bild reingeladen und angezeigt.
    imageCache = {}; // hier werden die animate bilder reingeladen.
    currentImage = 0; // wählt das Bild in der animate function aus.
    otherDirection = false; // spiegelt bei der animation das Bild.


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 170; // dort soll das herunterfallen gestoppt werden.
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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this.selectedMovableObjects()) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            //koordinaten wor die quadrate platziert werden sollen.
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    selectedMovableObjects() {
        return this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coin;
    }

   /* isColliding(obj) {
        return (
            this.x + this.width >= obj.x &&
            this.x <= obj.x + obj.width &&
            this.y + this.offsetY + this.height >= obj.y &&
            this.y + this.offsetY <= obj.y + obj.height
            //&& obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
        );
    }*/

    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
        );
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}