class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, collectables) { // werden von new Level hierher ausgegeben.
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
    }
}