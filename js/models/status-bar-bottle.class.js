class StatusBarBottle extends StatusBar {
    posX = 10;
    posY = 0;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }
}