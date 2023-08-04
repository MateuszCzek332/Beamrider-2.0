import { Star } from "./Star";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Helpers } from "./Helpers";

// HP States
//  2 heal player
//  1 alive
//  0 out of scren
// -1 dead
// -2 kill player

export class Hp extends Enemy {
    state: number = 1;
    constructor(start: Star, target: Star) {
        super('./gfx/hp/4.png', 10)
        this.xHitBox = 30;
        this.yHitBox = 30
        this.x = start.x
        this.y = start.y
        this.go(target)
    }

    changeImg = () => {
        switch (true) {
            case this.y < 133 && this.image.src != './gfx/hp/4.png':
                this.image.src = './gfx/hp/4.png'
                break
            case this.y < 166 && this.image.src != './gfx/hp/3.png':
                this.image.src = './gfx/hp/3.png'
                break
            case this.y < 200 && this.image.src != './gfx/hp/2.png':
                this.image.src = './gfx/hp/2.png'
                break
            case this.image.src != './gfx/hp/1.png':
                this.image.src = './gfx/hp/1.png'
                break
        }
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        if (this.state == 1)
            this.changeImg()

        if (Helpers.checkCollision(this, player.bullet)) {
            this.state = -1;
            this.image.src = './gfx/hp/dead.png'
        }
        else if (Helpers.checkCollision(this, player)) {
            this.state = this.state == 1 ? 2 : -2
        }
        else if (this.y > 500)
            this.state = 0;

        this.x += this.vecX
        this.y += this.vecY

    }

}

