const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
	count: Number
})

module.exports = mongoose.model("User", userSchema)