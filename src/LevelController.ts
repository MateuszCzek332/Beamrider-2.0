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
                case 1:
                    ufo.update(ctx, player)
                    break
                case 0:
                    player.bullet = null
                    this.ufoTab.splice(i, 1)
                    i--
                    this.spawnUfo()
                    break
            }

        }
    }

    spawnUfo = () => {
        this.ufoTab.push(new Ufo())
    }

}

