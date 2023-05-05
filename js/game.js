let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame() {
    hideContainer('home-screen');
    hideContainer('start-button');
    showContainer('restart-button');
    showContainer('canvas');
    init();
    showLoader();
}

function youLoseScreen() {
    clearAllIntervals();
    hideContainer('canvas');
    showContainer('lose-screen');
}

function gameOverScreen() {
    clearAllIntervals();
    hideContainer('canvas');
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


function homeScreen() {
    location.reload();
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