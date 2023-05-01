class StatusBarEndboss extends StatusBar {
    posX = 470;
    posY = 0;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/2_statusbar_endboss/bar/0.png',
        'img/7_statusbars/2_statusbar_endboss/bar/20.png',
        'img/7_statusbars/2_statusbar_endboss/bar/40.png',
        'img/7_statusbars/2_statusbar_endboss/bar/60.png',
        'img/7_statusbars/2_statusbar_endboss/bar/80.png',
        'img/7_statusbars/2_statusbar_endboss/bar/100.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }

    otherDirectionStatusbar() {
        this.otherDirection = true;
    }
}