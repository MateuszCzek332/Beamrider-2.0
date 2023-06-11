import { GameObject } from "./GameObject";
import { Star } from "./Star";

export class PlayerBullet extends GameObject {
    private readonly speed: number = 10;
    private readonly topBounty: number = 33;
    private readonly target: Star = {
        x: 150,
        y: -60
    }
    state: number = 1;
    type: number;
    vx: number;
    vy: number;
    constructor(type: number, x: number) {
        super(type == 1 ? '/gfx/bullets/player/bullet1.png' : '/gfx/bullets/player/bullet2-1.png')
        this.type = type;
        this.x = x;
        this.y = 120;
        let xdiff = x - this.target.x
        let ydiff = 180
        this.vx = xdiff / this.speed
        this.vy = ydiff / this.speed
    }

    update = (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        this.x -= this.vx;
        this.y -= this.vy;

        if (this.type == 2) {
            if (this.y < 60) {
                this.image.src = '/gfx/bullets/player/bullet2-3.png'
            }
            else if (this.y < 100) {
                this.image.src = '/gfx/bullets/player/bullet2-2.png'
            }

        }

        if ((this.type == 1 && this.y < this.topBounty) || (this.type == 2 && this.y < 0)) {
            this.state = 0;
        }

    }

}