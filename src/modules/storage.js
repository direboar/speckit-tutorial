import { FILTERS, STORAGE_KEY, STORAGE_VERSION } from "../constants.js";
import { isValidFilter } from "./filter-state.js";

export function createInitialState() {
  return {
    version: STORAGE_VERSION,
    activeFilter: FILTERS.ALL,
    todos: []
  };
}

export function sanitizeState(candidate) {
  if (!candidate || typeof candidate !== "object") {
    return createInitialState();
  }

  const todos = Array.isArray(candidate.todos)
    ? candidate.todos.filter(
        (todo) =>
          todo &&
          typeof todo.id === "string" &&
          typeof todo.title === "string" &&
          typeof todo.completed === "boolean" &&
          typeof todo.createdAt === "string"
      )
    : [];

  return {
    version: STORAGE_VERSION,
    activeFilter: isValidFilter(candidate.activeFilter) ? candidate.activeFilter : FILTERS.ALL,
    todos
  };
}

export class LocalStorageRepository {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
  }

  load() {
    try {
      const raw = this.storage?.getItem(STORAGE_KEY);

      if (!raw) {
        return { state: createInitialState(), recovered: false };
      }

      const parsed = JSON.parse(raw);
      return { state: sanitizeState(parsed), recovered: false };
    } catch {
      return { state: createInitialState(), recovered: true };
    }
  }

  save(state) {
    const sanitized = sanitizeState(state);
    this.storage?.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    return sanitized;
  }
}

