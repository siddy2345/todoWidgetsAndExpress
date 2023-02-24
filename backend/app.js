import express from 'express';
import cors from 'cors';
import { appendTask, appendTodo, clearTodo, clearTodos, getTasks, getTodos } from '../lib/todo.js';
import path from 'path'
const app = express();

// allow cross origin
app.use(cors());

// enable POST as json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * TASK:
 * - get all todos
 * - respond all todos as JSON
 */
app.get('/todo', async function(req, res) {
  const todos = await getTodos();
  console.log(todos);
  res.status(200).send(todos);
});

app.get('/todo/task', async function(req, res) {
  const tasks = await getTasks();
  console.log(tasks);
  res.status(200).send(tasks);
});

/**
 * TASK:
 * - handle wrong input (send status 400)
 * - append todo
 * - send status 201 as confirmation
 */
app.post('/todo', async function(req, res) {
  // console.log(req);
  const input = req.body.todoWidget;
  if(!input) {
    res.sendStatus(400);
    return;
  }
  
  await appendTodo(input);
  res.status(201).send(input);
});

app.post('/todo/task', async function(req, res) {
  // console.log(req.body.task);
  const input = req.body.task;
  if(!input) {
    res.sendStatus(400);
    return;
  }
  
  await appendTask(input);
  res.status(201).send(input);
});

/**
 * TASK:
 * - remove all todos
 * - send status 204 as confirmation
 */
// app.delete(`/todo`, async function(req, res) {
//   console.log();
//   clearTodos();
//   res.sendStatus(204);
// });

/**
 * TASK:
 * - remove just one todo
 * - send status 204 as confirmation
 */
app.delete(`/todo/:id`, async function(req, res) {
  // console.log(req.params.id);
  clearTodo(req.params.id);
  res.sendStatus(204);
});

// start app
app.listen(3000, () => {
  console.log('listening on port 3000');
});

