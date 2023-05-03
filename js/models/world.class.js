class World {
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = [];

    coin_sound = new Audio("audio/coin.mp3");
    chicken_sound = new Audio("audio/chicken_dead.mp3");
    bottle_sound = new Audio("audio/bottle_plop.mp3");

    level = level1;
    canvas; // um canvas in der ganzen klasse nutzen zu können.
    ctx;
    camera_x; // Kamera position verschieben.
    otherDirection = false; // spiegelt das Bild.
    keyboard; // um keyboard in der ganzen klasse nutzen zu können.


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //1. canvas in world.js 2. canvas in game.js
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runIntervals();
    }

    setWorld() {
        this.character.world = this; // verknüft die world (wegen keyboard) mit character.
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // löscht alle Bilder im canvas

        this.ctx.translate(this.camera_x, 0); // Kamera wird nach links geschoben, danach werden alle Objecte geladen. (verschiebt den Ursprung des Koordinatensystems um den x Wert der MO-Klasse)
        // dadruch sieht es so aus als würde sich nur der Hintergrund bewegen.
        this.drawMovableObjects();
        this.ctx.translate(-this.camera_x, 0); // schiebt wenn alle Objecte erstellt wurden den CONTEXT wieder nach rechts.
        this.drawFixedObjetcts();

        // Erstell die Objecte im canvas (je nach leistungstärke der graka)
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
    }

    drawFixedObjetcts() {
        // --- Space for fiexed Objects --- //
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
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

        movableObj.draw(this.ctx);
        movableObj.drawFrame(this.ctx);

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
        movableObj.posX = movableObj.posX * -1; // invertiert die x-Achse (character wird sonst auf die andere seite teleportiert.)
    }

    /**
     * Prevents images that should not be mirrored from being mirrored.
     * @param {Object} movableObj - The individual classes.
     */
    mirrorImageBack(movableObj) {
        // verhindert das die Bilder die sich nicht spiegeln soll das auch nicht machen.
        this.ctx.restore();
        movableObj.posX = movableObj.posX * -1; // invertiert die x-Achse
    }

    runIntervals() {
        setInterval(() => {
            // All Collisions
            this.checkCollisionEnemies();
            this.checkCollissionSmallEnemies();
            this.checkCollissionEndboss();
            this.checkCollissionCoins();
            this.checkCollissionBottles();
            this.checkBottleHitsEndboss();
        }, 250);

        setInterval(() => {
            //Throw Bottle
            this.checkThrowableObjects();
        }, 100);

        setInterval(() => {
            // Jump on Enemies
            this.checkJumpOnEnemies();
            this.checkJumpOnSmallEnemies();
        }, 1000 / 60);
    }

    checkBottleHitsEndboss() {
        this.throwableObject.forEach((bottle) => {
            if (this.level.endboss[0].isColliding(bottle)) {
                bottle.bottleHit = true;
                
                this.level.endboss[0].hit(20);
                this.changeStatusBarProgress(this.statusBarEndboss, this.level.endboss[0].energy);
                setTimeout(() => {
                    this.deleteCorrectObject(bottle, this.throwableObject);
                }, 100);
            }
        })
    }

    checkJumpOnEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isFalling() && !enemy.dead) {
                this.killEnemy(enemy);

                setTimeout(() => {
                    this.deleteCorrectObject(enemy, this.level.enemies);
                }, 1000);
            }
        })
    }

    checkJumpOnSmallEnemies() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isFalling() && !enemy.dead) {
                this.killEnemy(enemy);

                setTimeout(() => {
                    this.deleteCorrectObject(enemy, this.level.smallEnemies);
                }, 1000);
            }
        })
    }

    deleteCorrectObject(enemy, enemyType) {
        enemyType.splice(enemyType.indexOf(enemy), 1);
    }

    killEnemy(enemy) {
        this.chicken_sound.play();
        enemy.speed = 0;
        enemy.hit(100);
        enemy.dead = true;
    }


    checkThrowableObjects() {
        if (this.keyboard.d && this.character.collectableBottles > 0) {
            this.throwBottle();
        }
    }

    throwBottle() {
        let bottle = new ThrowableObject(this.character.posX + 25, this.character.posY + 70, this.character.otherDirection);
        this.throwableObject.push(bottle);
        this.character.collectableBottles -= 20;
        this.changeStatusBarProgress(this.statusBarBottle, this.character.collectableBottles);
    }


    checkCollissionCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoins(index);
            }
        });
    }

    collectCoins(index) {
        if (this.character.collectableCoins < 100) {
            this.coin_sound.play();
            this.character.collectableCoins += 20;
            this.changeStatusBarProgress(this.statusBarCoin, this.character.collectableCoins);
            this.level.coins.splice(index, 1);
        }
    }

    checkCollissionBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.collectableBottles < 100) {
                this.collectBottles(index);
            }
        });
    }

    collectBottles(index) {
        if (this.character.collectableBottles < 100) {
            this.bottle_sound.play();
            this.character.collectableBottles += 20;
            this.changeStatusBarProgress(this.statusBarBottle, this.character.collectableBottles);
            this.level.bottles.splice(index, 1);
        }
    }

    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                this.characterTakesDamage(5);
            }
        });
    }

    checkCollissionSmallEnemies() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                this.characterTakesDamage(5);
            }
        });
    }

    checkCollissionEndboss() {
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                this.characterTakesDamage(5);
            }
        });
    }

    characterTakesDamage(damage) {
        this.character.hurt_sound.play();
        this.character.hit(damage);
        this.changeStatusBarProgress(this.statusBarHealth, this.character.energy);
    }

    changeStatusBarProgress(statusBarType, counterType) {
        statusBarType.setPercentage(counterType);
    }
}