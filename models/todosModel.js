const { v4: uuidv4 } = require('uuid');

class TodoModel {
  constructor() {
    this.todos = [
      {
        title: '這是預設資料',
        id: uuidv4(),
      },
    ];
  }

  // 取得全部
  getAll() {
    return this.todos;
  }

  // 新增資料
  create(todo) {
    const { title } = todo;
    const newTodo = {
      title,
      id: uuidv4(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }
}

module.exports = new TodoModel();
