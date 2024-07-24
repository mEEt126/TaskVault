const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


router.post('/', taskController.createTask);
router.post('/assign', taskController.assignTask);
router.get('/',  taskController.getTasks);
router.get('/:id',  taskController.getTask);
router.get('/tasks/:userId', taskController.getTasksByUserId);
router.get('/:taskId/users', taskController.getUsersByTaskId);
router.get('/:taskId/status', taskController.getStatusOfTask);

router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
