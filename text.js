const DICTIONARY = ["Ameow", "test"];  // XXX TODO Get free to use dictionary of words?
let SELECTED_WORD = "";


const userInput = document.querySelector("#userInput");
userInput.focus();  // Start focused in text box
userInput.addEventListener("input", event => {
    SELECTED_WORD = event.target.value;
});


class Text {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.fontSize = 12;
        this.color = "blue";
        this.highlightColor = "green";
        this.text = this.getRandomWord();
        this.font = `${this.fontSize}px sans serif`;
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;

        this.wordWidth = ctx.measureText(this.text).width;
        this.wordHeight = this.fontSize;

        this.randomizeX();
        this.y = this.wordHeight;
        this.vx = 1;  // X Velocity
        this.vy = 1;  // Y Velocity
        this.wait = WAIT;
        
        const pixelBuffer = this.getImageMap()
        for (let tries = 0; tries <= 5; tries++) {  // Only try 5 times to fix collision
            if (this.detectCollision(pixelBuffer) == true) {
                // On collision try a different random X
                this.randomizeX();
            }
        }
    }

    randomizeX() {
        this.x = getRandomInt(this.canvas.width - this.wordWidth);
    }

    getRandomWord() {
        return DICTIONARY[getRandomInt(DICTIONARY.length)];
    }

    getImageMap() {
        return new Uint32Array(
            this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data.buffer
        );
    }

    detectCollision(pixelBuffer) {
        for (let col = this.x; col <= this.x + 12; col++) {
            for (let row = 0; row <= this.y; row++) {
                if (pixelBuffer[col + (row * this.canvas.width)] !== 0) {
                    // Collision detected - the color isn't filled IN THE CANVAS
                    // Note: 'body' background color is irrelevant - can use this to do darkmode
                    return true;
                }
            }
        }
        return false;
    }

    draw() {
        if (this.text.startsWith(SELECTED_WORD)) {
            // If this.text starts with what the user has typed in, highlight that part
            this.ctx.fillStyle = this.highlightColor;
            this.ctx.fillText(SELECTED_WORD, this.x, this.y);

            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.text.substring(SELECTED_WORD.length), this.x + this.ctx.measureText(SELECTED_WORD).width, this.y);
        } else {
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.text, this.x, this.y);
        }
    }

    clear() {
        // Clear text from screen
        this.ctx.clearRect(this.x, this.y - this.wordHeight + 1, this.wordWidth, this.wordHeight); // clear canvas
    }

    jiggerX() {
        // Wiggle to the left and right a bit
        const jigger = getRandomInt(3) - 1;  // Between -1 and 1
        this.x += jigger;
        
        if (this.x > this.canvas.width || this.x < 0) {
            this.x -= jigger; // reverse jigger
        }
    }

    moveDown() {
        // Move text down on the screen
        this.y += this.vy;
        
        if (this.y >= this.canvas.height) {
            alert("You lose"); // Collision with bottom of screen
        }
    }
    
    move() {
        this.clear();
        this.wait -= 1;
        if (this.wait <= 0) {
            this.clear();
            this.moveDown();
            this.jiggerX();
            this.wait = WAIT;
        }
    }
}