import { Star } from "./Star";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Helpers } from "./Helpers";

// Ball States
//  2 hit player
//  1 alive
//  0 suiside
// -1 killed by player

const attack = [
    "goNextLine",
    "goDown",
    "goUp",
    "goNextLine",
    "goDown",
    "goUp",
    "goNextLine",
    "goDown",
    "goUp",
    "goNextLine",
    "goDown",
    "goUp",
    "goNextLine",
    "goDown",
    "goUp",
    "goLastLine",
    "die",
]

export class Ball extends Enemy {
    static stars: Star[][] = []
    attack: string[] = [...attack];
    state: number = 1;
    line: number;
    row: number;
    goRight: boolean;
    constructor(stars: Star[][], i: number, j: number) {
        super('./gfx/enemy/ball/1.png', 12)
        if (Ball.stars.length == 0)
            Ball.stars = stars
        this.xHitBox = 30;
        this.yHitBox = 30
        this.goRight = i == 0;
        this.line = i;
        this.row = j;
        let start = stars[i][j]
        this.x = start.x - 7 * this.vecX
        this.y = start.y - 7 * this.vecY
        this.readComand()
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        if (this.checkTarget()) {
            this.readComand()
        }

        if (Helpers.checkCollision(this, player)) {

            this.state = 2
        }
        if (Helpers.checkCollision(this, player.bullet)) {
            if (player.bullet!.type == 2)
                this.state = -1
            player.bullet = null
        }

        this.x += this.vecX
        this.y += this.vecY
    }

    readComand = () => {
        switch (this.attack[0]) {
            case "goNextLine":
                if (this.goRight) {
                    this.go(Ball.stars[this.line + 1][this.row])
                    this.line++
                }
                else {
                    this.go(Ball.stars[this.line - 1][this.row])
                    this.line--
                }
                break
            case "goLastLine":
                if (this.goRight)
                    this.go(Ball.stars[this.line + 1][this.row])
                else
                    this.go(Ball.stars[this.line - 1][this.row])
                this.target!.x + 7 * this.vecX
                this.target!.y + 7 * this.vecY

                break
            case "goDown":
                this.go(Ball.stars[this.line][0])
                this.target!.x += 3 * this.vecX
                this.target!.y += 3 * this.vecY
                break
            case "goUp":
                this.go(Ball.stars[this.line][this.row])
                break
            case "die":
                this.state = 0
                break
        }
        this.attack.shift()
    }

}
