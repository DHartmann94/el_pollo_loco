let canvas;
let world;
let muteSound = false;
let isFullscreenActive = false;
let stoppableIntervals = [];


/**
 * Initializes the game by initializing the level and creating a world-object.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

/**
 * Set an interval that can be stopped later.
 * @param {Function} fn - setInterval function.
 * @param {Number} time - The duration time.
 */
function setStoppableInterval(fn, time) {
    let interval = {
        fn: fn,
        time: time,
        id: setInterval(fn, time)
    };
    stoppableIntervals.push(interval);
}

/**
 * Stop all intervals in the game.
 */
function clearAllIntervals() {
    pauseIntervals();
    stoppableIntervals = [];
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Displays the appropriate containers depending on the situation of the game.
 */
function startGame() {
    hideContainer('home-screen');
    hideContainer('start-button');
    showContainer('restart-button');
    showContainer('pause-button');
    showContainer('canvas');
    showContainer('img-volume');
    init();
    showLoader();
}

function youLoseScreen() {
    clearAllIntervals();
    hideContainer('canvas');
    hideContainer('pause-button');
    hideContainer('start-after-pause-button');
    showContainer('lose-screen');
}

function gameOverScreen() {
    clearAllIntervals();
    hideContainer('canvas');
    hideContainer('pause-button');
    hideContainer('start-after-pause-button');
    showContainer('game-over-screen');
}

function restartGame() {
    hideLoader();
    hideContainer('lose-screen');
    hideContainer('game-over-screen');
    hideContainer('start-after-pause-button');
    showContainer('pause-button');
    showContainer('canvas');
    world.background_sound.pause();
    clearAllIntervals();
    init();
}

/**
 * Pause or start all stoppableIntervals.
 */
function pauseGame() {
    hideContainer('pause-button');
    showContainer('start-after-pause-button');

    pauseIntervals();
    world.background_sound.pause();
}

function startGameAfterPause() {
    showContainer('pause-button');
    hideContainer('start-after-pause-button');

    playIntervals();
    world.background_sound.play();
}

/**
 * Toggles fullscreen mode on and off.
 */
function fullscreenOpenAndClose() {
    if (isFullscreenActive) {
        closeFullscreen();
        document.querySelector('h1').classList.remove('d-none');
        exitFullscreen();
        isFullscreenActive = false;
    } else {
        let fullscreen = document.getElementById('fullscreen');
        openFullscreen();
        document.querySelector('h1').classList.add('d-none');
        enterFullscreen(fullscreen);
        isFullscreenActive = true;
    }
}

function closeFullscreen() {
    hideFullscreenSize('canvas');
    hideFullscreenSize('home-screen');
    hideFullscreenSize('loader');
    hideFullscreenSize('lose-screen');
    hideFullscreenSize('game-over-screen');
}

function openFullscreen() {
    showFullscreenSize('canvas');
    showFullscreenSize('home-screen');
    showFullscreenSize('loader');
    showFullscreenSize('lose-screen');
    showFullscreenSize('game-over-screen');
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

/**
 * Handles changes to the fullscreen state and updates the `isFullscreenActive` variable accordingly.
 */
document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement === null) {
        isFullscreenActive = true;
        fullscreenOpenAndClose();
    }
});

function pauseIntervals() {
    stoppableIntervals.forEach(interval => clearInterval(interval.id));
}

function playIntervals() {
    stoppableIntervals.forEach(interval => interval.id = setInterval(interval.fn, interval.time));
}

function homeScreen() {
    window.location.reload();
}

/**
 * Toggle the info-box.
 */
function infoScreen() {
    document.getElementById('info-screen').classList.toggle('d-none');
}

/**
 * Plays or mutes the sound.
 */
function volumeOff() {
    muteSound = true;
    world.volumeSounds();
    hideContainer('img-volume');
    showContainer('img-mute');
}

function volumeOn() {
    muteSound = false;
    world.volumeSounds();
    hideContainer('img-mute');
    showContainer('img-volume');
}

/**
 * Shows a loader when you first start the game.
 */
function showLoader() {
    document.getElementById('loader').classList.remove('loader-hidden');
    setTimeout(() => {
        document.getElementById('loader').classList.add('loader-hidden');
    }, 1500);
}

/**
 * Check if the device is a mobile-device and show or hide the mobile-buttons.
 */
function checkMobile() {
    if (isMobileDevice()) {
        showMobileButton();
        portraitPhoneRotateMessage();
    } else {
        hideContainer('rotate-screen');
        hideMobileButton();
    }
}

function showMobileButton() {
    showContainer('responsive-button-container');
    showContainer('responsive-button-container-two');
    hideContainer('fullscreen-button-container');
}

function hideMobileButton() {
    showContainer('fullscreen-button-container');
    hideContainer('responsive-button-container');
    hideContainer('responsive-button-container-two');
}

/**
 * Shows a message if the mobile-device is in the portrait-modus.
 */
function portraitPhoneRotateMessage() {
    /*if (screen.orientation.type === 'portrait-primary') {
        showContainer('rotate-screen');
    } else {
        hideContainer('rotate-screen');
    }*/

    if (window.matchMedia("(orientation: portrait)").matches) {
        showContainer('rotate-screen');
    } else {
        hideContainer('rotate-screen');
    }
}

/**
 * Check if the device is a mobile-device.
 * @returns {boolean} - true = is mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Adds event listeners for the 'orientationchange', 'load', and 'resize' events and calls the 'checkMobile' function.
 * @event orientationchange - Event fired when the orientation of the device changes.
 * @event load - Event fired when the page is finished loading.
 * @event resize - Event fired when the window is resized.
 * 
 */
window.addEventListener('orientationchange', checkMobile);
window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile);

/**
 * Help-Functions
 * @param {String} id - The id to be changed.
 */
function showContainer(id) {
    document.getElementById(`${id}`).classList.remove('d-none');
}

function hideContainer(id) {
    document.getElementById(`${id}`).classList.add('d-none');
}

function showFullscreenSize(id) {
    document.getElementById(`${id}`).classList.add('fullscreen-size');
}

function hideFullscreenSize(id) {
    document.getElementById(`${id}`).classList.remove('fullscreen-size');
}

function hideLoader() {
    document.getElementById('loader').classList.add('loader-hidden');
}