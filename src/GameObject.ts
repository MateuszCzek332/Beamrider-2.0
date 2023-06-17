export abstract class GameObject {
    image: HTMLImageElement = new Image;
    x: number = 0;
    y: number = 0;
    xd: number = 0;
    yd: number = 0;
    width: number = 0;
    height: number = 0;
    xHitBox: number = 0;
    yHitBox: number = 0;
    constructor(src: string) {
        this.image.src = src
        this.image.onload = () => {
            this.imgOnLoad()
        }
    }

    imgOnLoad() {
        this.width = this.image.width;
        this.height = this.image.height;
        this.xd = this.xHitBox = this.image.width / 2
        this.yd = this.yHitBox = this.image.height / 2
        console.log(this.xHitBox, this.yHitBox)
    }

    // update = (ctx: CanvasRenderingContext2D) => {
    //     ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
    // }

}

