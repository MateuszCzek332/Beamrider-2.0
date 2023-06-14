import { BackgroundManager } from "./BackgroundManager"
import { LevelController } from "./LevelController";
import { Player } from "./Player";

const fps = 30;

class Game {
    then: number = Date.now()
    now: number = Date.now()
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D
    bgManager: BackgroundManager = new BackgroundManager();
    lvController: LevelController = new LevelController()
    player: Player = new Player()
    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        this.canvas = canvas;
        this.canvas.width = 800
        this.canvas.height = 500
        this.ctx = context!;
        // this.bgManager.drawStars(this.ctx)
        this.animate()
    }

    animate = () => {
        this.now = Date.now()
        let diff = this.now - this.then
        if (diff > 1000 / fps) {
            this.ctx.clearRect(0, 0, 800, 500)
            this.bgManager.update(this.ctx)
            this.player.update(this.ctx)
            this.lvController.update(this.ctx, this.player)
            this.then = this.now
        }
        requestAnimationFrame(this.animate)
    }
}

new Game()