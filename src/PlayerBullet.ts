import { GameObject } from "./GameObject";
import { Star } from "./Star";

export class PlayerBullet extends GameObject {
    private readonly speed: number = 19;
    private readonly topBounty: number = 120;
    private readonly target: Star = {
        x: 400,
        y: -200
    }
    state: number = 1;
    type: number;
    vx: number;
    vy: number;
    constructor(type: number, x: number) {
        super(type == 1 ? '/gfx/bullets/player/bullet1.png' : '/gfx/bullets/player/bullet2-1.png')
        this.xHitBox = 30;
        this.yHitBox = 50
        this.type = type;
        this.x = x;
        this.y = 400;
        let xdiff = x - this.target.x
        let ydiff = this.y - this.target.y
        this.vx = xdiff / this.speed
        this.vy = ydiff / this.speed
    }

    imgOnLoad() {
        this.width = this.image.width;
        this.height = this.image.height;
        this.xd = this.image.width / 2
        this.yd = this.image.height / 2
        this.xHitBox = 23
        this.yHitBox = 15
    }

    update = (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        this.x -= this.vx;
        this.y -= this.vy;

        if (this.type == 2) {
            if (this.y < 150) {
                this.image.src = '/gfx/bullets/player/bullet2-3.png'
            }
            else if (this.y < 300) {
                this.image.src = '/gfx/bullets/player/bullet2-2.png'
            }

        }

        if ((this.type == 1 && this.y < this.topBounty) || (this.type == 2 && this.y < 0)) {
            this.state = 0;
        }

    }

}