class Chicken extends MovableObject {
    x = 200 + Math.random() * 500; // lässt die chicken random spawnen (vorher im constructor)
    y = 350;
    height = 75;
    width = 75;
    speed = 0.15 + Math.random() * 0.4; // random geschwindigkeit (vorher im constructor)
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.loadImages(this.IMAGES_WALKING); // übergabe der bilder in die loadImages function(mo)
        this.animate();
    }

        // animate könnte man auch in mo definieren?
        animate() {
            this.moveLeft(); // MovableObject

            setInterval(() => {
                this.showChickenAnimation();
            }, 100);
        }

        showChickenAnimation() {
            let index = this.currentImage % this.IMAGES_WALKING.length; // Modulo = wenn das ende des array erreicht ist fängt index wieder bei 0 an.
            let path = this.IMAGES_WALKING[index]; // wählt das entsprechnde Bild aus IMAGES_WALKING aus.
            this.img = this.imageCache[path]; // dieses wird in die Variable img geladen und angezeigt.
            this.currentImage++;
        }

}