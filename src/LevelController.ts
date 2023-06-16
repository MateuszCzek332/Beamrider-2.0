import { Star } from "./Star";
import { Ufo } from "./Ufo";
import { Player } from "./Player";
import { Helpers } from "./Helpers";
export class LevelController {

    level: number = 1;
    points: number = 0;
    private readonly lvGoal = 3;
    enemyToKill = this.lvGoal;

    stars: Star[][] = [];
    ufoTab: Ufo[] = []
    constructor() {
        this.spawnUfo()
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        this.updateUfo(ctx, player)
        this.drawUI(ctx)
    }

    drawUI = (ctx: CanvasRenderingContext2D) => {
        ctx.font = "15px Atari";
        ctx.textAlign = "center"
        this.drawLv(ctx)
        this.drawpoints(ctx)
        this.drawEnemysToKill(ctx)
    }

    drawLv = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "rgb(204,160,92)";
        ctx.fillText('SECTOR ' + this.level.toString(), 400, 30)
    }

    drawpoints = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "rgb(204,160,92)";
        ctx.fillText(this.points.toString(), 400, 50)
    }

    drawEnemysToKill = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "rgb(80,124,56)";
        ctx.fillText(this.enemyToKill.toString(), 23, 30)

    }

    updateUfo = (ctx: CanvasRenderingContext2D, player: Player) => {
        for (let i: number = 0; i < this.ufoTab.length; i++) {
            let ufo = this.ufoTab[i]
            switch (ufo.state) {
                case 1:
                    ufo.update(ctx, player)
                    break
                case 0:
                    player.bullet = null;
                    this.ufoTab.splice(i, 1);
                    i--;
                    this.enemyToKill--;
                    this.points += 44;
                    this.checkLv()
                    this.spawnUfo()
                    break
            }

        }
    }

    checkLv = () => {
        if (this.enemyToKill == 0) {
            this.enemyToKill = this.lvGoal;
            this.level++
        }
    }

    spawnUfo = () => {
        this.ufoTab.push(new Ufo())
    }

}

