export abstract class GameObject {
    image: HTMLImageElement = new Image;
    x: number = 0;
    y: number = 0;
    xd: number = 0;
    yd: number = 0;
    width: number = 0;
    height: number = 0;
    constructor(src: string) {
        this.image.src = src
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
            this.xd = this.image.width / 2
            this.yd = this.image.height / 2
        }
    }

    // update = (ctx: CanvasRenderingContext2D) => {
    //     ctx.drawImage(this.image, this.x - this.xd, this.y - this.yd);
    // }

}

