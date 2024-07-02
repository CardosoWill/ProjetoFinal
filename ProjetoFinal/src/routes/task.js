const express = require('express');
const TaskApi = require('../api/task');

const router = express.Router();

router.get('/', TaskApi.findTasksAll)
router.get('/:id', TaskApi.findTasks)
router.get('/status/:status', TaskApi.findTasksStatus); 
router.post('/', TaskApi.createTask)
router.put('/:id', TaskApi.updateTask)
router.delete('/:id', TaskApi.deleteTask)

module.exports = router;