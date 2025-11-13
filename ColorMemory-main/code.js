import { MemoryButton } from "./memoryButton.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

let color1 = toolbox.getRandomColor();
let card1a = new MemoryButton(canvas, pencil, 50, 50, color1);
let card1b = new MemoryButton(canvas, pencil, 200, 50, color1);



function gameLoop() {

    pencil.clearRect(0,0, canvas.width, canvas.height);
    card1a.draw();
    card1b.draw();
}

setInterval(gameLoop, 50);