const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String, reqired: true },
    completed: {type: Boolean, default: false}
}, { timestamps: true, versionKey: false })

const Task = mongoose.model("task", schema)

module.exports = {Task}