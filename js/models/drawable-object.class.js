class DrawableObject {
    posX; // position canvas
    posY; // position canvas
    height; // hight from the images
    width; // witdh from the images
    speed; // animation speed
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    img; // hier wird das Bild reingeladen und angezeigt.
    imageCache = {}; // hier werden die animate bilder reingeladen.
    currentImage = 0; // wählt das Bild in der animate function aus.


    /**
     * Loads an image from the given "file path".
     * @param {String} path - The "file path" of the image to be loaded.
     */
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
     * Displays the selected image in the canvas.
     * @param {Object} ctx - Context (canvas.getContext('2d'))
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    
    /* ----- Help functions to develop the game! ----- */
    // Is called in the "addToMap(movableObj);".
    drawFrame(ctx) {
        if (this.selectedMovableObjects()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            //Coordinates where the squares should be placed.
            ctx.strokeRect(this.posX + this.offset.left, this.posY + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
        }
    }

    selectedMovableObjects() {
        return this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coin || this instanceof ThrowableObject;
    }
}