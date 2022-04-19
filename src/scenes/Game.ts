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
           const map = this.make.tilemap({ key: "map" });
           map.addTilesetImage('map', 'tiles');
        }

    }