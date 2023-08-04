import { Star } from "./Star"
import { Player } from "./Player";
import { Helpers } from "./Helpers";
import { Enemy } from "./Enemy";
import { EnemyBullet } from "./EnemyBullet";

export class Ufo extends Enemy {
    static stars: Star[][] = []
    static readonly maxLv = 2
    bullet: EnemyBullet | null = null
    attack: string[];
    state: number = 1;
    line: number;
    level: number;
    constructor(stars: Star[][], lv: number) {
        super('./gfx/enemy/ufo/5.png', 10)
        if (Ufo.stars.length == 0)
            Ufo.stars = stars
        this.level = (lv > Ufo.maxLv ? Ufo.maxLv : lv) - 1
        this.x = 400
        this.y = 70
        this.line = 3

        // this.attack = [...attacks[Helpers.getRandomInt(0, maxAttackPerLv[this.level])]];
        this.attack = [...attacks[0]];
        this.readComand()
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);

        this.drawBullet(ctx)

        if (this.checkTarget()) {
            this.readComand();
        }
        this.x += this.vecX;
        this.y += this.vecY;


        if (Helpers.checkCollision(this, player.bullet))
            this.state = 0;
        else if (Helpers.checkCollision(this, player))
            this.state = -1;
        else if (Helpers.checkCollision(this.bullet, player))
            this.state = 2;

    }

    drawBullet = (ctx: CanvasRenderingContext2D,) => {
        if (this.bullet != null) {
            this.bullet.update(ctx);
            if (this.bullet.state == 0)
                this.bullet = null;
        }
    }

    readComand = () => {
        if (this.attack.length == 0)
            this.attack = [...attacks[0]]
        // this.attack = [...attacks[Helpers.getRandomInt(2, 3)]]

        switch (this.attack[0]) {
            case "goToRandomX":
                let x = Helpers.getRandomInt(200, 600)
                this.go({ x: x, y: this.y })
                this.attack.shift()
                break
            case "goToRandom":
                this.line = Helpers.getRandomInt(1, 5)
                let j = Helpers.getRandomInt(4, 10)
                this.go(Ufo.stars[this.line][j])
                this.attack.shift()
                break
            case "goBack":
                let k = Ufo.stars[this.line].length - 1
                this.go(Ufo.stars[this.line][k])
                this.attack.shift()
                break
            case "goKamikaze":
                this.go(Ufo.stars[this.line][0])
                this.target!.x += 15 * this.vecX
                this.target!.y += 15 * this.vecY
                this.attack.shift()
                break
            case "shoot":
                let t = Ufo.stars[this.line][0]
                this.bullet = new EnemyBullet({ x: this.x, y: this.y }, { x: t.x, y: t.y })
                this.attack.shift()
                this.readComand()
                break
            case "die":
                this.state = -2;
                break
        }

    }

}

const maxAttackPerLv: number[] = [3, 3]

const attacks = [
    [
        "goToRandomX",
        "goToRandomX",
        "goToRandom",
        "shoot",
        "goBack",
    ],
    [
        "goToRandomX",
        "goToRandomX",
        "goToRandomX",
        "goToRandom",
        "goToRandom",
        "goKamikaze",
        "die",
    ],
    [
        "goToRandomX",
        "goToRandomX",
        "goToRandom",
        "goBack",
    ],
    [
        "goToRandomX",
        "goToRandomX",
        "goToRandom",
        "goToRandom",
        "goBack",
    ],
    [
        "goToRandomX",
        "goToRandomX",
        "goToRandom",
        "goToRandom",
        "goToRandom",
        "goToRandom",
        "goBack",
    ],
]
