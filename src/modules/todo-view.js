import { EMPTY_MESSAGES, FILTER_LABELS, FILTERS } from "../constants.js";
import { formatCreatedAt } from "./datetime-format.js";

export function createTodoView({
  errorElement,
  storageErrorElement,
  filterButtons,
  input,
  listElement,
  emptyStateElement,
  remainingCountElement
}) {
  function renderTodo(todo) {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " is-completed" : ""}`;
    item.dataset.todoId = todo.id;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.action = "toggle";
    checkbox.dataset.todoId = todo.id;
    checkbox.setAttribute("aria-label", `${todo.title}を${todo.completed ? "未完了" : "完了"}に切り替え`);

    const main = document.createElement("div");
    main.className = "todo-main";

    const titleRow = document.createElement("div");
    titleRow.className = "todo-title-row";

    const title = document.createElement("p");
    title.className = "todo-title";
    title.textContent = todo.title;

    const state = document.createElement("span");
    state.className = `todo-state ${todo.completed ? "is-completed" : "is-active"}`;
    state.textContent = todo.completed ? "完了済み" : "未完了";
    state.setAttribute("aria-label", `状態: ${todo.completed ? "完了済み" : "未完了"}`);

    titleRow.append(title, state);

    const meta = document.createElement("p");
    meta.className = "todo-meta";
    meta.textContent = `登録日時: ${formatCreatedAt(todo.createdAt)}`;

    main.append(titleRow, meta);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "todo-delete";
    removeButton.textContent = "削除";
    removeButton.dataset.action = "delete";
    removeButton.dataset.todoId = todo.id;
    removeButton.setAttribute("aria-label", `${todo.title}を削除`);

    item.append(checkbox, main, removeButton);
    return item;
  }

  function renderFilterState(activeFilter) {
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderState(state) {
    listElement.replaceChildren(...state.visibleTodos.map(renderTodo));
    emptyStateElement.textContent = state.visibleTodos.length
      ? ""
      : EMPTY_MESSAGES[state.activeFilter] || EMPTY_MESSAGES[FILTERS.ALL];
    emptyStateElement.hidden = state.visibleTodos.length > 0;
    remainingCountElement.textContent = `未完了 ${state.remainingCount} 件 / 全体 ${state.todos.length} 件`;
    renderFilterState(state.activeFilter);
  }

  function showError(message) {
    errorElement.textContent = message;
    errorElement.hidden = !message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function showStorageRecoveryMessage(recovered) {
    storageErrorElement.textContent = recovered
      ? "保存済みデータを読み込めなかったため、安全な初期状態で開始しました。"
      : "";
    storageErrorElement.hidden = !recovered;
  }

  return {
    renderState,
    showError,
    showStorageRecoveryMessage
  };
}

