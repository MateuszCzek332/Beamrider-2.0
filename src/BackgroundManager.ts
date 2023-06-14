import { Star } from "./Star";

export class BackgroundManager {

    private readonly starsWith = 10
    private readonly starsHeight = 3;
    stars: Star[][] = [];
    constructor() {
        this.createStars()
    }

    update = (ctx: CanvasRenderingContext2D) => {
        this.drawStars(ctx)
    }

    createStars = () => {
        let target = {
            x: 400,
            y: -200
        }
        for (let i: number = 0; i <= 6; i += 1) {
            let y: number = 400;
            let x: number = i * 133.3;
            let extraPadding: number = i == 0 ? -90 : i == 6 ? 90 : 0

            let dx = (target.x - x) / 19
            let dy = (target.y - y) / 19
            this.stars[i] = []
            for (let j: number = 0; j < 11; j++) {
                let starX = x + j * dx - this.starsWith / 2 + extraPadding
                let starY = y + j * dy - this.starsHeight / 2
                if (starY < 26)
                    break
                this.stars[i].push({
                    x: starX,
                    y: starY,
                })
            }
        }
    }

    drawStars = (ctx: CanvasRenderingContext2D) => {
        for (let i: number = 0; i < this.stars.length; i++) {
            for (let j: number = 0; j < this.stars[i].length; j++) {
                let star = this.stars[i][j]
                ctx.fillStyle = "rgb(56,104,144)";
                ctx.fillRect(star.x, star.y, this.starsWith, this.starsHeight)
            }
        }
    }
}

