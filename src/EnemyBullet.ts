import { Player } from "./Player";
import { Helpers } from "./Helpers";
import { Star } from "./Star";
import { Enemy } from "./Enemy";

export class EnemyBullet extends Enemy {
    fps: number = 0
    state: number = 1;
    imgState: string = "1";
    constructor(start: Star, target: Star) {
        super('./gfx/bullets/enemy/1.png', 15)
        this.xHitBox = 30;
        this.yHitBox = 30
        this.x = start.x
        this.y = start.y
        this.go(target)
    }

    changeImg = () => {
        if (this.imgState == "1") {
            this.image.src = "./gfx/bullets/enemy/2.png"
            this.imgState = "2"
        }
        else {
            this.image.src = "./gfx/bullets/enemy/1.png"
            this.imgState = "1"
        }
    }

    update = (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        this.fps++
        if (this.fps == 2) {
            this.changeImg()
            this.fps = 0
        }

        if (this.y > 500)
            this.state = 0;

        this.x += this.vecX
        this.y += this.vecY

    }

}

