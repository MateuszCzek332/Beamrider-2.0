import { BackgroundManager } from "./BackgroundManager"

class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D
    bgManager: BackgroundManager = new BackgroundManager();
    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        this.canvas = canvas;
        this.ctx = context!;
        this.bgManager.drawStars(this.ctx)
    }
}

new Game()