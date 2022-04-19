/* eslint-disable @typescript-eslint/no-empty-function */
import Phaser from "phaser";

export default class Game extends Phaser.Scene 
    {
        constructor() 
        {
            super({ key: "Game" });
        }

        preload()
        {
        }

        create() 
        {
            this.add.image(400, 300, "tiles");
        }

    }