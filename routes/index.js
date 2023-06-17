const { Router } = require("express");
const {tasksRouter} = require('./taskRouter')
const { authRouter } = require('./authRouter')

const router = Router();

router.use("/tasks", tasksRouter);
router.use("/auth", authRouter);

module.exports = {rootRouter: router}
