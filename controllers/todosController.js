const TodoModel = require('../models/todosModel');

// Controller 內的 CRUD 方法
exports.getAllTodos = (req, res) => {
  const todos = TodoModel.getAll();
  res.send(todos);
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = TodoModel.get(id);
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  res.send(todo);
};

exports.createTodo = (req, res) => {
  // 驗證請求
  if (!req.body.title) {
    return res.status(400).send('缺少 title 欄位');
  }
  if (typeof req.body.title !== 'string') {
    return res.status(400).send('title 欄位格式錯誤');
  }

  const newTodo = {
    title: req.body.title,
    completed: req.body.completed || false,
  };
  const todo = TodoModel.create(newTodo);
  res.send(todo);
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const todo = TodoModel.update(id, req.body);
  if (!todo) {
    return res.status(404).send('Todo 不存在');
  }

  res.send(todo);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const todo = TodoModel.delete(id);
  if (!todo) {
    return res.status(404).send('Todo 不存在');
  }
  res.send(todo);
};
