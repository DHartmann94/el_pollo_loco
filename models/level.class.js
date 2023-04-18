class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects) { // werden aus new Level hierher ausgegeben.
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;

    }
}