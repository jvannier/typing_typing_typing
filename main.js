const WAIT = 10;
// TODO: Add music?????

// TODO: Also affect velocity of dropping of words as it speeds up
// TODO: dictionary for gradeschools
// TODO: different version with just programming terms? (for brett!!!) i.e. 'if() {}' 'else' 'then' 'conditional' 'int' 'bool' -> Could set level/language stuff??
// IDEA: Pop up definition of word they died on (for programming version could be good for brett)
async function main() {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const dictionary = await loadDictionary();
    
    let score = 0;
    const scoreCounter = document.querySelector("#score");
    const levelCounter = document.querySelector("#level");
    let words = [new Text(ctx, canvas, dictionary)];  // Pre-load one word
    let NEW_WORD_COUNTER = wordSpawnCountdown();

    function draw() {
        NEW_WORD_COUNTER -= 1;
        if (NEW_WORD_COUNTER <= 0) {
            words.push(new Text(ctx, canvas, dictionary));
            NEW_WORD_COUNTER = wordSpawnCountdown();
        }

        // Remove words the user has typed out, starting from furthest down (in
        //  case of duplicates)
        words = words.filter(word => {
            if (word.text === SELECTED_WORD) {
                userInput.value = "";  // reset input
                word.clear();
                SELECTED_WORD = "";
                score += 1;
                scoreCounter.textContent = score;

                if (score % 50 == 0) {
                    level += 1;
                    levelCounter.textContent = level;
                }
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
}

main();