import { beforeEach, describe, expect, it } from "vitest";

import {
  createInitialState,
  LocalStorageRepository,
  sanitizeState
} from "../../src/modules/storage.js";

function createMemoryStorage() {
  const bucket = new Map();
  return {
    getItem(key) {
      return bucket.has(key) ? bucket.get(key) : null;
    },
    setItem(key, value) {
      bucket.set(key, value);
    }
  };
}

describe("storage", () => {
  let storage;
  let repository;

  beforeEach(() => {
    storage = createMemoryStorage();
    repository = new LocalStorageRepository(storage);
  });

  it("保存データがない場合は初期状態を返す", () => {
    expect(repository.load()).toEqual({
      state: createInitialState(),
      recovered: false
    });
  });

  it("壊れたデータは安全な初期状態へフォールバックする", () => {
    storage.setItem("todo-list-core.state", "{broken");
    expect(repository.load()).toEqual({
      state: createInitialState(),
      recovered: true
    });
  });

  it("不正な state を sanitize する", () => {
    expect(sanitizeState({ activeFilter: "unknown", todos: [{}] })).toEqual(createInitialState());
  });
});

