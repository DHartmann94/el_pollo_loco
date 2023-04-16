class Character extends MovableObject {
    y = 175;
    height = 260;
    width = 125;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world; // damit können wir auf die Variablen auf unsere Welt zugreifen (keyboard)


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING); // übergabe der bilder in die loadImages function(mo)

        this.animate();
    }

    // animate könnte man auch in mo definieren?
    animate() {
        setInterval(() => {
            let index = this.currentImage % this.IMAGES_WALKING.length; // Modulo = wenn das ende des array erreicht ist fängt index wieder bei 0 an.
            let path = this.IMAGES_WALKING[index]; // wählt das entsprechnde Bild aus IMAGES_WALKING aus.
            this.img = this.imageCache[path]; // dieses wird in die Variable img geladen und angezeigt.
            this.currentImage++;
        }, 100);
    }

    jump() {

    }
}