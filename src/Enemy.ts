import { GameObject } from "./GameObject"
import { Player } from "./Player";
import { Helpers } from "./Helpers";
import { Star } from "./Star";

//STATES
// 2 - alive, player get hit by shoot 
// 1 - alive
// 0 - kiled by player
// -1 - player and enemy colision
// -2 - dead, but draw bullet

export abstract class Enemy extends GameObject {
    speed: number
    state: number = 1;
    vecX: number = 0;
    vecY: number = 0;
    target: Star | null = null;
    constructor(src: string, speed: number) {
        super(src)
        this.speed = speed;

    }

    go = (target: Star) => {
        this.target = { x: target.x, y: target.y }
        let d = Math.sqrt(Math.pow(target.x - this.x, 2) + Math.pow(target.y - this.y, 2))
        let v = d / this.speed
        this.vecX = (target.x - this.x) / v
        this.vecY = (target.y - this.y) / v
    }

    checkTarget = () => {
        if (this.target == null)
            return true;

        if (this.vecY < 0 && this.y < this.target.y) {
            return true;
        }
        else if (this.vecY > 0 && this.y > this.target.y) {
            return true;
        }
        else if (this.vecX < 0 && this.x < this.target.x) {
            return true;
        }
        else if (this.vecX > 0 && this.x > this.target.x) {
            return true;
        }
        return false;
    }

}

