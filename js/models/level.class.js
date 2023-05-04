class Level {
    character;
    enemies;
    smallEnemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2200;

    constructor(enemies, smallEnemies, clouds, backgroundObjects, bottles, coins) { // werden von new Level hierher ausgegeben.
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}