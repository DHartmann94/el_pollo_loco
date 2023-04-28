const level1 = new Level(
    [
        new Chicken(500),
        new Chicken(750),
        new Chicken(1000),
        new Chicken(1500),
        new Chicken(2000),
        new Endboss()
    ],
    [
        new SmallChicken(500),
        new SmallChicken(1000),
        new SmallChicken(1500),
        new SmallChicken(2000)
    ],
    [
        new Cloud(100),
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500)
    ],
    [
        new BackgroundObject("img/5_background/layers/air.png", -719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/air.png", 719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

        new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
        new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3)
    ],
    [
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 500),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 750),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1000),
        new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1250),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1500)
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],

);