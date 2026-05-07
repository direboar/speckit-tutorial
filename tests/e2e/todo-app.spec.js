import { expect, test } from "@playwright/test";

const inputSelector = "#todo-input";
const listSelector = "[data-testid='todo-list']";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("タスクを追加して再読み込み後も保持する", async ({ page }) => {
  await page.fill(inputSelector, "仕様を見直す");
  await page.getByRole("button", { name: "追加" }).click();

  await expect(page.locator(listSelector).getByText("仕様を見直す")).toBeVisible();
  await expect(page.locator(listSelector)).toContainText("登録日時:");

  await page.reload();
  await expect(page.locator(listSelector).getByText("仕様を見直す")).toBeVisible();
});

test("完了状態を切り替えられる", async ({ page }) => {
  await page.fill(inputSelector, "完了切替");
  await page.getByRole("button", { name: "追加" }).click();

  const checkbox = page.locator(`${listSelector} input[type='checkbox']`).first();
  await checkbox.check();
  await expect(page.locator(listSelector)).toContainText("完了済み");

  await page.reload();
  await expect(page.locator(listSelector)).toContainText("完了済み");
});

test("削除とフィルタ切替が動作する", async ({ page }) => {
  await page.fill(inputSelector, "残す");
  await page.getByRole("button", { name: "追加" }).click();
  await page.fill(inputSelector, "終わらせる");
  await page.getByRole("button", { name: "追加" }).click();

  await page.locator(`${listSelector} input[type='checkbox']`).nth(1).check();
  await page.getByRole("button", { name: "完了済み" }).click();
  await expect(page.locator(listSelector)).toContainText("終わらせる");
  await expect(page.locator(listSelector)).not.toContainText("残す");

  await page.getByRole("button", { name: "終わらせるを削除" }).click();
  await expect(page.locator(listSelector)).not.toContainText("終わらせる");
});

