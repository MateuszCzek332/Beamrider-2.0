import { GameObject } from "./GameObject"
import { Player } from "./Player";
import { Helpers } from "./Helpers";

export class Boss extends GameObject {
    private readonly speed = 7;
    state: number = 1;
    constructor() {
        super('./gfx/enemy/boss/boss.png')
        this.x = 0
        this.y = 70
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);

        this.x += this.speed;

        if (this.x > 800)
            this.state = 0

        if (player.bullet != null && player.bullet.state != 0 && Helpers.checkCollision(this, player.bullet)) {
            this.state = 0;
        }

    }

}

