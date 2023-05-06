let canvas;
let world;
let keyboard = new Keyboard();
let muteSound = false;
let allIntervals = [];


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
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
    showContainer('lose-screen');
}

function gameOverScreen() {
    clearAllIntervals();
    hideContainer('canvas');
    hideContainer('pause-button');
    showContainer('game-over-screen');
}

function restartGame() {
    hideLoader();
    hideContainer('lose-screen');
    hideContainer('game-over-screen');
    showContainer('canvas');
    clearAllIntervals();
    init();
}

function pauseGame() {
    hideContainer('pause-button');
    showContainer('start-after-pause-button');
    allIntervals.forEach(clearInterval);
    world.background_sound.pause();
    muteSound = false;
}

function startGameAfterPause() {
    showContainer('pause-button');
    hideContainer('start-after-pause-button');
    playIntervals();
    world.background_sound.play();
    muteSound = true;
}

function playIntervals() {
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
    });
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