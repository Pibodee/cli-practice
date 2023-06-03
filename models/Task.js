const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String, reqired: true },
    completed: { type: Boolean, default: false },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true, versionKey: false })

const Task = mongoose.model("task", schema)

module.exports = {Task}