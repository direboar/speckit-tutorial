import { beforeEach, describe, expect, it } from "vitest";

import { FILTERS } from "../../src/constants.js";
import { TodoService } from "../../src/modules/todo-service.js";

function createRepository(seedState = null) {
  let state = seedState;
  return {
    load() {
      return {
        state: state ?? {
          version: 1,
          activeFilter: FILTERS.ALL,
          todos: []
        },
        recovered: false
      };
    },
    save(nextState) {
      state = structuredClone(nextState);
      return structuredClone(nextState);
    }
  };
}

describe("TodoService", () => {
  let service;

  beforeEach(() => {
    service = new TodoService({
      repository: createRepository(),
      createNow: () => "2026-05-07T08:15:09.000Z",
      createId: () => "todo_fixed"
    });
    service.initialize();
  });

  it("タスクを追加して保存する", () => {
    const result = service.addTodo("仕様書レビュー");
    expect(result.ok).toBe(true);
    expect(result.todo).toMatchObject({
      id: "todo_fixed",
      title: "仕様書レビュー",
      completed: false,
      createdAt: "2026-05-07T08:15:09.000Z"
    });
  });

  it("空入力を拒否する", () => {
    const result = service.addTodo("   ");
    expect(result).toEqual({
      ok: false,
      error: "タスク名を入力してください。"
    });
  });

  it("完了状態を切り替える", () => {
    service.addTodo("切替確認");
    const state = service.toggleTodo("todo_fixed");
    expect(state.todos[0].completed).toBe(true);
  });

  it("タスクを削除する", () => {
    service.addTodo("削除確認");
    const state = service.deleteTodo("todo_fixed");
    expect(state.todos).toHaveLength(0);
  });

  it("フィルタ状態を切り替える", () => {
    const state = service.setFilter(FILTERS.COMPLETED);
    expect(state.activeFilter).toBe(FILTERS.COMPLETED);
  });
});

