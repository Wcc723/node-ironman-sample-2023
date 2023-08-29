const request = require('supertest');
const app = require('../app'); // the express server
const TodoModel = require('../models/todosModel');

let testTodo;

beforeEach(() => {
  // 每次測試前重設資料
  TodoModel.todos = [
    { id: '1', title: 'Test Todo 1', completed: false },
    { id: '2', title: 'Test Todo 2', completed: true },
  ];
  testTodo = TodoModel.todos[0];
});

test('取得所有待辦事項', async () => {
  const res = await request(app).get('/todos');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(TodoModel.todos);
});

test('透過 ID 取得特定待辦事項', async () => {
  const res = await request(app).get(`/todos/${testTodo.id}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(testTodo);
});

test('建立新的待辦事項', async () => {
  const newTodo = { title: 'Test Todo 3', completed: false };
  const res = await request(app).post('/todos').send(newTodo);
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toEqual(newTodo.title);
  expect(res.body.completed).toEqual(newTodo.completed);
});

test('更新特定待辦事項', async () => {
  const updatedTodo = { title: 'Updated Todo', completed: true };
  const res = await request(app).put(`/todos/${testTodo.id}`).send(updatedTodo);
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toEqual(updatedTodo.title);
  expect(res.body.completed).toEqual(updatedTodo.completed);
});

test('刪除特定待辦事項', async () => {
  const res = await request(app).delete(`/todos/${testTodo.id}`);
  expect(res.statusCode).toBe(200);
  const deletedTodo = TodoModel.get(testTodo.id);
  expect(deletedTodo).toBeUndefined();
});

// 錯誤流程測試
test('透過不存在的 ID 取得待辦事項', async () => {
  const res = await request(app).get('/todos/non-existent-id');
  expect(res.statusCode).toBe(404);
  expect(res.text).toBe('Todo not found');
});

test('建立待辦事項但缺少標題', async () => {
  const newTodo = { completed: false };
  const res = await request(app).post('/todos').send(newTodo);
  expect(res.statusCode).toBe(400);
  expect(res.text).toBe('缺少 title 欄位');
});
