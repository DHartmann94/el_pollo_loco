class StatusBarCoin extends StatusBar {
    posX = 10;
    posY = 100;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }
}