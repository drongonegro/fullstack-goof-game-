const socket = io()

export class MyGame extends Phaser.Scene{
	constructor() {
		super("game-scene")
	}
	preload(){	
		this.load.spritesheet("dude", "./assets/dude.png", {
			frameWidth: 32,
			frameHeight: 48
		})

		this.load.image("star", "./assets/star.png")

	}
	create(){
		this.dude = this.physics.add.sprite(100,500,"dude")
		this.dude.body.collideWorldBounds = true 

		this.count = 0		
		this.timeCount = 0


		this.timecnt = this.add.text(680,0,"0").setScale(2)
		this.score = this.add.text(0,0,"0").setScale(2)

		this.anims.create({
			key: "def",
			frames: [{ key: "dude", frame: 4 }]
		})

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 3,
				end: 0
			}),
			frameRate: 10
		})
		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 5,
				end: 8
			}),
			frameRate: 10
		})
		this.time.addEvent({ delay: 3000, callback: this.createStars, callbackScope: this, loop: true});
		this.time.addEvent({ delay: 1000, callback: this.increment, callbackScope: this, loop: true});

	}
	createStars(){
		this.stars = this.physics.add.group({
			key: "star",
			repeat: 5,
			setXY: { x: 150, y: 0, stepX: 70}
		})

		this.stars.children.iterate(star => {
			star.body.collideWorldBounds = true
			star.setBounceY(0.3)
		})

		this.physics.add.collider(this.stars,this.dude, (dude,stars) => {
			this.count += 1
			this.score.setText(this.count)
			stars.destroy()
		})
	}

	increment(){
		this.timeCount += 1
		this.timecnt.setText(this.timeCount)
	}

	update(){
		const cursors = this.input.keyboard.createCursorKeys()


		if (cursors.left.isDown) {
			this.dude.setVelocityX(-100)
			this.dude.anims.play("left",true)
		}else if (cursors.right.isDown) {
			this.dude.setVelocityX(100)
			this.dude.anims.play("right",true)
		}else {
			this.dude.setVelocityX(0)
			this.dude.anims.play("def",true)
		}

		if (this.timeCount >= 10) {
			this.timecnt.x = 662		
		}

		if (this.timeCount >= 10) {
			this.scene.start("gameover")
			socket.emit("score", this.count)
		}
	}


}