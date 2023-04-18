class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    speed; // animations geschwindigkeit 

    img; // hier wird das Bild reingeladen und angezeigt.
    imageCache = {}; // hier werden die animate bilder reingeladen.
    currentImage = 0; // wählt das Bild in der animate function aus.
    otherDirection = false; // spiegelt bei der animation das Bild.


    loadImage(path) {
        this.img = new Image(); // Image existiert bereits in JS
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} imageArray -
     */
    loadImages(imageArray) {
        imageArray.forEach ((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })

    }

    playAnimation(images) {
        let index = this.currentImage % images.length; // Modulo = wenn das ende des array erreicht ist fängt index wieder bei 0 an.
        let path = images[index]; // wählt das entsprechnde Bild aus IMAGES_WALKING aus.
        this.img = this.imageCache[path]; // dieses wird in die Variable img geladen und angezeigt.
        this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}