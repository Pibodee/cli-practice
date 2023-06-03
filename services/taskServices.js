const { request } = require('express');
const {Task} = require('../models/Task')
const { HttpError } = require("../utils/HttpError");


const getTasksService = async (page, limit, completed) => {
  const skip = (page - 1) * limit;
  const filter = {}
  if (completed === 'true') {
    filter.completed = true
  }
  if (completed === 'false') {
    filter.completed = false
  }
  return await Task.find(filter).skip(skip).limit(limit);
};

const getTaskService = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
  throw  new HttpError(404, 'Task not found!')
  }
  return task
};

const createTaskService = async (data) => {
  return await Task.create(data)
};

const updateTaskService = async (id, data) => {
  const task = await Task.findByIdAndUpdate(id, data, { new: true });
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }
  return task
};

const deleteTaskService = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }
  return id;
};

module.exports = { getTasksService, getTaskService, createTaskService, updateTaskService, deleteTaskService };

// (async () => {
//   const data = await getTasks();
//   console.log(data);
// })();
