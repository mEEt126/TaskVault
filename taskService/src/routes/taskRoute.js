const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


router.post('/', taskController.createTask);
router.post('/assign', taskController.assignTask);
router.get('/',  taskController.getTasks);
router.get('/:id',  taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
