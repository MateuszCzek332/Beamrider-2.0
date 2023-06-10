import { Star } from "./Star";
import { Enemy } from "./Enemy";

export class LevelController {

    private readonly starsWith = 5
    private readonly starsHeight = 2;
    stars: Star[][] = [];
    enemyTab: Enemy[] = []
    constructor() {
        this.spawnEnemy()
    }

    update = (ctx: CanvasRenderingContext2D) => {
        this.drawStars(ctx)
    }

    spawnEnemy = () => {
        this.enemyTab.push(new Enemy())
    }

    drawStars = (ctx: CanvasRenderingContext2D) => {
        for (let i: number = 0; i < this.enemyTab.length; i++) {
            this.enemyTab[i].update(ctx)
        }
    }
}

