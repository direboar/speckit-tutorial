import { TITLE_MAX_LENGTH } from "../constants.js";

export function normalizeTitle(title) {
  return String(title ?? "").trim();
}

export function validateTitle(rawTitle) {
  const title = normalizeTitle(rawTitle);

  if (!title) {
    return "タスク名を入力してください。";
  }

  if (title.length > TITLE_MAX_LENGTH) {
    return `タスク名は ${TITLE_MAX_LENGTH} 文字以内で入力してください。`;
  }

  return "";
}

export function createTodo({ id, title, createdAt }) {
  const normalizedTitle = normalizeTitle(title);
  const error = validateTitle(normalizedTitle);

  if (error) {
    throw new Error(error);
  }

  return {
    id,
    title: normalizedTitle,
    completed: false,
    createdAt
  };
}

export function createTodoId(now = new Date()) {
  const stamp = typeof now === "string" ? now : now.toISOString();
  const compact = stamp.replace(/\D/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 8);
  return `todo_${compact}_${random}`;
}

