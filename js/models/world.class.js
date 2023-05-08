class World {
    keyboard = new Keyboard;
    character = new Character;
    endboss = new Endboss;
    throwableObject = [];
    level = level1;

    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();

    background_sound = new Audio("audio/background_music.mp3");
    winning_sound = new Audio("audio/winning.mp3");
    losing_sound = new Audio("audio/losing.mp3");
    coin_sound = new Audio("audio/coin.mp3");
    chicken_sound = new Audio("audio/chicken_dead.mp3");
    bottle_sound = new Audio("audio/bottle_plop.mp3");
    // --- Character-Sounds --- //
    walking_sound = new Audio("audio/running.mp3");
    jumping_sound = new Audio("audio/jumping.mp3");
    hurt_sound = new Audio("audio/hurt_pepe.mp3");

    canvas;
    ctx;
    camera_x; // Move camera position.
    otherDirection = false;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.volumeSounds();
        this.runIntervals();
    }

    /**
     * This allows you to access the world class from the character class.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Audio file volume settings.
     */
    volumeSounds() {
        if (muteSound) {
            this.background_sound.volume = 0;
            this.winning_sound.volume = 0;
            this.losing_sound.volume = 0;
            this.coin_sound.volume = 0;
            this.chicken_sound.volume = 0;
            this.bottle_sound.volume = 0;
            // --- Character-Sounds --- //
            this.walking_sound.volume = 0;
            this.jumping_sound.volume = 0;
            this.hurt_sound.volume = 0;
        } else {
            this.background_sound.volume = 0.1;
            this.background_sound.play();
            this.background_sound.loop = true;
            this.winning_sound.volume = 0.1;
            this.losing_sound.volume = 0.1;
            this.coin_sound.volume = 0.03;
            this.chicken_sound.volume = 0.1;
            this.bottle_sound.volume = 0.1;
            // --- Character-Sounds --- //
            this.walking_sound.volume = 0.2;
            this.jumping_sound.volume = 0.2;
            this.hurt_sound.volume = 0.2;
        }
    }

    /**
     * Shows the images on the right place in the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Delete all picture in the canvas.

        this.ctx.translate(this.camera_x, 0); // "Cam" moves to the left then all picture will be show.
        this.drawMovableObjects();
        this.ctx.translate(-this.camera_x, 0); // Moves the CONTEXT back to the right when all objects have been created.
        this.drawFixedObjetcts();

        // Put the objects in canvas (depending on the power of the graphics card).
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
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
    }

    drawFixedObjetcts() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
    }

    addObjectsToMap(objects) { // für die arrays
        objects.forEach((object) => {
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

    /**
     * Runs all intervals in world.
     * Intervals checked collisions, throw bottle and game end.
     */
    runIntervals() {
        setStoppableInterval(() => {
            // Check jump on Enemies
            this.checkJumpOnEnemies();
            this.checkJumpOnSmallEnemies();
            // Check Collisions Enemies
            this.checkCollisionEnemies();
            this.checkCollissionSmallEnemies();
            this.checkCollissionEndboss();
        }, 1000 / 60);

        setStoppableInterval(() => {
            // Check Collisions Items
            this.checkCollissionCoins();
            this.checkCollissionBottles();
            this.checkBottleHitsEndboss();
        }, 100);

        setStoppableInterval(() => {
            // Check Throw Bottle
            this.checkThrowableObjects();
        }, 100);

        setStoppableInterval(() => {
            this.checkGameEnd();
        }, 1000);
    }

    /**
     * Checks when the game is over (different endings) and play a winning or lose sound.
     */
    checkGameEnd() {
        if (this.endboss.isDead()) {
            setTimeout(() => {
                gameOverScreen();
                this.background_sound.volume = 0;
                this.winning_sound.play();
            }, 1000);
        }

        if (this.character.isDead()) {
            setTimeout(() => {
                youLoseScreen();
                this.background_sound.volume = 0;
                this.losing_sound.play();
            }, 1000);
        }
    }

    /**
     * Check if a bottle hits the endboss.
     * Updated the status-life bar and life of the endboss.
     * Delete the bottle that hit the endboss after the setTimeout.
     */
    checkBottleHitsEndboss() {
        this.throwableObject.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                bottle.bottleHit = true;

                this.endboss.hit(20);
                this.changeStatusBarProgress(this.statusBarEndboss, this.endboss.energy);
                if (this.endboss.energy === 0) {
                    this.killEnemy(this.endboss);
                }
                setTimeout(() => {
                    this.deleteCorrectObject(bottle, this.throwableObject);
                }, 80);
            }
        })
    }

    /**
     * Check if the character jump on an enemie,
     * Deletes the hit enemie after the setTimeout.
     */
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

    /**
     * Removes the specified object from the specified array.
     * @param {Object} object - The exact object to be deleted.
     * @param {Object} objectType -  The array of objects from which the specified object will be removed.
     */
    deleteCorrectObject(object, objectType) {
        objectType.splice(objectType.indexOf(object), 1);
    }

    /**
     * Kills the specified enemy by setting its energy to 0 (hit(100)) and marking it as dead.
     * By marking it as dead, the character no longer takes any damage from the dead enemy.
     * @param {Object} enemy - The enemy who was killed.
     */
    killEnemy(enemy) {
        this.chicken_sound.play();
        enemy.speed = 0;
        enemy.hit(100);
        enemy.dead = true;
    }

    /**
     * Check if the Character can throw a bottle.
     */
    checkThrowableObjects() {
        if (this.keyboard.d && this.character.collectableBottles > 0 && !this.character.isDead()) {
            this.throwBottle();
        }
    }

    throwBottle() {
        let bottle = new ThrowableObject(this.character.posX + 25, this.character.posY + 70, this.character.otherDirection);
        this.throwableObject.push(bottle);
        this.character.collectableBottles -= 20;
        this.changeStatusBarProgress(this.statusBarBottle, this.character.collectableBottles);
    }


    /**
     * Check the collision with a coin or bottle.
     */
    checkCollissionCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoins(index);
            }
        });
    }

    checkCollissionBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.collectableBottles < 100) {
                this.collectBottles(index);
            }
        });
    }

    /**
     * Updated the status-bar from coin- or bottle-bar.
     * Delete the collect coin or bottle from the array (canvas).
     * @param {Number} index - The index of the collated coin or bottle.
     */
    collectCoins(index) {
        if (this.character.collectableCoins < 100) {
            this.coin_sound.play();
            this.character.collectableCoins += 20;
            this.changeStatusBarProgress(this.statusBarCoin, this.character.collectableCoins);
            this.level.coins.splice(index, 1);
        }
    }

    collectBottles(index) {
        if (this.character.collectableBottles < 100) {
            this.bottle_sound.play();
            this.character.collectableBottles += 20;
            this.changeStatusBarProgress(this.statusBarBottle, this.character.collectableBottles);
            this.level.bottles.splice(index, 1);
        }
    }

    /**
     * Check collision with an enemy.
     */
    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                this.characterTakesDamage(1);
            }
        });
    }

    checkCollissionSmallEnemies() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                this.characterTakesDamage(1);
            }
        });
    }

    checkCollissionEndboss() {
        if (this.character.isColliding(this.endboss) && !this.endboss.dead) {
            this.characterTakesDamage(1.5);
        }
    }

    /**
     * After a hit the character takes damage.
     * The status-life bar will be updatet.
     * @param {Number} damage - Level of damage.
     */
    characterTakesDamage(damage) {
        if (this.character.energy > 0) {
            this.hurt_sound.play();
            this.character.hit(damage);
            this.changeStatusBarProgress(this.statusBarHealth, this.character.energy);
        }
    }

    /**
     * Update of the corresponding status-bar.
     * @param {Object} statusBarType - The status bar to be updated.
     * @param {Number} counterType - The value to update.
     */
    changeStatusBarProgress(statusBarType, counterType) {
        statusBarType.setPercentage(counterType);
    }
}