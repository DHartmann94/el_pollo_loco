class DrawableObject {
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

    img; // hier wird das Bild reingeladen und angezeigt.
    imageCache = {}; // hier werden die animate bilder reingeladen.
    currentImage = 0; // wählt das Bild in der animate function aus.


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
        return this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coin || this instanceof ThrowableObject;
    }

}