let canvas;
let world;
let keyboard = new Keyboard();
let muteSound = false;
let stoppableIntervals = [];


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function setStoppableInterval(fn, time) {
    let interval = {
        fn: fn,
        time: time,
        id: setInterval(fn, time)
      };
      stoppableIntervals.push(interval);
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

function fullscreenOpen() {
    let fullscreen = document.getElementById('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen-size');
    document.querySelector('h1').classList.add('d-none');
    enterFullscreen(fullscreen);
}

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
    document.getElementById('canvas').classList.remove('fullscreen-size');
    document.querySelector('h1').classList.remove('d-none');
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

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
    world.volumeSounds(); // oder ein interval in der world?
    hideContainer('img-volume');
    showContainer('img-mute');
}

function volumeOn() {
    muteSound = false;
    world.volumeSounds(); // oder ein interval in der world?
    hideContainer('img-mute');
    showContainer('img-volume');
}

function showLoader() {
    document.getElementById('loader').classList.remove('loader-hidden');
    setTimeout(() => {
        document.getElementById('loader').classList.add('loader-hidden');
    }, 1000);
}

function hideLoader() {
    document.getElementById('loader').classList.add('loader-hidden');
}

function clearAllIntervals() {
    pauseIntervals();
    stoppableIntervals = [];
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function showContainer(id) {
    document.getElementById(`${id}`).classList.remove('d-none');
}

function hideContainer(id) {
    document.getElementById(`${id}`).classList.add('d-none');
}

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