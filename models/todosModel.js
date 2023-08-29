const { v4: uuidv4 } = require('uuid');

class TodoModel {
  constructor() {
    this.todos = [
      {
        title: '這是預設資料',
        complete: false,
        id: uuidv4(),
      },
    ];
  }

  getAll() {
    return this.todos;
  }

  get(id) {
    console.log('get', id);
    return this.todos.find((todo) => todo.id === id);
  }

  create(todo) {
    const newTodo = {
      ...todo,
      id: uuidv4(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id, updatedFields) {
    const todo = this.get(id);
    if (todo) {
      Object.assign(todo, updatedFields);
    }
    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    }
  }
}

module.exports = new TodoModel();
