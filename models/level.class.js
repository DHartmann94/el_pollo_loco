class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;

    constructor(enemies, clouds, backgroundObjects) { // werden in new Level hierher ausgegeben.
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;

    }
}