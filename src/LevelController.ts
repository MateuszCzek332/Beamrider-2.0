import { Star } from "./Star";
import { Ufo } from "./Ufo";
import { Player } from "./Player";
import { Boss } from "./Boss";
import { BossHelper } from "./BossHelper";
import { Helpers } from "./Helpers";
import { Hp } from "./Hp";
import { Asteroid } from "./Asteroid";
import { Pac } from "./Pac";
import { Ball } from "./Ball";


export class LevelController {
    level: number = 1;
    playerAlive: boolean = true;
    points: number = 0;
    private readonly lvGoal = 5;
    enemyToKill = this.lvGoal;

    killsToHp;
    hp: Hp | null = null;

    stars: Star[][] = [];
    boss: Boss | null = null;
    bossHelpers: BossHelper[] = []
    ufoTab: Ufo[] = []
    asteroidsTab: Asteroid[] = []
    pac: Pac | null = null;
    ball: Ball | null = null;
    killsToPac;

    constructor(stars: Star[][]) {
        this.stars = stars
        this.killsToHp = Helpers.getRandomInt(2, 3)
        this.killsToPac = Helpers.getRandomInt(1, 4)
        // this.spawnEnemys()
        // this.spawnPac()
        this.spawnBall()
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
                    this.killsToPac = Helpers.getRandomInt(1, 4)
                    this.spawnEnemys()
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
        this.updateHp(ctx, player)
        this.updateUfo(ctx, player)
        this.updateAsteroids(ctx, player)
        this.updatePac(ctx, player)
        this.updateBall(ctx, player)
    }

    updateHp = (ctx: CanvasRenderingContext2D, player: Player) => {
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
    }

    updateUfo = (ctx: CanvasRenderingContext2D, player: Player) => {
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

                    this.checkSpawns()
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

    updateAsteroids = (ctx: CanvasRenderingContext2D, player: Player) => {
        for (let i: number = 0; i < this.asteroidsTab.length; i++) {
            let asteroid = this.asteroidsTab[i]
            switch (asteroid.state) {
                case 1:
                    if (this.playerAlive)
                        asteroid.update(ctx, player)
                    break
                case 0:
                    this.asteroidsTab.splice(i, 1);
                    i--;
                    this.spawnAsteroid()
                    break
                case -1:
                    this.playerDies(player)
                    break
            }

        }
    }

    updatePac = (ctx: CanvasRenderingContext2D, player: Player) => {
        if (this.pac != null)
            switch (this.pac.state) {
                case 1:
                    this.pac.update(ctx, player)
                    break
                case 0:
                    this.pac = null
                    break
                case -1:
                    this.pac = null
                    this.points += 88
                    this.enemyToKill--
                    this.checkLv()
                    break
            }


    }

    updateBall = (ctx: CanvasRenderingContext2D, player: Player) => {
        if (this.ball != null)
            switch (this.ball.state) {
                case 2:
                    this.ball = null
                    this.playerDies(player)
                    break
                case 1:
                    this.ball.update(ctx, player)
                    break
                case 0:
                    this.ball = null
                    break
                case -1:
                    this.ball = null
                    this.points += 150
                    break
            }


    }

    playerDies = (player: Player) => {
        this.hp = null
        this.ufoTab = [];
        this.asteroidsTab = [];
        this.playerAlive = false
        player.die()
        if (player.hp > 0) {
            setTimeout(() => {
                this.playerAlive = true
                if (this.checkLv())
                    this.spawnEnemys()
            }, 3000)
        }
    }

    checkLv = () => {
        if (this.enemyToKill == 0) {
            this.ufoTab = [];
            this.asteroidsTab = [];
            this.pac = null;
            this.hp = null;
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

    spawnEnemys = () => {
        this.asteroidsTab = []
        this.spawnUfo()
        this.spawnAsteroids()
    }

    checkSpawns = () => {
        if (this.enemyToKill == this.killsToHp)
            this.spawnHp()

        if (Math.random() < 0.15)
            this.spawnPac()

        if (Math.random() < 0.08)
            this.spawnBall()


    }

    spawnUfo = () => {
        this.ufoTab.push(new Ufo(this.stars, this.level))
    }

    spawnHp = () => {
        let k = Helpers.getRandomInt(1, 5)
        this.hp = new Hp(this.stars[k][this.stars[k].length - 1], this.stars[k][0])
    }

    spawnAsteroids = () => {
        if (this.level > 1) {
            for (let i = 0; i < 2; i++) {
                this.spawnAsteroid()
            }
        }
    }

    spawnAsteroid = () => {
        let k = Helpers.getRandomInt(1, 5)
        setTimeout(() => this.playerAlive && this.boss == null ? this.asteroidsTab.push(new Asteroid(this.stars[k][this.stars[k].length - 1], this.stars[k][0])) : null, Helpers.getRandomInt(10, 3000))
    }

    spawnPac = () => {
        if (this.level > 2 && this.pac == null) {
            let k = Math.random() > 0.5 ? 0 : 6
            let l = k == 0 ? 6 : 0
            this.pac = new Pac(this.stars[k][Helpers.getRandomInt(6, 9)], this.stars[l][Helpers.getRandomInt(6, 9)])
        }
    }

    spawnBall = () => {
        if (this.level > 0 && this.ball == null) {
            this.ball = new Ball(this.stars, 0, Helpers.getRandomInt(7, 9))
        }
    }

}

