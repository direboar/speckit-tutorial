import { describe, expect, it } from "vitest";

import { formatCreatedAt } from "../../src/modules/datetime-format.js";

describe("formatCreatedAt", () => {
  it("ISO 文字列を YYYY/MM/DD HH:SS 形式へ整形する", () => {
    expect(formatCreatedAt("2026-05-07T08:15:09.000Z")).toMatch(/2026\/05\/07 \d{2}:\d{2}/);
  });

  it("不正な値は不明な日時を返す", () => {
    expect(formatCreatedAt("not-a-date")).toBe("不明な日時");
  });
});

