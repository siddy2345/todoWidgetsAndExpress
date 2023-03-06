import { promises as fs, constants } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// put data.json at the correct location
const __dirname = dirname(fileURLToPath(import.meta.url));
const STORAGE_LOCATION_TODO = resolve(__dirname, '../todo.json');
const STORAGE_LOCATION_TASK = resolve(__dirname, '../task.json');

/**
 * Checks if storage can be accessed
 * @returns {Promise<boolean>}
 */
export const canAccessStorageTodo = () => {
  return fs.access(STORAGE_LOCATION_TODO, constants.W_OK).then(_ => true).catch(_ => false);
}

export const canAccessStorageTask = () => {
  return fs.access(STORAGE_LOCATION_TASK, constants.W_OK).then(_ => true).catch(_ => false);
}

/**
 * Reads data or defaults to null if data is unavailable
 * @returns {Promise<any | null>}
 */
export const readDataTodo = async () => {
  return await canAccessStorageTodo()
    ? fs.readFile(STORAGE_LOCATION_TODO, 'utf-8').then(data => data !== '' ? JSON.parse(data) : null)
    : null;
}

export const readDataTask = async () => {
  return await canAccessStorageTask()
    ? fs.readFile(STORAGE_LOCATION_TASK, 'utf-8').then(data => data !== '' ? JSON.parse(data) : null)
    : null;
} 

/**
 * Writes data
 * @param {any} data 
 * @returns {Promise<void>}
 */
export const writeDataTodo = (data) => {
  return fs.writeFile(STORAGE_LOCATION_TODO, JSON.stringify(data));
}

export const writeDataTask = (data) => {
  return fs.writeFile(STORAGE_LOCATION_TASK, JSON.stringify(data));
}