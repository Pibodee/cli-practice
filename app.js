const express = require("express");
const { tasksRouter } = require('./routes/taskRouter')
const {authRouter} = require('./routes/authRouter')

const app = express();

app.use(express.json())

app.use('/tasks', tasksRouter)
app.use('/auth', authRouter)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({message : err.message || "Something went wrong, please tyr gain later"});
})
module.exports = { app };