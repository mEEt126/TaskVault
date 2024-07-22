const { Task, UserTask } = require('../models');
const { publishMessage } = require('../queues/queuePublisher.js');

exports.createTask = async (req, res) => {
  try {
    // console.log(req.body)
    const { taskName, taskDescription, status, dueDate, userId } = req.body;
    const task = await Task.create({ taskName, taskDescription,  status,  dueDate });

    // userId can be taken from request or logged in user

    const event = {
      eventType : "TASK_CREATED",
      userId,                         // id of user who is creating task
      taskId : task.id
    };
    await publishMessage(event);
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;
    const assignment = await UserTask.create({ userId, taskId });

    const event = {
      eventType : "TASK_ASSIGNED",
      userId,                         
      taskId : taskId
    };
    await publishMessage(event);
    
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      const { taskName, taskDescription, status, dueDate, userId } = req.body;
      const updatedTask = await task.update({ taskName, taskDescription,  status,  dueDate });

      const event = {
        eventType : "TASK_UPDATED",
        userId,                         
        taskId : req.params.id
      };
      await publishMessage(event);

      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      const { userId } = req.body;
      await task.destroy();

      const event = {
        eventType : "TASK_DELETED",
        userId,                         
        taskId : req.params.id
      };
      await publishMessage(event);

      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
