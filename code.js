import { MemoryButton } from "./memoryButton.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

let toolbox = new Toolbox();

let rows = 2;
let cols = 4;
let cardWidth = 100;
let cardHeight = 100;
let padding = 20;

let cards = [];
let flippedCards = [];   // GLOBAL

// Create color pairs
let colors = [];
for (let i = 0; i < (rows * cols) / 2; i++) {
    colors.push(toolbox.getRandomColor());
}
colors = toolbox.shuffleArray([...colors, ...colors]);

// Create card objects
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        let x = padding + c * (cardWidth + padding);
        let y = padding + r * (cardHeight + padding);
        let color = colors.pop();

        let card = new MemoryButton(canvas, pencil, x, y, color, handleFlip);
        cards.push(card);
    }
}

// Called by each card when it's flipped
function handleFlip(card) {
    if (card.isFaceUp === false) return;

    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    let [c1, c2] = flippedCards;

    if (c1.color === c2.color) {
        // Leave them face-up
        flippedCards = [];
    } else {
        // Flip back after delay
        setTimeout(() => {
            c1.isFaceUp = false;
            c2.isFaceUp = false;
            flippedCards = [];
        }, 800);
    }
}

function checkWin() {
    if (cards.every(c => c.isFaceUp)) {
        pencil.fillStyle = "white";
        pencil.font = "50px Arial";
        pencil.fillText("YOU WIN!", 150, 300);
    }
}

function gameLoop() {
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    for (let card of cards) card.draw();

    checkWin();
}

setInterval(gameLoop, 30);
