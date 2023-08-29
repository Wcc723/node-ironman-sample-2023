const todoModel = require('../models/todosModel');

exports.getAllTodos = (req, res) => {
  const todos = todoModel.getAll();
  res.send({
    status: 'success',
    todos,
  });
};

exports.createTodo = (req, res) => {
  // 取得用戶所輸入的資料
  const { title } = req.body;

  // 將資料加入至 Todos
  const newTodo = todoModel.create({
    title,
  });

  res.send({
    status: 'success',
    todo: newTodo,
  });
};