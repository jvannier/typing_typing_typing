const WAIT = 10;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


// XXX how to make exponential decay?
function exponentialDecayWordCounter() {
    return 1/Math.exp(words.length) * 1000;
}


let words = [new Text(ctx, canvas)];  // Pre-load one word
let NEW_WORD_COUNTER = exponentialDecayWordCounter();


function draw() {
    // XXX how to make exponential decay?
    NEW_WORD_COUNTER -= 1;
    if (NEW_WORD_COUNTER <= 0) {
        words.push(new Text(ctx, canvas));
        NEW_WORD_COUNTER = exponentialDecayWordCounter();
        // console.log(NEW_WORD_COUNTER);
    }

    // Remove words the user has typed out, starting from furthest down (in
    //  case of duplicates)
    words = words.filter(word => {
        if (word.text === SELECTED_WORD) {
            userInput.value = "";  // reset input
            word.clear();
            SELECTED_WORD = "";
            return false;  // delete word
        } else {
            word.move();
            word.draw();
            return true;  // keep word
        }
    });

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);