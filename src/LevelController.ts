import { Star } from "./Star";
import { Ufo } from "./Ufo";
import { Player } from "./Player";
import { Helpers } from "./Helpers";
export class LevelController {

    private readonly starsWith = 5
    private readonly starsHeight = 2;
    stars: Star[][] = [];
    ufoTab: Ufo[] = []
    constructor() {
        this.spawnUfo()
    }

    update = (ctx: CanvasRenderingContext2D, player: Player) => {
        this.drawUfo(ctx, player)
    }

    drawUfo = (ctx: CanvasRenderingContext2D, player: Player) => {
        for (let i: number = 0; i < this.ufoTab.length; i++) {
            let ufo = this.ufoTab[i]
            switch (ufo.state) {
                case 0:
                    this.ufoTab.splice(i, 1)
                    player.bullet = null
                    this.spawnUfo()
                    break
                case 1:

                    if (Helpers.checkCollision(this.ufoTab[i], player.bullet))
                        ufo.state = 0
                    else
                        ufo.update(ctx)
                    break
            }

        }
    }

    spawnUfo = () => {
        this.ufoTab.push(new Ufo())
    }

}

