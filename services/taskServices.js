const { request } = require('express');
const {Task} = require('../models/Task')
const { HttpError } = require("../utils/HttpError");


const getTasksService = async (userId, page, limit, completed) => {
  const skip = (page - 1) * limit;
  const filter = {owner: userId}
  if (completed === 'true') {
    filter.completed = true
  }
  if (completed === 'false') {
    filter.completed = false
  }
  return await Task.find(filter).skip(skip).limit(limit);
};

const getTaskService = async (userId, id) => {
  const task = await Task.findOne({owner: userId, _id: id});
  if (!task) {
  throw  new HttpError(404, 'Task not found!')
  }
  return task
};

const createTaskService = async (userId, data) => {
  return await Task.create({...data, owner: userId})
};

const updateTaskService = async (userId, id, data) => {
  const task = await Task.findOneAndUpdate(
    { owner: userId, _id: id },
    data,
    { new: true }
  );
  if (!task) {
    throw new HttpError(404, "Task not found!");
  }
  return task
};

const deleteTaskService = async (userId, id) => {
  const task = await Task.findOneAndDelete({ owner: userId, _id: id });
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
