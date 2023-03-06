import { readDataTask, readDataTodo, writeDataTask, writeDataTodo } from "./storage.js"

/**
 * Gets all todos
 * @returns {Promise<Array<string>>}
 */
export const getTodos = async () => {
  return (await readDataTodo()) ?? [];
}

export const getTasks = async () => {
  return (await readDataTask()) ?? [];
}

/**
 * Appends a todo
 * @param {string} todo 
 * @returns {Promise<Array<string>>}
 */
export const appendTodo =  async (todo) => {
  const todos = await getTodos();
  todos.push(todo);
  await writeDataTodo(todos);
  return todos;
}

export const appendTask =  async (task) => {
  const tasks = await getTasks();
  tasks.push(task);
  await writeDataTask(tasks);
  return tasks;
}

/**
 * Clears all todos from storage
 * @returns {Promise<void>}
 */
export const clearTodos = () => {
  return writeDataTodo([]);
}

export const clearTasks = async (todoTasksId) => {
  const tasks = await getTasks();

  const filteredTasks = tasks.filter(task => task.todoId != todoTasksId);
  
  return writeDataTask(filteredTasks);
}

export const clearTodo = async (todoId) => {
  const todos = await getTodos();

  const filteredTodos = todos.filter(todo => todo.id != todoId);

  return writeDataTodo(filteredTodos);
}

export const clearTask = async (taskId) => {
  const tasks = await getTasks();
  
  tasks.forEach(task => {
    if(task.id == taskId) tasks.splice((tasks.indexOf(task)), 1);
  });

  return writeDataTask(tasks);
}