const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const mongoose = require("mongoose")
const User = require("./models/User")

mongoose.connect("mongodb://localhost/gamedb")

app.use(express.urlencoded())
app.use("/game", express.static("public"))

app.get("/leaderboard", (req,res) => {
	res.sendFile(__dirname + "/leaderboard.html")
})

app.get("/", (req,res) => {
	res.sendFile(__dirname + "/loginregister/login.html")
})
app.get("/register", (req,res) => {
	res.sendFile(__dirname + "/loginregister/register.html")
})

app.post("/login", async (req,res) => {

	await User.create({
		name: req.body.username,
		password: req.body.password
	})

	res.redirect("/")
})

app.post("/game", async (req,res) => {
	const checkName = await User.exists( { name: req.body.username } ) 
	const checkPass = await User.exists({ password: req.body.password }) 
	

	if (checkName && checkPass) {
		res.redirect("/game")


	}else {
		res.redirect("/register")
	}
})



io.on("connection", async socket => {
	const scores = await User.find({}).select("count")
	socket.emit("scores", scores)
	const usernames = await User.find({}).select("name")
	socket.emit("usernames", usernames)

	socket.on("score", async score => {
		const shit = await User.create({
			count: score
		})


		io.emit("shit",shit)

		const user = await User.findOne({}, {}, { sort: { 'created_at' : -1 } });

		io.emit("shit2", user)
	})
})

server.listen(5000, () => {
	console.log("yes")
})