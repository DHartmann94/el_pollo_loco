class Keyboard {
    up = false;
    right = false;
    down = false;
    left = false;
    spacebar = false;
    d = false;

    constructor() {
        this.pressCharacterControlls();
        this.touchMobileCharacterControlls();
    }

    pressCharacterControlls() {
        /**
        * This event listener is triggered when a key is pressed down on the keyboard. 
        * It updates the values of the corresponding keys in the keyboard object to TRUE based on the key code.
        */
        window.addEventListener("keydown", (event) => {
            if (event.keyCode === 38) {
                this.up = true;
            }
            if (event.keyCode === 39) {
                this.right = true;
            }
            if (event.keyCode === 40) {
                this.down = true;
            }
            if (event.keyCode === 37) {
                this.left = true;
            }
            if (event.keyCode === 32) {
                this.spacebar = true;
            }
            if (event.keyCode === 68) {
                this.d = true;
            }
        });

        /**
         * This event listener is triggered when a key is released on the keyboard. 
         * It updates the values of the corresponding keys in the keyboard object to FALSE based on the key code.
         */
        window.addEventListener("keyup", (event) => {
            if (event.keyCode === 38) {
                this.up = false;
            }
            if (event.keyCode === 39) {
                this.right = false;
            }
            if (event.keyCode === 40) {
                this.down = false;
            }
            if (event.keyCode === 37) {
                this.left = false;
            }
            if (event.keyCode === 32) {
                this.spacebar = false;
            }
            if (event.keyCode === 68) {
                this.d = false;
            }
        });
    }

    /**
     * Controls the character using touch events on a mobile device.
     * It updates the values of the corresponding keys in the keyboard object to TRUE or FALSE based on the touch event.
     */
    touchMobileCharacterControlls() {
        document.getElementById('btn-jump').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.up = true;
        });
        document.getElementById('btn-jump').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.up = false;
        });

        document.getElementById('btn-right').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.right = true;
        });
        document.getElementById('btn-right').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.right = false;
        });

        document.getElementById('btn-left').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.left = true;
        });
        document.getElementById('btn-left').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.left = false;
        });

        document.getElementById('btn-throw').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.d = true;
        });
        document.getElementById('btn-throw').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.d = false;
        });
    }
}