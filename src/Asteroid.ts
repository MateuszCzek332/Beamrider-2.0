import { Star } from "./Star";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Helpers } from "./Helpers";

// Asteroid States
//  1 alive
//  0 dead
// -1 kill player

export class Asteroid extends Enemy {
    state: number = 1;
    constructor(start: Star, target: Star) {
        super('./gfx/enemy/asteroid/1.png', 10)
        this.xHitBox = 30;
        this.yHitBox = 30
        this.x = start.x
        this.y = start.y
        this.go(target)
    }

    changeImg = () => {
        switch (true) {
            case this.y < 120 && this.image.src != './gfx/enemy/asteroid/1.png':
                this.image.src = './gfx/enemy/asteroid/1.png'
                break
            case this.y < 150 && this.image.src != './gfx/enemy/asteroid/2.png':
                this.image.src = './gfx/enemy/asteroid/2.png'
                break
            case this.y < 200 && this.image.src != './gfx/enemy/asteroid/3.png':
                this.image.src = './gfx/enemy/asteroid/3.png'
                break
            case this.image.src != './gfx/enemy/asteroid/4.png':
                this.image.src = './gfx/enemy/asteroid/4.png'
                break
        }
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        this.changeImg()

        if (Helpers.checkCollision(this, player.bullet)) {
            if (player.bullet?.type == 2)
                this.state = 0
            player.bullet = null;
        }
        else if (Helpers.checkCollision(this, player)) {
            this.state = -1
        }
        else if (this.y > 500)
            this.state = 0;

        this.x += this.vecX
        this.y += this.vecY

    }

}

