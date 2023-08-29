const request = require('supertest');
const app = require('../app');
const TodoModel = require('../models/todosModel');

// 初始化
beforeEach(() => {
  TodoModel.todos = [
    { id: '1', title: 'Test Todo 1', completed: false },
    { id: '2', title: 'Test Todo 2', completed: true },
  ];
  console.log(TodoModel.todos);
});

// 測試 '自定義名稱', callback function
test('取得所有代辦事項', async () => {
  const res = await request(app).get('/todos');
  // 請求的結果 === 與資料庫一致
  // 斷言
  expect(res.body).toEqual(TodoModel.todos); // 物件
  expect(res.statusCode).toBe(200)
});

test('建立新的代辦事項', async () => {
  const newTodo = {
    title: 'test 3',
    completed: false
  }
  const res = await request(app).post('/todos').send(newTodo)
  console.log(res.body);
  expect(res.body.title).toBe(newTodo.title);
  expect(res.body.completed).toBe(newTodo.completed);
  expect(res.statusCode).toBe(200);
});


// 錯誤測試
test('建立代辦，但缺少 title 欄位', async () => {
  const newTodo = {
    completed: false,
  };

  const res = await request(app).post('/todos').send(newTodo)
  expect(res.statusCode).toBe(400);
  expect(res.text).toBe('缺少 title 欄位');
});
