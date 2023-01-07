export class Gameover extends Phaser.Scene{
	constructor(){
		super("gameover")
	}

	preload(){

	}
	create(){
		this.gameover = this.add.text(255,220,"GAMEOVER").setScale(2)
		this.add.text(255,250,"click to restart")
		this.input.on("pointerdown", pointer => {
			this.scene.start("game-scene")
		})
	}
	update(){

	}
}