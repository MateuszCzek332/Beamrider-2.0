export class BackgroundManager {

    private readonly starsWith = 5
    private readonly starsHeight = 2;;
    stars: Star[][] = [];
    constructor() {
        this.createStars()
    }

    update = (ctx: CanvasRenderingContext2D) => {
        this.drawStars(ctx)
    }

    createStars = () => {
        let target = {
            x: 150,
            y: -60
        }
        let w: number = 5;
        let h: number = 2;
        for (let i: number = 0; i <= 6; i += 1) {
            let y: number = 120;
            let x: number = i * 50;
            let extraPadding: number = i == 0 ? -30 : i == 6 ? 30 : 0

            let dx = (target.x - x) / 16
            let dy = (target.y - y) / 16
            this.stars[i] = []
            for (let j: number = 0; j < 12; j++) {
                let starX = x + j * dx - w / 2 + extraPadding
                let starY = y + j * dy - h / 2
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

interface Star {
    x: number;
    y: number;
}
