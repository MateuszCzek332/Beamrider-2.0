import { Star } from "./Star";
import { Ufo } from "./Ufo";
import { Player } from "./Player";
import { Boss } from "./Boss";
import { BossHelper } from "./BossHelper";
import { Helpers } from "./Helpers";


export class LevelController {

    level: number = 1;
    points: number = 0;
    private readonly lvGoal = 3;
    enemyToKill = this.lvGoal;

    stars: Star[][] = [];
    boss: Boss | null = null;
    bossHelpers: BossHelper[] = []
    ufoTab: Ufo[] = []
    constructor(stars: Star[][]) {
        this.stars = stars
        this.spawnUfo()
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        if (this.boss == null) {
            this.updateLevel(ctx, player)
        }
        else {
            this.updateBossFight(ctx, player)
        }
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

    updateBossFight = (ctx: CanvasRenderingContext2D, player: Player) => {
        switch (this.boss?.state) {
            case 1:
                this.boss.update(ctx, player)
                break;
            case 0:
                this.boss = null;
                setTimeout(() => {
                    this.level++;
                    this.bossHelpers = [];
                    this.enemyToKill = this.lvGoal
                    this.spawnUfo()
                }, 1100)
                break;
        }

        for (let i: number = 0; i < this.bossHelpers.length; i++) {
            let ship = this.bossHelpers[i]
            switch (ship.state) {
                case 1:
                    ship.update(ctx, player)
                    break;
                case 0:
                    this.bossHelpers.splice(i, 1);
                    i--;
                    this.points += 44;
                    setTimeout(() => this.bossHelpers.push(new BossHelper(this.stars)), Helpers.getRandomInt(100, 1000))
                    break;
                case -1:
                    player.die()
                    this.boss = null;
                    this.bossHelpers = [];

                    if (player.hp > 0) {
                        setTimeout(() => {
                            this.level++;
                            this.enemyToKill = this.lvGoal
                            this.spawnUfo()
                        }, 2400)
                    }
            }

        }
    }

    updateLevel = (ctx: CanvasRenderingContext2D, player: Player) => {

        for (let i: number = 0; i < this.ufoTab.length; i++) {
            let ufo = this.ufoTab[i]
            switch (ufo.state) {
                case 2:
                    this.ufoTab = [];
                    player.die()
                    if (player.hp > 0) {
                        setTimeout(() => {
                            this.spawnUfo()
                        }, 2400)
                    }
                    break
                case 1:
                    ufo.update(ctx, player)
                    break
                case 0:
                    player.bullet = null;
                    this.ufoTab.splice(i, 1);
                    i--;
                    this.enemyToKill--;
                    this.points += 44;
                    if (this.checkLv())
                        this.spawnUfo()
                    break
                case -1:
                    this.enemyToKill--;
                    this.points += 44;
                    this.ufoTab = [];
                    player.die()
                    if (player.hp > 0) {
                        setTimeout(() => {
                            if (this.checkLv())
                                this.spawnUfo()
                        }, 2400)
                    }
                    break
                case -2:
                    this.ufoTab.splice(i, 1);
                    i--;
                    this.spawnUfo()
                    break
            }

        }

    }

    checkLv = () => {
        if (this.enemyToKill == 0) {
            this.ufoTab = [];
            setTimeout(() => {
                this.boss = new Boss()
                setTimeout(() => this.bossHelpers.push(new BossHelper(this.stars)), Helpers.getRandomInt(10, 1000))
                setTimeout(() => this.bossHelpers.push(new BossHelper(this.stars)), Helpers.getRandomInt(10, 1000))
                setTimeout(() => this.bossHelpers.push(new BossHelper(this.stars)), Helpers.getRandomInt(10, 1000))
            }, 500)
            return false
        }
        return true
    }

    spawnUfo = () => {
        this.ufoTab.push(new Ufo(this.stars, this.level))
    }

}

