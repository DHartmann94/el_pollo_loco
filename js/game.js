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
    hideContainer('home-screen', 'd-none');
    hideContainer('start-button', 'd-none');
    showContainer('restart-button', 'd-none');
    showContainer('pause-button', 'd-none');
    showContainer('canvas', 'd-none');
    showContainer('img-volume', 'd-none');
    init();
    showLoader();
}

/**
 * Displays the different ending screen.
 * @param {String} endingScreen - The id from the ending Image.
 */
function gameOverScreen(endingScreen) {
    clearAllIntervals();
    hideContainer('canvas', 'd-none');
    hideContainer('pause-button', 'd-none');
    hideContainer('start-after-pause-button', 'd-none');
    showContainer(endingScreen, 'd-none');
}

function restartGame() {
    hideContainer('loader','loader-hidden');
    hideContainer('lose-screen', 'd-none');
    hideContainer('game-over-screen', 'd-none');
    hideContainer('start-after-pause-button', 'd-none');
    showContainer('pause-button', 'd-none');
    showContainer('canvas', 'd-none');
    world.background_sound.pause();
    clearAllIntervals();
    init();
}

/**
 * Pause or start all stoppableIntervals.
 * @param {Boolean} pause - True or false.
 */
function toggleGamePause(pause) {
    if (pause) {
        hideContainer('pause-button', 'd-none');
        showContainer('start-after-pause-button', 'd-none');
        pauseIntervals();
        world.background_sound.pause();
    } else {
        showContainer('pause-button', 'd-none');
        hideContainer('start-after-pause-button', 'd-none');
        playIntervals();
        world.background_sound.play();
    }
}

/**
 * Toggles fullscreen mode on and off.
 */
function fullscreenOpenAndClose() {
    if (isFullscreenActive) {
        closeFullscreen();
    } else {
        openFullscreen();
    }
}

function openFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    hideContainer('canvas', 'fullscreen-size');
    hideContainer('home-screen', 'fullscreen-size');
    hideContainer('loader', 'fullscreen-size');
    hideContainer('lose-screen', 'fullscreen-size');
    hideContainer('game-over-screen', 'fullscreen-size');
    document.querySelector('h1').classList.add('d-none');
    enterFullscreen(fullscreen);
    isFullscreenActive = true;
}

function closeFullscreen() {
    showContainer('canvas', 'fullscreen-size');
    showContainer('home-screen', 'fullscreen-size');
    showContainer('loader', 'fullscreen-size');
    showContainer('lose-screen', 'fullscreen-size');
    showContainer('game-over-screen', 'fullscreen-size');
    document.querySelector('h1').classList.remove('d-none');
    exitFullscreen();
    isFullscreenActive = false;
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
 * @param {Boolean} boolean - True or false.
 */
function toggleVolume(boolean) {
    muteSound = boolean;
    world.volumeSounds();
    hideContainer(boolean ? 'img-volume' : 'img-mute', 'd-none');
    showContainer(boolean ? 'img-mute' : 'img-volume', 'd-none');
}

/**
 * Shows a loader when you first start the game.
 */
function showLoader() {
    showContainer('loader', 'loader-hidden');
    setTimeout(() => {
        hideContainer('loader', 'loader-hidden');
    }, 1250);
}

/**
 * Check if the device is a mobile-device and show or hide the mobile-buttons.
 */
function checkMobile() {
    if (isMobileDevice()) {
        showMobileButton();
        portraitPhoneRotateMessage();
    } else {
        hideContainer('rotate-screen', 'd-none');
        hideMobileButton();
    }
}

function showMobileButton() {
    showContainer('responsive-button-container', 'd-none');
    showContainer('responsive-button-container-two', 'd-none');
    //hideContainer('fullscreen-button-container', 'd-none');
}

function hideMobileButton() {
    showContainer('fullscreen-button-container', 'd-none');
    hideContainer('responsive-button-container', 'd-none');
    hideContainer('responsive-button-container-two', 'd-none');
}

/**
 * Shows a message if the mobile-device is in the portrait-modus.
 */
function portraitPhoneRotateMessage() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        showContainer('rotate-screen', 'd-none');
    } else {
        hideContainer('rotate-screen', 'd-none');
    }
}

/**
 * Check if the device is a mobile-device.
 * @returns {boolean} - true = is mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/**
 * Checks if the fullscreen mode is active and closes it if the User change the orientationchange from landscape to portrait.
 */
function checkMobileIsFullscreen() {
    if(isFullscreenActive = true) {
        closeFullscreen();
    }
}

/**
 * Adds event listeners for the 'orientationchange', 'load', and 'resize' events and calls the 'checkMobile' function.
 * @event orientationchange - Event fired when the orientation of the device changes.
 * @event load - Event fired when the page is finished loading.
 * @event resize - Event fired when the window is resized.
 * 
 */
window.addEventListener('orientationchange', checkMobileIsFullscreen);
window.addEventListener('orientationchange', checkMobile);
window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile);

/**
 * Help-Functions
 * @param {String} id - The id to be changed.
 */
function showContainer(id, className) {
    document.getElementById(`${id}`).classList.remove(className);
}

function hideContainer(id, className) {
    document.getElementById(`${id}`).classList.add(className);
}
