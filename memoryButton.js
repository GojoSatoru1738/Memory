import { Toolbox } from "./toolbox.js";

export class MemoryButton {

    constructor(canvas, pencil, x, y, color, flipCallback) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 100;
        this.height = 100;
        this.canvas = canvas;
        this.pencil = pencil;
        this.toolbox = new Toolbox();
        this.isFaceUp = false;
        this.flipCallback = flipCallback;

        canvas.addEventListener("click", (e) => this.onClick(e));
    }

    draw() {
        if (this.isFaceUp) {
            this.pencil.fillStyle = this.color;
            this.pencil.fillRect(this.x, this.y, this.width, this.height);
        } else {
            this.pencil.fillStyle = "#444";
            this.pencil.fillRect(this.x, this.y, this.width, this.height);
            this.pencil.fillStyle = "white";
            this.pencil.font = "50px Times New Roman";
            this.pencil.fillText("?", this.x + 35, this.y + 60);
        }
    }

    onClick(event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;

        let inside = this.toolbox.isWithinRect(
            clickX, clickY, this.x, this.y, this.width, this.height
        );

        if (!inside) return;
        if (this.isFaceUp) return;

        this.isFaceUp = true;
        this.flipCallback(this);   // tells the main game a flip happened
    }
}
