import { Star } from "./Star";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Helpers } from "./Helpers";

// Pac States
//  1 alive
//  0 suiside
// -1 killed by player

export class Pac extends Enemy {
    state: number = 1;
    constructor(start: Star, target: Star) {
        super('./gfx/enemy/pac/1.png', 20)
        this.xHitBox = 30;
        this.yHitBox = 30
        this.x = start.x
        this.y = start.y
        this.go(target)
        this.x = start.x - 7 * this.vecX
        this.y = start.y - 7 * this.vecY
        this.target!.x + 7 * this.vecX
        this.target!.y + 7 * this.vecY
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);

        if (Helpers.checkCollision(this, player.bullet)) {
            this.state = -1
        }
        else if (this.x > 950 || this.x < -150) {
            this.state = 0;
        }

        this.x += this.vecX
        this.y += this.vecY
    }

}
