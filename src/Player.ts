import { GameObject } from "./GameObject"
import { PlayerBullet } from "./PlayerBullet";

export class Player extends GameObject {
    private readonly s = 30;
    private readonly startX = 400;

    speed: number = 0;
    pos: number = 0;
    canMove: boolean = true;
    targetX: number = 150;
    bullet: PlayerBullet | null = null;
    ammo: number = 3;
    constructor() {
        super('./gfx/player/1.PNG')
        this.x = this.startX
        this.y = 435

        document.addEventListener("keydown", (event) => {
            if (this.canMove) {
                if (event.isComposing || event.keyCode === 37) {
                    if (this.pos > -2) {
                        this.canMove = false
                        this.pos--
                        this.speed = -this.s
                        this.targetX = this.startX + this.pos * 140
                    }
                }
                else if (event.isComposing || event.keyCode === 39) {
                    if (this.pos < 2) {
                        this.canMove = false
                        this.pos++
                        this.speed = this.s
                        this.targetX = this.startX + this.pos * 140
                    }
                }
                else if (event.isComposing || event.keyCode === 32) {
                    if (this.canMove && this.bullet == null) {
                        this.bullet = new PlayerBullet(1, this.x)
                    }
                }
                else if (event.isComposing || event.keyCode === 38) {
                    if (this.canMove && this.bullet == null && this.ammo > 0) {
                        this.bullet = new PlayerBullet(2, this.x)
                        this.ammo--
                    }
                }
            }
        });
    }

    update = (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        this.drawAmmo(ctx)
        if (this.bullet != null) {
            this.bullet.update(ctx);
            if (this.bullet.state == 0)
                this.bullet = null;
        }
        this.x += this.speed
        if ((this.speed > 0 && this.x > this.targetX) || this.speed < 0 && this.x < this.targetX) {
            this.canMove = true
            this.speed = 0;
            this.x = this.targetX;
        }

    }

    drawAmmo = (ctx: CanvasRenderingContext2D) => {
        for (let i: number = 0; i < this.ammo; i++) {
            ctx.fillStyle = "purple";
            ctx.fillRect(754 - i * 44, 22, 22, 22)
        }
    }

}

