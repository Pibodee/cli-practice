const { request } = require("express");
const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const { catchAsync } = require("../utils/catchAsync");

let getTasks = async (req, res) => {
  const { page = 1, limit = 10, completed } = req.query;
  const tasks = await getTasksService(req.user._id, page, limit, completed);  
  res.status(200).json(tasks);
};

getTasks = catchAsync(getTasks);

const getTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await getTaskService(req.user._id, taskId);
  res.status(200).json(task);
});

const createTask = async (req, res, next) => {
  try {
    const newTask = await createTaskService(req.user._id, req.body);
    console.log(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await updateTaskService(req.user._id, taskId, req.body);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

let deleteTask = async (req, res, next) => {
    const { taskId } = req.params;
    await deleteTaskService(req.user._id, taskId);

    res.status(200).json({taskId});
}

deleteTask = catchAsync(deleteTask)

module.exports = { getTasks, getTask, createTask: catchAsync(createTask), updateTask, deleteTask };
