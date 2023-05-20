const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const { catchAsync } = require("../utils/catchAsync");

let getTasks = async (req, res) => {
  const tasks = await getTasksService();

  res.status(200).json(tasks);
};

getTasks = catchAsync(getTasks);

const getTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await getTaskService(taskId);
  res.status(200).json(task);
});

const createTask = async (req, res, next) => {
  try {
    const newTask = await createTaskService(req.body);
    console.log(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await updateTaskService(taskId, req.body);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await deleteTaskService(taskId);

    res.status(200).json(taskId);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createTask: catchAsync(createTask), updateTask, deleteTask };
