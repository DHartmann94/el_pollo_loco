class World {
    keyboard = new Keyboard;
    character = new Character;
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
    throwBottleAfterDelay = true;


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
        this.addObjectsToMap(this.level.endboss);
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

    /**
     * Adds the given array(from level.js) of objects to the canvas by calling `addToMap` for each object.
     * @param {Object} objects - Array
     */
    addObjectsToMap(objects) { // für die arrays
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    /**
     * Adds the given object to the canvas, including mirroring the image if necessary.
     * @param {Object} object - The object that will be draw in the canvas.
     */
    addToMap(object) {
        if (object.otherDirection) {
            this.mirrorImage(object);
        }

        object.draw(this.ctx);
        //object.drawFrame(this.ctx); // Help functions to develop the game! (DrawableObject.class)

        if (object.otherDirection) {
            this.mirrorImageBack(object);
        }
    }

    /**
     * Rotate the Image if you walk to the left (otherDirection = true).
     * @param {Object} object - The individual classes.
     */
    mirrorImage(object) {
        this.ctx.save(); // Saves the context settings.
        this.ctx.translate(object.width, 0); // Rotates the image.
        this.ctx.scale(-1, 1); // Shifts the image to the right position.
        object.posX = object.posX * -1; // Inverts the x-axis (character is otherwise teleported to the other side).
    }

    /**
     * Prevents images that should not be mirrored from being mirrored.
     * @param {Object} object - The individual classes.
     */
    mirrorImageBack(object) {
        this.ctx.restore();
        object.posX = object.posX * -1;
    }

    /**
     * Runs all intervals in world.
     * Intervals checked collisions, throw bottle and game end.
     */
    runIntervals() {
        setStoppableInterval(() => {
            this.check60FPS();
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.check100Milliseconds();
        }, 100);

        setStoppableInterval(() => {
            this.checkGameEnd();
        }, 1000);
    }

    check60FPS() {
        // Check jump on Enemies
        this.checkJumpOnEnemies(this.level.enemies, 100);
        this.checkJumpOnEnemies(this.level.smallEnemies, 100);
        // Check Collisions Enemies
        this.checkCollisionEnemies(this.level.enemies, 1);
        this.checkCollisionEnemies(this.level.smallEnemies, 1);
        this.checkCollisionEnemies(this.level.endboss, 1.5);
    }

    check100Milliseconds() {
        // Check Collisions Items
        this.checkCollisionItems(this.level.coins, 1000, this.coin_sound, this.statusBarCoin, 'collectableCoins');
        this.checkCollisionItems(this.level.bottles, 100, this.bottle_sound, this.statusBarBottle, 'collectableBottles');
        this.checkBottleHitsEnemies(this.level.endboss, 20);
        this.checkBottleHitsEnemies(this.level.enemies, 100);
        this.checkBottleHitsEnemies(this.level.smallEnemies, 100);
        // Check Throw Bottle
        this.checkThrowableObjects();
    }

    /**
     * Checks when the game is over (different endings) and play a winning or lose sound.
     */
    checkGameEnd() {
        if (this.level.endboss[0].isDead()) {
            setTimeout(() => {
                gameOverScreen('game-over-screen');
                this.background_sound.volume = 0;
                this.winning_sound.play();
            }, 1000);
        }

        if (this.character.isDead()) {
            setTimeout(() => {
                gameOverScreen('lose-screen');
                this.background_sound.volume = 0;
                this.losing_sound.play();
            }, 1000);
        }
    }

    /**
     * Check if a bottle hits the endboss.
     * Updated the status-life bar and life of the endboss.
     * Delete the bottle that hit the endboss after the setTimeout.
     * @param {Object} enemyType - The array with enemies.
     * @param {Number} damage - The damage-value.
     */
    checkBottleHitsEnemies(enemyType, damage) {
        this.throwableObject.forEach((bottle) => {
            enemyType.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    bottle.bottleHit = true;
                    enemy.hit(damage);
                    this.changeStatusBarEndboss(enemyType, enemy);
                    this.killEnemy(enemyType, enemy);

                    setTimeout(() => {
                        this.deleteCorrectObject(bottle, this.throwableObject);
                    }, 80);
                }
            });
        });
    }

    changeStatusBarEndboss(enemyType, enemy) {
        if (enemyType === this.level.endboss) {
            this.changeStatusBarProgress(this.statusBarEndboss, enemy.energy);
        }
    }

    /**
     * Check if the character jump on an enemie,
     * Deletes the hit enemie after the setTimeout.
     * @param {Object} enemyType - The array with enemies.
     * @param {Number} damage - The damage-value.
     */
    checkJumpOnEnemies(enemyType, damage) {
        enemyType.forEach((enemy) => {
            if (this.canJumpOnEnemy(enemy)) {
                this.character.bounceAfterJumpOnEnemy(enemy);
                enemy.hit(damage);
                this.killEnemy(enemyType, enemy);
            }
        })
    }

    canJumpOnEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.isFalling() && !enemy.dead;
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
     * If the energy is 0 than kills the specified enemy and triggers the appropriate actions.
     * By marking it as dead, the character no longer takes any damage from the dead enemy.
     * @param {Object} enemyType - The array with enemies.
     * @param {Object} enemy - The enemy who was killed.
     */
    killEnemy(enemyType, enemy) {
        if (this.canKillEnemy(enemy)) {
            this.chicken_sound.play();
            enemy.speed = 0;
            enemy.dead = true;
            if (this.canDeleteCorrectObject(enemyType)) {
                setTimeout(() => {
                    this.deleteCorrectObject(enemy, enemyType);
                }, 2000);
            }
        }
    }

    canKillEnemy(enemy) {
        return enemy.energy === 0 && !enemy.dead;
    }

    canDeleteCorrectObject(enemyType) {
        return enemyType === this.level.enemies || enemyType === this.level.smallEnemies;
    }

    /**
     * Check if the Character can throw a bottle.
     */
    checkThrowableObjects() {
        if (this.canThrowBottle()) {
            this.throwBottle();
        }
    }

    throwBottle() {
        let bottle = new ThrowableObject(this.character.posX + 25, this.character.posY + 70, this.character.otherDirection);
        this.throwableObject.push(bottle);
        this.character.collectableBottles -= 20;
        this.changeStatusBarProgress(this.statusBarBottle, this.character.collectableBottles);
        this.throwBottleTimeout();
    }

    canThrowBottle() {
        return this.keyboard.d && this.character.collectableBottles > 0 && !this.character.isDead() && this.throwBottleAfterDelay;
    }

    throwBottleTimeout() {
        this.throwBottleAfterDelay = false;
        setTimeout(() => {
            this.throwBottleAfterDelay = true; // Reset the flag after the delay
        }, 250);
    }

    /**
     * Check the collision with a coin or bottle.
     * @param {Array} items - The list of items to check for collision.
     * @param {Number} maxAmount - The maximum amount of items the character can collect.
     * @param {Function} sound - The sound to play when an item is collected.
     * @param {Object} statusBar - The status bar to update.
     * @param {String} propertyType - The property of the character object to update.
     */
    checkCollisionItems(items, maxAmount, sound, statusBar, propertyType) {
        items.forEach((item, index) => {
            if (this.canCollectItem(item, propertyType, maxAmount)) {
                sound.play();
                this.character[propertyType] += 20;
                this.changeStatusBarProgress(statusBar, this.character[propertyType]);
                this.deleteCorrectObject(item, items);
            }
        });
    }

    canCollectItem(item, propertyType, maxAmount) {
        return this.character.isColliding(item) && this.character[propertyType] < maxAmount;
    }

    /**
     * Check collision with an enemy.
     * @param {Object} enemyType - The array with enemies.
     * @param {Number} damage - The damage-value.
     */
    checkCollisionEnemies(enemyType, damage) {
        enemyType.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                this.characterTakesDamage(damage);
            }
        });
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