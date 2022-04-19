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
            const { width, height } = this.scale;
           const map = this.make.tilemap({ key: "dungeon" });
           const tileset = map.addTilesetImage('dungeon', 'tiles');

           map.addTilesetImage('dungeon', 'tiles');

           map.createLayer('Floor', tileset);
           map.createLayer('Walls', tileset);
        }

    }