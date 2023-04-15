class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};


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
            this.imageCache[path] = path;
        })

    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}