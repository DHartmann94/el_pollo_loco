class World {
    character = new Character();
    level = level1; // enemies, clouds, bg in der level 1 Variable.
    canvas; // um canvas in der ganzen klasse nutzen zu können.
    ctx;
    camera_x; // Kamera position verschieben.
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

        this.ctx.translate(this.camera_x, 0); // Kamera wird nach links geschoben, danach werden alle Objecte geladen. (verschiebt den Ursprung des Koordinatensystems um den x Wert der MO-Klasse)
        // dadruch sieht es so aus als würde sich nur der Hintergrund bewegen.
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottle);

        this.ctx.translate(-this.camera_x, 0); // schiebt wenn alle Objecte erstellt wurden den CONTEXT wieder nach rechts.

        // Erstell die Objecte im canvas (je nach leistungstärke der graka)
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) { // für die arrays
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObj) {
        if (movableObj.otherDirection) {
            //wenn true wird das Bild vom Pepe gedreht.
            this.mirrorImage(movableObj);
        }

        this.ctx.drawImage(movableObj.img, movableObj.x, movableObj.y, movableObj.width, movableObj.height);

        if (movableObj.otherDirection) {
            this.mirrorImageBack(movableObj);
        }
    }

    /**
     * Rotate the Image if you walk to the left (otherDirection = true).
     * @param {Object} movableObj - The individual classes.
     */
    mirrorImage(movableObj) {
        this.ctx.save(); // einstellung vom context werden gespeichert.
        this.ctx.translate(movableObj.width, 0); // Bild wird gedreht.
        this.ctx.scale(-1, 1); // Bild wird ein Stück verschoben (richtig positioniert)
        movableObj.x = movableObj.x * -1; // invertiert die x-Achse (character wird sonst auf die andere seite teleportiert.)
    }

    /**
     * Prevents images that should not be mirrored from being mirrored.
     * @param {Object} movableObj - The individual classes.
     */
    mirrorImageBack(movableObj) {
        // verhindert das die Bilder die sich nicht spiegeln soll das auch nicht machen.
        this.ctx.restore();
        movableObj.x = movableObj.x * -1; // invertiert die x-Achse
    }
}