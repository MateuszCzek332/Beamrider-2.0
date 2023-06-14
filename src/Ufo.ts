import { GameObject } from "./GameObject"
import { Player } from "./Player";
import { Helpers } from "./Helpers";

export class Ufo extends GameObject {
    private readonly s = 6;
    speed: number = 0;
    state: number = 1;
    constructor() {
        super('./gfx/enemy/ufo/5.png')
        this.x = 400
        this.y = 70
        this.speed = this.s
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);

        if (player.bullet != null && player.bullet.state != 0 && Helpers.checkCollision(this, player.bullet)) {
            this.state = 0;
            this.speed = 0
        }

        this.y += this.speed

        if (this.y > 250 || this.y < 70)
            this.speed = -this.speed

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

    // drawAmmo = (ctx: CanvasRenderingContext2D) => {
    //     for (let i: number = 0; i < this.ammo; i++) {
    //         ctx.fillStyle = "purple";
    //         ctx.fillRect(280 - i * 20, 10, 10, 10)
    //     }
    // }

}

