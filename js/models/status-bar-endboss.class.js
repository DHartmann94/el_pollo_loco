class StatusBarEndboss extends StatusBar {
    posX = 470;
    posY = 0;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    constructor() {
        super().otherDirectionStatusbar();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }

    otherDirectionStatusbar() {
        this.otherDirection = true;
    }
}