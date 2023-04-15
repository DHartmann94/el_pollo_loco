class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image(); // Image existiert bereits in JS
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}