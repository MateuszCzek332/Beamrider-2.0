import { Player } from "./Player";
import { Helpers } from "./Helpers";
import { Star } from "./Star";
import { Enemy } from "./Enemy";

const attack = [
    "goToStar1",
    "goToStar2",
    "die",
]

export class BossHelper extends Enemy {
    state: number = 1;
    star1: Star;
    star2: Star;
    attack: string[] = [...attack];
    constructor(stars: Star[][]) {
        super('./gfx/enemy/boss/helper.png', 20)
        this.x = Math.random() > 0.5 ? 0 : 800
        let i = Helpers.getRandomInt(1, 5)
        let j = Helpers.getRandomInt(6, 9)
        this.star1 = stars[i][j]
        this.star2 = stars[i][0]
        this.y = this.star1.y
        this.readComand()
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
        if (this.checkTarget()) {
            this.readComand()
        }

        this.x += this.vecX
        this.y += this.vecY

        if (player.bullet != null && player.bullet.state != 0 && Helpers.checkCollision(this, player.bullet)) {
            if (player.bullet.type == 2)
                this.state = 0;
            player.bullet = null;
        }


    }

    readComand = () => {
        switch (this.attack[0]) {
            case "goToStar1":
                this.go(this.star1)
                break
            case "goToStar2":
                this.go(this.star2)
                this.target!.x += 5 * this.vecX;
                this.target!.y += 5 * this.vecY;
                break
            case "die":
                this.state = 0;
                break
        }
        this.attack.shift()
    }

}

