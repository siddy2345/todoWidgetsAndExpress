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

export const clearTasks = async (todoTasksId) => {
  const tasks = await getTasks();

  const filteredTasks = tasks.filter(task => task.todoId != todoTasksId);
  
  return writeData2(filteredTasks);
}

export const clearTodo = async (todoId) => {
  const todos = await getTodos();

  const filteredTodos = todos.filter(todo => todo.id != todoId);

  return writeData(filteredTodos);
}

export const clearTask = async (taskId) => {
  console.log(taskId);
  const tasks = await getTasks();
  tasks.forEach(element => {
    if(element.id == taskId) tasks.splice((tasks.indexOf(element)), 1);
  });

  return writeData2(tasks);
}