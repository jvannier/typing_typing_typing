const START = getTime();
let level = 1;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getTime() {
    return new Date().getTime() / 10000;
}

function wordSpawnCountdown() {
    let now = getTime();
    let speed =  (300 / level) * (1 + 1/Math.pow(2.71828, now - START));
    if (speed < 40) {
        return 40;  // Hard cap so it never spawns faster
    }
    return speed;
}

async function loadDictionary() {
    let result = await fetch("https://random-word-api.herokuapp.com/all");
    return await result.json()
}