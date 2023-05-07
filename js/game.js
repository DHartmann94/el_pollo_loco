let canvas;
let world;
let keyboard = new Keyboard();
let muteSound = false;
let isFullscreenActive = false;
let stoppableIntervals = [];


/**
 * Initializes the game by initializing the level and creating a world-object.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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

function fullscreenOpenAndClose() {
    if(isFullscreenActive) {
        hideFullscreenSize('canvas');
        hideFullscreenSize('home-screen');
        hideFullscreenSize('loader');
        hideFullscreenSize('lose-screen');
        hideFullscreenSize('game-over-screen');
        document.querySelector('h1').classList.remove('d-none');
        exitFullscreen(); 
        isFullscreenActive = false;
    } else {
        let fullscreen = document.getElementById('fullscreen');
        showFullscreenSize('canvas');
        showFullscreenSize('home-screen');
        showFullscreenSize('loader');
        showFullscreenSize('lose-screen');
        showFullscreenSize('game-over-screen');
        document.querySelector('h1').classList.add('d-none');
        enterFullscreen(fullscreen);
        isFullscreenActive = true;
    }
}

/* TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function fullscreenClose() {
    hideContainer('img-fullscreen-close');
    showContainer('img-fullscreen');
    hideFullscreenSize('canvas');
    hideFullscreenSize('home-screen');
    hideFullscreenSize('loader');
    hideFullscreenSize('lose-screen');
    hideFullscreenSize('game-over-screen');
    document.querySelector('h1').classList.remove('d-none');
    exitFullscreen();
}*/

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
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

  document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement === null) {
        isFullscreenActive = true;
        fullscreenOpenAndClose();
    }
  });

function pauseIntervals() {
    stoppableIntervals.forEach(interval => clearInterval(interval.id));

    /* ALter-Code
    world.runIntervals();
    world.character.animate();
    world.endboss.animate();
    world.level.enemies.forEach(enemy => {
        enemy.animate();
    });
    world.level.smallEnemies.forEach(enemy => {
        enemy.animate();
    });
    world.level.clouds.forEach(cloud => {
        cloud.animate();
    });
    world.level.coins.forEach(cloud => {
        cloud.animate();
    });*/
}

function playIntervals() {
    stoppableIntervals.forEach(interval => interval.id = setInterval(interval.fn, interval.time));
}

function homeScreen() {
    window.location.reload();
}

function infoScreen() {
    document.getElementById('info-screen').classList.toggle('d-none');
}

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

function showLoader() {
    document.getElementById('loader').classList.remove('loader-hidden');
    setTimeout(() => {
        document.getElementById('loader').classList.add('loader-hidden');
    }, 1000);
}

/**
 * Check if the device is a mobile-device and show or hide the mobile-buttons.
 */
function checkMobile() {
    if (isMobileDevice()) {
        showMobileButton();
        phoneRotateMessage();
    } else {
        phoneRotateMessage();
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
function phoneRotateMessage() {
    if (screen.orientation.type === 'portrait-primary') {
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

/**
 * This event listener is triggered when a key is pressed down on the keyboard. 
 * It updates the values of the corresponding keys in the keyboard object to TRUE based on the key code
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode === 38) {
        keyboard.up = true;
    }
    if (event.keyCode === 39) {
        keyboard.right = true;
    }
    if (event.keyCode === 40) {
        keyboard.down = true;
    }
    if (event.keyCode === 37) {
        keyboard.left = true;
    }
    if (event.keyCode === 32) {
        keyboard.spacebar = true;
    }
    if (event.keyCode === 68) {
        keyboard.d = true;
    }
});

/**
 * This event listener is triggered when a key is pressed down on the keyboard. 
 * It updates the values of the corresponding keys in the keyboard object to FALSE based on the key code
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode === 38) {
        keyboard.up = false;
    }
    if (event.keyCode === 39) {
        keyboard.right = false;
    }
    if (event.keyCode === 40) {
        keyboard.down = false;
    }
    if (event.keyCode === 37) {
        keyboard.left = false;
    }
    if (event.keyCode === 32) {
        keyboard.spacebar = false;
    }
    if (event.keyCode === 68) {
        keyboard.d = false;
    }
});