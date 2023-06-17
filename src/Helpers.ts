import { GameObject } from "./GameObject";

export class Helpers {
    static checkCollision = (obj1: GameObject | null, obj2: GameObject | null) => {
        if (obj1 == null || obj2 == null)
            return false;

        if (
            obj1.x - obj1.xHitBox < obj2.x + obj2.xHitBox &&
            obj1.x + obj1.xHitBox > obj2.x - obj2.xHitBox &&
            obj1.y - obj1.yHitBox < obj2.y + obj2.yHitBox &&
            obj1.y + obj1.yHitBox > obj2.y - obj2.yHitBox
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