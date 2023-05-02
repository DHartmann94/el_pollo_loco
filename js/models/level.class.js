class Level {
    character;
    enemies;
    endboss;
    smallEnemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2200;

    constructor(enemies, endboss, smallEnemies, clouds, backgroundObjects, bottles, coins) { // werden von new Level hierher ausgegeben.
        this.enemies = enemies;
        this.endboss = endboss;
        this.smallEnemies = smallEnemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}