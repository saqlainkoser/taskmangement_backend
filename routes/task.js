const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {
    createTask,
    createBulkTasks,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// Create task
router.post('/tasks', auth, createTask);

// Bulk create tasks
router.post('/tasks/bulk', auth, createBulkTasks);

// Get all tasks
router.get('/tasks', auth, getTasks);

// Get task by id
router.get('/tasks/:id', auth, getTaskById);

// Update task
router.patch('/tasks/:id', auth, updateTask);

// Delete task
router.delete('/tasks/:id', auth, deleteTask);

module.exports = router;
