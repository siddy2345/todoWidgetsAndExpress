import { readData, writeData } from "./storage.js"

/**
 * Gets all todos
 * @returns {Promise<Array<string>>}
 */
export const getTodos = async () => {
  return (await readData()) ?? [];
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

/**
 * Clears all todos from storage
 * @returns {Promise<void>}
 */
export const clearTodos = () => {
  return writeData([]);
}