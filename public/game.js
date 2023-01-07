import { MyGame } from "./scenes/maingame.js"
import { Gameover } from "./scenes/gameover.js"

const config = {	
	type: Phaser.AUTO,
	parent: "container",
	width:700,
	height:500,
	physics: {
		default: "arcade",
		arcade:{
			gravity : {y:300}
		},
	},
	scene: [MyGame,Gameover],
}


const game = new Phaser.Game(config)