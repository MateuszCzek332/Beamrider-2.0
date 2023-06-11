import { GameObject } from "./GameObject";

export class Helpers {
    static checkCollision = (obj1: GameObject, obj2: GameObject | null) => {
        if (obj1 == null || obj2 == null)
            return false;

        if (
            obj1.x + obj1.xd < obj2.xd + obj2.x + obj2.width &&
            obj1.x + obj1.xd + obj1.width > obj2.x + obj2.xd &&
            obj1.y + obj1.yd < obj2.y + obj2.yd + obj2.height &&
            obj1.height + obj1.y + + obj1.yd > obj2.y + obj2.yd
        )
            return true;
        return false;
    }

    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}