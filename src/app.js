import { getElement } from "./utils/dom.js";
import { TodoService } from "./modules/todo-service.js";
import { createTodoView } from "./modules/todo-view.js";

function createApp() {
  const form = getElement("[data-testid='todo-form']");
  const input = getElement("#todo-input");
  const errorElement = getElement("#todo-error");
  const storageErrorElement = getElement("[data-testid='storage-error']");
  const listElement = getElement("[data-testid='todo-list']");
  const emptyStateElement = getElement("[data-testid='empty-state']");
  const remainingCountElement = getElement("[data-testid='remaining-count']");
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

  const service = new TodoService();
  const view = createTodoView({
    errorElement,
    storageErrorElement,
    filterButtons,
    input,
    listElement,
    emptyStateElement,
    remainingCountElement
  });

  const { state, recovered } = service.initialize();
  view.renderState(state);
  view.showStorageRecoveryMessage(recovered);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = service.addTodo(input.value);

    if (!result.ok) {
      view.showError(result.error);
      return;
    }

    input.value = "";
    view.showError("");
    view.renderState(result.state);
    input.focus();
  });

  listElement.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action='delete']");

    if (!target) {
      return;
    }

    view.renderState(service.deleteTodo(target.dataset.todoId));
  });

  listElement.addEventListener("change", (event) => {
    const target = event.target.closest("[data-action='toggle']");

    if (!target) {
      return;
    }

    view.renderState(service.toggleTodo(target.dataset.todoId));
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      view.renderState(service.setFilter(button.dataset.filter));
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createApp);
} else {
  createApp();
}

