class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0)
    ];
    canvas; // um canvas in der ganzen klasse nutzen zu können.
    ctx;
    keyboard; // um keyboard in der ganzen klasse nutzen zu können.


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //1. canvas in world.js 2. canvas in game.js
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this; // verknüft die world (wegen keyboard) mit character.
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // löscht alle Bilder im canvas

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);


        // Erstell die Objecte im canvas (je nach leistungstärke der graka)
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObj) {
        if (movableObj.otherDirection) {
            //wenn true wird das Bild vom Pepe gedreht.
            this.flipImage(movableObj);
        }

        this.ctx.drawImage(movableObj.img, movableObj.x, movableObj.y, movableObj.width, movableObj.height);

        if (movableObj.otherDirection) {
            this.flipImageBack(movableObj);
        }
    }

    /**
     * Rotate the Image if you walk to the left (otherDirection = true).
     * @param {Object} movableObj - The individual classes.
     */
    flipImage(movableObj) {
        console.log(typeof(movableObj));
        this.ctx.save(); // einstellung vom context werden gespeichert.
        this.ctx.translate(movableObj.width, 0); // Bild wird gedreht.
        this.ctx.scale(-1, 1); // Bild wird ein Stück verschoben (richtig positioniert)
        movableObj.x = movableObj.x * -1; // invertiert die x-Achse
    }

    /**
     * Prevents images that should not be mirrored from being mirrored.
     * @param {Object} movableObj - The individual classes.
     */
    flipImageBack(movableObj) {
        // verhindert das die Bilder sich ständig spiegeln wenn links gedrückt.
        this.ctx.restore();
        movableObj.x = movableObj.x * -1; // invertiert die x-Achse
    }
}