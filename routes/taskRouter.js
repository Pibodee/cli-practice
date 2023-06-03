const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const { catchAsync } = require("../utils/catchAsync");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/taskValidationSchemas");
const { validateBody } = require("../utils/validateBody");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(getTasks)
  .post(validateBody(createTaskValidationSchema), createTask);

router
  .route(`/:taskId`)
  .get(getTask)
  .patch(validateBody(updateTaskValidationSchema), catchAsync(updateTask))
  .delete(deleteTask);

module.exports = { tasksRouter: router };
