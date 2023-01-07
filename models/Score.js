const mongoose = require("mongoose")

const scoreSchema = new mongoose.Schema({
	count: Number
})

module.exports = mongoose.model("Score", scoreSchema)