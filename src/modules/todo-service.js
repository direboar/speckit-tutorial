import { FILTERS } from "../constants.js";
import { filterTodos, isValidFilter } from "./filter-state.js";
import { LocalStorageRepository } from "./storage.js";
import { createTodo, createTodoId, validateTitle } from "./todo-model.js";

export class TodoService {
  constructor({
    repository = new LocalStorageRepository(),
    createNow = () => new Date().toISOString(),
    createId = createTodoId
  } = {}) {
    this.repository = repository;
    this.createNow = createNow;
    this.createId = createId;
    this.state = null;
  }

  initialize() {
    const { state, recovered } = this.repository.load();
    this.state = state;
    return {
      recovered,
      state: this.getState()
    };
  }

  getState() {
    if (!this.state) {
      return {
        version: 1,
        activeFilter: FILTERS.ALL,
        todos: [],
        visibleTodos: [],
        remainingCount: 0
      };
    }

    const todos = [...this.state.todos];
    return {
      ...this.state,
      todos,
      visibleTodos: filterTodos(todos, this.state.activeFilter),
      remainingCount: todos.filter((todo) => !todo.completed).length
    };
  }

  addTodo(title) {
    const error = validateTitle(title);

    if (error) {
      return { ok: false, error };
    }

    const createdAt = this.createNow();
    const todo = createTodo({
      id: this.createId(createdAt),
      title,
      createdAt
    });

    this.state.todos = [...this.state.todos, todo];
    this.persist();
    return { ok: true, todo, state: this.getState() };
  }

  toggleTodo(id) {
    this.state.todos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.persist();
    return this.getState();
  }

  deleteTodo(id) {
    this.state.todos = this.state.todos.filter((todo) => todo.id !== id);
    this.persist();
    return this.getState();
  }

  setFilter(filter) {
    this.state.activeFilter = isValidFilter(filter) ? filter : FILTERS.ALL;
    this.persist();
    return this.getState();
  }

  persist() {
    this.state = this.repository.save(this.state);
  }
}

