import { Star } from "./Star";
import { Ufo } from "./Ufo";
import { Player } from "./Player";
import { Boss } from "./Boss";
import { BossHelper } from "./BossHelper";
import { Helpers } from "./Helpers";
import { Hp } from "./Hp";


export class LevelController {
    level: number = 1;
    points: number = 0;
    private readonly lvGoal = 3;
    enemyToKill = this.lvGoal;

    killsToHp;
    hp: Hp | null = null;

    stars: Star[][] = [];
    boss: Boss | null = null;
    bossHelpers: BossHelper[] = []
    ufoTab: Ufo[] = []
    constructor(stars: Star[][]) {
        this.stars = stars
        this.killsToHp = Helpers.getRandomInt(1, 2)
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
                    this.bossHelpers = [];
                    this.level++;
                    this.enemyToKill = this.lvGoal
                    this.killsToHp = Helpers.getRandomInt(1, 2)
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

        if (this.hp != null)
            switch (this.hp.state) {
                case 2:
                    player.hp++
                    this.hp = null
                    break;
                case 1:
                    this.hp.update(ctx, player)
                    break;
                case 0:
                    this.hp = null
                    break;
                case -1:
                    this.hp.update(ctx, player)
                    break;
                case -2:
                    this.playerDies(player)
                    break;
            }

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
                    if (ufo.bullet == null) {
                        this.ufoTab.splice(i, 1);
                        i--;
                    } else {
                        ufo.state = -3
                    }
                    this.enemyToKill--;
                    this.points += 44;

                    if (this.enemyToKill == this.killsToHp) {
                        console.log("spwan hp")
                        let k = Helpers.getRandomInt(1, 5)
                        this.hp = new Hp(this.stars[k][this.stars[k].length - 1], this.stars[k][0])
                    }
                    if (this.checkLv())
                        this.spawnUfo()
                    break
                case -1:
                    this.killsToHp++
                    this.enemyToKill--;
                    this.points += 44;
                    this.playerDies(player)
                    break
                case -2:
                    this.ufoTab.splice(i, 1);
                    i--;
                    this.spawnUfo()
                    break
                case -3:
                    ufo.drawBullet(ctx)
                    if (ufo.bullet == null) {
                        this.ufoTab.splice(i, 1);
                        i--;
                    }
                    break
            }

        }

    }

    playerDies = (player: Player) => {
        this.hp = null
        this.ufoTab = [];
        player.die()
        if (player.hp > 0) {
            setTimeout(() => {
                if (this.checkLv())
                    this.spawnUfo()
            }, 2400)
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
        console.log(this.killsToHp)
    }

}

