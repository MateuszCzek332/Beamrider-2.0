import { Star } from "./Star"
import { Player } from "./Player";
import { Helpers } from "./Helpers";
import { Enemy } from "./Enemy";

const maxAttackPerLv: number[] = [3, 3]

const attacks = [
    [
        "goToRandomX",
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

export class Ufo extends Enemy {
    static stars: Star[][] = []
    static readonly maxLv = 2
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

        this.attack = [...attacks[Helpers.getRandomInt(0, maxAttackPerLv[this.level])]];
        this.readComand()
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        if (this.checkTarget()) {
            this.readComand();
        }
        this.x += this.vecX;
        this.y += this.vecY;


        if (player.bullet != null && player.bullet.state != 0 && Helpers.checkCollision(this, player.bullet)) {
            this.state = 0;
            this.speed = 0
        }


        // if ((this.speed > 0 && this.y > 100) || (this.speed < 0 && this.y < 30))
        //     this.speed *= -1


        // this.drawAmmo(ctx)
        // if (this.bullet != null) {
        //     this.bullet.update(ctx);
        //     if (this.bullet.state == 0)
        //         this.bullet = null;
        // }
        // this.x += this.speed
        // if ((this.speed > 0 && this.x > this.targetX) || this.speed < 0 && this.x < this.targetX) {
        //     this.canMove = true
        //     this.speed = 0;
        //     this.x = this.targetX;
        // }

    }

    readComand = () => {
        if (this.attack.length == 0)
            this.attack = [...attacks[Helpers.getRandomInt(2, 3)]]

        switch (this.attack[0]) {
            case "goToRandomX":
                let x = Helpers.getRandomInt(200, 600)
                this.go({ x: x, y: this.y })
                break
            case "goToRandom":
                this.line = Helpers.getRandomInt(1, 5)
                let j = Helpers.getRandomInt(4, 10)
                this.go(Ufo.stars[this.line][j])
                break
            case "goBack":
                let k = Ufo.stars[this.line].length - 1
                this.go(Ufo.stars[this.line][k])
                break
            // case "die":
            //     this.state = 0;
            //     break
        }
        this.attack.shift()
    }

    // drawAmmo = (ctx: CanvasRenderingContext2D) => {
    //     for (let i: number = 0; i < this.ammo; i++) {
    //         ctx.fillStyle = "purple";
    //         ctx.fillRect(280 - i * 20, 10, 10, 10)
    //     }
    // }

}

