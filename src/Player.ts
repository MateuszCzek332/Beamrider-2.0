import { GameObject } from "./GameObject"

export class Player extends GameObject {
    private readonly s = 14;
    speed: number = 0;
    pos: number = 0;
    canMove: boolean = true;
    targetX: number = 150;

    constructor() {
        super('./gfx/player/1.PNG')
        this.x = 150
        this.y = 133

        document.addEventListener("keydown", (event) => {
            if (this.canMove) {
                if (event.isComposing || event.keyCode === 37) {
                    if (this.pos > -2) {
                        this.canMove = false
                        this.pos--
                        this.speed = -this.s
                        this.targetX = 150 + this.pos * 52
                    }
                }
                else if (event.isComposing || event.keyCode === 39) {
                    if (this.pos < 2) {
                        this.canMove = false
                        this.pos++
                        this.speed = this.s
                        this.targetX = 150 + this.pos * 52
                    }
                }
            }
        });
    }

    update = (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        this.x += this.speed
        if ((this.speed > 0 && this.x > this.targetX) || this.speed < 0 && this.x < this.targetX) {
            this.canMove = true
            this.speed = 0;
            this.x = this.targetX;
        }

    }

}
