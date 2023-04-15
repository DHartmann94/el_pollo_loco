class Chicken extends MovableObject {
    y = 350;
    height = 75;
    width = 75;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; // lässt die chicken random spawnen
    }

}