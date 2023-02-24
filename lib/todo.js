import { readData, readData2, writeData, writeData2 } from "./storage.js"

/**
 * Gets all todos
 * @returns {Promise<Array<string>>}
 */
export const getTodos = async () => {
  return (await readData()) ?? [];
}

export const getTasks = async () => {
  return (await readData2()) ?? [];
}

/**
 * Appends a todo
 * @param {string} todo 
 * @returns {Promise<Array<string>>}
 */
export const appendTodo =  async (todo) => {
  const todos = await getTodos();
  todos.push(todo);
  await writeData(todos);
  return todos;
}

export const appendTask =  async (task) => {
  const tasks = await getTasks();
  tasks.push(task);
  await writeData2(tasks);
  return tasks;
}

/**
 * Clears all todos from storage
 * @returns {Promise<void>}
 */
export const clearTodos = () => {
  return writeData([]);
}

export const clearTasks = () => {
  return writeData2([]);
}

export const clearTodo = async (todoId) => {
  console.log(todoId);
  const todos = await getTodos();
  todos.forEach(element => {
    if(element.id == todoId) todos.splice((todos.indexOf(element)), 1);
  });

  return writeData(todos);
}

export const clearTask = async (tasksId) => {
  console.log(tasksId);
  const tasks = await getTasks();
  tasks.forEach(element => {
    if(element.id == tasksId) tasks.splice((tasks.indexOf(element)), 1);
  });

  return writeData2(tasks);
}