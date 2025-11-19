import { MemoryButton } from "./memoryButton.js";
import { Toolbox } from "./ColorMemory-main/toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

let color1 = toolbox.getRandomColor();
let card1a = new MemoryButton(canvas, pencil, 50, 50, color1);
let card1b = new MemoryButton(canvas, pencil, 200, 50, color1);

let rows = 2;
let cols = 4;
let cardWidth = 100;
let cardHeight = 100;
let padding = 20;

let colors = [];
for (let i = 0; i < (rows * cols) /2; i++) {
    colors.push(toolbox.getRandomColor());
}

colors = toolbox.shuffleArray([...colors, ...colors]);

let cards = [];
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        let x = padding + c * (cardWidth + padding);
        let y = padding + r * (cardHeight + padding);
        let color = colors.pop();
        let card = new MemoryButton(canvas, pencil, x, y, color);
        cards.push(card);

    }
let flippedCards = [];

function checkMatch() {
    if (flippedCards.length < 2) return;

    let [c1, c2] = flippedCards;

    if (c1.color === c2.color) {
       
        flippedCards = [];  
    } else {
        
        setTimeout(() => {
            c1.isFaceUp = false;
            c2.isFaceUp = false;
            flippedCards = [];
        }, 800);
    }
}
function gameLoop() {
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    for (let card of cards) {
        card.draw();
    }
    function checkWin() {
    let allFaceUp = cards.every(card => card.isFaceUp);

    if (allFaceUp) {
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

}

setInterval(gameLoop, 30);  

}








function gameLoop() {

    pencil.clearRect(0,0, canvas.width, canvas.height);
    card1a.draw();
    card1b.draw();
}

setInterval(gameLoop, 50);