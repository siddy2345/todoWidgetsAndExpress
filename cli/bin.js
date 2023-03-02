#!/usr/bin/env node

/**
 * TASK:
 * Write a CLI which handels the following commands:
 * 
 * todo | displays a list of all todo items
 * todo --add <text> | adds a new todo item
 * todo -a <text> | adds a new todo item
 * todo --clear | removes all todos
 * todo -c | removes all todos
 */

import { showTodos, addTodo, deleteTodos } from "../js/clicalls.js";

/**
 * @type {string} obj.command command name: could be --add, -a, --clear, -c
 * @type {string} obj.todo text for a new todo
 */
const [ command, text ] = process.argv.slice(2);

const url = 'http://localhost:3000/todo';

let todos;
switch(command) {
  case '--add': 
  case '-a':
    addTodo(url, text);
    todos = await showTodos(url);
    todos.forEach(t => console.log(t));
    break;
  case '--clear': 
  case '-c':
    deleteTodos(url);
    todos = await showTodos(url);
    todos.forEach(t => console.log(t));
    break;
  default:
    todos = await showTodos(url);
    todos.forEach(t => console.log(t));
    // console.log(await showTodos(url));
    break;
}
