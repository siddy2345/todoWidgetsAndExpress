import { promises as fs, constants } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// put data.json at the correct location
const __dirname = dirname(fileURLToPath(import.meta.url));
const STORAGE_LOCATION = resolve(__dirname, '../data.json');
const STORAGE_LOCATION_2 = resolve(__dirname, '../data2.json');

/**
 * Checks if storage can be accessed
 * @returns {Promise<boolean>}
 */
export const canAccessStorage = () => {
  return fs.access(STORAGE_LOCATION, constants.W_OK).then(_ => true).catch(_ => false);
}

export const canAccessStorage2 = () => {
  return fs.access(STORAGE_LOCATION_2, constants.W_OK).then(_ => true).catch(_ => false);
}

/**
 * Reads data or defaults to null if data is unavailable
 * @returns {Promise<any | null>}
 */
export const readData = async () => {
  return await canAccessStorage()
    ? fs.readFile(STORAGE_LOCATION, 'utf-8').then(data => data !== '' ? JSON.parse(data) : null)
    : null;
}

export const readData2 = async () => {
  return await canAccessStorage2()
    ? fs.readFile(STORAGE_LOCATION_2, 'utf-8').then(data => data !== '' ? JSON.parse(data) : null)
    : null;
} 

/**
 * Writes data
 * @param {any} data 
 * @returns {Promise<void>}
 */
export const writeData = (data) => {
  return fs.writeFile(STORAGE_LOCATION, JSON.stringify(data));
}

export const writeData2 = (data) => {
  return fs.writeFile(STORAGE_LOCATION_2, JSON.stringify(data));
}