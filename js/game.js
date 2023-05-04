let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function restartGame() {
    location.reload();
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