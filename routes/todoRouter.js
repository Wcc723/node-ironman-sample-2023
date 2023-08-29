const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todosController');

// Get All
router.get('/', todoController.getAllTodos);

// Get one Todo
router.get('/:id', todoController.getTodoById);

// Create Todo
router.post('/', todoController.createTodo);

// Update Todo
router.put('/:id', todoController.updateTodo);

// Delete Todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
