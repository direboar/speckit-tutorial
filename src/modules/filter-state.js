import { FILTERS } from "../constants.js";

export function isValidFilter(filter) {
  return Object.values(FILTERS).includes(filter);
}

export function matchesFilter(todo, filter) {
  if (filter === FILTERS.ACTIVE) {
    return !todo.completed;
  }

  if (filter === FILTERS.COMPLETED) {
    return todo.completed;
  }

  return true;
}

export function filterTodos(todos, filter) {
  return todos.filter((todo) => matchesFilter(todo, filter));
}

