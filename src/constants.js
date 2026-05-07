export const STORAGE_KEY = "todo-list-core.state";
export const STORAGE_VERSION = 1;
export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed"
};
export const FILTER_LABELS = {
  [FILTERS.ALL]: "すべて",
  [FILTERS.ACTIVE]: "未完了",
  [FILTERS.COMPLETED]: "完了済み"
};
export const TITLE_MAX_LENGTH = 120;
export const DATE_DISPLAY_FORMAT = "YYYY/MM/DD HH:SS";
export const EMPTY_MESSAGES = {
  [FILTERS.ALL]: "まだタスクがありません。最初の 1 件を追加してください。",
  [FILTERS.ACTIVE]: "未完了のタスクはありません。",
  [FILTERS.COMPLETED]: "完了済みのタスクはありません。"
};

