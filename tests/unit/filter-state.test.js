import { describe, expect, it } from "vitest";

import { FILTERS } from "../../src/constants.js";
import { filterTodos, matchesFilter } from "../../src/modules/filter-state.js";

const todos = [
  { id: "a", completed: false },
  { id: "b", completed: true }
];

describe("filter-state", () => {
  it("未完了フィルタで未完了のみを返す", () => {
    expect(filterTodos(todos, FILTERS.ACTIVE)).toEqual([{ id: "a", completed: false }]);
  });

  it("完了済みフィルタで完了済みのみを返す", () => {
    expect(filterTodos(todos, FILTERS.COMPLETED)).toEqual([{ id: "b", completed: true }]);
  });

  it("all フィルタはすべて一致する", () => {
    expect(matchesFilter(todos[0], FILTERS.ALL)).toBe(true);
    expect(matchesFilter(todos[1], FILTERS.ALL)).toBe(true);
  });
});

